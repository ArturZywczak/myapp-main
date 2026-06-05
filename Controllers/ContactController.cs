using MainApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using MimeKit;

namespace MainApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController(MailService mail) : ControllerBase
{
    // From    - visitor's reply-to address
    // Subject - email subject
    // Body    - message body
    // Website - honeypot field, must always be empty for real humans
    public record ContactDto(string From, string Subject, string Body, string Website = "");

    [HttpPost]
    [EnableRateLimiting("contact")] // max 3 requests per hour per IP (configured in Program.cs)
    public async Task<IActionResult> Send(ContactDto dto)
    {
        // Honeypot: the field is hidden from real users via CSS.
        // Bots that blindly fill all inputs will populate it.
        // Return 200 so the bot thinks it succeeded.
        if (!string.IsNullOrEmpty(dto.Website))
            return Ok();

        if (string.IsNullOrWhiteSpace(dto.From) ||
            string.IsNullOrWhiteSpace(dto.Subject) ||
            string.IsNullOrWhiteSpace(dto.Body))
            return BadRequest("Wypełnij wszystkie pola.");

        // Guard against oversized payloads
        if (dto.Subject.Length > 200 || dto.Body.Length > 5000)
            return BadRequest("Treść zbyt długa.");

        try
        {
            await mail.SendContactAsync(dto.From, dto.Subject, dto.Body);
            return Ok();
        }
        catch (Exception ex)
        {
            // Log the real error server-side; return a safe message to the client
            Console.Error.WriteLine($"[ContactController] SMTP error: {ex.Message}");
            return StatusCode(500, "Błąd wysyłania. Spróbuj ponownie.");
        }
    }
}
