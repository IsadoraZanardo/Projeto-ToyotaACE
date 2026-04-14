//REGRA DE NEGÓCIO
//Padrão de tipagem, definir O QUE e a VARIÁVEL dos dados
interface ICard {
    titulo?: string,
    descricao?: string
    children?: React.ReactNode
    tamanho: keyof typeof estilos
} //se tem variável o valor não pode ser nulo
  //chlidren não é obrigatório, por isso tem ? e renderiza sem nada

const estilos = {
    sm: "w-[10vw]",
    md: "w-[20vw]",
    lg: "w-[30vw]",
    xl: "w-[50vw]",
    full: "w-full",
    auto: "w-auto"
} as const


export default function Card({titulo, descricao, children, tamanho}:ICard){

    const estiloSelecionado = estilos[tamanho]

    return(
        <div className={`border-2 border-gray-200 p-4 rounded-lg ${estiloSelecionado}`}>
            <h1>{titulo}</h1>
            <p>{descricao}</p>
            {children} {/*componente, não precisa estar dentro de uma tag html*/}
        </div>
    )
}