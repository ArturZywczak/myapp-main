using System.Diagnostics;
using MainApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace MainApp.Controllers
{
    public class HomeController : Controller
    {
        // Serves the XP desktop as the root page
        public IActionResult Index()
        {
            return View("Privacy");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
