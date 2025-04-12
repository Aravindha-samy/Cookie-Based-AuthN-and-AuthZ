using Authn_Authz.WebApp.Context;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Authn_Authz.WebApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Authn_Authz.WebApp.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Register a new user
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            // Check if the user already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists.");
            }

            // Hash the password (you can use a better method for password hashing, like bcrypt)
            var salt = Guid.NewGuid().ToString(); // Example salt
            var passwordHash = HashPassword(registerDto.Password, salt);

            var user = new User
            {
                Email = registerDto.Email,
                PasswordHash = passwordHash,
                Salt = salt
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Generate token

            return Ok("User Created Successfully");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            var hasedPassword = HashPassword(loginDto.Password, user.Salt);
            if (user == null || hasedPassword != user.PasswordHash) 
            {
                return Unauthorized("Invalid credentials.");
            }

            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Email)
        };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            return Ok("User logged in successfully.");
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok("User logged out successfully.");
        }

        private string HashPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var combined = password + salt;
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(combined));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }

}
