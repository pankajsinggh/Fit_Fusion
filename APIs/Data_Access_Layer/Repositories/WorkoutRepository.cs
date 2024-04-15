using AutoMapper;
using Data_Access_Layer.Data_Model;
using Data_Access_Layer.DTOs;
using Data_Access_Layer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.Repositories
{
    public class WorkoutRepository : IWorkoutRepository
    {
        private readonly FitfusionDbContext _context;
        private readonly IMapper _mapper;

        public WorkoutRepository(FitfusionDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddWorkoutAsync(WorkoutDTO workoutDTO)
        {
            var workoutEntity = _mapper.Map<Workout>(workoutDTO);
            workoutEntity.CaloriesBurned = workoutDTO.CaloriesBurned; // Ensure to set the calories burned value
            _context.Workouts.Add(workoutEntity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<WorkoutDTO>> GetWorkoutsAsync(int userId)
        {
            var workouts = await _context.Workouts
                .Where(w => w.UserId == userId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<WorkoutDTO>>(workouts);
        }

        public async Task<WorkoutDTO> GetWorkoutProgressAsync(int userId)
        {
            var workouts = await _context.Workouts
                .Where(w => w.UserId == userId)
                .ToListAsync();

            decimal totalDuration = workouts.Sum(w => (decimal)w.Duration.TotalHours);
            decimal totalCaloriesBurned = workouts.Sum(w => w.CaloriesBurned);
            decimal totalWeightLifted = workouts.Sum(w => (decimal)w.WeightLifted);

            return new WorkoutDTO
            {
                Duration = TimeSpan.FromHours((double)totalDuration),
                CaloriesBurned = totalCaloriesBurned,
                WeightLifted = totalWeightLifted
            };
        }

        public async Task DeleteWorkoutAsync(int workoutId)
        {
            var workout = await _context.Workouts.FindAsync(workoutId);
            if (workout != null)
            {
                _context.Workouts.Remove(workout);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateWorkoutAsync(int workoutId, WorkoutDTO updatedWorkoutDTO)
        {
            var workoutEntity = await _context.Workouts.FindAsync(workoutId);
            if (workoutEntity != null)
            {
                _mapper.Map(updatedWorkoutDTO, workoutEntity); // Update existing workout entity with values from updatedWorkoutDTO
                await _context.SaveChangesAsync();
            }
        }

        public async Task<WorkoutDTO> GetWorkoutProgressByDateAsync(int userId, DateTime date)
        {
            var workouts = await _context.Workouts
                .Where(w => w.UserId == userId && w.Date.Date == date.Date)
                .ToListAsync();

            decimal totalDuration = workouts.Sum(w => (decimal)w.Duration.TotalHours);
            decimal totalCaloriesBurned = workouts.Sum(w => w.CaloriesBurned);
            decimal totalWeightLifted = workouts.Sum(w => (decimal)w.WeightLifted);

            return new WorkoutDTO
            {
                Duration = TimeSpan.FromHours((double)totalDuration),
                CaloriesBurned = totalCaloriesBurned,
                WeightLifted = totalWeightLifted
            };
        }

        public async Task<WorkoutDTO> GetWorkoutProgressByMonthAsync(int userId, int year, int month)
        {
            var workouts = await _context.Workouts
                .Where(w => w.UserId == userId && w.Date.Year == year && w.Date.Month == month)
                .ToListAsync();

            decimal totalDuration = workouts.Sum(w => (decimal)w.Duration.TotalHours);
            decimal totalCaloriesBurned = workouts.Sum(w => w.CaloriesBurned);
            decimal totalWeightLifted = workouts.Sum(w => (decimal)w.WeightLifted);

            return new WorkoutDTO
            {
                Duration = TimeSpan.FromHours((double)totalDuration),
                CaloriesBurned = totalCaloriesBurned,
                WeightLifted = totalWeightLifted
            };
        }


    }
}
