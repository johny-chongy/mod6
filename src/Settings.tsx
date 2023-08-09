import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

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

const DEFAULT_SETTINGS = {
    players: ['', ''],
    categories: []
};

function Settings() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ alertMsg, setAlertMsg ] = useState('');
    const [gameSettings, setGameSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

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

    function addPlayer() {
        setGameSettings(setting => ({
            ...setting,
            players: [...setting.players, '']
        }));
    }

    function removePlayer(player: number) {
        setGameSettings(setting => ({
            ...setting,
            players: setting.players.filter((s,idx) => idx !== player)
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
            <form onSubmit={handleSubmit}>
                <Button
                    variant='success'
                    type='submit'
                >
                    Save Settings
                </Button>
                {gameSettings.players.map((player,idx) => (
                    <div key={`player-${idx+1}`}>
                        <label htmlFor={`player-${idx+1}`}>{`Player ${idx+1}:`}</label>
                        <input
                            id={`${idx}`}
                            type='text'
                            value={player}
                            onChange={handleChange}
                            name={`players`}
                        />
                        <CloseButton
                            onClick={() => removePlayer(idx)}
                        />
                    </div>
                ))}
                <Button
                    variant='secondary'
                    type='button'
                    onClick={addPlayer}
                >
                    +
                </Button>
            </form>
        </div>
    )
}

export default Settings;
export type { GameSettings }
export { DEFAULT_SETTINGS }