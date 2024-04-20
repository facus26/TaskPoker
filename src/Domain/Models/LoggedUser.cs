namespace TaskPoker.Domain.Models
{
    public class LoggedUser
    {
        public string Id { get; } = string.Empty;
        public string Name { get; } = string.Empty;
        public string GroupId { get; } = string.Empty;

        public LoggedUser(string name, string groupId, string? userId = null)
        {
            Id = userId ?? Guid.NewGuid().ToString();
            Name = name;
            GroupId = groupId;
        }
    }
}
