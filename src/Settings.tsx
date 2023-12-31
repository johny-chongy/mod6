import { useState, ChangeEvent, useEffect, FormEvent, MouseEventHandler } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CloseButton from 'react-bootstrap/CloseButton';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import SettingInput from './SettingInput';
import './Settings.css';

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

    const gameSettingsKeys: (keyof GameSettings)[] = Object.keys(gameSettings) as (keyof GameSettings)[];
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
        <div className="Settings p-2">
            {alertMsg.length > 0 && (
                <Alert
                    variant='success'
                >
                    {alertMsg}
                </Alert>
            )}
            <h1>Settings</h1>
            <p>Customize your settings before you play.</p>
            <form className='p-2' onSubmit={handleSubmit}>
                <Button className='m-1' variant='outline-dark' type='submit'>SAVE</Button>
                <Button className='m-1' variant='outline-dark' onClick={() => handleReset()}>RESET</Button>

                {gameSettingsKeys.map(setting => (
                    <div key={setting}>
                        <SettingInput
                            setting={setting}
                            items={gameSettings[setting]}
                            removeSetting={removeSetting}
                            handleChange={handleChange}
                            addSetting={addSetting}
                        />
                    </div>
                ))}
            </form>

            <Button href='/game' variant='outline-dark'>{gameButtonLabel}</Button>
        </div>
    )
}

export default Settings;
export type { GameSettings }
export { DEFAULT_SETTINGS }