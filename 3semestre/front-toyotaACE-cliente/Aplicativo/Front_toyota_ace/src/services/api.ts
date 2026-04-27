// src/services/api.ts

// Aqui definimos o endereço do seu Java que já está rodando
const API_URL = "http://localhost:8081/api";

export const getAcompanhamento = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/acompanhamento/${email}`);
    
    if (!response.ok) {
      throw new Error("Não foi possível conectar ao servidor da Toyota.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na conexão com o Java:", error);
    return null;
  }
};