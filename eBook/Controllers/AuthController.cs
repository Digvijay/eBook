using eBook.Database;
using eBook.Models;
using eBook.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eBook.Controllers
{
    public class AuthController : ApiController
    {
        private EBookDbContext db = new EBookDbContext();

        [HttpPost]
        public IHttpActionResult Authorize(User user)
        {
            var username = user.UserName;
            var pwd = AuthService.GetEncodedHash(user.UserPassword, "123");

            if (db.Users.Where(x => x.UserName == username && x.UserPassword == pwd).Any())
            {
                return Ok();
            }
            return Unauthorized();
        }
    }
}
