namespace eBook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        CategoryId = c.Int(nullable: false, identity: true),
                        CategoryName = c.String(nullable: false, maxLength: 30),
                    })
                .PrimaryKey(t => t.CategoryId);
            
            CreateTable(
                "dbo.EBooks",
                c => new
                    {
                        EBookId = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 80),
                        Author = c.String(nullable: false, maxLength: 120),
                        Keywords = c.String(nullable: false, maxLength: 120),
                        PublicationYear = c.Int(nullable: false),
                        FileName = c.String(nullable: false, maxLength: 200),
                        MIME = c.String(nullable: false, maxLength: 100),
                        CategoryId = c.Int(nullable: false),
                        LanguageId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EBookId)
                .ForeignKey("dbo.Categories", t => t.CategoryId, cascadeDelete: true)
                .ForeignKey("dbo.Languages", t => t.LanguageId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.CategoryId)
                .Index(t => t.LanguageId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Languages",
                c => new
                    {
                        LanguageId = c.Int(nullable: false, identity: true),
                        LanguageName = c.String(nullable: false, maxLength: 30),
                    })
                .PrimaryKey(t => t.LanguageId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false, maxLength: 30),
                        LastName = c.String(nullable: false, maxLength: 30),
                        UserName = c.String(nullable: false, maxLength: 10),
                        UserPassword = c.String(nullable: false, maxLength: 10),
                        Type = c.String(nullable: false, maxLength: 30),
                        CategoryId = c.Int(),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.Categories", t => t.CategoryId)
                .Index(t => t.CategoryId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EBooks", "UserId", "dbo.Users");
            DropForeignKey("dbo.Users", "CategoryId", "dbo.Categories");
            DropForeignKey("dbo.EBooks", "LanguageId", "dbo.Languages");
            DropForeignKey("dbo.EBooks", "CategoryId", "dbo.Categories");
            DropIndex("dbo.Users", new[] { "CategoryId" });
            DropIndex("dbo.EBooks", new[] { "UserId" });
            DropIndex("dbo.EBooks", new[] { "LanguageId" });
            DropIndex("dbo.EBooks", new[] { "CategoryId" });
            DropTable("dbo.Users");
            DropTable("dbo.Languages");
            DropTable("dbo.EBooks");
            DropTable("dbo.Categories");
        }
    }
}
