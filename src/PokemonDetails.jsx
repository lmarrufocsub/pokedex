import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './PokemonDetails.css'
function PokemonDetails() {
    const { id } = useParams()
    const currentId = Number(id)
    
    const navigate = useNavigate()
    const [pokemon, setPokemon] = useState(null)
    const [species, setSpecies] = useState(null)
    const [pokedexIds, setPokedexIds] = useState([]);

    const currentIndex = pokedexIds.indexOf(currentId);

    const prevId = currentIndex > 0 ? pokedexIds[currentIndex - 1] : null;

    const nextId =
        currentIndex !== -1 && currentIndex < pokedexIds.length - 1
            ? pokedexIds[currentIndex + 1]
            : null;

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(json => setPokemon(json));

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then(res => res.json())
            .then(json => setSpecies(json));
    }, [id])

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");

        fetch(`http://localhost:5000/pokedex?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                // data: [{ id, name }, ...]
                const ids = data.map(p => p.pokemon_id).sort((a, b) => a - b);
                setPokedexIds(ids);
            });
    }, []);

    if (!pokemon || !species) return <p>Loading...</p>

    const entry = species.flavor_text_entries.find(
        (e) => e.language.name === "en"
    );
    const description = entry ? entry.flavor_text.replace(/\s+/g, " ") : "";

    return (
        <div className='pokemon-details-container'>
            <div className='pokemon-details-top'>
                <span className="material-symbols-outlined arrow-back" onClick={() => navigate("/pokedex")}>arrow_back</span>
                <p className='pokemon-details-name'>{pokemon.name}</p>
                <p className='pokemon-details-number subtitle-2'>#{pokemon.id}</p>
            </div>
            <div className='pokemon-details-upper'>
                <span className="material-symbols-outlined chevron" onClick={() => prevId && navigate(`/pokemon-details/${prevId}`)}
                    disabled={!prevId}>chevron_left</span>
                <img className='pokemon-sprite' src={pokemon.sprites.other["official-artwork"].front_default} alt="Bulbasaur" />
                <span className="material-symbols-outlined chevron" onClick={() => nextId && navigate(`/pokemon-details/${nextId}`)}
                    disabled={!nextId}>chevron_right</span>
            </div>

            <div className='pokemon-details-lower'>
                <div className='pokemon-details-types'>
                    {
                        pokemon.types.map(t => (
                            <p className='pokemon-details-type'>{t.type.name}</p>
                        ))
                    }
                </div>
                <div>
                    <p className='subtitle-1 pokemon-details-about'>About</p>
                </div>
                <div className='pokemon-details-info-container'>
                    <div className='pokemon-details-info'>
                        <div className='pokemon-details-values'>
                            <span className="material-symbols-outlined">weight</span>
                            <p>{pokemon.weight}kg</p>
                        </div>

                        <p className='caption'>Weight</p>
                    </div>
                    <div className='pokemon-details-info-border'></div>
                    <div className='pokemon-details-info' >
                        <div className='pokemon-details-values'>
                            <span className="material-symbols-outlined">height</span>
                            <p>{pokemon.height}kg</p>
                        </div>
                        <p className='caption'>Height</p>
                    </div>
                    <div className='pokemon-details-info-border'></div>
                    <div className='pokemon-details-info'>
                        <div>
                            {pokemon.moves.slice(0, 2).map(m => (
                                <p key={m.move.name}>{m.move.name}</p>
                            ))}
                        </div>
                        <p className='caption'>Moves</p>
                    </div>
                </div>
                <div className='pokemon-details-description'>
                    {description}
                </div>
                <div className='pokemon-details-all-stats'>
                    <p className='subtitle-1'>Base Stats</p>
                    <div className='pokemon-details-stat'>
                        <div className='pokemon-details-stat-labels'>
                            <p className='subtitle-3'>HP</p>
                            <p className='subtitle-3'>ATK</p>
                            <p className='subtitle-3'>DEF</p>
                            <p className='subtitle-3'>SATK</p>
                            <p className='subtitle-3'>SDEF</p>
                            <p className='subtitle-3'>SPD</p>
                        </div>
                        <div className='pokemon-details-border'>

                        </div>
                        <div>
                            {/* <div className='pokemon-details-stat-right'>
                                <p>999</p>
                                <div className='pokemon-details-stat-line'></div>
                            </div> */}
                            {pokemon.stats.map((s) => (
                                <div className='pokemon-details-stat-right' key={s.stat.name}>
                                    <p>
                                        {s.base_stat}
                                    </p>
                                    <div className='pokemon-details-stat-line'></div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PokemonDetails