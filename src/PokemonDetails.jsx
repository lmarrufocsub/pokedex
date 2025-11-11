import React from 'react'
import './PokemonDetails.css'
function PokemonDetails() {
    return (
        <div className='pokemon-details-container'>
            <div className='pokemon-details-top'>
                <span className="material-symbols-outlined arrow-back">arrow_back</span>
                <p className='pokemon-details-name'>Pokemon Name</p>
                <p className='pokemon-details-number subtitle-2'>#999</p>
            </div>
            <div className='pokemon-details-upper'>
                <span className="material-symbols-outlined chevron">chevron_left</span>
                <img className='pokemon-sprite' src="https://img.pokemondb.net/sprites/black-white/normal/bulbasaur.png" alt="Bulbasaur" />
                <span className="material-symbols-outlined chevron">chevron_right</span>
            </div>

            <div className='pokemon-details-lower'>
                <div className='pokemon-details-types'>
                    <p className='pokemon-details-type'>Type</p>
                    <p className='pokemon-details-type'>Type</p>
                </div>
                <div>
                    <p className='subtitle-1 pokemon-details-about'>About</p>
                </div>
                <div className='pokemon-details-info-container'>
                    <div className='pokemon-details-info'>
                        <div className='pokemon-details-values'>
                            <span className="material-symbols-outlined">weight</span>
                            <p>9.9kg</p>
                        </div>

                        <p className='caption'>Weight</p>
                    </div>
                    <div className='pokemon-details-info-border'></div>
                    <div className='pokemon-details-info' >
                        <div className='pokemon-details-values'>
                            <span className="material-symbols-outlined">height</span>
                            <p>9.9kg</p>
                        </div>
                        <p className='caption'>Height</p>
                    </div>
                    <div className='pokemon-details-info-border'></div>
                    <div className='pokemon-details-info'>
                        <div>
                            <p>Ability 1</p>
                        </div>
                        <p className='caption'>Moves</p>
                    </div>
                </div>
                <div className='pokemon-details-description'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum neque, quos assumenda aperiam deleniti delectus saepe ipsam facilis, ratione suscipit modi ex debitis libero explicabo hic! Excepturi, neque consectetur.
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
                            <div className='pokemon-details-stat-right'>
                                <p>999</p>
                                <div className='pokemon-details-stat-line'></div>
                            </div>
                            <div className='pokemon-details-stat-right'>
                                <p>999</p>
                                <div className='pokemon-details-stat-line'></div>
                            </div>
                            <div className='pokemon-details-stat-right'>
                                <p>999</p>
                                <div className='pokemon-details-stat-line'></div>
                            </div>
                            <div className='pokemon-details-stat-right'>
                                <p>999</p>
                                <div className='pokemon-details-stat-line'></div>
                            </div>
                            <div className='pokemon-details-stat-right'>
                                <p>999</p>
                                <div className='pokemon-details-stat-line'></div>
                            </div>
                            <div className='pokemon-details-stat-right'>
                                <p>999</p>
                                <div className='pokemon-details-stat-line'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PokemonDetails