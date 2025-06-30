using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace QuizAPI.Models
{
    public class Participant
    {
        [Key]
        public string? ParticipantId {  get; set; }

        [Column (TypeName="nvarchar(50)")]
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(50)")]
         public string Email { get; set; }
        public int Score { get; set; }
        public int TimeTaken { get; set; }
    }
    public class ParticipantResult
    {
        [JsonProperty("ParticipantId")]
        public string? ParticipantId { get; set; }
        public int TimeTaken { get; set; }
        public int Score { get; set; }

    }
}
