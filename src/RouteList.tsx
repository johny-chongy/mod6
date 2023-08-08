import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import About from './About';
import Home from './Home';
import Game from './Game';
import Settings from './Settings';


/** Component for RouteList
 *
 * Props:
 *
 *
 * App -> RouteList -> {About, Settings, Game}
 *
 */
function RouteList() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/game' element={<Game />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='*' element={<Home />} />
        </Routes>
    )
}

export default RouteList;