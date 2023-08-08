import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/** Component for setting up the Game
 *
 * Prop:
 *  -onSubmit
 *
 * State:
 *  -formData: formData
 *  -alertMsgs: alert Msgs if applicable
 *
 * Home --> Setup
 */
interface GameSettings {
    category: string
    players: string
}

function Settings() {
    const [formData, setFormData] = useState<GameSettings>({
        category: '',
        players:''
    });

    return(
        <div className="Setup">
            <h1>Settings</h1>
            <form>
                <label htmlFor='category-setting'>Category</label>
                <input
                    id='category-setting'
                    type='text'
                    name='category'
                    value={formData.category}
                />

                <label htmlFor='players-setting'>Players</label>
                <input
                    type='text'
                    name='players'
                    value={formData.players}
                />
                <button className='setUpBtn'>
                    Start Game
                </button>
            </form>
        </div>
    )
}

export default Settings;