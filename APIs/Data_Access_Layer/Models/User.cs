
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data_Access_Layer.Models
{
    public class User
    {
        [Key]
         public int UserId { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        [StringLength(20)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(20)]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        public string? Gender { get; set; } // No validation added for Gender

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [NotMapped] // Excluded from database schema
        [Compare("Password", ErrorMessage = "Passwords do not match")]

        public string ConfirmPassword { get; set; }

       

        // Navigation Properties
        public ICollection<BMIRecord> BMIRecords { get; set; }
        public ICollection<Workout> Workouts { get; set; }
        public ICollection<Goal> Goals { get; set; }
    }
}