import React from 'react'
import { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar({ navbartoken, handleLogout }) {

    return (
        <>
            <div className='navbar-main'>
                <Link to="/pokedex" className='nav-link'>Pokedex</Link>
                <Link to="/pokemon-quiz" className='nav-link'>Game Corner</Link>
                <Link to="/pokemon-selection" className='nav-link'>Mystery Pull</Link>
                <Link to="/profile" className='nav-link'>Profile</Link>
                <Link to="/achievements" className='nav-link'> Achievements </Link>
                <button className='navbar-button' onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className='token'>
                <span className='count'> x{navbartoken} </span>
                <img src="assets/Project3Token.png" alt="token" className='tokenimage' />
            </div>
        </>
    )
}

export default Navbar