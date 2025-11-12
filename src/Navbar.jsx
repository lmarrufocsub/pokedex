import React from 'react'
import './Navbar.css'

function Navbar() {
    return (
        <div className='navbar-main'>
            <p>Pokedex</p>
            <p>Game Corner</p>
            <p>Mystery Pull</p>
            <p>Profile</p>
            <button className='navbar-button'>Login</button>
        </div>
    )
}

export default Navbar