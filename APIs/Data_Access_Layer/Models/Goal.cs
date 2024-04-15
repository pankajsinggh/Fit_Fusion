using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data_Access_Layer.Models
{
    public class Goal
    {
        [Key]
         
        public int GoalId { get;set; }

        [Required(ErrorMessage = "User ID is required.")]
        public  int UserId { get; set; }

        [RegularExpression("^(swimming|running|sprint)$", ErrorMessage = "Result must be 'swimming', 'running', or 'sprint'.")]
        public string? GoalType { get; set; }

        [Required(ErrorMessage = "Target metric is required.")]
        [Column(TypeName = "decimal(18,2)")]
        [Range(0, 999.99, ErrorMessage = "Target metric must be between 0 and 999.99.")]
        public  double TargetMetric { get; set; }

        [Required(ErrorMessage = "Deadline is required.")]
        public  DateTime Deadline { get; set; }

        [Required(ErrorMessage = "Created date is required.")]
        public DateTime CreatedDate { get; set; }
        public  double Progress { get; set; }

        // Navigation Property
        public User User { get; set; }
    }
}
