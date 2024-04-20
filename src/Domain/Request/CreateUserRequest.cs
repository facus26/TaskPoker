namespace Domain.Request
{
    public class CreateUserRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Group { get; set; }
    }
}
