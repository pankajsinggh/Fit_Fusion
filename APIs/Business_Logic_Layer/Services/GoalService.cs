using AutoMapper;
using Business_Logic_Layer.Services;
using Data_Access_Layer.DTOs;
using Data_Access_Layer.Models;
using Data_Access_Layer.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services
{
    public class GoalService : IGoalService
    {
        private readonly IGoalRepository _goalRepository;

        public GoalService(IGoalRepository goalRepository)
        {
            _goalRepository = goalRepository;
        }

        public async Task<int> CreateGoalAsync(GoalDTO goalDTO)
        {
            
            return await _goalRepository.CreateGoalAsync(goalDTO);
        }

        public async Task<IEnumerable<GoalDTO>> GetUserGoalsAsync(int userId)
        {
           
            return await _goalRepository.GetUserGoalsAsync(userId);

        }

        public async Task DeleteGoalAsync( int goalId)
        {
            await _goalRepository.DeleteGoalAsync( goalId);
        }

        public async Task<double> GetGoalCompletionAsync(int userId, int goalId)
        {
            return await _goalRepository.GetGoalCompletionAsync(userId, goalId);
        }

        public async Task JoinGoalAsync(int userId, int goalId)
        {
            await _goalRepository.JoinGoalAsync(userId, goalId);
        }

        public async Task UpdateProgressToGoalAsync(int userId, int goalId, double progress)

        {
            await _goalRepository.UpdateProgressToGoalAsync( userId, goalId, progress);
        }
    }
}
