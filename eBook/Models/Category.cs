using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eBook.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        ICollection<User> Users { get; set; }
        ICollection<EBook> EBooks { get; set; }

        public Category()
        {

        }
    }
}