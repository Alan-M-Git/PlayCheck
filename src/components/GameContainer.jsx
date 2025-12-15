// GameContainer.jsx
import { useState } from "react";
import Form from "./Form";
import Table from "./Table";

function GameContainer() {
  // Parent state: holds the list of games
  const [games, setGames] = useState([]);

  // Called when Form submits a new game (via props)
  const handleAddGame = (game) => {
    setGames((prevGames) => [
      ...prevGames,
      {
        id: Date.now(), // simple unique ID
        ...game,
      },
    ]);
  };

  // Called when Table requests a delete (via props)
  const handleDeleteGame = (id) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
  };

  // Called when Table requests to toggle completion status (via props)
  const handleToggleComplete = (id) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id ? { ...game, completed: !game.completed } : game
      )
    );
  };

  return (
    <div className="game-container">
      <h1>Video Game Checklist</h1>

      {/* Pass down callback as prop (for adding) */}
      <Form onAddGame={handleAddGame} />

      {/* Pass down state and callbacks as props (for listing, deleting, and completing) */}
      <Table 
        games={games} 
        onDeleteGame={handleDeleteGame} 
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default GameContainer;