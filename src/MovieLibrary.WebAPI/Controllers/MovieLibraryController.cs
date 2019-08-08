using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using MovieLibrary.WebAPI.Models;
using Microsoft.AspNetCore.Cors;

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

        // GET: api/MovieLibraryController
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
        {
            return await _context.Movies.ToListAsync();
        }

        // GET: api/MovieLibraryController/5
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

        // POST: api/MovieLibraryController
        [HttpPost]
        public async Task<ActionResult<Movie>> PostMovie(Movie movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovie), new { movieId = movie.MovieId }, movie);
        }

        // PUT: api/MovieLibraryController
        
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

        // DELETE: api/MovieLibraryController/5
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