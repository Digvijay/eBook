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
        [HttpPost]
        public IHttpActionResult Authorize(User user)
        {
            if((user = AuthService.Login(user.UserName, user.UserPassword)) != null)
            {
                return Ok(user);
            }
            return Unauthorized();
        }
    }
}
