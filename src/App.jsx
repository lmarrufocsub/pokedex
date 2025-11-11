import { useState } from 'react'
import './App.css'
import PokedexList from './PokedexList'
import PokemonDetails from './PokemonDetails'
import Navbar from './Navbar'

function App() {

  return (
    <div className='app'>
      <Navbar />
      <PokemonDetails />
      <PokedexList />
    </div>
  )
}

export default App
