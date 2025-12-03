namespace BackEndAPI.Models;

public class Seller
{
    public int Id { get; private set; }
    public required string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    // Alterado para string para maior flexibilidade e 'set' público para PUT
    public string CPF { get; set; } = string.Empty; 
    
    // Adicionado para suportar o método GetClientbySellerId
    public int SellerId { get; set; } 
}