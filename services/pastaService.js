// src/services/pastaService.js
import api from "./api";

export const getAllPastas = async () => {
  const response = await api.get("/pastas");
  return response.data;
};

export const getPastaById = async (id) => {
  const response = await api.get(`/pastas/${id}`);
  return response.data;
};

export const getFeatured = async () => {
  const response = await api.get("/pastas/featured");
  return response.data;
};
