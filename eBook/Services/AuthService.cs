using eBook.Database;
using eBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace eBook.Services
{
    public class AuthService
    {
        private static EBookDbContext db = new EBookDbContext();
        public static string SALT = "123";

        public static User Login(string username, string password)
        {
            var pwd = GetEncodedHash(password, SALT);
            var signedInUser = db.Users.Where(x => x.UserName == username && x.UserPassword == pwd).First();
            signedInUser.UserPassword = password;

            return signedInUser;
        }

        public static string GetEncodedHash(string password, string salt)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] digest = md5.ComputeHash(Encoding.UTF8.GetBytes(password + salt));
            string base64digest = Convert.ToBase64String(digest, 0, digest.Length);
            return base64digest.Substring(0, 10);
        }
    }
}