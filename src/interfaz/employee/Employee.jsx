import React from 'react'
import Nav from '../components/Nav/Nav'

export default function Employee() {
  const apartados = ["Users", "Books", "Loan", "Reservate"]

  return (
    <div className='contenedorGeneralAdmin'>
      <Nav apartados = {apartados} />
    </div>
  )
}
