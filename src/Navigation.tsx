import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from'react-bootstrap';

function Navigation() {
    return (
        <Navbar>
            <Nav>
                <Nav.Link href='/home'>Home</Nav.Link>
                <Nav.Link href='/about'>About</Nav.Link>
                <Nav.Link href='/settings'>Settings</Nav.Link>
                <Nav.Link href='/game'>Mod6</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Navigation;
