using AutoMapper;
using Data_Access_Layer.DTOs;
using Data_Access_Layer.Models;

namespace FitFusionWebApi.MappingProfiles
{
    public class WorkoutMappingProfile : Profile
    {
        public WorkoutMappingProfile()
        {
            CreateMap<Workout, WorkoutDTO>().ReverseMap();
        }
    }
}
