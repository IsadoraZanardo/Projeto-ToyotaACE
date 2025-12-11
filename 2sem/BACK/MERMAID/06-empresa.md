    ```mermaid
        classDiagram
    class Empresa {
        -ID: int
        -Telefone: int
        -Endereco: string
        -CNPJ: int
        -Nome: string
        -Email: string
        +Editar(telefone, endereco, email: string) : bool
        +Visualizar (): void
    }
```