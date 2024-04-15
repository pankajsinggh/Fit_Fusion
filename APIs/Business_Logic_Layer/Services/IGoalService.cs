using Data_Access_Layer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.Services
{
    public interface IGoalService
    {
        Task<int> CreateGoalAsync(GoalDTO goalDTO);
        Task<IEnumerable<GoalDTO>> GetUserGoalsAsync(int userId);
        Task DeleteGoalAsync( int goalId);

        Task<double> GetGoalCompletionAsync(int userId, int goalId);
        Task JoinGoalAsync(int userId, int goalId);

        Task UpdateProgressToGoalAsync(int userId, int goalId, double progress);

    }
}
