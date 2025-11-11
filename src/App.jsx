import { useState } from 'react'
import './App.css'
import PokedexList from './PokedexList'
import PokemonDetails from './PokemonDetails'

function App() {

  return (
    <div className='app'>
      <PokemonDetails />
      <PokedexList />
    </div>
  )
}

export default App
