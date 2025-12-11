import Estrutura from "../componentes/Estrutura"
import MeuCard from "../componentes/ui/MeuCard"

export default function Home(){
    return(
        <Estrutura>
            <MeuCard
            titulo="Olá"
            descricao="Hello World"
            />
            <MeuCard
            titulo="Olá"
            descricao="Hello World"
            />
        </Estrutura>
    )
}