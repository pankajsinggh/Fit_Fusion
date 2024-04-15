
using Data_Access_Layer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.Repositories
{
    public interface IGoalRepository
    {
        Task<int> CreateGoalAsync(GoalDTO goalDTO);
        Task<IEnumerable<GoalDTO>> GetUserGoalsAsync(int userId);
        Task DeleteGoalAsync( int goalId);
       
        Task<double> GetGoalCompletionAsync(int userId, int goalId);
        Task JoinGoalAsync(int userId, int goalId);

        Task UpdateProgressToGoalAsync( int userId, int goalId, double progress);
    }
}