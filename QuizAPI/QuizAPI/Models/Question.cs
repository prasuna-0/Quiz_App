using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Question
    {
        [Key]
        public int QnId { get; set; }
        [Column(TypeName ="nvarchar(50)")]
        public string QnInWords {  get; set; }
        public string? ImageName {  get; set; }
        public string Option1 {  get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public string Answer { get; set; }






    }
}
