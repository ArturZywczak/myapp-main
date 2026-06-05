using MainApp.Services;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

// MailService reads SMTP config from appsettings.json + environment variables.
// Secrets (Mail__Password, Mail__To) are provided via .env / docker env_file
// and are never committed to source control.
builder.Services.AddScoped<MailService>();

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

// Required for attribute-routed API controllers (e.g. ContactController)
app.MapControllers();

app.Run();
