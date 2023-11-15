import Navbar from 'react-bootstrap/Navbar';
import React from 'react'

export default function Header() {

    return (
       <Navbar bg="dark" variant="dark" className="d-flex justify-content-between align-items-center">
            <Navbar.Brand href="#home">
            <div>Financiera la Clave</div>
        
            </Navbar.Brand>
        </Navbar>
    )
}

