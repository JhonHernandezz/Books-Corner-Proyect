import React, {useState, useEffect} from 'react';
import './Home.css'

import Nav from '../../components/nav/Nav.jsx';
import imgHome from '../../img/Biblioteca_panoramica.jpg'
import Titlewelcome from '../../components/tituloBienvenida/Titlewelcome.jsx';
import { Card } from '../../components/cards/Card.jsx';
import Containercards from './containers/Containercards.jsx';
import Cardabout from './components/card about/Cardabout.jsx';

import ImageContact from '../../img/HD-wallpaper-books-dark-shelf-library.jpg'

import 'animate.css'; 
import { faFlag, faBinoculars, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { Contact, Contacticons, Contactoform } from './components/Contact/Contact';

export default function Home() {

  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);

  const [newArray, setNewArray] = useState([]);

  let consulta = async(e) => {

    try {
        let options = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }

        const respuesta = await(await fetch(`http://${url.hostname}:${url.port}/listar`, options)).json()

        setNewArray(respuesta.slice(0, 3));

    } catch (error) {
        console.log(error);
    }
  }

  let title = [
    {
      index: 1,
      clase: "glitch animate__animated animate__backInDown",
      titulo: "WELCOME"
    },
    {
      index: 2,
      clase: "sinClase animate__animated animate__backInDown",
      titulo: "TO"
    },
    {
      index: 3,
      clase: "sinClase glitch animate__animated animate__backInDown",
      titulo: "BOOKS CORNER"
    }
  ]

  let ContentAbout = [
    {
      index: 1,
      titulo: "Mission",
      icono: faFlag
    },
    {
      index: 2,
      titulo: "Objective",
      icono: faBullseye
    },
    {
      index: 3,
      titulo: "Vision",
      icono: faBinoculars
    }
  ]

  let infoContact = [
    {
      index: 1,
      titulo: "We appreciate your interest in contacting us.",
    },
    {
      index: 2,
      titulo: "Please complete the fields below with the required information and your message.",
    },
    {
      index: 3,
      titulo: "We will contact you as soon as possible.",
    }
  ]

  let infoUbiContact = [
    {
      index: 1,
      icono: faMapMarkerAlt,
      texto: "Piedecuesta - Santander"
    },
    {
      index: 2,
      icono: faPhone,
      texto: "+57 3005527841"
    },
    {
      index: 3,
      icono: faEnvelope,
      texto: "Jhonhernandez.campus@gmail.com"
    }
  ]

useEffect(() => {consulta()}, []); 

  return (
    <div>
      <Nav />
      <div className='imgHome'>
        <img src={imgHome} />
        <div className='title'>
          {title.map((val, index) => (
            <Titlewelcome key = {index} clase = {val.clase} titulo = {val.titulo}  />
          ))}
        </div>
      </div>

      <Containercards>
        <div className='cards'>
          <h1 className='titloBooks animate__animated animate__lightSpeedInLeft'>ABOUT</h1>
          <div className='contenedorCardAbout'>
            {ContentAbout.map((val, index) => (
              <Cardabout key = {index} titulo = {val.titulo} icono = {val.icono} />
            ))}
          </div>
        </div>
      </Containercards>
      
      <Containercards>
        <div className='card'>
          <h1 className='titloBooks animate__animated animate__lightSpeedInLeft'>MOST VIEWED BOOKS</h1>
          <div className='contenedorCartas'>
            {newArray.map((val, id) => (
              <Card key={id} photo={val.photo} name={val.name} categorie={val.categorie} description={val.sinopsis} editorial={val.editorial} autor={val.autor} />
            ))}
          </div>
        </div>
      </Containercards>

      <Containercards>
        <div className='contentContact'>
          <h1 className='titloBooks animate__animated animate__lightSpeedInLeft'>CONTACT</h1>
          <div className='ContentHijoContact'>
            <div className='ContentLeft'>
                <img src={ImageContact} alt="" />
                  <div className='contentInfo'>
                    <h3 className='tituloContacto'>Have Any Questions?</h3> 
                    {infoContact.map((val, index) => (
                      <Contact key = {index} titulo = {val.titulo}  />
                    ))}
                    <div className='contentIconContact'>
                      {infoUbiContact.map((val, index) => (
                        <Contacticons key = {index} texto = {val.texto} icono = {val.icono}  />
                      ))}
                    </div>
                  </div>
            </div>
            <div className='ContentRight'>
              <Contactoform />
            </div>
          </div>
        </div>
      </Containercards>
      
    </div>
  )
}


// https://codepen.io/ig_design/pen/KKVQpVP
// https://codepen.io/baahubali92/pen/oVGRYg
// https://facturacionweb.site/blog/formularios-contacto-html5-gratis/
// https://codepen.io/uiswarup/pen/XWdXGGV
// https://codepen.io/search/pens?q=not+found+