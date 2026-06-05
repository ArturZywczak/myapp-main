using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace MainApp.Services;

// Sends contact-form emails via OVH SMTP.
// SMTP credentials are injected from environment variables at runtime
// (Mail__Password, Mail__To) - never stored in source control.
public class MailService(IConfiguration config)
{
    public async Task SendContactAsync(string from, string subject, string body)
    {
        var cfg = config.GetSection("Mail");

        var message = new MimeMessage();

        // Sender is always the portfolio mailbox so OVH accepts the message.
        // The visitor's address goes into Reply-To so replying works naturally.
        message.From.Add(new MailboxAddress("Portfolio", cfg["User"]));
        message.To.Add(MailboxAddress.Parse(cfg["To"]!));
        // Reply-To is set only if the visitor provided a valid email address.
        // If they typed a name or anything else, it's silently skipped -
        // the address is still visible in the message body.
        if (MailboxAddress.TryParse(from, out var replyTo))
            message.ReplyTo.Add(replyTo);

        message.Subject = subject;
        message.Body = new TextPart("plain") { Text = $"Od: {from}\n\n{body}" };

        using var smtp = new SmtpClient();

        // OVH requires SSL on port 465 (not STARTTLS on 587)
        await smtp.ConnectAsync(cfg["SmtpHost"], int.Parse(cfg["SmtpPort"]!), SecureSocketOptions.SslOnConnect);
        await smtp.AuthenticateAsync(cfg["User"], cfg["Password"]);
        await smtp.SendAsync(message);
        await smtp.DisconnectAsync(true);
    }
}
