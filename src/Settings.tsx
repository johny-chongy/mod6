import { useState, ChangeEvent, useEffect, FormEvent } from 'react';

/** Component for setting up the Game
 *
 * Prop:
 *  -onSubmit
 *
 * State:
 *  -formData: formData
 *  -alertMsgs: alert Msgs if applicable
 *
 * Home --> Settings
 */
interface GameSettings {
    players: string[]
}

function Settings() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [gameSettings, setGameSettings] = useState<GameSettings>({
        players: [ '', '' ]
    });

    useEffect(function updateGameSettings() {
        function getGameSettings() {
            const localStorageSetting = localStorage.getItem('settings') || '';
            console.log("localStorage:", localStorageSetting);
            if (localStorageSetting === '') {
                setIsLoading(false);
                return;
            }

            setGameSettings(JSON.parse(localStorageSetting));
            setIsLoading(false);
        }
        getGameSettings();
    }, []);

    function addPlayer() {
        setGameSettings({
            players: [ ...gameSettings.players, '' ]
        });
    }

    function removePlayer(player: number) {
        setGameSettings({
            players: gameSettings.players.filter((p,idx) => idx !== player)
        });
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
    }

    if (isLoading) return (<h1>Loading...</h1>)

    return(
        <div className="Settings">
            <h1>Settings</h1>
            <button
                type='button'
                onClick={addPlayer}
            >
                Add Player
            </button>
            <form onSubmit={handleSubmit}>
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
                        <button
                            type='button'
                            onClick={() => removePlayer(idx)}
                        >
                            X
                        </button>
                    </div>
                ))}
                <button>Save Settings</button>
            </form>
        </div>
    )
}

export default Settings;
export type { GameSettings }