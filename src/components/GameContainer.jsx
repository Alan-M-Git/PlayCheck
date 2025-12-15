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

  return (
    <div className="game-container">
      <h1>Video Game Checklist</h1>

      {/* Pass down callback as prop (for adding) */}
      <Form onAddGame={handleAddGame} />

      {/* Pass down state and callback as props (for listing & deleting) */}
      <Table games={games} onDeleteGame={handleDeleteGame} />
    </div>
  );
}

export default GameContainer;