namespace BackEndAPI.Models;

// Definição do Enum para os possíveis estados do Pedido (conforme seu exemplo).
public enum OrderStatus { Pendente, Pago, Preparando, Entregue, Cancelado }

public class Order
{
    public int Id { get; private set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pendente;
    public DateTime Date { get; private set; } = DateTime.UtcNow;
    public decimal Total { get; private set; }
    public required int ClientId { get; set; }
    public required int SellerId { get; set; }

    public List<OrderItem> Items { get; set; } = new List<OrderItem>();

    public void ViewStatus()
    {
        Console.WriteLine($"Status do Pedido {Id}: {Status}");
    }

    public void ViewDate()
    {
        Console.WriteLine($"Data do Pedido {Id}: {Date.ToShortDateString()}");
    }
    public void CalculateTotal()
    {
        decimal sum = 0;
        foreach (OrderItem item in Items)
            sum += item.Subtotal; // É necessário que a classe OrderItem tenha a propriedade Subtotal
        Total = sum;
    }
}