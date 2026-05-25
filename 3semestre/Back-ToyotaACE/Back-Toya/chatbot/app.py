from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

respostas = {
    "garantia": "A garantia cobre defeitos de fabricação.",
    "financeiro": "Pagamentos podem levar até 48h úteis.",
    "revisão": "As revisões devem ocorrer a cada 10.000 km.",
    "seguro": "Recomendamos contratar seguro antes da retirada.",
    "retirada": "A retirada do veículo deve ser agendada.",
    "pintura": "A pintura protege e dá acabamento ao veículo.",
    "montagem": "A montagem integra todos os componentes do carro.",
    "pagamento": "pix ou boleto",
    "pix": "24h para o recebimento",
    "boleto": "48h para o recebimento",
}

@app.route("/")
def home():
    return "Chatbot Toyota rodando!"

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    mensagem = data.get("mensagem", "").lower()

    for palavra, resposta in respostas.items():
        if palavra in mensagem:
            return jsonify({
                "resposta": resposta
            })

    return jsonify({
        "resposta": "Não entendi sua pergunta."
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)