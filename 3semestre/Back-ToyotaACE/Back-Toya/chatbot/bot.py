def menu_principal():
    print("\nQual seu tópico de interesse?")
    print("1. Processo produtivo")
    print("2. Financeiro")
    print("3. Retirada")
    print("4. Outros")
    print("5. FAQ")


def menu_acompanhamento():
    print("\nEscolha o processo do veículo:")
    print("1. Prensas")
    print("2. Funilaria")
    print("3. Pintura")
    print("4. Montagem")
    print("5. Inspeção")


def menu_banco():
    print("\nAssuntos financeiros:")
    print("1. Já paguei a entrada, e agora?")
    print("2. O banco já autorizou a entrega do carro?")
    print("3. Meu pagamento não apareceu no sistema")
    print("4. O sistema demora quanto tempo para atualizar pagamento?")
    print("5. Posso antecipar várias parcelas de uma vez?")
    print("6. Posso transferir o financiamento para outra pessoa?")
    print("7. O carro já está no meu nome?")


def menu_retirada():
    print("\nRetirada do veículo:")
    print("1. Onde posso retirar meu carro?")
    print("2. Posso retirar o veículo sem agendamento?")
    print("3. Posso acompanhar o status da entrega?")
    print("4. Quem pode retirar o veículo além do titular?")
    print("5. É necessário levar comprovante de pagamento?")
    print("6. O veículo será entregue com tanque cheio?")


def menu_faq():
    print("\nFAQ:")
    print("1. Garantia")
    print("2. Revisões")
    print("3. Seguro")
    print("4. Multas")
    print("5. Primeiros passos com o carro")


def menu_pos_resposta():
    print("\nO que deseja fazer agora?")
    print("1. Escolher outro assunto")
    print("2. Voltar ao menu inicial")
    print("3. Sair")
    print("4. Falar com um atendente (WhatsApp)")


print("Olá! Sou a assistente virtual do Toyota ACE! 😊")
print("Sinta-se à vontade para conversar comigo :)")

menu_principal()

