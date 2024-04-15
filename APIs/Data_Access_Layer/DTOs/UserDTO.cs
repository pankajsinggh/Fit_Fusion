namespace Data_Access_Layer.Models
{
    public class UserDTO
    {
        public int UserId { get; set; }

        //   public required string Username { get; set; }
        public string? FirstName { get; set; }
        public string ?LastName { get; set; }
        public string Email { get; set; }
        public string? Gender { get; set; }
        public string Password { get; set; }
        public string ?ConfirmPassword { get; set; }
    }
}