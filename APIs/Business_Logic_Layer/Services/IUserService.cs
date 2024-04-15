using Data_Access_Layer.DTOs;
using Data_Access_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Business_Logic_Layer.Services
{
    public interface IUserService
    {
        Task<UserDTO> RegisterUserAsync(UserDTO userDTO);
        Task<UserDTO> LoginAsync(string email, string password);
        Task<UserDTO> UpdateUserAsync(int userId, UserDTO userDTO);

        Task<bool> DeleteUserAsync(int userId);


    }
}
