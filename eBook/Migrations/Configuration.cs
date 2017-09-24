namespace eBook.Migrations
{
    using Models;
    using Newtonsoft.Json;
    using Services;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.IO;
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
            var categoriesMockFilePath = System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/CATEGORIES_MOCK_DATA.json");
            List<Category> categories = new List<Category>(100);
            using (StreamReader r = new StreamReader(@"D:\ftn\studije\udd\projekat\eBook\eBook\App_Data\CATEGORIES_MOCK_DATA.json"))    // TODO: change to relative path
            {
                string json = r.ReadToEnd();
                categories = JsonConvert.DeserializeObject<List<Category>>(json);

                foreach (var category in categories)
                {
                    if (category.CategoryName.Count() > 25)
                    {
                        category.CategoryName = category.CategoryName.Substring(0, 25);
                    }
                }
            }
            context.Categories.AddOrUpdate(p => p.CategoryId, categories.ToArray());

            var usersMockFilePath = System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/USERS_MOCK_DATA.json");
            List<User> users = new List<User>(100);
            using (StreamReader r = new StreamReader(@"D:\ftn\studije\udd\projekat\eBook\eBook\App_Data\USERS_MOCK_DATA.json"))         // TODO: change to relative path
            {
                string json = r.ReadToEnd();
                users = JsonConvert.DeserializeObject<List<User>>(json);

                foreach (var user in users)
                {
                    user.Category = categories[(new Random().Next(0, categories.Count))];
                    user.Type = "subscriber";

                    if(user.UserPassword.Count() > 10)
                    {
                        user.UserPassword = user.UserPassword.Substring(0, 9);
                    }

                    if (user.UserName.Count() > 10)
                    {
                        user.UserName = user.UserName.Substring(0, 9);
                    }
                }
            }
            context.Users.AddOrUpdate(p => p.UserId, users.ToArray());

            var languagesMockFilePath = System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/LANGUAGES_MOCK_DATA.json");      // TODO: change to relative path
            List<Language> languages = new List<Language>(100);
            using (StreamReader r = new StreamReader(@"D:\ftn\studije\udd\projekat\eBook\eBook\App_Data\LANGUAGES_MOCK_DATA.json"))
            {
                string json = r.ReadToEnd();
                languages = JsonConvert.DeserializeObject<List<Language>>(json);
            }
            context.Languages.AddOrUpdate(p => p.LanguageId, languages.ToArray());

            var eBooksMockFilePath = System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/EBOOKS_MOCK_DATA.json");            // TODO: change to relative path
            List<EBook> eBooks = new List<EBook>(100);
            using (StreamReader r = new StreamReader(@"D:\ftn\studije\udd\projekat\eBook\eBook\App_Data\EBOOKS_MOCK_DATA.json"))
            {
                string json = r.ReadToEnd();
                eBooks = JsonConvert.DeserializeObject<List<EBook>>(json);

                foreach (var eBook in eBooks)
                {
                    eBook.Category = categories[new Random().Next(0, categories.Count)];
                    eBook.Language = languages[new Random().Next(0, languages.Count)];
                    eBook.User = users[new Random().Next(0, users.Count)];
                    eBook.FileName = eBook.FileName.Remove(eBook.FileName.LastIndexOf('.')) + ".pdf";
                    eBook.MIME = "application/pdf";

                    if(eBook.Title.Count() > 75)
                    {
                        eBook.Title = eBook.Title.Substring(0, 75);
                    }

                    if(eBook.Keywords.Count() > 110)
                    {
                        eBook.Keywords = eBook.Keywords.Substring(0, 110);
                    }
                }
            }
            context.EBooks.AddOrUpdate(p => p.EBookId, eBooks.ToArray());

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
