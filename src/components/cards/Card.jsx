import React from 'react'
import './Card.css'

export function Card({photo, name, categorie, description, editorial, autor}) {
    return (
        <div className="book">
            <h5>{name}</h5>
            <h5>{categorie}</h5>
            <h5>{description}</h5>
            <h5>{editorial}</h5>
            <h5>{autor}</h5>
            <div className="cover">
                <img src={photo} alt="" />
            </div>
        </div>
    )
}

export function Cards({photo, name, categorie, description, editorial, autor}) {
    return (
        <div className="book bookMasVistos">
            <h5>{name}</h5>
            <h5>{categorie}</h5>
            <h5>{description}</h5>
            <h5>{editorial}</h5>
            <h5>{autor}</h5>
            <div className="cover">
                <img src={photo} alt="" />
            </div>
        </div>
    )
}
