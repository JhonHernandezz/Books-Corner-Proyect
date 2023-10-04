import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav/Nav.jsx';

import { Cards } from '../../components/cards/Card.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import catalogue from '../../img/inicio.jpg'

import './Catalogue.css'

export default function Catalogue() {

  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);

  const [newArray, setNewArray] = useState([]);

  const [searchTerm, setSearchCard] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [option, setOption] = useState('name');

  let consulta = async (e) => {
    try {

      let config = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }

      let respuesta = await (await fetch(`http://${url.hostname}:${url.port}/listar`, config)).json()

      setNewArray(respuesta);

    } catch (error) {
      alert(error);
    }

  }

  useEffect(() => { consulta() }, []);

  const filterCards = () => {
    const filtered = newArray.filter(card => {
      if (option === "name") {
        const cardName = card.name.toLowerCase();
        return cardName.includes(searchTerm.toLowerCase());
      } else {
        const cardAutor = card.autor.toLowerCase();
        return cardAutor.includes(searchTerm.toLowerCase());
      }
    });
    setFilteredCards(filtered);
  };

  useEffect(() => {
    filterCards();
  }, [searchTerm, option, newArray]);


  return (
    <>
      <Nav />
      <img src={catalogue} alt="" className='ImagenCatalogo' />
      <div className='contenedorCatalogo'>
        <h1>CATALOGUE</h1>
        <div className='contenedorSearch'>
          <div className="searchBox">
            <input className="searchInput" type="text" name="" placeholder="Search" value={searchTerm} onChange={(e) => setSearchCard(e.target.value)} />
            <button className="searchButton" href="#">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className='cartasCatalogue'>
          {filteredCards.map((val, id) => 
            <Cards key={id} photo={val.photo} name={val.name} categorie={val.categorie} description={val.sinopsis} editorial={val.editorial} autor={val.autor} />
          )}  
        </div>
      </div>
    </>
  )
}