import axios from "axios";

const getAllSimulations = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/simulations`)
		.then((res) => res.data);

const getSimulationsbyUserId = (data) =>
	axios
		.put(`${process.env.REACT_APP_BACKEND_URL}/simulations/all`,data)
		.then((res) => res.data);

const createSimulation = async (data) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/simulations`, data);

const getSimulationById = (id) =>
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/simulations/${id}`)
			.then((res) => res.data);

export {getAllSimulations,createSimulation,getSimulationById,getSimulationsbyUserId};