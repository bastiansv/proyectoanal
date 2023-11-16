import React, { useState } from "react";
import { createSimulation } from "../../repositories/simulations";
import { useLocation,useHistory} from "react-router-dom";

export default function NuevaFicha () {
	const { search } = useLocation();
  	const params = new URLSearchParams(search);
  	const userid = params.get("userId");

    const history = useHistory();
	const [state, setstate] = useState({
		userId: userid, // Asignar userId directamente al estado al inicio
	  });

	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const response = await createSimulation(state);
			history.push(`/menu-principal/${userid}`);	
		} catch (error) {
			console.log(error);
			alert("A ocurrido un error al actualizar");
		}
	};

	return (
		<div className="container mt-4">
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label htmlFor="clientId">clientId</label>
					<input
						className="form-control"
						id="clientId"
						type="text"
						value={state.clientId}
						onChange={(e) => {
							setstate({ ...state, clientId: e.target.value });
						}}
						placeholder="Ingrese clientId"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="totalAmount">totalAmount</label>
					<input
						className="form-control"
						id="totalAmount"
						type="totalAmount"
						value={state.totalAmount}
						onChange={(e) => {
							setstate({ ...state, totalAmount: e.target.value });
						}}
						placeholder="Ingrese totalAmount"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="startDate">startDate</label>
					<input
						className="form-control"
						id="startDate"
						type="startDate"
						value={state.startDate}
						onChange={(e) => {
							setstate({ ...state, startDate: e.target.value });
						}}
						placeholder="Ingrese startDate"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="endDate">endDate</label>
					<input
						className="form-control"
						id="endDate"
						type="endDate"
						value={state.endDate}
						onChange={(e) => {
							setstate({ ...state, endDate: e.target.value });
						}}
						placeholder="Ingrese endDate"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="interestRate">interestRate</label>
					<input
						className="form-control"
						id="interestRate"
						type="interestRate"
						value={state.interestRate}
						onChange={(e) => {
							setstate({ ...state, interestRate: e.target.value });
						}}
						placeholder="Ingrese interestRate"
						required
					/>
				</div>
				<div className="float-right">
					<button type="submit" className="btn btn-primary">
						Guardar Simulacion
					</button>
				</div>
			</form>
		</div>
	);
}

