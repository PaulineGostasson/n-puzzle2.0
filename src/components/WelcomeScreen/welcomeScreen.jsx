import React, { useState } from 'react';
import './WelcomeScreen.css'; 
import GameBoard from '../gameboard/gameBoard';

function WelcomeScreen() {
  const [showGameBoard, setShowGameBoard] = useState(false);

// Hanterar skärmbyte till GameBoard skärmen
  const handleStartGame = () => {
    setShowGameBoard(true);
  };


  if (showGameBoard) {
    return <GameBoard />;
  }

  return (
    <div className="welcome-screen-container">
      <div className="welcome-screen-text">
        <h1>Hi, I'm Pauline Holgersson Göstasson!</h1>
        <p>I’m a recent graduate in Frontend Development, and I’m thrilled to share my rendition of the classic 15-puzzle game with you. I’m passionate about building user-friendly, modern web applications, and I hope to bring my skills to your talented team at Grebban.</p>
        <p>I look forward to continuing our discussion in the upcoming interview. Until then, have a wonderful day, and I hope you enjoy exploring this project!</p>
        <p>Game Instructions: Arrange the tiles in numerical order from 1 to 15, leaving the bottom-right corner empty. Good luck!</p>
        <button onClick={handleStartGame} className="start-game-button">Start Game</button>
      </div>
    </div>
  );
}

export default WelcomeScreen;