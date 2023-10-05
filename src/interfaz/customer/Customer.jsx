import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav/Nav';
import './Customer.css';
import CardCustomer from './components/CardCustomer';

export default function Customer() {
  const apartados = ["Loan"];
  const url = JSON.parse(import.meta.env.VITE_MY_CONFIG);
  const token = localStorage.getItem('token');
  const [newArrayCustomer, setNewArrayCustomer] = useState([]);

  const cargarCardsCustomer = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          "Accept-Version": "1.0.0"
        }
      };

      const respuesta = await (await fetch(`http://${url.hostname}:${url.port}/loan/bookCustomer`, config)).json();
      setNewArrayCustomer(respuesta);

    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    cargarCardsCustomer();
  }, []);

  return (
    <div className='contenedorGeneralAdmin'>
      <Nav apartados={apartados} />
      <div className='contenedorCustomer'>
        <h1>Loan</h1>
        <div className='contenedorCardsCustomer'>
          {newArrayCustomer.map((val, key) => (
            <div className='contenedorCartica' key={key}>
              <div className='contenedorPrestamo'>
                <h2>Loan Date: {val.date_loan}</h2>
              </div>
              <div className='contenedorGeneralBooksPrestados'>
                {val.fk_loan_book.map((book, index) => (
                  <div className="book" key={index}>
                    <h5>{book[0].name}</h5>
                    <h5>{book[0].categorie}</h5>
                    <h5>{book[0].sinopsis}</h5>
                    <h5>{book[0].editorial}</h5>
                    <h5>{book[0].autor}</h5>
                    <div className="cover">
                      <img alt="" src={book[0].photo} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
