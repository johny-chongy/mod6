import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import CardApi from "./Api";
import CardDisplay from "./CardDisplay";
import { DEFAULT_SETTINGS } from "./Settings";
import useLocalStorage from "./useLocalStorage";
import { Card } from "react-bootstrap";

/** component for the actual game
 *
 * Prop:
 *
 * State:
 * -gameSettings: settings for game from LocalStorage
 *
 * Navigation --> Game
 */

const DEFAULT_STATE = {
    turn: -1,
    deck: '',
    card: {
        'code':'',
        'image':'',
        'images':{},
        'value':'',
        'suit':''
    },
    remaining: -1
}

function Game() {
    const [ gameState, setGameState ] = useState(DEFAULT_STATE);
    const [ isLoading, setIsLoading ] = useState(true);

    const gameSettings = retrieveGameSettings();

    useEffect(function retrieveGameState() {
        async function startGame() {
            const localGameState = localStorage.getItem('gameState') || '';
            if (localGameState === '') {
                const newDeckId = await CardApi.getNewShuffledDeckId();
                setGameState(state => ({
                    ...state,
                    deck: newDeckId
                }))

                console.log('gameState in useEffect', gameState)
                localStorage.setItem('gameState', JSON.stringify({
                    ...gameState,
                    deck: CardApi.deckId
                }));
            }

            setIsLoading(false);
            setGameState(state => ({
                ...JSON.parse(localGameState)
            }));
        }
        startGame();
    }, []);

    function retrieveGameSettings() {
        const checkLocalStorage = localStorage.getItem('settings');

        if (!checkLocalStorage) {
            return DEFAULT_SETTINGS;
        }
        return JSON.parse(checkLocalStorage);
    }
    async function handleDraw() {
        console.log('draw: ', gameState.deck)
        const { cards, remaining } = await CardApi.drawCard(gameState.deck);
        const newTurn = (gameState.turn + 1) % gameSettings.players.length;

        setGameState( state => ({
            ...state,
            card: cards[0],
            turn: newTurn,
            remaining: remaining
        }));
    }


    if (isLoading) return (<h1>Loading...</h1>)

    console.log('state: ', gameState);
    console.log('settings: ', gameSettings);
    return (
        <div className='Game'>
            <div className='GameStateInfo'>
                {gameState.card.image !== '' && (<p>{`At bat: ${gameSettings.players[gameState.turn]}`}</p>)}
            </div>
            <CardDisplay image={gameState.card.image}/>
            <Button variant="info" onClick={handleDraw}>Draw Card</Button>
        </div>
    )
}

export default Game;
export { DEFAULT_STATE };