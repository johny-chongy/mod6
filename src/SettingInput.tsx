import React, { ChangeEvent } from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { GameSettings } from './Settings'
import Row from 'react-bootstrap/Row';
import './SettingInput.css';

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
            <Container className='container mt-3'>
                <Row>
                    <Col><h3>{setting}</h3></Col>
                    <Col>
                        <Button
                            className='adder-button'
                            size='sm'
                            variant='outline-dark'
                            type='button'
                            onClick={() => addSetting(setting)}
                        >
                            <p>+</p>
                        </Button>
                    </Col>
                </Row>

            </Container>
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


        </div>
    )
}

export default SettingInput