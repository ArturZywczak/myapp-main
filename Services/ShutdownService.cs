using System.Text.Json.Serialization;

namespace MainApp.Services;

public record ShutdownStatus(
    [property: JsonPropertyName("remaining_seconds")] int RemainingSeconds,
    [property: JsonPropertyName("can_extend")] bool CanExtend
);

public class ShutdownService
{
    private const string FilePath = "/app/logs/shutdown_at";
    private const int DefaultSeconds = 15 * 60;   // 15 min
    private const int ExtendSeconds  = 10 * 60;   // 10 min
    private const int ExtendThreshold = 5 * 60;   // można extend gdy ≤ 5 min

    private readonly object _lock = new();

    // Wywołane raz przy starcie aplikacji.
    // Jeśli plik nie istnieje lub timestamp jest w przeszłości → ustaw now+15min.
    // Jeśli plik ma przyszły timestamp → zostaw bez zmian (np. docker restart w trakcie sesji).
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
        var shutdownAt = Read() ?? DateTimeOffset.UtcNow.AddSeconds(DefaultSeconds);
        var remaining  = (int)(shutdownAt - DateTimeOffset.UtcNow).TotalSeconds;
        return new ShutdownStatus(remaining, remaining <= ExtendThreshold);
    }

    // Reset: ustaw na max(teraz+15min, aktualna wartość).
    // Odwiedzenie strony nie skraca istniejącego countdownu.
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

    // Extend: +10 min — tylko gdy remaining ≤ 5 min.
    // Zwraca (true, status) lub (false, status) gdy za wcześnie.
    public (bool Success, ShutdownStatus Status) TryExtend()
    {
        lock (_lock)
        {
            var status = GetStatus();
            if (status.RemainingSeconds > ExtendThreshold)
                return (false, status);

            var shutdownAt = Read() ?? DateTimeOffset.UtcNow;
            Write(shutdownAt.AddSeconds(ExtendSeconds));
        }
        return (true, GetStatus());
    }

    // --- helpers ---

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
