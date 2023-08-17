import React, { ChangeEvent } from 'react'
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { GameSettings } from './Settings'

interface SettingInput {
    setting: keyof GameSettings,
    items: string[],
    removeSetting: (setting: keyof GameSettings, index: number) => void,
    handleChange: (evt: ChangeEvent<HTMLInputElement>) => void,
    addSetting: (setting: keyof GameSettings) => void

}


function SettingInput ({ setting, items, removeSetting, handleChange, addSetting }: SettingInput) {
    const singular = setting.slice(0, setting.length - 1);

    return (
        <div className='SettingInput'>
            <h3>{setting}</h3>
            {items.map((item, idx) => (
                <div key={`${singular}-${idx+1}`}>
                    <label htmlFor={`${singular}-${idx+1}`}>{`${idx+1}.`}</label>
                    <input
                        id={`${idx}`}
                        type='text'
                        value={item}
                        onChange={handleChange}
                        name={setting}
                    />
                    <CloseButton onClick={() => removeSetting(setting, idx)}/>
                </div>
            ))}

            <Button
                size='sm'
                variant='secondary'
                type='button'
                onClick={() => addSetting(setting)}
            >
                +
            </Button>
        </div>
    )
}

export default SettingInput