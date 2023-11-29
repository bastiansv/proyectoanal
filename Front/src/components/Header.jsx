import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <div>
            <Navbar bg="dark" variant="dark" className="d-flex justify-content-between align-items-center">
            <Navbar.Brand href="#home">
            <div>Financiera la Clave</div>
            
            
            </Navbar.Brand>
            <div> <Link to={`/`}>
                <button className="btn btn-secondary">Cerrar Sesión</button>
            </Link></div>
            </Navbar>
            
        </div>
       
    )
}

