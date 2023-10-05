import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Logo.css'


export default function Logo(props) {
  return (
    <div className={props.newClass}><Link to={`/home`} className={props.newClassLink}>Books Corner</Link></div>
  )
}
