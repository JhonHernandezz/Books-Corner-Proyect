import React from 'react'
import './Cardabout.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Cardabout({titulo, icono}) {
  return (
    <div className="card-about">
      <FontAwesomeIcon icon={icono} className='iconosAbout'/>
      <h2 className='tituloAbout'>{titulo}</h2>
    </div>
  )
}
