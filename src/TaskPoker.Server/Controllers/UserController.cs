using Domain.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskPoker.Domain.Models;
using TaskPoker.Infrastructure.Authentication;
using TaskPoker.Infrastructure.Data;

namespace TaskPoker.Server.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpPost("signIn")]
        public ActionResult<string> Login([FromBody] CreateUserRequest request)
        {
            var userId = Guid.NewGuid().ToString();
            var game = PlanningInMemory.GetOrCreateGame(userId, request.Name, request.Group);
            return JwtUtils.GetToken(userId, request.Name, game.Id);
        }

        [Authorize]
        [HttpGet("me")]
        public ActionResult<LoggedUser> Me()
        {
            var user = GetUserContext();

            if (user == null)
                return NotFound();

            return user;
        }

        private LoggedUser? GetUserContext()
        {
            if (HttpContext.User.Identity is null)
                return null;

            return JwtUtils.GetUser(HttpContext.User);
        }
    }
}