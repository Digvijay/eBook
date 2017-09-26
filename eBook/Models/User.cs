using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace eBook.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(30)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(30)]
        public string LastName { get; set; }

        [Required]
        [Index("UserNameIndex", IsUnique = true)]
        [StringLength(10)]
        public string UserName { get; set; }

        [Required]
        [StringLength(20)]
        public string UserPassword { get; set; }

        [Required]
        [StringLength(30)]
        public string Type { get; set; }

        public int? CategoryId { get; set; }
        public virtual Category Category { get; set; }

        [JsonIgnore]
        public virtual ICollection<EBook> EBooks { get; set; }

        public User()
        {
            EBooks = new List<EBook>();
        }
    }
}