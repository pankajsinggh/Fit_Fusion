using Business_Logic_Layer.Services;
using BusinessLogicLayer.Services;
using Data_Access_Layer.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FitFusionWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        private readonly IGoalService _goalService;

        public GoalController(IGoalService goalService)
        {
            _goalService = goalService;
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateGoal([FromBody] GoalDTO goalDTO)
        {
            try
            {
                var goalId = await _goalService.CreateGoalAsync(goalDTO);
                return Ok(goalId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<GoalDTO>>> GetUserGoals(int userId)
        {
            try
            {
                var userGoals = await _goalService.GetUserGoalsAsync(userId);
                return Ok(userGoals);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{goalId}")]
        public async Task<ActionResult> DeleteGoal( int goalId)
        {
            try
            {
                await _goalService.DeleteGoalAsync( goalId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}/{goalId}/completion")]
        public async Task<ActionResult<double>> GetGoalCompletion(int userId, int goalId)
        {
            try
            {
                var completionPercentage = await _goalService.GetGoalCompletionAsync(userId, goalId);
                return Ok(completionPercentage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{userId}/{goalId}/join")]
        public async Task<ActionResult> JoinGoal(int userId, int goalId)
        {
            try
            {
                await _goalService.JoinGoalAsync(userId, goalId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       

        [HttpPut("{userId}/{goalId}/updateProgress")]
        public async Task<ActionResult> UpdateProgressToGoal(int userId, int goalId, [FromBody] double progress)
        {
            try
            {
               

                await _goalService.UpdateProgressToGoalAsync(userId, goalId, progress);
                return Ok(new {Message="Updated Succesfully"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
