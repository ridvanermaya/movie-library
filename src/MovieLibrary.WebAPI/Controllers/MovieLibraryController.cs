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

            // if(_context.Movies.Count() == 0)
            // {
            //     // Create a new Movie if collection is empty,
            //     // which means you can't delete all movies.
            //     _context.Movies.Add(new Movie { Title = "Hobbs & Shaw", Genre = "Action", Director = "David Leitch"});
            //     _context.SaveChanges();
            // }
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