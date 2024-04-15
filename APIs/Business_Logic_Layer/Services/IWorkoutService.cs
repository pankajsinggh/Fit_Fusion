using Data_Access_Layer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.Services
{
    public interface IWorkoutService
    {
        Task AddWorkoutAsync(WorkoutDTO workoutDTO);
        Task<IEnumerable<WorkoutDTO>> GetWorkoutsAsync(int userId);
        Task<WorkoutDTO> GetWorkoutProgressAsync(int userId);
        Task DeleteWorkoutAsync(int workoutId);
        Task UpdateWorkoutAsync(int workoutId, WorkoutDTO updatedWorkoutDTO);
        Task<WorkoutDTO> GetWorkoutProgressByDateAsync(int userId, DateTime date);
        Task<WorkoutDTO> GetWorkoutProgressByMonthAsync(int userId, int year, int month);
    }
}
