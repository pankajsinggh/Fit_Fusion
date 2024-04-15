using AutoMapper;
using Data_Access_Layer.DTOs;
using Data_Access_Layer.Models;

namespace FitFusionWebApi.MappingProfiles
{
    public class GoalMappingProfile : Profile
    {
        public GoalMappingProfile()
        {
            CreateMap<Goal, GoalDTO>().ReverseMap();
        }
    }
}
