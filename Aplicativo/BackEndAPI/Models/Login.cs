namespace BackEndAPI.Models;

public class Login
{
    public int Id { get; private set; }
    public string User { get; private set; } = string.Empty;
    public string Chassis { get; private set; } = string.Empty; // private set pela mesma razão.
    public bool IsLoggedIn { get; private set; } = false;
    public Login() { }
    
    // Construtor para inicializar as propriedades mínimas (Id pode ser setado após persistência)
    public Login(string user, string chassis)
    {
        User = user;
        Chassis = chassis;
    }
}
    