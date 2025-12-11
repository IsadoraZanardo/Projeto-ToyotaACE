namespace BackEndAPI.Models;

public class Assessment
{
    public int Id { get; private set; }
    public required string Stars { get; set; } = string.Empty;
    public string StrongPoint { get; set; } = string.Empty;
    public required string Coments { get; set; } = string.Empty; 
   
}