namespace eBook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class extendedpasswordlength : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Users", "UserPassword", c => c.String(nullable: false, maxLength: 20));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Users", "UserPassword", c => c.String(nullable: false, maxLength: 10));
        }
    }
}
