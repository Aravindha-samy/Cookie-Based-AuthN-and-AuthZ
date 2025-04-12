
namespace Authn_Authz.WebApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; } 
        public string Salt { get; set; }

    }
}
