using AutoMapper;
using Business_Logic_Layer.Services;
using Data_Access_Layer.DTOs;
using Data_Access_Layer.Models;
using Data_Access_Layer.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Business_Logic_Layer.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserService> _logger;

        public UserService(IUserRepository userRepository, IMapper mapper, ILogger<UserService> logger)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<UserDTO> RegisterUserAsync(UserDTO userDTO)
        {
            try
            {
                var registeredUser = await _userRepository.RegisterUserAsync(userDTO);
                return _mapper.Map<UserDTO>(registeredUser);
             
                
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured while registering user",ex); 
            }
        }

        public async Task<UserDTO> LoginAsync(string email, string password)
        {
            try
            {
                // Authenticate user in repository
                var authenticatedUser = await _userRepository.LoginAsync(email, password);

                // Map domain model to DTOas
               

                return _mapper.Map<UserDTO>(authenticatedUser);
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while authenticating user", ex);
            }
        }


        public async Task<UserDTO> UpdateUserAsync(int userId, UserDTO userDTO)
        {
            try
            {
                // Update user in repository
                var updatedUser = await _userRepository.UpdateUserAsync(userId, userDTO);

                // Map domain model back to DTO
                var updatedUserDto = _mapper.Map<UserDTO>(updatedUser);

                return updatedUserDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating user");
                throw; // You might want to handle this exception in a more appropriate way
            }
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            try
            {
                // Delete user in repository
                var result = await _userRepository.DeleteUserAsync(userId);

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting user");
                throw; // You might want to handle this exception in a more appropriate way
            }
        }
    }
}




