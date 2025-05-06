import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // 📌 Cambia según sea necesario

export const getStockMovements = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/Products/BIQ/stockMovement`
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo datos:", error);
    return [];
  }
};
