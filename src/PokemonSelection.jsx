import { useState, useEffect } from 'react'
import './PokemonSelection.css'

function PokemonSelection({selectiontoken, handleUseToken}) {

async function fetchRandomPokemon(){
    const res = await fetch("http://localhost:5000/pokemonselection")
    const data = await res.json()

    setTimeout(() =>
    {setCurrentPokemon1({
        name: data[0].name,
        img:  `https://img.pokemondb.net/sprites/black-white/normal/${data[0].name}.png`
    })}, 500)

    setTimeout(() =>
    {setCurrentPokemon2({
        name: data[1].name,
        img:  `https://img.pokemondb.net/sprites/black-white/normal/${data[1].name}.png`
    })}, 500)

    setTimeout(() =>
    {setCurrentPokemon3({
        name: data[2].name,
        img:  `https://img.pokemondb.net/sprites/black-white/normal/${data[2].name}.png`
    })}, 500)

    setFlipped1(false)
    setFlipped2(false)
    setFlipped3(false)
}


useEffect(() => {
    fetchRandomPokemon()
}, [])

const [flipped1, setFlipped1] = useState()
const [currentPokemon1, setCurrentPokemon1] = useState()

function startFlip1()
{
   setFlipped1(!flipped1)
   handleUseToken()
}

const [flipped2, setFlipped2] = useState()
const [currentPokemon2, setCurrentPokemon2] = useState()

function startFlip2()
{
    setFlipped2(!flipped2)
    handleUseToken()
}

const [flipped3, setFlipped3] = useState()
const [currentPokemon3, setCurrentPokemon3] = useState()

function startFlip3()
{
    setFlipped3(!flipped3)
    handleUseToken()
}

if (!currentPokemon1) {
    return <p> Loading pokemon </p>
}

    return(
        <>
          <div className='pokemon-selection-main'
          style =
          {{
              backgroundImage: "url('/assets/Project3Selection.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
          }}
          >
          <div className = 'pokedex-selection-header'>
              <button onClick = {fetchRandomPokemon} className = "button"> Next Pokemon </button>
          </div>
          <div className= "pokemon-selection-group">
              <div className={`pokemon-selection-box ${flipped1 ?  'flipped' : ''}`} onClick = {startFlip1} >
                  <div className = 'inner'>
                      <div className = 'front'>
                          <img className='pokemon-selection-sprite' src= {currentPokemon1.img} alt= {currentPokemon1.name} />
                      </div>
                      <div className = 'back'>
                          <img className='pokemon-selection-sprite' src= {currentPokemon1.img} alt= {currentPokemon1.name} />
                     </div>
                  </div>
              </div>
              <div className={`pokemon-selection-box ${flipped2 ?  'flipped' : ''}`} onClick = {startFlip2} >
                  <div className = 'inner'>
                      <div className = 'front'>
                          <img className='pokemon-selection-sprite' src= {currentPokemon2.img} alt= {currentPokemon2.name} />
                      </div>
                      <div className = 'back'>
                          <img className='pokemon-selection-sprite' src= {currentPokemon2.img} alt= {currentPokemon2.name} />
                      </div>
                  </div>
              </div>
              <div className={`pokemon-selection-box ${flipped3 ?  'flipped' : ''}`} onClick = {startFlip3} >
                  <div className = 'inner'>
                      <div className = 'front'>
                          <img className='pokemon-selection-sprite' src= {currentPokemon3.img} alt= {currentPokemon3.name} />
                      </div>
                      <div className = 'back'>
                          <img className='pokemon-selection-sprite' src= {currentPokemon3.img} alt= {currentPokemon3.name} />
                      </div>
                  </div>
              </div>
          </div>
          </div>
        </>
    )
}

export default PokemonSelection