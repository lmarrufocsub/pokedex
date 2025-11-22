import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PokedexList.css'
import PokemonDetails from './PokemonDetails'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function PokedexList() {

    const [pokemon, setPokemon] = useState([])
    const [selectedPokemondId, setSelectedPokemonId] = useState(null)
    const [pokemonDetails, setPokemonDetails] = useState(null)
    const [pokemonSpecies, setPokemonSpecies] = useState(null)
    const [pokedexIds, setPokedexIds] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        fetch(`http://localhost:5000/pokedex?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPokemon(data)
                const ids = data.map(p => p.id)
                setPokedexIds(ids)
            })
    }, [])

    useEffect(() => {
        if (!selectedPokemondId) {
            setPokemonDetails(null)
            return
        }

        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemondId}`)
            .then(res => res.json())
            .then(json => setPokemonDetails(json));
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemondId}`)
            .then(res => res.json())
            .then(json => setPokemonSpecies(json));
    }, [selectedPokemondId])

    return (
        <>
            <div className='pokedex-list-parent'>
                <div className='pokedex-list-main'>
                    {
                        pokemon.map((p) => {
                            return (
                                <button key={p.id} className={`pokemon-box type-${p.types[0]}`} onClick={() => setSelectedPokemonId(p.id)}>
                                    <p className='pokemon-number'>{p.id}</p>
                                    <img id='pokedex-sprite' src={`https://play.pokemonshowdown.com/sprites/ani/${p.name}.gif`} />
                                    <p className='pokemon-name'>{capitalize(p.name)}</p>
                                </button>
                            )
                        })
                    }
                </div>
                {
                    selectedPokemondId && (
                        <div className="pokemon-overlay" onClick={() => setSelectedPokemonId(null)}>
                            <div
                                className="pokemon-modal-shell"
                                onClick={(e) => e.stopPropagation()}
                            >
                                

                                {pokemonDetails && (
                                    <PokemonDetails pokemonDetails={pokemonDetails} pokemonSpecies={pokemonSpecies} pokemon={pokemon} setSelectedPokemonId={setSelectedPokemonId} pokedexIds={pokedexIds}/>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>

        </>
    )
}

export default PokedexList
