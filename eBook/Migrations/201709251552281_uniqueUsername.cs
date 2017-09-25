namespace eBook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class uniqueUsername : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Users", "UserName", unique: true, name: "UserNameIndex");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Users", "UserNameIndex");
        }
    }
}
