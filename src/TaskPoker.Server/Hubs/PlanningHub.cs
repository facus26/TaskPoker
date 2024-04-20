using Microsoft.AspNetCore.SignalR;
using TaskPoker.Domain.Models;
using TaskPoker.Infrastructure.Authentication;
using TaskPoker.Infrastructure.Data;

namespace TaskPoker.Server.Hubs
{
    public class PlanningHub : Hub<IPlanningClient>
    {
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();

            if (Context.User?.Identity is null) return;

            var user = JwtUtils.GetUser(Context.User);
            var player = new Player(user.Id, user.Name);
            var group = PlanningInMemory.GetOrCreateGame(user);

            PlanningInMemory.AddPlayer(group.Id, player);

            await Clients.Caller.JoinGroup(group);
            await Groups.AddToGroupAsync(Context.ConnectionId, user.GroupId);
            await Clients.OthersInGroup(user.GroupId).JoinPlayer(player);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
            await LeaveGroup();
        }

        public async Task Vote(Vote vote)
        {
            if (Context.User?.Identity is null) return;

            var user = JwtUtils.GetUser(Context.User);
            await Clients.OthersInGroup(user.GroupId).Vote(vote);

            PlanningInMemory.AddVote(user.GroupId, vote);
        }

        public async Task StartVote()
        {
            if (Context.User?.Identity is null) return;

            var user = JwtUtils.GetUser(Context.User);
            PlanningInMemory.Restart(user.GroupId);

            await Clients.Group(user.GroupId).StartVote();
        }

        public async Task LeaveGroup()
        {
            if (Context.User?.Identity is null) return;

            var user = JwtUtils.GetUser(Context.User);
            await Groups.RemoveFromGroupAsync(user.Id, user.GroupId);
            await Clients.OthersInGroup(user.GroupId).LeavePlayer(user.Id);

            PlanningInMemory.RemovePlayer(user.GroupId, user.Id);
        }

        public async Task RevealVotes()
        {
            if (Context.User?.Identity is null) return;

            var user = JwtUtils.GetUser(Context.User);
            PlanningInMemory.RevealVotes(user.GroupId);

            await Clients.Group(user.GroupId).RevealVotes();
        }
    }

    public interface IPlanningClient
    {
        Task JoinGroup(PlanningGame game);
        Task JoinPlayer(Player player);
        Task LeavePlayer(string playerId);
        Task Vote(Vote vote);
        Task StartVote();
        Task RevealVotes();
    }
}
