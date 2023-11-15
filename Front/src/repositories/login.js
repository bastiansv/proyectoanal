import axios from "axios";

const logUser = async (data) =>
	axios
		.put(`${process.env.REACT_APP_BACKEND_URL}/login`, data);

const findLoggedUser = async(data) =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/login`, data);
		
export {logUser};