while True:
    pergunta = input("\nDigite 1 a 5 ou 'Q' para sair: ")

    if pergunta.lower() == "q":
        print("Até mais!")
        break

    # PROCESSO PRODUTIVO
    elif pergunta == "1":
        while True:
            menu_acompanhamento()
            sub = input("\nDigite 1 a 5 ou 'Q' para sair: ")

            if sub.lower() == "q":
                print("Até mais!")
                exit()

            if sub == "1":
                print("\nA prensa conforma as chapas metálicas.")

            elif sub == "2":
                print("\nA funilaria monta a estrutura do carro.")

            elif sub == "3":
                print("\nA pintura protege e dá acabamento.")

            elif sub == "4":
                print("\nA montagem integra os sistemas do veículo.")

            elif sub == "5":
                print("\nA inspeção garante a qualidade e segurança.")

            else:
                print("\nOpção inválida.")
                continue

            while True:
                menu_pos_resposta()
                escolha = input("\nDigite uma opção: ")

                if escolha == "1":
                    break

                elif escolha == "2":
                    menu_principal()
                    break

                elif escolha == "3" or escolha.lower() == "q":
                    print("Até mais!")
                    exit()

                elif escolha == "4":
                    print("\n📱 WhatsApp: (15) 99999-9999")

                else:
                    print("\nOpção inválida.")

            if escolha == "2":
                break

    # FINANCEIRO
    elif pergunta == "2":
        while True:
            menu_banco()
            banco = input("\nDigite 1 a 7 ou 'Q' para sair: ")

            if banco.lower() == "q":
                print("Até mais!")
                exit()

            if banco == "1":
                print("\nPagamento da entrada confirmado!")

            elif banco == "2":
                print("\nFinanciamento aprovado. Aguarde a produção do veículo.")

            elif banco == "3":
                print("\nO sistema pode levar até 48h úteis para atualizar.")

            elif banco == "4":
                print("\nAtualização em até 48h úteis após compensação bancária.")

            elif banco == "5":
                print("\nSim, é possível antecipar parcelas pelo banco.")

            elif banco == "6":
                print("\nTransferência sujeita à análise de crédito.")

            elif banco == "7":
                print("\nA transferência ocorre após a entrega do veículo.")

            else:
                print("\nOpção inválida.")
                continue

            while True:
                menu_pos_resposta()
                escolha = input("\nDigite uma opção: ")

                if escolha == "1":
                    break

                elif escolha == "2":
                    menu_principal()
                    break

                elif escolha == "3" or escolha.lower() == "q":
                    print("Até mais!")
                    exit()

                elif escolha == "4":
                    print("\n📱 WhatsApp: (15) 99999-9999")

                else:
                    print("\nOpção inválida.")

            if escolha == "2":
                break

    # RETIRADA
    elif pergunta == "3":
        while True:
            menu_retirada()
            retirada = input("\nDigite 1 a 6 ou 'Q' para sair: ")

            if retirada.lower() == "q":
                print("Até mais!")
                exit()

            if retirada == "1":
                print("\nA retirada será feita na concessionária escolhida na compra, no seu caso, Toyota Ramires em Sorocaba")

            elif retirada == "2":
                print("\nNão. É necessário realizar o agendamento da retirada. Você pode realizar aqui dentro do Toyora ACE, na página "Agendar Retirada".")

            elif retirada == "3":
                print("\nSim! O status pode ser acompanhado aqui no sistema do Toyota ACE!")

            elif retirada == "4":
                print("\nOutra pessoa pode retirar com autorização assinada do titular comprador.")

            elif retirada == "5":
                print("\nSim. Recomendamos levar comprovante e documento com foto, os mesmos enviados aqui no Toyota ACE na página "Dados Pessoais".")

            elif retirada == "6":
                print("\nO veículo será entregue com combustível básico. Recomenda-se abastecer pós retirada na concessionária.")

            else:
                print("\nOpção inválida.")
                continue

            while True:
                menu_pos_resposta()
                escolha = input("\nDigite uma opção: ")

                if escolha == "1":
                    break

                elif escolha == "2":
                    menu_principal()
                    break

                elif escolha == "3" or escolha.lower() == "q":
                    print("Até mais!")
                    exit()

                elif escolha == "4":
                    print("\n📱 WhatsApp: (15) 99999-9999")

                else:
                    print("\nOpção inválida.")

            if escolha == "2":
                break

    # OUTROS
    elif pergunta == "4":
        print("\nFuncionalidade em desenvolvimento.")
        menu_principal()

    # FAQ
    elif pergunta == "5":
        while True:
            menu_faq()
            faq = input("\nDigite 1 a 5 ou 'Q' para sair: ")

            if faq.lower() == "q":
                print("Até mais!")
                exit()

            if faq == "1":
                print("\nGarantia de fábrica entre 3 e 5 anos.")

            elif faq == "2":
                print("\nAs revisões devem ocorrer a cada 10.000 km.")

            elif faq == "3":
                print("\nRecomendamos contratar seguro imediatamente.")

            elif faq == "4":
                print("\nAs multas ficam vinculadas ao proprietário.")

            elif faq == "5":
                print("\nLeia o manual e conheça os comandos do veículo.")

            else:
                print("\nOpção inválida.")
                continue

            while True:
                menu_pos_resposta()
                escolha = input("\nDigite uma opção: ")

                if escolha == "1":
                    break

                elif escolha == "2":
                    menu_principal()
                    break

                elif escolha == "3" or escolha.lower() == "q":
                    print("Até mais!")
                    exit()

                elif escolha == "4":
                    print("\n📱 WhatsApp: (15) 99999-9999")

                else:
                    print("\nOpção inválida.")

            if escolha == "2":
                break

    else:
        print("\nDigite uma opção válida (1 a 5).")