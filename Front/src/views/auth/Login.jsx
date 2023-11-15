// Ejemplo simplificado de Login.jsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { logUser } from "../../repositories/login";


const Login = () => {
  const history = useHistory();

  const [state, setstate] = useState({});

  const handleLogin = async (e) => {
    // Lógica de autenticación, por ejemplo, usando fetch o Axios
    try {
        e.preventDefault();
        const response = await logUser(state);
        history.push(`/menu-principal/?userId=${response.data.id}`);
    } catch (error) {
      console.error("Error inesperado:", error);
    }
  };

  return (
    <div className="container mt-4">
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                    className="form-control"
                    id="name"
                    type="text"
                    value={state.nombre}
                    onChange={(e) => {
                        setstate({ ...state, name: e.target.value });
                    }}
                    placeholder="Ingrese Nombre"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    className="form-control"
                    id="password"
                    type="password"
                    value={state.password}
                    onChange={(e) => {
                        setstate({ ...state, password: e.target.value });
                    }}
                    placeholder="Ingrese contraseña"
                    required
                />
            </div>
            <div className="float-right">
                <button type="submit" className="btn btn-primary">
                    Guardar
                </button>
            </div>
        </form>
    </div>
   );
};

export default Login;
