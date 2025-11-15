import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles/PokemonQuiz.css'

const randomizeAnswersArray = (array) => array.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(([,v]) => v)
const pickRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)]
const generateIncorrectAnswers = (array, n) => randomizeAnswersArray(array).slice(0, n)
const capitalize = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s)

let TYPE_POOL = null;
let ABILITY_POOL = null;
const TEMPLATES = [
    (pokemon, context) => buildTypeQuestion(pokemon, context)
]

async function buildTypePool() {
    if (TYPE_POOL) return TYPE_POOL
    const types = await fetch("https://pokeapi.co/api/v2/type?limit=100")
    const typesJson = await types.json()
    TYPE_POOL = typesJson.results.map(type => type.name)
        .filter(n => n !== "unknown" && n !== "shadow")
    return TYPE_POOL
}

async function buildAbilityPool() {
    if (ABILITY_POOL) return ABILITY_POOL;
    const abilities = await fetch("https://pokeapi.co/api/v2/ability?limit=4000");
    const abilitiesJson = await abilities.json();
    ABILITY_POOL = abilitiesJson.results.map(ability => ability.name);
    return ABILITY_POOL;
}

const MAX_POKEMON_ID = 1025

async function fetchRandomPokemon() {
    const id = Math.floor(Math.random() * MAX_POKEMON_ID + 1)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (response.ok) return response.json()
        throw new Error("Failed to fetch a random Pokemon.")
}

function buildTypeQuestion(pokemon, context) {
    const pokemonTypes = pokemon.types.map(t => t.type.name)
    const correct = pickRandomArrayElement(pokemonTypes)
    const incorrects = generateIncorrectAnswers(context.typeNames.filter(t => !pokemonTypes.includes(t)), 3)
    const options = randomizeAnswersArray([correct, ...incorrects])
    return {
        imageUrl: pokemon.sprites?.other?.["official-artwork"]?.front_default ?? "",
        prompt: `Which of these is one of ${capitalize(pokemon.name)}'s types?`, options,
        correctIndex: options.indexOf(correct)
    }

}

function pickRandomTemplate() {
    const i = Math.floor(Math.random() * TEMPLATES.length)
    return TEMPLATES[i]
}

export function usePokemonQuizState() {
    const [question, setQuestion] = useState(null)
    const sharedPoolsRef = useRef(null)

    const buildSharedPools = useCallback(async () => {
        const [typeNames] = await Promise.all([
            buildTypePool()
        ])
        sharedPoolsRef.current = { typeNames }
        return sharedPoolsRef.current
    }, [])


    const buildRandomQuestion = useCallback(async () => {
        try {
            const pools = await buildSharedPools()
            const pokemon = await fetchRandomPokemon()
            const template = pickRandomTemplate()
            const builtTemplate = template(pokemon, pools)
            setQuestion(builtTemplate)
        } catch (e) {
            console.error(e)
        }
    }, [buildSharedPools])

    useEffect(() => {
        buildRandomQuestion()
    }, [buildRandomQuestion])

    return {question}
}

function PokemonQuiz() {

    const {question} = usePokemonQuizState()

    if (!question) return null;

    return (
        <div className='quiz-main-container'>
            <p className='quiz-question'>{question.prompt}</p>
            <img className='quiz-image' src={question.imageUrl} alt="" />
            <div className='quiz-options'>
                {question.options.map((answerText) => {
                    return (
                        <button className='quiz-option'>{answerText}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default PokemonQuiz