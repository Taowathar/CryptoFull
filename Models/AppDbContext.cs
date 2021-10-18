﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CryppitBackend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Investment> Investments { get; set; }

        public DbSet<Favorite> Favorites { get; set; }

        public DbSet<User> Users { get; set; }
 
        public DbSet<DailyCrypto> Daily { get; set; }

    }
}
