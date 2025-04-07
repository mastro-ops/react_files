// src/api.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Update if needed

export const fetchStudent = async () => {
  const response = await axios.get(`${API_BASE_URL}/student/`);
  return response.data;
};

export const fetchSingleDegree = async (degreeCode) => {
  const response = await axios.get(`${API_BASE_URL}/cohort/?degree=${degreeCode}`);
  return response.data;
};

export const fetchSingleCohort = async (cohortId) => {
  const response = await axios.get(`${API_BASE_URL}/student/?cohort_id=${cohortId}`);
  return response.data;
};

export const fetchSingleModule = async (moduleCode) => {
  const response = await axios.get(`${API_BASE_URL}/module/${moduleCode}/`);
  return response.data;
};

export const fetchSingleStudent = async (studentId) => {
  const response = await axios.get(`${API_BASE_URL}/student/${studentId}/`);
  return response.data;
};

// Degree endpoints
export const fetchDegrees = async () => {
  const response = await axios.get(`${API_BASE_URL}/degree/`);
  return response.data;
};

export const createDegree = async (degreeData) => {
  const response = await axios.post(`${API_BASE_URL}/degree/`, degreeData);
  return response.data;
};

// Cohort endpoints
export const fetchCohorts = async () => {
  const response = await axios.get(`${API_BASE_URL}/cohort/`);
  return response.data;
};

export const createCohort = async (cohortData) => {
  const response = await axios.post(`${API_BASE_URL}/cohort/`, cohortData);
  return response.data;
};

// Module endpoints
export const fetchModules = async () => {
  const response = await axios.get(`${API_BASE_URL}/module/`);
  return response.data;
};

export const createModule = async (moduleData) => {
  const response = await axios.post(`${API_BASE_URL}/module/`, moduleData);
  return response.data;
};

export const fetchModulesByCohort = async (cohortId) => {
  const response = await axios.get(`${API_BASE_URL}/module/?cohort_id=${cohortId}`);
  return response.data;
};

// Student endpoints
export const createStudent = async (studentData) => {
  const response = await axios.post(`${API_BASE_URL}/student/`, studentData);
  return response.data;
};

export const fetchStudentGrades = async (studentId) => {
  const response = await axios.get(`${API_BASE_URL}/grade/?student=${studentId}`);
  return response.data;
};

export const setStudentGrade = async (gradeData) => {
  const response = await axios.post(`${API_BASE_URL}/grade/`, gradeData);
  return response.data;
};

