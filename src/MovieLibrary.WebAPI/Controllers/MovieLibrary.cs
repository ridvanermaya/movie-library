using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MovieLibrary.WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace MovieLibrary.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieLibrary : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MovieLibrary(ApplicationDbContext context)
        {
            _context = context;

            // if(_context.Movies.Count() == 0)
            // {
            //     // Create a new Movie if collection is empty,
            //     // which means you can't delete all movies.
            //     _context.Movies.Add(new Movie { Title = "Hobbs & Shaw", Genre = "Action", Director = "David Leitch"});
            //     _context.SaveChanges();
            // }
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

        // POST: api/MovieLibrary
        [HttpPost]
        public async Task<ActionResult<Movie>> PostMovie(Movie movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovie), new { movieId = movie.MovieId }, movie);
        }

        // PUT: api/MovieLibrary
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