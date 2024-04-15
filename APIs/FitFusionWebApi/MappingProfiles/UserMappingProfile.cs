using AutoMapper;
using Data_Access_Layer.DTOs;
using Data_Access_Layer.Models;

namespace FitFusionWebApi.MappingProfiles
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}
