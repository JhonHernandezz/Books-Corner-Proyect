import React from 'react'
import Nav from '../../components/nav/Nav'

import Form from './components/Form'
import ImagenLogin from '../../img/catalogue.jpg'

import './Login.css'

export default function Login() {
  return (
    <div className='contenedorLogin'>
        <img src={ImagenLogin} alt="" className='imagenLogin' />
        <Form />
    </div>
  )
}