//REGRA DE NEGÓCIO
//Padrão de tipagem, definir O QUE e a VARIÁVEL dos dados
interface IBotao {
    nome: string;
    estilo: "dark" | "ligth" | "error" | "outline" | "success"; //valores do catálogo const estilos
    clique: ()=> void; //função
}  //nome, estilo e clique são as props



export default function Button({nome, estilo, clique}:IBotao) { //herdando as props de IBotao

  //CATÁLOGO PARA ARMAZENAR ESTILOS DOS BOTÕES
  const estilos = {
    dark: "bg-blue-700 hover:bg-blue-800 text-white",
    ligth: "bg-blue-300 hover:bg-blue-400 text-black",
    error: "bg-red-300 hover:bg-red-400 text-black",
    outline: "bg-none outline-2 outline-black",
    success: "bg-green-300 hover:bg-green-400"
  } //valores travados em interface IBotao para não selecionar opções fora das existentes


  const estiloEscolhido = estilos[estilo] //[] = iteração = passsar por cada elemento 
                          //estilos: const estilos
                          //estilo: interface IBotao


    return(
        <input
        type="button"
        value={nome} 
        onClick={clique}
        className={`p-2 px-8 rounded-md cursor-pointer font-semibold ${estiloEscolhido}`} 
        />
    )
}


/*
TEMPLATE STRING
STRING que CONTATENA VALORES JS, colocar valores JUNTOS

Exemplo: 
var nome = "Isadora"
var string = Meu nome é ${nome}

console.log("Meu nome é Isadora")

className={estilo padrão ${valor que muda}}
*/