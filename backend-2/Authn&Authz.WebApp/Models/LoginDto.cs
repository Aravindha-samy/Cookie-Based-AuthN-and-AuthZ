using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authentication.BearerToken;

namespace Authn_Authz.WebApp.Models
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
