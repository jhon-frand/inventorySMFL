import axios from "axios";

export const getTotalUsers = async () => {
  const endpoint = "http://localhost:3000/usuarios/total"
  try {
    const response = await axios.get(endpoint);
    return response.data.totalUsuarios;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export const getTotalUnits = async () => {
  const endpoint = "http://localhost:3000/unidades/total"
  try {
    const response = await axios.get(endpoint);
    return response.data.totalUnidades;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export const getTotalEquipment = async () => {
  const endpoint = "http://localhost:3000/equipos/total"
  try {
    const response = await axios.get(endpoint);
    return response.data.totalEquipos;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export const getTotalManteinment = async () => {
  const endpoint = "http://localhost:3000/mantenimientos/total"
  try {
    const response = await axios.get(endpoint);
    return response.data.totalMantenimientos;
  } catch (error) {
    console.log(error);
    return 0;
  }
}