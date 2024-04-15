using Microsoft.EntityFrameworkCore;
using Data_Access_Layer.Data_Model;
using Data_Access_Layer.Repositories;
using Business_Logic_Layer.Services;
using Microsoft.AspNetCore.Hosting;
using AutoMapper;
using Data_Access_Layer.DTOs;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using FitFusionWebApi.MappingProfiles;
using BusinessLogicLayer.Services;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;



namespace FitFusionWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);


            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // confuguring AutoMapper
            builder.Services.AddControllers();

            //Register your Repository

            builder.Services.AddScoped<IUserRepository , UserRepository>();
            builder.Services.AddScoped<IWorkoutRepository, WorkoutRepository>();
            builder.Services.AddScoped<IGoalRepository, GoalRepository>();
            builder.Services.AddScoped<IBMIRecordRepository, BMIRecordRepository>();

            //Register your Services

            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IWorkoutService, WorkoutService>();
            builder.Services.AddScoped<IGoalService,GoalService>();
            builder.Services.AddScoped<IBMIRecordService, BMIRecordService>();

            // Confugsing automapper

            builder.Services.AddAutoMapper(typeof(Program));
            // Confuguirng db context

            builder.Services.AddDbContext<FitfusionDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("FitFusionConnectionString")));

            builder.Services.AddCors(option =>
            {
                option.AddPolicy( "MyPolicy",builder=>
                    {
                        builder.AllowAnyOrigin()
                                            .AllowAnyHeader()
                                                  .AllowAnyMethod();

                    });
            });


            builder.Services.Configure<JwtBearerOptions>(builder.Configuration.GetSection("Jwt"));

            var key = builder.Configuration.GetSection("Jwt:Key").Value;
            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.RequireHttpsMetadata = false;
                o.SaveToken = true;
                o.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("MyPolicy");
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
