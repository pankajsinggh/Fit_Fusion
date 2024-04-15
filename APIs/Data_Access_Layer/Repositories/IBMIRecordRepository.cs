using Data_Access_Layer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.Repositories
{
    public interface IBMIRecordRepository
    {
        Task AddBMIRecordAsync(BMIRecordDTO bmiRecordDTO);
        Task DeleteBMIRecordAsync(int bmiRecordId);

        Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsAsync(int userId);
        Task<decimal> CalculateBMIAsync(decimal height, decimal weight);
        Task<string> ClassifyBMIAsync(decimal height, decimal weight,int Age);
        Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsByDateIntervalAsync(int userId, DateTime startDate, DateTime endDate);
        Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsByDateAsync(int userId, DateTime date);
        Task<IEnumerable<BMIRecordDTO>> GetBMIRecordsByMonthAsync(int userId, int year, int month);
        Task DeleteBMIRecordsByDateAsync(int userId, DateTime date);


    }
}
