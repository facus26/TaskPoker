namespace TaskPoker.Domain.Models
{
    public class Vote
    {
        public string PlayerId { get; set; } = string.Empty;
        public int Value { get; set; }
    }
}
