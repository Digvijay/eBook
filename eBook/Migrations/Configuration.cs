namespace eBook.Migrations
{
    using Models;
    using Services;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.Linq;
    using System.Text;
    internal sealed class Configuration : DbMigrationsConfiguration<eBook.Database.EBookDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(eBook.Database.EBookDbContext context)
        {
            var cat1 = new Category() { CategoryId = 1, CategoryName = "Cat1" };
            var cat2 = new Category() { CategoryId = 2, CategoryName = "Cat2" };

            context.Categories.AddOrUpdate(
                p => p.CategoryId,
                cat1,
                cat2    
            );

            var lang1 = new Language() { LanguageId = 1, LanguageName = "Eng" };
            var lang2 = new Language() { LanguageId = 2, LanguageName = "Fra" };
            var lang3 = new Language() { LanguageId = 1, LanguageName = "Srb" };

            context.Languages.AddOrUpdate(
                p => p.LanguageId,
                lang1,
                lang2,
                lang3
            );

            var user1 = new User() { UserId = 1, FirstName = "Aleksandar", LastName = "Bosnjak", Type = "admin", UserName = "abos", UserPassword = AuthService.GetEncodedHash("abos", "123") };
            var user2 = new User() { UserId = 2, FirstName = "Elvis", LastName = "Presley", Type = "moderator", UserName = "elvis", UserPassword = AuthService.GetEncodedHash("elvis", "123") };

            context.Users.AddOrUpdate(
                p => p.UserId,
                user1,
                user2    
            );

            context.EBooks.AddOrUpdate(
                p => p.EBookId,
                new EBook() {   EBookId = 1,
                                FileName = "harry potter and prisoner of askhaban.pdf",
                                Author = "Jane",
                                Language = lang1,
                                Category = cat1,
                                Keywords = "harry, magic, wizardy, hogwarts",
                                Title = "Harry Potter and Prisioner of Askhaban",
                                MIME = "MIME1",
                                PublicationYear = 2003,
                                User = user1
                }    
            );

            SaveChanges(context);
        }

        /// <summary>
        /// Wrapper for SaveChanges adding the Validation Messages to the generated exception
        /// </summary>
        /// <param name="context">The context.</param>
        private void SaveChanges(DbContext context)
        {
            try
            {
                context.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                StringBuilder sb = new StringBuilder();

                foreach (var failure in ex.EntityValidationErrors)
                {
                    sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                    foreach (var error in failure.ValidationErrors)
                    {
                        sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine();
                    }
                }

                throw new DbEntityValidationException(
                    "Entity Validation Failed - errors follow:\n" +
                    sb.ToString(), ex.InnerException
                ); // Add the original exception as the innerException
            }
        }
    }
}
