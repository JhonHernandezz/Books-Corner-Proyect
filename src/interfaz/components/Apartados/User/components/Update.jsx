import React, { useEffect, useState } from 'react'
import '../../Styles/StylesApartados.css'

export default function Update({ nit }) {

  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
  let token = localStorage.getItem('token')

  const [role, setRole] = useState('');
  const [NIT, setNIT] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  let pintarInputs = async () => {
    let config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'Accept-Version': '3.0.0'
      }
    }

    let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/user/consultar/id/${nit}`, config)).json()

    if (respuesta.length > 0) {
      const userData = respuesta[0];

      setRole(userData.role);
      setNIT(userData.nit);
      setPassword(userData.password);
      setName(userData.name);
      setPhone(userData.phone);
      setAddress(userData.address);
      setEmail(userData.email);
    }
  }

  useEffect(() => { pintarInputs() }, [])

  const handleActualizar = async (e) => {
    e.preventDefault()

    try {
      let config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          "Accept-Version": "3.0.0",
        },
        body: JSON.stringify({ role, nit, password, name, phone, address, email })
      }
  
      let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/user/update/${nit}`, config)).json()
  
       if (respuesta.status === 200) {
        alert('Registro actualizado con éxito.')
        window.location.reload()
      } else {
        alert(respuesta.message)
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleSalir = () => {
    let salir = confirm("¿Estás seguro de que quiere salir?");
    if (salir) {
      window.location.reload();
    }
  }

  return (
    <div className='contentUpdate'>

      <form onSubmit={handleActualizar} className='formAddAndPut'>
        <div className="input-container">
          <select className="input" name="role" disabled>
            <option value={role} onChange={(e) => setRole(e.target.value)}>{role}</option>
          </select>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="nit" type="number" defaultValue={nit} onChange={(e) => setNIT(e.target.value)} disabled />
          <label className="label" htmlFor="input">Enter Your Nit</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <label className="label" htmlFor="input">Enter Your Password</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
          <label className="label" htmlFor="input">Enter Your Name</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <label className="label" htmlFor="input">Enter Your Phone</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <label className="label" htmlFor="input">Enter Your Address</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <input className="input" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label className="label" htmlFor="input">Enter Your Email</label>
          <div className="topline"></div>
          <div className="underline"></div>
        </div>

        <div className='contenedorBoton'>
          <button className='optionSend'>SEND</button>
        </div>

      </form>

      <div className='contenedorBotonSalirUser'>
        <button className='optionExit' onClick={handleSalir}>EXIT</button>
      </div>

    </div>
  )
}
