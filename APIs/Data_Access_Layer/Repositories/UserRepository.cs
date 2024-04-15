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
    public class UserRepository : IUserRepository
    {
        private readonly FitfusionDbContext _context;
        private readonly IMapper _mapper;

        public UserRepository(FitfusionDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<UserDTO> RegisterUserAsync(UserDTO userDTO)
        {
            try
            {
   
                // Check if email is unique and has the correct format
                var existingEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDTO.Email);
                if (existingEmail != null)
                {
                    throw new Exception("Email is already registered.");
                }
                if (!userDTO.Email.EndsWith("@gmail.com"))
                {
                    throw new Exception("Email must be a Gmail address.");
                }
               


                var userEntity = _mapper.Map<User>(userDTO);
                _context.Users.Add(userEntity);
                await _context.SaveChangesAsync();

                return _mapper.Map<UserDTO>(userEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while registering user", ex);
            }
        }

        public async Task<UserDTO> LoginAsync(string email, string password)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);

                // If user is not found, return null
                if (user == null)
                    return null;

                // Mapping User entity to UserDTO
                return _mapper.Map<UserDTO>(user);
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
                var user = await _context.Users.FindAsync(userId);

                if (user == null)
                    throw new Exception("User not found");

                _mapper.Map(userDTO, user); // Mapping UserDTO to existing User entity

                await _context.SaveChangesAsync();

                return _mapper.Map<UserDTO>(user);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update user.", ex);
            }
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);

                if (user == null)
                    return false;

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {

                throw new Exception("Failed to delete user.", ex);
            }
        }
    }
}