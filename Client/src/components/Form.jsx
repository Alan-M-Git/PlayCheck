// Form.jsx
import { useState } from "react";

function Form({ onAddGame }) {
  // Local component state for the form inputs
  const [name, setName] = useState("");
  const [consoles, setConsoles] = useState("");
  const [trophies, setTrophies] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !consoles.trim() || !trophies.trim() || !startDate.trim()) return;

    // Send new game data up to parent via props
    onAddGame({
      name: name.trim(),
      consoles: consoles.trim(),
      trophies: parseInt(trophies) || 0,
      startDate: startDate.trim(),
      completed: false, // New games start as incomplete. Making it true means the user finished the game.
    });

    // Clear the form fields
    setName("");
    setConsoles("");
    setTrophies("");
    setStartDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <div>
        <label>
          Game Name:&nbsp;
          <input
            type="text"
            value={name}
            placeholder="E.g. The Legend Of Zelda"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Console:&nbsp;
          <input
            type="text"
            value={consoles}
            placeholder="E.g. PlayStation, Nintendo, Xbox"
            onChange={(e) => setConsoles(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Number of Trophies:&nbsp;
          <input
            type="number"
            value={trophies}
            placeholder="E.g. 50"
            min="0"
            onChange={(e) => setTrophies(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Start Date:&nbsp;
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Add Game</button>
    </form>
  );
}

export default Form;