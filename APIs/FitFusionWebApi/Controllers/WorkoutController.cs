using Business_Logic_Layer.Services;
using Data_Access_Layer.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FitFusionWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutController : ControllerBase
    {
        private readonly IWorkoutService _workoutService;

        public WorkoutController(IWorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpPost]
        public async Task<IActionResult> AddWorkout(WorkoutDTO workoutDTO)
        {
            try
            {
                await _workoutService.AddWorkoutAsync(workoutDTO);
                return Ok(new { Message = "Workout Added Successfully",workoutDTO });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetWorkouts(int userId)
        {
            try
            {
                var workouts = await _workoutService.GetWorkoutsAsync(userId);
                return Ok(workouts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("progress/{userId}")]
        public async Task<IActionResult> GetWorkoutProgress(int userId)
        {
            try
            {
                var progress = await _workoutService.GetWorkoutProgressAsync(userId);
                return Ok(progress);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{workoutId}")]
        public async Task<IActionResult> DeleteWorkoutAsync(int workoutId)
        {
            await _workoutService.DeleteWorkoutAsync(workoutId);
            return Ok();
        }

        [HttpPut("{workoutId}")]
        public async Task<IActionResult> UpdateWorkoutAsync(int workoutId, WorkoutDTO updatedWorkoutDTO)
        {
            await _workoutService.UpdateWorkoutAsync(workoutId, updatedWorkoutDTO);
            return Ok();
        }

        [HttpGet("progress/date/{userId}/{date}")]
        public async Task<WorkoutDTO> GetWorkoutProgressByDateAsync(int userId, DateTime date)
        {
            return await _workoutService.GetWorkoutProgressByDateAsync(userId, date);
        }

        [HttpGet("progress/month/{userId}/{year}/{month}")]
        public async Task<WorkoutDTO> GetWorkoutProgressByMonthAsync(int userId, int year, int month)
        {
            return await _workoutService.GetWorkoutProgressByMonthAsync(userId, year, month);
        }
    }
}
