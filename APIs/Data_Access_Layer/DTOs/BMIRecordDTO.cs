using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

using System.ComponentModel.DataAnnotations;


namespace Data_Access_Layer.DTOs
{
    public class BMIRecordDTO
    {
        public int BMIRecordId { get; set; }
        public int UserId { get; set; }
        public decimal? Height { get; set; }
        public decimal? Weight { get; set; }
        public int? Age { get; set; }
        public decimal BMI { get; set; }
        public string? Result { get; set; }
        public DateTime RecordedDate { get; set; }

    }
}
