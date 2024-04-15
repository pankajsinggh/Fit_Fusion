using Business_Logic_Layer.Services;
using Data_Access_Layer.Models;
using Data_Access_Layer.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Identity.Client.Platforms.Features.DesktopOs.Kerberos;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace FitFusionWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        //private readonly JwtBearerOptions _options;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDTO)
        {

            var registeredUser = await _userService.RegisterUserAsync(userDTO);
            if (registeredUser == null)

                return BadRequest("Failed to register user");

            return Ok(new { Message = "Register Successful", registeredUser });

            //catch (Exception ex)
            //{
            //    return StatusCode(500 , "An error occured while registering user.");
            //}
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] UserDTO loginDTO)
        //{
        //    try
        //    {
        //        var user = await _userService.LoginAsync(loginDTO.Email, loginDTO.Password);
        //        if (user == null)

        //            return Unauthorized(new { Message = "Invalid email or password." });


        //        return Ok(user);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "An error occured while authenticating user.");
        //    }
        //}




        [HttpPut("{userId}")]
        public async Task<IActionResult> Update(int userId, [FromBody] UserDTO userDTO)
        {
            try
            {
                var updatedUser = await _userService.UpdateUserAsync(userId, userDTO);
                if (updatedUser == null)
                    return NotFound("User not found");

                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating user.");
            }
        }

        [HttpDelete("{userId}")]

        public async Task<IActionResult> Delete(int userId)
        {
            try
            {
                var result = await _userService.DeleteUserAsync(userId);
                if (!result)
                    return NotFound("User not found");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while deleting user.");
            }
        }



        [HttpPost("loginauth")]
        
        public async Task<IActionResult> LoginAuth([FromBody] UserDTO model)
        {
            var user = await _userService.LoginAsync(model.Email, model.Password);
            if (user is null)
            {
                return BadRequest(new { error = "Invalid email or password." });
            }

            var jwtKey = Encoding.ASCII.GetBytes("fitnessfusionSecretKeyforauthentication");

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Email, user.Email) // Example: adding email as a claim
        // Add more claims as needed
    };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2)  , // Adjust expiration time as needed
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(jwtKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { user,token = tokenHandler.WriteToken(token) });
        }
    }
}