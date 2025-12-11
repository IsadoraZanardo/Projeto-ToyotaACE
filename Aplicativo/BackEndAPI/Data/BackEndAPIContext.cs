using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BackEndAPI.Models;

namespace BackEndAPI.Data
{
    public class BackEndAPIContext : DbContext
    {
        public BackEndAPIContext (DbContextOptions<BackEndAPIContext> options)
            : base(options)
        {
        }

        public DbSet<BackEndAPI.Models.Client> Client { get; set; } = default!;
        public DbSet<BackEndAPI.Models.Appointments> Appointments { get; set; } = default!;
        public DbSet<BackEndAPI.Models.Assessment> Assessment { get; set; } = default!;
        public DbSet<BackEndAPI.Models.Car> Car { get; set; } = default!;
    }
}
