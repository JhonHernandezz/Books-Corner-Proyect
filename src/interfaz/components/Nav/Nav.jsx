import React, { useEffect, useState } from 'react';
import { FaExpandArrowsAlt, FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import logoUser from "../../../img/user.png"
import Logo from '../../../components/logo/Logo'

import User from '../Apartados/User/User';
import Book from '../Apartados/Book/Book';
import Loan from '../Apartados/Loan/Loan';
import Reservate from '../Apartados/Reservate/Reservate';

import './Nav.css'

export default function Nav({apartados}) {
    const redirect = useNavigate();
    const apartadoPagina = [...apartados]

    const [component, setComponent] = useState("")
    
    const [nombre, setNombre] = useState('')
    const [role, setRole] = useState('')

    let consulta = async () => {
        let token = localStorage.getItem("token")

        try {

            let config = {
                method: "GET",
                headers: new Headers(
                    {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                )
            }

            let respuesta = await (await fetch('http://127.10.10.10:5130/obtenerDataUser', config)).json()

            if (respuesta.status === 202) {
                setNombre(respuesta.message[0].name)
                setRole(respuesta.message[0].role.toUpperCase())
            } else {
                alert(respuesta.message)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { consulta() }, [])

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("rol")
        redirect('/')
    }

    const handleCategoriaClick = (categoria) => {
        setComponent(categoria);
    };

    return (
        <>
            <nav className='navUsuario'>
                <div className="wrapperUser">
                    <Logo newClass="logoUser" newClassLink='a-nav' />
                    <input type="radio" name="slider" id="menu-btn-inicio-admin" />
                    <input type="radio" name="slider" id="close-btn-inicio-admin" />
                    <ul className="nav-links-admin">
                    
                    <h2 className='Role'>{role}</h2>
                        <label htmlFor="close-btn-inicio-admin" className="btn close-btn-inicio-admin"><FaExpandArrowsAlt /><i className="fas"></i></label>
                        <div className='contenedorImagenNombre'>
                            <img src={logoUser} alt="" className='imagenUser' />
                            <h1 className='nombreUser'>{nombre}</h1>
                        </div>
                        <div className='contenedorApartados'>
                            <div className='contenedoresHijosApartados'>
                                {apartadoPagina.map((categoria, index) => {
                                    return <button key={index} className='apartadosOpciones' onClick={() => handleCategoriaClick(categoria)}>{categoria}</button>
                                })}
                            </div>
                        </div>
                        <div className='contenedorBotonSalir'>
                            <button className="learn-more" onClick={logout}>
                                <span aria-hidden="true" className="circle">
                                    <span className="icon arrow"></span>
                                </span>
                                <span className="button-text">Logout</span>
                            </button>
                        </div>
                    </ul>
                    <label htmlFor="menu-btn-inicio-admin" className="btn menu-btn-inicio-admin"><FaList /><i className="fas"></i></label>
                </div>
            </nav>
            <div className='contenedorInformacion'>
                <h1>WELCOME</h1>
                <div className="loader"></div>
                {component === 'Users' && <User role = {role}/>}
                {component === 'Books' && <Book role = {role}/>}
                {component === 'Loan' && <Loan role = {role}/>}
                {component === 'Reservate' && <Reservate role = {role}/>}
            </div>
        </>
    );
}