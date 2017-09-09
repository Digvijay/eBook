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

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int LanguageId { get; set; }
        public Language Language { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public EBook()
        {

        }
    }
}