import React from 'react'
import './Icons.css'

export default function Icon({titulo, clase, icono}) {

  return (
    
        <a href="https://www.linkedin.com/in/jhonhernandez1899/" target="_blank" className='a-icons'>
            <li className={clase}>
                <span className="tooltip">{titulo}</span>
                <span><i className={icono}></i></span>
            </li>
        </a>
                    
   
  )
}



/* 

<a href="https://github.com/JhonEduardAlmeidaHernandezCampus" target="_blank">
                        <li className="icon github">
                        <span className="tooltip">GitHub</span>
                        <span><i className="fab fa-github"></i></span>
                        </li>
                    </a>
                    <a href="https://mail.google.com/mail/u/0/#inbox?compose=new" target="_blank">
                        <li className="icon gmail">
                        <span className="tooltip">Gmail</span>
                        <span><i className="fab fa-google"></i></span>
                        </li>
                    </a>
                    <a href="https://www.instagram.com/jhon._.hernandez/" target="_blank">
                        <li className="icon instagram">
                        <span className="tooltip">Instagram</span>
                        <span><i className="fab fa-instagram"></i></span>
                        </li>
                    </a>
                    
                    */