using MainApp.Services;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

// MailService reads SMTP config from appsettings.json + environment variables.
// Secrets (Mail__Password, Mail__To) are provided via .env / docker env_file
// and are never committed to source control.
builder.Services.AddScoped<MailService>();

// ShutdownService manages the countdown state file shared with the host cron script.
// Singleton — one instance for the lifetime of the app.
builder.Services.AddSingleton<ShutdownService>();

// Rate limit the contact endpoint: max 3 submissions per IP per hour.
// Excess requests are rejected immediately (QueueLimit = 0).
builder.Services.AddRateLimiter(o => o
    .AddFixedWindowLimiter("contact", opt =>
    {
        opt.PermitLimit = 3;
        opt.Window = TimeSpan.FromHours(1);
        opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        opt.QueueLimit = 0;
    }));

var app = builder.Build();

// Initialize shutdown countdown on startup.
// If the file is missing or expired, sets shutdown_at = now + 15 min.
// This prevents the server from shutting down immediately after a restart.
app.Services.GetRequiredService<ShutdownService>().Initialize();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();
app.UseRouting();
app.UseRateLimiter();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Required for attribute-routed API controllers (e.g. ContactController, ShutdownController)
app.MapControllers();

app.Run();
