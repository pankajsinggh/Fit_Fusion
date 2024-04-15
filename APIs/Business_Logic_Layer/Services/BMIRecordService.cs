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
    public class BMIRecordService : IBMIRecordService
    {
        private readonly IBMIRecordRepository _bmiRecordRepository;
        private readonly IMapper _mapper;

        public BMIRecordService(IBMIRecordRepository bmiRecordRepository, IMapper mapper)
        {
            _bmiRecordRepository = bmiRecordRepository;
            _mapper = mapper;
        }

        public async Task AddBMIRecordAsync(BMIRecordDTO bmiRecordDTO)
        {
            await _bmiRecordRepository.AddBMIRecordAsync(bmiRecordDTO);
        }

        public async Task DeleteBMIRecordAsync(int bmiRecordId)
        {
            await _bmiRecordRepository.DeleteBMIRecordAsync(bmiRecordId);
        }

        public async Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsAsync(int userId)
        {
            return await _bmiRecordRepository.GetBMIRecordsAsync(userId);
        }

        public async Task<decimal> CalculateBMIAsync(decimal height, decimal weight)
        {
            return await _bmiRecordRepository.CalculateBMIAsync(height, weight);
        }

       public async Task<string> ClassifyBMIAsync(decimal height, decimal weight,int Age)
        {
            return await _bmiRecordRepository.ClassifyBMIAsync(height, weight,Age);
        }

        public async Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsByDateIntervalAsync(int userId, DateTime startDate, DateTime endDate)
        {
            return await _bmiRecordRepository.GetBMIRecordsByDateIntervalAsync(userId, startDate, endDate);
        }

        public async Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsByDateAsync(int userId, DateTime date)
        {
            return await _bmiRecordRepository.GetBMIRecordsByDateAsync(userId, date);
        }

        public async Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsByMonthAsync(int userId, int year, int month)
        {
            return await _bmiRecordRepository.GetBMIRecordsByMonthAsync(userId, year, month);
        }

        public async Task DeleteBMIRecordsByDateAsync(int userId, DateTime date)
        {
            await _bmiRecordRepository.DeleteBMIRecordsByDateAsync(userId, date);
        }

    }
}
