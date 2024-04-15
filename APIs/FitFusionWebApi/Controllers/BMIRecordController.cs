using Business_Logic_Layer.Services;
using Data_Access_Layer.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitFusionWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BMIController : ControllerBase
    {
        private readonly IBMIRecordService _bmiService;

        public BMIController(IBMIRecordService bmiService)
        {
            _bmiService = bmiService;
        }

        [HttpPost]
        public async Task<IActionResult> AddBMIRecord(BMIRecordDTO bmiRecordDTO)
        {
            try
            {
                await _bmiService.AddBMIRecordAsync(bmiRecordDTO);
                return Ok();
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{bmiRecordId}")]
        public async Task<IActionResult> DeleteBMIRecord(int bmiRecordId)
        {
            try
            {
                await _bmiService.DeleteBMIRecordAsync(bmiRecordId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetBMIRecords(int userId)
        {
            try
            {
                var bmiRecords = await _bmiService.GetBMIRecordsAsync(userId);
                return Ok(bmiRecords);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("calculate")]
        public async Task<IActionResult> CalculateBMI(decimal height, decimal weight)
        {
            try
            {
                var bmi = await _bmiService.CalculateBMIAsync(height, weight);
                return Ok(bmi);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [ HttpGet("classify")]
    public async Task<IActionResult> ClassifyBMI(decimal height, decimal weight, int Age)
        {
            try
            {
                var bmi = await _bmiService.CalculateBMIAsync(height, weight);
                var classification = _bmiService.ClassifyBMIAsync(height,weight,Age);
                return Ok(new { BMI = bmi, Classification = classification });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("recordsByDateInterval")]
        public async Task<IActionResult> GetBMIRecordsByDateInterval(int userId, DateTime startDate, DateTime endDate)
        {
            try
            {
                var bmiRecords = await _bmiService.GetBMIRecordsByDateIntervalAsync(userId, startDate, endDate);
                return Ok(bmiRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{userId}/recordsByDate/{date}")]
        public async Task<IActionResult> GetBMIRecordsByDate(int userId, DateTime date)
        {
            try
            {
                var bmiRecords = await _bmiService.GetBMIRecordsByDateAsync(userId, date);
                return Ok(bmiRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("recordsByMonth")]
        public async Task<IActionResult> GetBMIRecordsByMonth(int userId, int year, int month)
        {
            try
            {
                var bmiRecords = await _bmiService.GetBMIRecordsByMonthAsync(userId, year, month);
                return Ok(bmiRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{userId}/deleteByDate/{date}")]
        public async Task<IActionResult> DeleteBMIRecordsByDate(int userId, DateTime date)
        {
            try
            {
                await _bmiService.DeleteBMIRecordsByDateAsync(userId, date);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
