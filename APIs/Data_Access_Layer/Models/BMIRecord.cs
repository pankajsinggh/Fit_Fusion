using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data_Access_Layer.Models
{
    public class BMIRecord
    {
        [Key]
        public int BMIRecordId { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        public required int UserId { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        [Range(0, 999.99, ErrorMessage = "Height must be between 0 and 999.99.")]
        public decimal? Height { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        [Range(0, 999.99, ErrorMessage = "Weight must be between 0 and 999.99.")]
        public decimal? Weight { get; set; }

        [Range(0, 150, ErrorMessage = "Age must be between 0 and 150.")]
        public int? Age { get; set; }

        [Required(ErrorMessage = "BMI is required.")]
        [Column(TypeName = "decimal(18,2)")]
        public required decimal BMI { get; set; }

        [RegularExpression("^(underweight|normal weight|overweight)$", ErrorMessage = "Result must be 'underweight', 'normal weight', or 'overweight'.")]
        public string? Result { get; set; }

        [Required(ErrorMessage = "RecordedDate is required.")]

        public required DateTime RecordedDate { get; set; }

      
        // Navigation Property
        public User User { get; set; }
    }
}
