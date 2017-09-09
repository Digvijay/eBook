using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eBook.Models
{
    public class EBook
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Keywords { get; set; }
        public int PublicationYear { get; set; }
        public string FileName { get; set; }
        public string MIME { get; set; }
    }
}