// App.js
import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './components/welcomescreen/welcomescreen';


function App() {

  return (
    <div className="App">
      <header className="App-header">
       
          <WelcomeScreen />
      
      </header>
    </div>
  );
}

export default App;