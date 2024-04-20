using System.ComponentModel.DataAnnotations;

namespace Domain.Request
{
    public class UpdateUserRequest
    {
        [Required]
        public string Id { get; set; } = string.Empty;
        public string? DisplayName { get; set; } = string.Empty;
        public string? UserName { get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;
    }
}
