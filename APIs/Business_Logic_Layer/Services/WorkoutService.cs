using AutoMapper;
using Data_Access_Layer.DTOs;
using Data_Access_Layer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.Services
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IWorkoutRepository _workoutRepository;
        private readonly IMapper _mapper;

        public WorkoutService(IWorkoutRepository workoutRepository, IMapper mapper)
        {
            _workoutRepository = workoutRepository;
            _mapper = mapper;
        }

        public async Task AddWorkoutAsync(WorkoutDTO workoutDTO)
        {
            await _workoutRepository.AddWorkoutAsync(workoutDTO);
        }

        public async Task<IEnumerable<WorkoutDTO>> GetWorkoutsAsync(int userId)
        {
            return await _workoutRepository.GetWorkoutsAsync(userId);
        }

        public async Task<WorkoutDTO> GetWorkoutProgressAsync(int userId)
        {
            return await _workoutRepository.GetWorkoutProgressAsync(userId);
        }

        public async Task DeleteWorkoutAsync(int workoutId)
        {
            await _workoutRepository.DeleteWorkoutAsync(workoutId);
        }

        public async Task UpdateWorkoutAsync(int workoutId, WorkoutDTO updatedWorkoutDTO)
        {
            await _workoutRepository.UpdateWorkoutAsync(workoutId, updatedWorkoutDTO);
        }

        public async Task<WorkoutDTO> GetWorkoutProgressByDateAsync(int userId, DateTime date)
        {
            return await _workoutRepository.GetWorkoutProgressByDateAsync(userId, date);
        }

        public async Task<WorkoutDTO> GetWorkoutProgressByMonthAsync(int userId, int year, int month)
        {
            return await _workoutRepository.GetWorkoutProgressByMonthAsync(userId, year, month);
        }
    }
}
