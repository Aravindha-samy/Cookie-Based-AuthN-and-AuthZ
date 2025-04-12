using Authn_Authz.WebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace Authn_Authz.WebApp.Context
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options) { }
        public DbSet<User> Users { get; set; }

    }
}
