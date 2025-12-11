"use client"

import Card from '@/app/componentes/ui/MeuCard'
import Button from '@/app/componentes/ui/Button'

export default function HeroSection() {
    return(
            <div className="gap-6 w-screen bg-none flex flex-wrap items-center justify-center"> {/*flex-wrap para que essa div fiqu em cima*/}
            <Card
                titulo='Meus Carros'
                descricao='Toyota Corolla e Hilux'/> {/*quantidade de cards*/}


            <Card
                titulo='Informações financeiras'
                descricao='Clique para saber mais sobre seu banco'
                >
                
                <h1>Elemento children</h1>

                <Button
                nome="Saiba mais"
                estilo="ligth"
                clique={()=>{alert("Redirecionado para Meus Carros")}}
                />

            </Card> {/*abrindo e fechando o card para colocar childrwn*/}


        </div>
    )
}

//PROPS é herança, quando estou acessando algo do componete pai