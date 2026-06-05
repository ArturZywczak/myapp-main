using MainApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace MainApp.Controllers;

[ApiController]
[Route("api/shutdown")]
public class ShutdownController(ShutdownService shutdown) : ControllerBase
{
    // Odpytywany co kilka sekund przez frontend - nie resetuje countdownu.
    [HttpGet("status")]
    public IActionResult Status() => Ok(shutdown.GetStatus());

    // Wolany raz przy wejsciu na strone - resetuje do 15 min (jesli mniej).
    [HttpPost("reset")]
    public IActionResult Reset() => Ok(shutdown.Reset());

    // Wolany przez przycisk Przedluz - +10 min, tylko gdy <= 5 min zostalo.
    [HttpPost("extend")]
    public IActionResult Extend()
    {
        var (success, status) = shutdown.TryExtend();
        if (!success)
            return BadRequest(new { error = "Za wczesnie (zostalo > 5 min).", status });
        return Ok(status);
    }
}
