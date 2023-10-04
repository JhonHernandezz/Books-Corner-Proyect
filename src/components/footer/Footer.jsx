import React from 'react'
import './Footer.css'
import Logo from '../logo/Logo'
import Icon from '../icons/Icon'

export default function Footer() {
    let propiedadesIconos = [
        {
            index: 1,
            titulo: "Linkedin",
            clase: "icon linkedin",
            icono: "fab fa-linkedin"
        },
        {
            index: 2,
            titulo: "GitHub",
            clase: "icon github",
            icono: "fab fa-github"
        },
        {
            index: 3,
            titulo: "Google",
            clase: "icon gmail",
            icono: "fab fa-google"
        },
        {
            index: 4,
            titulo: "Instagram",
            clase: "icon instagram",
            icono: "fab fa-instagram"
        }
    ]

  return (
    <>
        <footer>
            <div className="social">
                <Logo newClass = "a-logo-footer" newClassLink = "a-footer"/>
                <ul className="wrapper-iconos">
                    {propiedadesIconos.map((val, index) => (
                        <Icon key={index} titulo = {val.titulo} clase = {val.clase} icono = {val.icono} />
                    ))}
                </ul>
            </div>
        </footer>
    </>
  )
}
