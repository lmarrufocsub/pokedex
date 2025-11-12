import { useState } from 'react'
import './PokemonSelection.css'

function PokemonSelection() {

    var randomPokemon
    const pokemonList =
    [
        { "number": "#1",  "name": "Bulbasaur",   "img": "https://img.pokemondb.net/sprites/black-white/normal/bulbasaur.png",   "type": "Grass / Poison" },
        { "number": "#2",  "name": "Ivysaur",     "img": "https://img.pokemondb.net/sprites/black-white/normal/ivysaur.png",     "type": "Grass / Poison" },
        { "number": "#3",  "name": "Venusaur",    "img": "https://img.pokemondb.net/sprites/black-white/normal/venusaur.png",    "type": "Grass / Poison" },
        { "number": "#4",  "name": "Charmander",  "img": "https://img.pokemondb.net/sprites/black-white/normal/charmander.png",  "type": "Fire" },
        { "number": "#5",  "name": "Charmeleon",  "img": "https://img.pokemondb.net/sprites/black-white/normal/charmeleon.png",  "type": "Fire" },
        { "number": "#6",  "name": "Charizard",   "img": "https://img.pokemondb.net/sprites/black-white/normal/charizard.png",   "type": "Fire / Flying" },
        { "number": "#7",  "name": "Squirtle",    "img": "https://img.pokemondb.net/sprites/black-white/normal/squirtle.png",    "type": "Water" },
        { "number": "#8",  "name": "Wartortle",   "img": "https://img.pokemondb.net/sprites/black-white/normal/wartortle.png",   "type": "Water" },
        { "number": "#9",  "name": "Blastoise",   "img": "https://img.pokemondb.net/sprites/black-white/normal/blastoise.png",   "type": "Water" }
    ]



function getRandomPokemon()
{
     randomPokemon = Math.floor(Math.random() * pokemonList.length)
     return pokemonList[randomPokemon]
}

const [flipped1, setFlipped1] = useState(false)
const [currentPokemon1, setCurrentPokemon1] = useState(getRandomPokemon())

function startFlip1()
{
   setFlipped1(!flipped1)
}


function nextPokemon1()
{
   setFlipped1(false)
   setTimeout(() =>
   {setCurrentPokemon1(getRandomPokemon())}, 500)

}

const [flipped2, setFlipped2] = useState(false)
const [currentPokemon2, setCurrentPokemon2] = useState(getRandomPokemon())

function startFlip2()
{
   setFlipped2(!flipped2)
}


function nextPokemon2()
{
   setFlipped2(false)
   setTimeout(() =>
   {setCurrentPokemon2(getRandomPokemon())}, 500)
}

const [flipped3, setFlipped3] = useState(false)
const [currentPokemon3, setCurrentPokemon3] = useState(getRandomPokemon())

function startFlip3()
{
   setFlipped3(!flipped3)
}


function nextPokemon3()
{
   setFlipped3(false)
   setTimeout(() =>
   {setCurrentPokemon3(getRandomPokemon())}, 500)
}

    return(
        <>
          <div className='pokedex-selection-main'>
              <div className={`pokemon-selection-box ${flipped1 ?  'flipped' : ''}`} onClick = {startFlip1} >
                  <div className = 'inner'>
                      <div className = 'front'>
                          <img className='pokemon-selection-sprite' src= {currentPokemon1.img} alt= {currentPokemon1.name} />
                      </div>
                      <div className = 'back'>
                          <p className='pokemon-selection-number'> {currentPokemon1.number}</p>
                          <img className='pokemon-selection-sprite' src= {currentPokemon1.img} alt= {currentPokemon1.name} />
                          <p className='pokemon-selection-name'> {currentPokemon1.name}</p>
                     </div>
                  </div>
              </div>
              <div className={`pokemon-selection-box ${flipped2 ?  'flipped' : ''}`} onClick = {startFlip2} >
                  <div className = 'inner'>
                      <div className = 'front'>
                          <img className='pokemon-selection-sprite' src= {currentPokemon2.img} alt= {currentPokemon2.name} />
                      </div>
                      <div className = 'back'>
                          <p className='pokemon-selection-number'> {currentPokemon2.number}</p>
                          <img className='pokemon-selection-sprite' src= {currentPokemon2.img} alt= {currentPokemon2.name} />
                          <p className='pokemon-selection-name'> {currentPokemon2.name}</p>
                      </div>
                  </div>
              </div>
              <div className={`pokemon-selection-box ${flipped3 ?  'flipped' : ''}`} onClick = {startFlip3} >
                  <div className = 'inner'>
                      <div className = 'front'>
                          <img className='pokemon-selection-sprite' src= {currentPokemon3.img} alt= {currentPokemon3.name} />
                      </div>
                      <div className = 'back'>
                          <p className='pokemon-selection-number'> {currentPokemon3.number}</p>
                          <img className='pokemon-selection-sprite' src= {currentPokemon3.img} alt= {currentPokemon3.name} />
                          <p className='pokemon-selection-name'> {currentPokemon3.name}</p>
                      </div>
                  </div>
              </div>
          <button onClick = {function() {nextPokemon1(); nextPokemon2() ;nextPokemon3();}} className = "button"> Next Pokemon </button>
          </div>
        </>
    )
}

export default PokemonSelection


