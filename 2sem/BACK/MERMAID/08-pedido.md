```mermaid
        classDiagram
    class Pedido {
        -ID: int
        -Status: string
        -Data: DateTime
        +VisualizarStatus (): void
        +VisualizarData (): void
    }
```