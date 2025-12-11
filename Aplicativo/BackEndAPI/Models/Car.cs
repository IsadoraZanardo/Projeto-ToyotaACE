namespace BackEndAPI.Models;

public class Car
{
    public int Id { get; private set; }
    public required string Description { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
    public required string Model { get; set; } = string.Empty; 
    public required int Year { get; set; }
    public int StockQuantity { get; set; } = 0;

    public void Consume(int quantity)
    {
        StockQuantity -= quantity;
    }
}