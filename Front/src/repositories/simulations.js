import axios from "axios";

const getAllSimulations = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/simulations`)
		.then((res) => res.data);

const createSimulation = async (data) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/simulations`, data);

export {getAllSimulations,createSimulation};