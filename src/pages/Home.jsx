import React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import './Home.css'


export const Home = () => {
 
  return (
    <div className='about'>
      <div className='about-header'>
        <div className="about-container">
            <div className="about-content">
                <div className="about-text">
                    <h1>Üdvözöllek a Blogomban</h1>
                    <p>Szia, én vagyok <b>KAM</b> vagyok, ez a vegyjelem a suliban,
                     és ez az én kis sarkom az interneten, ahol megosztom gondolataimat, tapasztalataimat és inspirációimat 
                     és ahol akár te is megoszthatsz dolgokat ha szeretnél. </p>
                </div>
                <div className="about-image">
                <AnimatePresence mode="wait">
                    <motion.img 
                     initial={{ y: 10, opacity: 0 }}
                     animate={{ y: 0, opacity: 1,rotate:10 }}
                     exit={{ y: -10, opacity: 0 }}
                     transition={{ duration: 0.2 }}
                    src="me.jpg" alt="me" className='rotated' />
                    </AnimatePresence>
                </div>
            </div>
        </div>
    </div>
    <div className='about-main'>
        <div className="about-container">
            <h2>Legújabb bejegyzések</h2>
            <div className="about-card">Bejegyzés 1</div>
            <div className="about-card">Bejegyzés 2</div>
            <div className="about-card">Bejegyzés 3</div>
        </div>
    </div>
    <footer>
        <div className="about-container">
            <p>&copy; 2024 Blogom | Minden jog fenntartva</p>
            <div className="social-icons">
               
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
        </div>
    </footer>
      
    </div>
  )
}

