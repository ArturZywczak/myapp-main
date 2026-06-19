using System.Text.Json.Serialization;

namespace MainApp.Services;

public record ShutdownStatus(
    [property: JsonPropertyName("remaining_seconds")] int RemainingSeconds,
    [property: JsonPropertyName("can_extend")] bool CanExtend,
    [property: JsonPropertyName("ssh_active")] bool SshActive
);

public class ShutdownService
{
    private const string FilePath = "/app/logs/shutdown_at";
    private const int DefaultSeconds  = 15 * 60;  // 15 min
    private const int ExtendThreshold = 10 * 60;  // can extend when ≤ 10 min

    private readonly object _lock = new();

    // Called once at app startup.
    // If the file is missing or in the past → set now+15min.
    // If file has a future timestamp → leave it (e.g. docker restart mid-session).
    public void Initialize()
    {
        lock (_lock)
        {
            var existing = Read();
            if (existing == null || existing.Value <= DateTimeOffset.UtcNow)
                Write(DateTimeOffset.UtcNow.AddSeconds(DefaultSeconds));
        }
    }

    public ShutdownStatus GetStatus()
    {
        var sshActive = IsSshActive();

        // While SSH is connected keep pushing the shutdown time forward
        // so the server never shuts down during an active admin session.
        if (sshActive)
        {
            lock (_lock)
            {
                var newTime  = DateTimeOffset.UtcNow.AddSeconds(DefaultSeconds);
                var existing = Read();
                if (existing == null || existing.Value < newTime)
                    Write(newTime);
            }
        }

        var shutdownAt = Read() ?? DateTimeOffset.UtcNow.AddSeconds(DefaultSeconds);
        var remaining  = (int)(shutdownAt - DateTimeOffset.UtcNow).TotalSeconds;
        return new ShutdownStatus(remaining, remaining <= ExtendThreshold, sshActive);
    }

    // Called when the user visits the page — extends to at least 15 min from now.
    public ShutdownStatus Reset()
    {
        lock (_lock)
        {
            var newTime  = DateTimeOffset.UtcNow.AddSeconds(DefaultSeconds);
            var existing = Read();
            if (existing == null || existing.Value < newTime)
                Write(newTime);
        }
        return GetStatus();
    }

    // Extend: reset to 15 min — only allowed when ≤ 10 min remain.
    public (bool Success, ShutdownStatus Status) TryExtend()
    {
        lock (_lock)
        {
            var status = GetStatus();
            if (status.RemainingSeconds > ExtendThreshold)
                return (false, status);

            Write(DateTimeOffset.UtcNow.AddSeconds(DefaultSeconds));
        }
        return (true, GetStatus());
    }

    // --- SSH detection ---

    // Reads /run/utmp (mounted from host) directly as binary — no external commands needed.
    // utmpx record layout on Linux x86-64 / glibc (384 bytes per record):
    //   offset  0: ut_type (short, 2 bytes)  — 8 = USER_PROCESS (active login)
    //   offset  8: ut_line (char[32])        — "pts/N" for SSH sessions
    private static bool IsSshActive()
    {
        const int RecordSize  = 384;
        const short UserProcess = 7;  // USER_PROCESS in utmp.h
        const int UtTypeOffset = 0;
        const int UtLineOffset = 8;
        const int UtLineSize   = 32;

        try
        {
            if (!File.Exists("/run/utmp")) return false;
            var data = File.ReadAllBytes("/run/utmp");
            for (var i = 0; i + RecordSize <= data.Length; i += RecordSize)
            {
                var utType = BitConverter.ToInt16(data, i + UtTypeOffset);
                if (utType != UserProcess) continue;
                var line = System.Text.Encoding.ASCII
                    .GetString(data, i + UtLineOffset, UtLineSize)
                    .TrimEnd('\0');
                if (line.StartsWith("pts/", StringComparison.Ordinal))
                    return true;
            }
            return false;
        }
        catch
        {
            return false;
        }
    }

    // --- file helpers ---

    private DateTimeOffset? Read()
    {
        try
        {
            if (!File.Exists(FilePath)) return null;
            var text = File.ReadAllText(FilePath).Trim();
            if (long.TryParse(text, out var ts))
                return DateTimeOffset.FromUnixTimeSeconds(ts);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[ShutdownService] Read error: {ex.Message}");
        }
        return null;
    }

    private void Write(DateTimeOffset time)
    {
        try
        {
            Directory.CreateDirectory(Path.GetDirectoryName(FilePath)!);
            File.WriteAllText(FilePath, time.ToUnixTimeSeconds().ToString());
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[ShutdownService] Write error: {ex.Message}");
        }
    }
}
