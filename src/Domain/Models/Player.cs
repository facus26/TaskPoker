namespace TaskPoker.Domain.Models
{
    public class Player
    {
        public string Id { get; } = string.Empty;
        public string Name { get; } = string.Empty;

        public Player(string id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
