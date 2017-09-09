using eBook.Models;
using System.Data.Entity;

namespace eBook.Database
{
    public class EBookDbContext : DbContext
    {
        public EBookDbContext() : base("eBookConnectionString")
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<EBook> EBooks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // set db model relationships

            base.OnModelCreating(modelBuilder);
        }
    }
}