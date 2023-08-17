import React from 'react';
import './App.css';
import Home from './Home';
import Navigation from './Navigation';
import { BrowserRouter, Navigate } from 'react-router-dom';
import Game from './Game';
import GradientBackground from './GradientBackground';
import RouteList from './RouteList';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navigation />
          <RouteList />
        </BrowserRouter>
    </div>
  );
}

export default App;
