﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eBook.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string Type { get; set; }

        public int? UserId { get; set; }
        public Category Category { get; set; }
        ICollection<EBook> EBooks { get; set; }

        public User()
        {

        }
    }
}