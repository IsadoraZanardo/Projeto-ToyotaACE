    ```mermaid
        classDiagram
    class Vendedor {
        -ID: int
        -Cargo: string
        -Nome: string
        -Salario: double
        -Email: string
        -DataAdmissao: DateTime
        -Telefone: int
        +RealizarVenda (): bool
        +ReceberComissao (quantidadeVendas: int): void
    }
```