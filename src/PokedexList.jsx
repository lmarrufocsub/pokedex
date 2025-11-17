import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PokedexList.css'

function PokedexList() {

    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
            const userId = sessionStorage.getItem("userId");
            fetch(`http://localhost:5000/pokedex?userId=${userId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setPokemon(data)
                })

            console.log(pokemon)
        }, [])

    return (
        <>
            <div className='pokedex-list-main'>
                {
                    pokemon.map((p) => {
                        return (
                            <Link key={p.id} to={`/pokemon-details/${p.id}`} className='pokemon-box'>
                                <p className='pokemon-number'>{p.id}</p>
                                <img id='pokedex-sprite' src={`https://play.pokemonshowdown.com/sprites/ani/${p.name}.gif`} />
                                <p>{p.name}</p>
                                </Link>
                        )
                    })
                }
            </div>

        </>
    )
}

export default PokedexList
