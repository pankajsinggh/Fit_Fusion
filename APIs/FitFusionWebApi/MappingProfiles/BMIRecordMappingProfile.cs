using AutoMapper;
using Data_Access_Layer.DTOs;
using Data_Access_Layer.Models;

namespace FitFusionWebApi.MappingProfiles
{
    public class BMIMappingProfile : Profile
    {
        public BMIMappingProfile()
        {
            CreateMap<BMIRecord, BMIRecordDTO>().ReverseMap();
        }
    }
}
