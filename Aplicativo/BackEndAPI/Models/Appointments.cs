namespace BackEndAPI.Models;

public class Appointments
{
    public int Id { get; private set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    
}