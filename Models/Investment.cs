using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

﻿namespace CryppitBackend.Models
{
    public class Investment
    {
        [Key]
        public string Id { get; set; }

        [NotMapped]
        public CryptoDetail Crypto { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public string CryptoId { get; set; }

        [Required]
        public double PriceBought { get; set; }

        [Required]
        public double CurrentPrice { get; set; }

        [Required]
        public double Amount { get; set; }
        
        [NotMapped]
        public CryptoGraph Graph { get; set; }

        public override string ToString() => JsonSerializer.Serialize<Investment>(this);

    }
}
