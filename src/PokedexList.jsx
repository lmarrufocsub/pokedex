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
                            <Link key={p.pokemon_id} to={`/pokemon-details/${p.pokemon_id}`} className='pokemon-box'>
                                <p className='pokemon-number'>{p.pokemon_id}</p>
                                <img id='pokedex-sprite' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.pokemon_id}.png`} />
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
