using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Net.Mime.MediaTypeNames;

namespace MovieLibrary.WebAPI.Models
{
    [Table("Movie")]
    public class Movie
    {
        [Key]
        public int MovieId { get; set; }
        [Display(Name = "Movie Title")]
        public string Title { get; set; }
        [Display(Name = "Movie Genre")]
        public string Genre { get; set; }
        [Display(Name = "Director Name")]
        public string Director { get; set; }
    }
}