using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.DTOs
{
    public class WorkoutDTO
    {

        public int WorkoutId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Duration { get; set; }
        public string? Intensity { get; set; }
        public decimal CaloriesBurned { get; set; }
        public decimal? WeightLifted { get; set; }
    }
}
