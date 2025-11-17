import React from 'react'
import {useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

function Navbar({navbartoken}) {
    return (
     <>
        <div className='navbar-main'>
            <Link to="/pokedex">Pokedex</Link>
            <Link to="">Game Corner</Link>
            <Link to="/pokemon-selection">Mystery Pull</Link>
            <p>Profile</p>
            <button className='navbar-button'>
                <Link to="/login">Login</Link>
            </button>
        </div>
        <div className = 'token'>
            <span className = 'count'> x{navbartoken} </span>
            <img src = "assets/Project3Token.png" alt = "token" className = 'tokenimage'/>
        </div>
     </>
    )
}

export default Navbar