using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEndAPI.Data;
using BackEndAPI.Models;

namespace BackEndAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssessmentControllers : ControllerBase
    {
        private readonly BackEndAPIContext _context;

        public AssessmentControllers(BackEndAPIContext context)
        {
            _context = context;
        }

        // GET: api/AssessmentControllers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assessment>>> GetAssessment()
        {
            return await _context.Assessment.ToListAsync();
        }

        // GET: api/AssessmentControllers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Assessment>> GetAssessment(int id)
        {
            var assessment = await _context.Assessment.FindAsync(id);

            if (assessment == null)
            {
                return NotFound();
            }

            return assessment;
        }

        // PUT: api/AssessmentControllers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssessment(int id, Assessment assessment)
        {
            if (id != assessment.Id)
            {
                return BadRequest();
            }

            _context.Entry(assessment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssessmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AssessmentControllers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Assessment>> PostAssessment(Assessment assessment)
        {
            _context.Assessment.Add(assessment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssessment", new { id = assessment.Id }, assessment);
        }

        // DELETE: api/AssessmentControllers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssessment(int id)
        {
            var assessment = await _context.Assessment.FindAsync(id);
            if (assessment == null)
            {
                return NotFound();
            }

            _context.Assessment.Remove(assessment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AssessmentExists(int id)
        {
            return _context.Assessment.Any(e => e.Id == id);
        }
    }
}
