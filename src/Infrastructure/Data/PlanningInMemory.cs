using TaskPoker.Domain.Models;

namespace TaskPoker.Infrastructure.Data
{
    public static class PlanningInMemory
    {
        private static List<PlanningGame> GAMES = new List<PlanningGame>();

        public static PlanningGame CreateGame(Player player, string? groupId = null)
        {
            var game = new PlanningGame(player, groupId);
            GAMES.Add(game);
            return game;
        }

        public static PlanningGame? GetGameOrDefault(string groupId) =>
            GAMES.FirstOrDefault(g => g.Id == groupId);

        public static bool TryGetGame(string groupId, out PlanningGame? game)
        {
            game = GetGameOrDefault(groupId);
            return game != null;
        }

        public static PlanningGame GetOrCreateGame(LoggedUser user) =>
            GetGameOrDefault(user.GroupId) ?? CreateGame(new Player(user.Id, user.Name), user.GroupId);

        public static PlanningGame GetOrCreateGame(string userId, string userName, string? groupId = null)
        {
            if (!string.IsNullOrEmpty(groupId) && TryGetGame(groupId, out var game))
                return game!;

            var player = new Player(userId, userName);
            return CreateGame(player, groupId);
        }

        public static void AddPlayer(string groupId, Player player)
        {
            var game = GAMES.FirstOrDefault(g => g.Id == groupId);

            if (game is null) return;

            if (game.Players.Any(p => p.Id == player.Id)) return;

            game.Players.Add(player);
        }

        public static void RemovePlayer(string groupId, string playerId)
        {
            var game = GAMES.FirstOrDefault(g => g.Id == groupId);

            if (game is null) return;

            game.Players = game.Players.Where(p => p.Id != playerId).ToList();
            game.Votes = game.Votes.Where(p => p.PlayerId != playerId).ToList();

            if (!game.Players.Any())
                GAMES.Remove(game);
        }

        public static void AddVote(string groupId, Vote vote)
        {
            var game = GAMES.FirstOrDefault(g => g.Id == groupId);

            if (game is null) return;

            game.Votes = game.Votes.Where(p => p.PlayerId != vote.PlayerId).ToList();
            game.Votes.Add(vote);
        }

        public static void Restart(string groupId)
        {
            var game = GAMES.FirstOrDefault(g => g.Id == groupId);

            if (game is null) return;

            game.Revealed = false;
            game.Votes = new List<Vote>();
        }

        public static void RevealVotes(string groupId)
        {
            var game = GAMES.FirstOrDefault(g => g.Id == groupId);

            if (game is null) return;

            game.Revealed = true;
        }
    }

    public class PlanningGame
    {
        public string Id { get; } = string.Empty;
        public List<Player> Players { get; set; } = new List<Player>();
        public List<Vote> Votes { get; set; } = new List<Vote>();
        public bool Revealed { get; set; } = false;

        public PlanningGame(Player player, string? groupId = null) 
        { 
            Id = groupId ?? Guid.NewGuid().ToString();
            Players.Add(player);
        }
    }
}
