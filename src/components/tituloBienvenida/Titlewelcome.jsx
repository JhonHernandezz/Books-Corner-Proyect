import React from 'react'
import './Titlewelcome.css'
import 'animate.css'; 


export default function Titlewelcome({clase, titulo}) {
  return (
    <div>
      <div className={clase} data-text={titulo}>{titulo}</div>
    </div>
  )
}
