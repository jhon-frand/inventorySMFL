import axios from "axios";
import {
  endpointUser,
  endpointUnidad,
  endpointMantenimiento,
  endpointEquipo
} from "../components/endpoints/Endpoints"

export const getTotalUsers = async () => {
  const endpoint = `${endpointUser}/total`;
  try {
    const response = await axios.get(endpoint);
    return response.data.totalUsuarios;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export const getTotalUnits = async () => {
  const endpoint = `${endpointUnidad}/total`;
  try {
    const response = await axios.get(endpoint);
    return response.data.totalUnidades;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export const getTotalEquipment = async () => {
  const endpoint = `${endpointEquipo}/total`;
  try {
    const response = await axios.get(endpoint);
    return response.data.totalEquipos;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export const getTotalManteinment = async () => {
  const endpoint = `${endpointMantenimiento}/total`;
  try {
    const response = await axios.get(endpoint);
    return response.data.totalMantenimientos;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export const getTotalEquiposUnit = async (unidad) => {
  try {
    const endpoint = `${endpointEquipo}/total/${unidad}`;
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export const getTotalMantenimientoUnit = async (unidad) => {
  try {
    const endpoint = `${endpointMantenimiento}/total/${unidad}`;
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
    return 0;
  }
}