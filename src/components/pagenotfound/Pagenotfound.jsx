import React from 'react'
import './Pagenotfound.css'

export default function Pagenotfound() {
  return (
    <div className='positionAbsolutePage'>
      <div className='contenedorColor'>

        <div>
          <div class="starsec"></div>
          <div class="starthird"></div>
          <div class="starfourth"></div>
          <div class="starfifth"></div>
        </div>

        <div class="lamp__wrap">
          <div class="lamp">
            <div class="cable"></div>
            <div class="coverLampara"></div>
            <div class="in-cover">
              <div class="bulb"></div>
            </div>
            <div class="light"></div>
          </div>
        </div>
        <section class="error">
          <div class="error__content">
            <div class="error__message message">
              <h1 class="message__title">Page Not Found</h1>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
