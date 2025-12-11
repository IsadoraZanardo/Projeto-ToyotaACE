namespace BackEndAPI.Models;

public class Company
{
    public int Id { get; private set; }
    public required string Name { get; set; } = string.Empty;
    public required string CNPJ { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    // Construtor para garantir a inicialização das propriedades required
    public Company(string name, string cnpj)
    {
        Name = name;
        CNPJ = cnpj;
    }
    public bool Edit(string phone, string address, string email)
    {
        // Aplica as novas informações
        this.Phone = phone;
        this.Address = address;
        this.Email = email;

        Console.WriteLine($"✅ Informações de contato da empresa {Name} atualizadas com sucesso.");
        // Em um sistema real, aqui haveria uma chamada ao banco de dados.
        return true; 
    }
}