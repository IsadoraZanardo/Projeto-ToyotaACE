namespace BackEndAPI.Models;

public class Department
{
    public int Id { get; private set; }
    public required string Name { get; set; } = string.Empty;
    public required string Area { get; set; } = string.Empty;
    public List<string> Employees { get; set; } = new List<string>();
    public Department(string name, string area)
    {
        Name = name;
        Area = area;
    }
    
}