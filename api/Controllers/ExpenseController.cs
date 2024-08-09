using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
     {
        private readonly AppDbContext _context;
        public ExpenseController(AppDbContext context){
            _context = context;
        }
        [HttpGet]
        public async Task<IEnumerable<Expenses>> GetExpense(){
            var expenses = await _context.Expenses.AsNoTracking().ToListAsync();
            return expenses;
        }

        [HttpPost]
        public async Task<IActionResult> Create (Expenses expense){
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            await _context.AddAsync(expense);
            var result = await _context.SaveChangesAsync();

            if(result > 0){
                return Ok();
            }
            return BadRequest();
        }

         [HttpDelete ("{id:int}")]
    public async Task<IActionResult> Delete(int id){
        var expense = await _context.Expenses.FindAsync(id);
        if(expense == null){
            return NotFound();
        }

        _context.Remove(expense);

           var result = await _context.SaveChangesAsync();

           if(result > 0){
            return Ok("Expense was deleted");
           }
        return BadRequest ("Unable to delete expense");


    }

     [HttpGet("{id:int}")]

     public async Task<ActionResult<Expenses>> GetExpense(int id){
        var expense = await _context.Expenses.FindAsync(id);
        if(expense == null){
            return NotFound("Sorry, expense was not found");
        }
        return Ok(expense);
     }
       [HttpPut("{id}")]

    public async Task<IActionResult> UpdateExpense(int id, Expenses expense)
    {
        if(id != expense.Id)
        {
            return BadRequest();
        }
        _context.Entry(expense).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok();
    }








    }
}