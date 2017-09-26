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

        public static User Login(string username, string password)
        {
            var pwd = Base64Encode(password);
            var signedInUser = db.Users.SingleOrDefault(x => x.UserName == username && x.UserPassword == pwd);

            if (signedInUser != null)
            {
                signedInUser.UserPassword = password;
            }

            return signedInUser;
        }

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}