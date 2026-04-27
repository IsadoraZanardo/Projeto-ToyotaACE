// js/agendamento.js

const horariosDisponiveis = {
  "segunda": ["09:00", "10:00", "11:00", "14:00", "15:00"],
  "terca": ["09:30", "10:30", "14:30"],
  "quarta": ["09:00", "11:00", "15:00"],
  "quinta": ["10:00", "13:00", "16:00"],
  "sexta": ["09:00", "10:30", "14:00"]
};

function normalizarDiaSemana(nome) {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace("-feira", "");
}

function atualizarHorarios() {
  const dataInput = document.getElementById("data").value;
  const dataSelecionada = new Date(dataInput);
  const diaSemana = normalizarDiaSemana(dataSelecionada.toLocaleDateString('pt-BR', { weekday: 'long' }));
  const selectHorario = document.getElementById("horario");

  selectHorario.innerHTML = "";

  if (horariosDisponiveis[diaSemana]) {
    horariosDisponiveis[diaSemana].forEach(horario => {
      const option = document.createElement("option");
      option.value = horario;
      option.text = horario;
      selectHorario.appendChild(option);
    });
  } else {
    const option = document.createElement("option");
    option.text = "Sem horários disponíveis para este dia";
    selectHorario.appendChild(option);
  }
}

function confirmarAgendamento() {
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;
  const mensagem = document.getElementById("mensagem");

  if (data && horario) {
    mensagem.textContent = `Agendamento confirmado para ${data} às ${horario}`;
    mensagem.classList.remove("text-danger");
    mensagem.classList.add("text-success");
  } else {
    mensagem.textContent = "Por favor, selecione a data e o horário.";
    mensagem.classList.remove("text-success");
    mensagem.classList.add("text-danger");
  }
}
