using eBook.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eBook.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var usersMockFilePath = System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/USERS_MOCK_DATA.json");
            using (StreamReader r = new StreamReader(usersMockFilePath))
            {
                string json = r.ReadToEnd();
                List<User> items = JsonConvert.DeserializeObject<List<User>>(json);
            }

            return View();
        }
    }
}
