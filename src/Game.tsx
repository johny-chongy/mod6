import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CardApi from "./Api";
import CardDisplay from "./CardDisplay";
import { DEFAULT_SETTINGS } from "./Settings";
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
interface CardValues {
    'ACE': number, '2': number, '3': number, '4': number, '5': number, '6': number, '7': number,
    '8': number, '9': number, '10': number, 'JACK': number, 'QUEEN': number, 'KING': number, '': string
}

interface CardInterface {
    'code': string,
    'image': string,
    'images': object,
    'value': keyof CardValues,
    'suit': string

}

interface GameState {
    turn: number,
    deck: string,
    card: CardInterface,
    remaining: number,
}


const CARD_VALUES = {
    'ACE': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 2, '9': 3, '10': 4,
    'JACK': 5, 'QUEEN': 6, 'KING': 7, '':''
}

const DEFAULT_STATE: GameState = {
    turn: -1,
    deck: '',
    card: {
        'code':'',
        'image':'',
        'images':{},
        'value':'',
        'suit':''
    },
    remaining: 100
}

function Game() {
    const [ gameState, setGameState ] = useState(DEFAULT_STATE);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ alertMsg, setAlertMsg ] = useState('');

    const gameSettings = retrieveGameSettings();
    const randomCategory = Math.floor(Math.random() * (gameSettings.categories.length));

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

        setAlertMsg('');
    }

    async function handleReset() {
        const newDeck = await CardApi.getNewShuffledDeckId();

        setGameState( state => ({
            ...DEFAULT_STATE,
            deck: newDeck
        }));

        setAlertMsg('New deck shuffled')
    }


    if (isLoading) return (<h1>Loading...</h1>)

    console.log('state: ', gameState);
    console.log('settings: ', gameSettings);
    console.log('randomCat:', randomCategory);
    return (
        <div className='Game'>
            {alertMsg.length > 0 && (
                <Alert variant='success'>{alertMsg}</Alert>
            )}
            {gameState.remaining > 0 && (
                <div className='ActiveGameState'>
                    <div className='GameStateInfo'>
                        {gameState.card.image !== '' && (
                        <div className='GameText'>
                            <p>{`At bat: ${gameSettings.players[gameState.turn]}`}</p>
                            <span>Name <b>{`${CARD_VALUES[gameState.card.value]} `}</b></span>
                            {(gameSettings.categories[randomCategory] !== '' && gameSettings.categories.length > 0) && (
                                <span>from <b>{`${gameSettings.categories[randomCategory]}`}</b></span>
                            )}
                        </div>
                        )}
                    </div>
                    <CardDisplay image={gameState.card.image}/>
                    <Button variant='info' onClick={handleDraw}>Draw Card</Button>
                </div>
            )}

            {gameState.remaining <= 0 && (
                <div className='InActiveGameState'>
                    {gameState.remaining === 0 && (
                        <p>You cleared the deck! Run it back?</p>
                    )}
                    {gameState.remaining === -1 && (
                        <p>Let's get started!</p>
                    )}
                    <Button variant='warning' onClick={handleReset}>New Deck</Button>
                </div>
            )}
        </div>
    )
}

export default Game;
export { DEFAULT_STATE };