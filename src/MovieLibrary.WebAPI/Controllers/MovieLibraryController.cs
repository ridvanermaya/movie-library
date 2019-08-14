using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using MovieLibrary.WebAPI.Models;
using System.Collections;

namespace MovieLibraryController.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieLibraryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MovieLibraryController(ApplicationDbContext context)
        {
            _context = context;

            if(_context.Movies.Count() == 0)
            {
                // Create 5 new Movies if collection is empty,
                _context.Movies.Add(new Movie { Title = "The Departed", Genre = "Drama", Director = "Martin Scorsese"});
                _context.Movies.Add(new Movie { Title = "The Dark Knight", Genre = "Drama", Director = "Christopher Nolan"});
                _context.Movies.Add(new Movie { Title = "Inception", Genre = "Drama", Director = "Christopher Nolan"});
                _context.Movies.Add(new Movie { Title = "Pineapple Express", Genre = "Comedy", Director = "David Gordon Green"});
                _context.Movies.Add(new Movie { Title = "Die Hard", Genre = "Action", Director = "John McTiernan"});
                _context.SaveChanges();
            }
        }

        // GET: api/MovieLibrary
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
        {
            return await _context.Movies.ToListAsync();
        }

        // GET: api/MovieLibrary/5
        [HttpGet("{MovieId}")]
        public async Task<ActionResult<Movie>> GetMovie(int movieId)
        {
            var movie = await _context.Movies.FindAsync(movieId);

            if(movie == null)
            {
                return NotFound();
            }

            return movie;
        }

        // GET: api/MovieLibrary/Search/
        [HttpGet("Search")]
        public List<Movie> SearchMovie(string searchType, string searchInput)
        {
            var movies = new List<Movie>();

            if (searchType == "Title")
            {
                movies = _context.Movies.Where(x => x.Title.ToLower() == searchInput.ToLower()).ToList();
            }
            if (searchType == "Genre")
            {
                movies = _context.Movies.Where(x => x.Genre.ToLower() == searchInput.ToLower()).ToList();
            }
            if (searchType == "Director")
            {
                movies = _context.Movies.Where(x => x.Director.ToLower() == searchInput.ToLower()).ToList();
            }

            return movies;
        }

        // POST: api/MovieLibrary
        [HttpPost]
        public async Task<ActionResult<Movie>> PostMovie(Movie movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovie), new { movieId = movie.MovieId }, movie);
        }

        // PUT: api/MovieLibrary/5
        [HttpPut("{MovieId}")]
        public async Task<IActionResult> PutMovie(int movieId, Movie movie)
        {
            if (movieId != movie.MovieId)
            {
                return BadRequest();
            }

            _context.Entry(movie).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/MovieLibrary/5
        [HttpDelete("{MovieId}")]
        public async Task<IActionResult> DeleteMovie(int movieId)
        {
            var movie = await _context.Movies.FindAsync(movieId);

            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}