using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data_Access_Layer.Models
{
    public class Workout
    {
        [Key]
        public int WorkoutId { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        public required int UserId { get; set; }

        [Required(ErrorMessage = "Date is required.")]
        public required DateTime Date { get; set; }

        [Required(ErrorMessage = "Duration is required.")]
        public required TimeSpan Duration { get; set; }

        [StringLength(50, ErrorMessage = "Intensity must be less than 50 characters.")]
        public string? Intensity { get; set; }

        [Required(ErrorMessage = "Calories burned is required.")]
        [Range(0, 9999999.99, ErrorMessage = "Calories burned must be between 0 and 9999999.99.")]
        [Column(TypeName = "decimal(18,2)")]
        public required decimal CaloriesBurned { get; set; }

        [Range(0, 9999999.99, ErrorMessage = "Weight lifted must be between 0 and 9999999.99.")]

        [Column(TypeName = "decimal(18,2)")]
        public required decimal? WeightLifted { get; set; }
     

        // Navigation Property
        public User User { get; set; }
    }
}
