using AutoMapper;
using Data_Access_Layer.Data_Model;
using Data_Access_Layer.DTOs;
using Data_Access_Layer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data_Access_Layer.Repositories
{
    public class GoalRepository : IGoalRepository
    {
        private readonly FitfusionDbContext _context;

        private readonly IMapper _mapper;

        public GoalRepository(FitfusionDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateGoalAsync(GoalDTO goalDTO)
        {
            var goalEntity = _mapper.Map<Goal>(goalDTO);
            _context.Goals.Add(goalEntity);
            await _context.SaveChangesAsync();
            return goalEntity.GoalId;
        }

        public async Task<IEnumerable<GoalDTO>> GetUserGoalsAsync(int userId)
        {
            var goals = await _context.Goals
                .Where(g => g.UserId == userId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<GoalDTO>>(goals);

        }

        public async Task DeleteGoalAsync(int goalId)
        {
            var goal = await _context.Goals.FindAsync(goalId);
            if (goal != null)
            {
                _context.Goals.Remove(goal);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<double> GetGoalCompletionAsync(int userId, int goalId)
        {
            var goal = await _context.Goals
                .Where(g => g.UserId == userId && g.GoalId == goalId)
                .SingleOrDefaultAsync();

            if (goal == null)
            {
                throw new Exception("Goal not found");
            }

            double completionPercentage = ((double)goal.Progress / goal.TargetMetric) * 100;
            return Math.Min(completionPercentage, 100);
        }

        public async Task JoinGoalAsync(int userId, int goalId)
        {
            var goal = await _context.Goals.FirstOrDefaultAsync(g => g.GoalId == goalId);
            if (goal == null)
                throw new ArgumentException("Goal not found.");
            if (goal.Deadline != default(DateTime) && goal.Deadline != DateTime.MaxValue) // Check if deadline is set and not infinite
            {
                if (DateTime.Today > goal.Deadline)
                {
                    throw new Exception("Goal deadline has passed and cannot be extended.");
                }
            }

            goal.UserId = userId;
            await _context.SaveChangesAsync();
        }


        public async Task UpdateProgressToGoalAsync(int userId, int goalId, double progress)

        {
            var goal = await _context.Goals.FirstOrDefaultAsync(g => g.GoalId == goalId && g.UserId == userId);
            if (goal == null)
            {
                throw new Exception("Goal not found for the specified user.");
    }
            if (goal.Deadline != default(DateTime) && DateTime.Today>goal.Deadline)
        {
                throw new Exception("Progress can only be added within the interval of created and deadline date.");

        }
            if (goal.Progress+progress > goal.TargetMetric) {

                throw new Exception("Progress cannot exceed the target metric");
            }
            goal.Progress += progress;

            await _context.SaveChangesAsync();
        }


    }
}
