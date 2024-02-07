import React from 'react'
import { useState } from 'react'


export const About = () => {
 
  return (
    <div className='about'>
      <header>
        <div class="container">
            <h1>Üdvözöllek a Blogomban</h1>
            <p>Szia, én vagyok [Név], és ez az én kis sarkom az interneten, ahol megosztom gondolataimat, tapasztalataimat és inspirációimat és ahol akár te is megoszthatsz dolgokat.</p>
        </div>
    </header>
    <main>
        <div class="container">
            <h2>Legújabb bejegyzések</h2>
         
        </div>
    </main>
    <footer>
        <div class="container">
            <p>&copy; 2024 Blogom | Minden jog fenntartva</p>
            <div class="social-icons">
               
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
    </footer>
      
    </div>
  )
}

