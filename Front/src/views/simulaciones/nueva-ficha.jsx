import React, { useState, useEffect } from "react";
import axios from "axios";
import { createSimulation } from "../../repositories/simulations";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function NuevaFicha() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userid = params.get("userId");

  const history = useHistory();
  const [state, setstate] = useState({
    userId: userid,
    userRut: "",
    totalAmount: "",
    startDate: "",
    endDate: "",
    interestRate: "",
    ufValue: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await createSimulation(state);
      history.push(
        `/detalle-simulacion/?simulationId=${response.data.id}&userId=${userid}`
      );
    } catch (error) {
      console.log(error);
      alert("Ha ocurrido un error al actualizar");
    }
  };

  const getUFValue = async () => {
    try {
      const response = await axios.get('https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=40aed7af8daabc8bdcf30f283916c2413e4e6099&formato=json');
      setstate({ ...state, ufValue: response.data.UFs[0].Valor });
    } catch (error) {
      console.error("Error al obtener el valor de la UF", error);
    }
  };

  useEffect(() => {
    getUFValue();
  }, []);

  return (
    <div className="container mt-4">
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="userRut">Rut del Usuario</label>
              <input
                className="form-control"
                id="userRut"
                type="text"
                value={state.userRut}
                onChange={(e) => {
                  setstate({ ...state, userRut: e.target.value });
                }}
                placeholder="Ingrese el Rut del usuario"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="totalAmount">Monto total</label>
              <input
                className="form-control"
                id="totalAmount"
                type="totalAmount"
                value={state.totalAmount}
                onChange={(e) => {
                  setstate({ ...state, totalAmount: e.target.value });
                }}
                placeholder="Ingrese el Monto total"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="startDate">Fecha de inicio</label>
              <input
                className="form-control"
                id="startDate"
                type="date"
                value={state.startDate}
                onChange={(e) => {
                  setstate({ ...state, startDate: e.target.value });
                }}
                placeholder="Ingrese startDate"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="endDate">Fecha de término</label>
              <input
                className="form-control"
                id="endDate"
                type="date"
                value={state.endDate}
                onChange={(e) => {
                  setstate({ ...state, endDate: e.target.value });
                }}
                placeholder="Ingrese endDate"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="interestRate">Ingrese el interés actual</label>
              <input
                className="form-control"
                id="interestRate"
                type="interestRate"
                value={state.interestRate}
                onChange={(e) => {
                  setstate({ ...state, interestRate: e.target.value });
                }}
                placeholder="Ingrese el interés"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="ufValue">Valor de la UF</label>
              <input
                className="form-control"
                id="ufValue"
                type="text"
                value={state.ufValue}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="float-right">
          <button type="submit" className="btn btn-primary">
            Guardar Simulacion
          </button>
        </div>
      </form>
      <Link to={`/menu-principal/?userId=${userid}`}>
        <button className="btn btn-primary">Volver al Menu Principal</button>
      </Link>
    </div>
  );
}


