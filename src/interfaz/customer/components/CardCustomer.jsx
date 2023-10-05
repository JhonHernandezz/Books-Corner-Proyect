import React from 'react'

export default function CardCustomer({title}) {
    console.log(title);
    return (
        <div className='contenedorCartica'>
            <div className='contenedorPrestamo'>
                <h2>Prestamo # {title}</h2>
            </div>
            <div className='contenedorGeneralBooksPrestados'>
                <div className="book">
                    <h5></h5>
                    <h5>2</h5>
                    <h5>3</h5>
                    <h5>4</h5>
                    <h5>5</h5>
                    <div className="cover">
                        <img  alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
