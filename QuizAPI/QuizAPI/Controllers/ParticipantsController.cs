using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantsController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public ParticipantsController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Participants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipants()
        {
            return await _context.Participants.ToListAsync();
        }

        // GET: api/Participants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Participant>> GetParticipant(string id)
        {
            var participant = await _context.Participants.FindAsync(id);

            if (participant == null)
            {
                return NotFound();
            }

            return participant;
        }

        // PUT: api/Participants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticipant(string id, ParticipantResult _participantresult)
        {
            Console.WriteLine($"Route ID: {id}");
            Console.WriteLine($"Body ParticipantId: {_participantresult.ParticipantId}");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id!=_participantresult.ParticipantId)
            {
                return BadRequest("Route and body ParticipantId do not match");
            }
            Participant participant = _context.Participants.Find(id);
            participant.Score = _participantresult.Score;
            participant.TimeTaken = _participantresult.TimeTaken;



            _context.Entry(participant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParticipantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(participant);
        }

        // POST: api/Participants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (string.IsNullOrEmpty(participant.ParticipantId))
            {
                participant.ParticipantId = Guid.NewGuid().ToString();
            }

            var temp =_context.Participants.Where(x => x.Email == participant.Email).FirstOrDefault();
            if(temp == null)
            {
                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();
            }
            else
            {
                participant = temp;
            }
            return Ok(participant);
        }

        // DELETE: api/Participants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParticipant(string id)
        {
            var participant = await _context.Participants.FindAsync(id);
            if (participant == null)
            {
                return NotFound();
            }

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParticipantExists(string id)
        {
            return _context.Participants.Any(e => e.ParticipantId == id);
        }
    }
}
