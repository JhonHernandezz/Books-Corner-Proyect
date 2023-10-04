import React from 'react'
import './Contact.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Contact(props) {
    return (
        <>
            <p className='parrafoContact1'>{props.titulo}</p>
        </>
    )
}

export function Contacticons({texto, icono}) {
    return (
        <div className='contenedorGeneralIconos'>
           <FontAwesomeIcon icon={icono} className='iconosContact'/>
           <h2 className='textoContacto'>{texto}</h2>
        </div>
    )
}

export function Contactoform() {
    return (
        <>
            <form action="" className='formularioContacto'>
                <div className='inputText'>
                    <input type="text" placeholder='Enter your name' required/>
                </div>
                <div className='inputText'>
                    <input type="text" placeholder='Enter your phone' required/>
                </div>
                <div className='inputText'>
                    <input type="text" placeholder='Enter your email' required/>
                </div>
                <div className='inputText'>
                    <textarea placeholder='Message' required/>
                    </div>
                    <button data-text="Awesome" className="button">
                        <span className="actual-text">&nbsp;Send&nbsp;</span>
                        <span className="hover-text" aria-hidden="true">&nbsp;Send&nbsp;</span>
                    </button>
            </form>
        </>
    )
}