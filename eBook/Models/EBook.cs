using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace eBook.Models
{
    public class EBook
    {
        [Key]
        public int EBookId { get; set; }

        [Required]
        [StringLength(80)]
        public string Title { get; set; }

        [Required]
        [StringLength(120)]
        public string Author { get; set; }

        [Required]
        [StringLength(120)]
        public string Keywords { get; set; }

        [Required]
        public int PublicationYear { get; set; }

        [Required]
        [StringLength(200)]
        public string FileName { get; set; }

        [Required]
        [StringLength(100)]
        public string MIME { get; set; }

        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }

        public int LanguageId { get; set; }
        public virtual Language Language { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public EBook()
        {

        }
    }
}