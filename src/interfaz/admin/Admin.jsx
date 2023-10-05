import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav/Nav'

export default function Admin() {
  const apartados = ["Users", "Books", "Loan", "Reservate"]

  return (
    <div className='contenedorGeneralAdmin'>
      <Nav apartados = {apartados} />
    </div>
  )
}