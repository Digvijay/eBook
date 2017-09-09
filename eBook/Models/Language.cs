using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace eBook.Models
{
    public class Language
    {
        [Key]
        public int LanguageId { get; set; }

        [Required]
        [StringLength(30)]
        public string LanguageName { get; set; }

        [JsonIgnore]
        public virtual ICollection<EBook> EBooks { get; set; }

        public Language()
        {
            EBooks = new List<EBook>();
        }
    }
}