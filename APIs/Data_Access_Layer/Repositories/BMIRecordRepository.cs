using AutoMapper;
using Azure;
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
    public class BMIRecordRepository : IBMIRecordRepository
    {
        private readonly FitfusionDbContext _context;
        private readonly IMapper _mapper;

        public BMIRecordRepository(FitfusionDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddBMIRecordAsync(BMIRecordDTO bmiRecordDTO)
        {
            var bmiRecord = _mapper.Map<BMIRecord>(bmiRecordDTO);
            _context.BMIRecords.Add(bmiRecord);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBMIRecordAsync(int bmiRecordId)
        {
            var bmiRecord = await _context.BMIRecords.FindAsync(bmiRecordId);
            if (bmiRecord != null)
            {
                _context.BMIRecords.Remove(bmiRecord);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsAsync(int userId)
        {
            var bmiRecords = await _context.BMIRecords
                .Where(b => b.UserId == userId)
                .ToListAsync();

            return _mapper.Map<IEnumerable<BMIRecordDTO>>(bmiRecords);
        }

        public  Task<decimal> CalculateBMIAsync(decimal height, decimal weight)
        {

            if (height <= 0 || weight <= 0)
            {
                throw new ArgumentException("Height and weight must be greater than zero.");
            }

            // Convert height from cm to meters
            decimal heightInMeters = height / 100;

            // Calculate BMI using the formula
            decimal bmi = weight / (heightInMeters * heightInMeters);
            Math.Round(bmi,10);
            return Task.FromResult(bmi);
        }

        public async Task<string> ClassifyBMIAsync(decimal height, decimal weight,int Age)
        {
            var bmi = await CalculateBMIAsync(height, weight);

            if (Age < 18)
            {
                if (bmi < 18.5m)
                    return "Underweight";
                else if (bmi >= 18.5m && bmi < 24)
                    return "Normal weight";
                else if (bmi >= 24 && bmi < 30)
                    return "Overweight";
                else
                    return "Obese";
            }
            else // For adults
            {
                if (bmi < 18.5m)
                    return "Underweight";
                else if (bmi >= 18.5m && bmi < 25)
                    return "Normal weight";
                else if (bmi >= 25 && bmi < 30)
                    return "Overweight";
                else
                    return "Obese";
            }
        }

        public async Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsByDateIntervalAsync(int userId, DateTime startDate, DateTime endDate)
        {
            var bmiRecords = await _context.BMIRecords
                .Where(b => b.UserId == userId && b.RecordedDate>= startDate && b.RecordedDate <= endDate)
                .ToListAsync();

            return _mapper.Map<IEnumerable<BMIRecordDTO>>(bmiRecords);
        }

        public async Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsByDateAsync(int userId, DateTime date)
        {
            var bmiRecords = await _context.BMIRecords
                .Where(b => b.UserId == userId && b.RecordedDate.Date == date.Date)
                .ToListAsync();

            return _mapper.Map<IEnumerable<BMIRecordDTO>>(bmiRecords);
        }

        public async Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsByMonthAsync(int userId, int year, int month)
        {
            var bmiRecords = await _context.BMIRecords
                .Where(b => b.UserId == userId && b.RecordedDate.Year == year && b.RecordedDate.Month == month)
                .ToListAsync();

            return _mapper.Map<IEnumerable<BMIRecordDTO>>(bmiRecords);
        }

        public async Task DeleteBMIRecordsByDateAsync(int userId, DateTime date)
        {
            var bmiRecords = await _context.BMIRecords
                .Where(b => b.UserId == userId && b.RecordedDate.Date == date.Date)
                .ToListAsync();

            _context.BMIRecords.RemoveRange(bmiRecords);
            await _context.SaveChangesAsync();
        }
    }
}
