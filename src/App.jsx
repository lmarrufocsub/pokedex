import { useState } from 'react'
import './App.css'
import PokedexList from './PokedexList'
import PokemonDetails from './PokemonDetails'
import PokemonSelection from './PokemonSelection'
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonQuiz from './PokemonQuiz';

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/pokedex' element={<PokedexList />} />
          <Route path='/pokemon-details' element={<PokemonDetails />}/>
          <Route path='/pokemon-quiz' element={<PokemonQuiz />} />
          <Route path='/pokemon-selection' element={<PokemonSelection />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
