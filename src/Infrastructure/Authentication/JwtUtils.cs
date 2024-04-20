using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskPoker.Domain.Models;

namespace TaskPoker.Infrastructure.Authentication
{
    public static class JwtUtils
    {
        public const string CLAIM_GROUP = "PlanningGroup";
        public const string JWT_KEY = "e210d1ac78e64c1a8a56c427aada1b63";

        public static SymmetricSecurityKey GetKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWT_KEY));

        public static SigningCredentials GetCredentials()
        {
            var signingKey = GetKey();
            return new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature);
        }

        public static string GetToken(string userId, string userName, string groupId)
        {
            var tokenHanlder = new JwtSecurityTokenHandler();
            var tokenDes = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                [
                    new Claim(ClaimTypes.NameIdentifier, userId),
                    new Claim(ClaimTypes.Name, userName),
                    new Claim(CLAIM_GROUP, groupId)
                ]),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = JwtUtils.GetCredentials()
            };

            var token = tokenHanlder.CreateToken(tokenDes);
            return tokenHanlder.WriteToken(token);
        }

        public static LoggedUser GetUser(ClaimsPrincipal principal) =>
            new LoggedUser(
                principal.FindFirstValue(ClaimTypes.Name) ?? string.Empty,
                principal.FindFirstValue("PlanningGroup") ?? string.Empty,
                principal.FindFirstValue(ClaimTypes.NameIdentifier)
            );
    }
}
