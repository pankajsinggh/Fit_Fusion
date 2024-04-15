namespace Data_Access_Layer.DTOs
{
    public class GoalDTO
    {
        public double Progress { get; set; }
        public int GoalId { get; set; }
        public int UserId { get; set; }
        public string? GoalType { get; set; }
        public double TargetMetric { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime CreatedDate { get; set; }





    }
}
