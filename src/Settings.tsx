import { useState, ChangeEvent, useEffect, FormEvent, MouseEventHandler } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CloseButton from 'react-bootstrap/CloseButton';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';

/** Component for setting up the Game
 *
 * Prop:
 *
 * State:
 *  -isLoading: determine if page is loading
 *  -gameSettings: settings for game {players: [], categories: []}
 *  -alertMsg: alert Msg if applicable
 *
 * Home --> Settings
 */
interface GameSettings {
    players: string[]
    categories: string[]
}

const DEFAULT_SETTINGS: GameSettings = {
    players: ['Player 1', 'Player 2'],
    categories: ['', '', '']
};

function Settings() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ alertMsg, setAlertMsg ] = useState('');
    const [ gameSettings, setGameSettings ] = useState(DEFAULT_SETTINGS);
    const gameState = localStorage.getItem('gameState') || '';

    useEffect(function updateGameSettings() {
        function getGameSettings() {
            const localStorageSetting = localStorage.getItem('settings') || '';
            console.log("localStorage:", localStorageSetting);
            if (localStorageSetting === '') {
                localStorage.setItem('settings', JSON.stringify(DEFAULT_SETTINGS));
                setIsLoading(false);
                return;
            }
            setGameSettings(JSON.parse(localStorageSetting));
            setIsLoading(false);
        }
        getGameSettings();
    }, []);

    function addSetting(setting: keyof GameSettings) {
        setGameSettings(oldSettings => ({
            ...oldSettings,
            [setting]: [...oldSettings[setting], '']
        }));
    }

    function removeSetting(setting: keyof GameSettings, index: number) {
        setGameSettings(oldSettings => ({
            ...oldSettings,
            [setting]: oldSettings[setting].filter((s,idx) => idx !== index)
        }))
    }

    function handleChange(evt: ChangeEvent<HTMLInputElement>) {
        const { name, value, id } = evt.target;
        const [setting, idx] = [name as keyof GameSettings, parseInt(id)];
        const newSettings = [...gameSettings[setting]]
        newSettings[idx]= value;

        setGameSettings(settings => ({
            ...gameSettings,
            [setting]: newSettings
        }));
    }

    function handleSubmit(evt: FormEvent) {
        console.log(gameSettings);
        evt.preventDefault();
        localStorage.setItem('settings', JSON.stringify(gameSettings));
        setAlertMsg('Settings Saved');
    }

    function handleReset(): void {
        setGameSettings(DEFAULT_SETTINGS);
        setAlertMsg('Settings Reset');
    }

    const gameButtonLabel = (gameState === '' || JSON.parse(gameState).remaining <= 0)
        ? 'START'
        : 'RESUME';

    if (isLoading) return (<h1>Loading...</h1>)

    return(
        <div className="Settings">
            {alertMsg.length > 0 && (
                <Alert
                    variant='success'
                >
                    {alertMsg}
                </Alert>
            )}
            <h1>Settings</h1>
            <p>Customize your settings before you start.</p>
            <form onSubmit={handleSubmit}>
                <Button variant='success' type='submit'>SAVE</Button>
                <Button variant='warning' onClick={() => handleReset()}>RESET</Button>

                <h3>Players</h3>
                {gameSettings.players.map((player,idx) => (
                    <div key={`player-${idx+1}`}>
                        <label htmlFor={`player-${idx+1}`}>{`${idx+1}.`}</label>
                        <input
                            id={`${idx}`}
                            type='text'
                            value={player}
                            onChange={handleChange}
                            name={`players`}
                        />
                        <CloseButton
                            onClick={() => removeSetting('players', idx)}
                        />
                    </div>
                ))}
                <Button
                    variant='secondary'
                    type='button'
                    onClick={() => addSetting('players')}
                >
                    +
                </Button>
            <h3>Categories</h3>
                {gameSettings.categories.map((category,idx) => (
                    <div key={`category-${idx+1}`}>
                        <label htmlFor={`category-${idx+1}`}>{`${idx+1}.`}</label>
                        <input
                            id={`${idx}`}
                            type='text'
                            value={category}
                            onChange={handleChange}
                            name={`categories`}
                        />
                        <CloseButton
                            onClick={() => removeSetting('categories', idx)}
                        />
                    </div>
                ))}
                <Button
                    variant='secondary'
                    type='button'
                    onClick={() => addSetting('categories')}
                >
                    +
                </Button>
            </form>


            <Button
                variant='dark'
            >
                <Link
                    to={'/game'}
                    style={{ textDecoration: 'none'}}
                    className='text-light'
                >
                    {gameButtonLabel}
                </Link>
            </Button>
        </div>
    )
}

export default Settings;
export type { GameSettings }
export { DEFAULT_SETTINGS }