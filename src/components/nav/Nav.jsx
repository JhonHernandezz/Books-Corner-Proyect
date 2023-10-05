import React from 'react'
import { FaExpandArrowsAlt, FaList } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import './Nav.css'
import Logo from '../logo/Logo';

export default function Nav() {
  const redirect = useNavigate();
  const categoria = ["Home", "Catalogue", "Login"]
  
  return (
    <>
      <nav>
        <div className="wrapper">
          <Logo newClass = "logoNav" newClassLink='a-nav'/>
          <input type="radio" name="slider" id="menu-btn-inicio" />
          <input type="radio" name="slider" id="close-btn-inicio" />
          <ul className="nav-links-inicio">
            <label htmlFor="close-btn-inicio" className="btn close-btn-inicio"><FaExpandArrowsAlt /><i className="fas"></i></label>
            {categoria.map(categoria => {
              return <li key={categoria}><Link to={`/${categoria.toLowerCase()}`}>{categoria}</Link></li>
            })}
              
          </ul>
          <label htmlFor="menu-btn-inicio" className="btn menu-btn-inicio"><FaList /><i className="fas"></i></label>
        </div>
      </nav>
    </>
  )
}