// GameContainer.jsx
import { useState, useEffect } from "react";
import Form from "./Form";
import Table from "./Table";


function GameContainer() {
  // Parent state: holds the list of games
  const [games, setGames] = useState([]);


  // Base URL for your API
  const API_BASE = "http://localhost:5000/api/games";


  // Load games from server on mount
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Failed to fetch games");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };


    fetchGames();
  }, []); // run once on mount


  // Called when Form submits a new game (via props)
  const handleAddGame = async (game) => {
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game),
      });
      if (!res.ok) throw new Error("Failed to create game");
      const created = await res.json();


      setGames((prevGames) => [...prevGames, created]);
    } catch (err) {
      console.error("Error adding game:", err);
    }
  };


  // Called when Table requests a delete (via props)
  const handleDeleteGame = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 204) {
        throw new Error("Failed to delete game");
      }


      setGames((prevGames) => prevGames.filter((game) => game.id !== id));
    } catch (err) {
      console.error("Error deleting game:", err);
    }
  };


  // Called when Table requests to toggle completion status (via props)
  const handleToggleComplete = async (id) => {
    const game = games.find((g) => g.id === id);
    if (!game) return;


    const updatedPayload = { ...game, completed: !game.completed };


    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });
      if (!res.ok) throw new Error("Failed to update game");
      const updated = await res.json();


      setGames((prevGames) =>
        prevGames.map((g) => (g.id === id ? updated : g))
      );
    } catch (err) {
      console.error("Error toggling completion:", err);
    }
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