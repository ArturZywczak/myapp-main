using System.Diagnostics;
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

    // Detects active SSH sessions by reading /run/utmp via the `who` command.
    // Requires: procps package + /run/utmp mounted from host (see docker-compose).
    private static bool IsSshActive()
    {
        try
        {
            var psi = new ProcessStartInfo("who")
            {
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            using var proc = Process.Start(psi);
            if (proc == null) return false;
            var output = proc.StandardOutput.ReadToEnd();
            proc.WaitForExit(2000);
            // SSH sessions appear as pts/ (pseudo-terminal over network) in `who` output
            return output.Split('\n').Any(l => l.Contains("pts/"));
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
