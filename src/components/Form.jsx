import { useState } from "react";

function Form({ onAddGame }) {
  // Local component state for the form inputs
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !url.trim()) return;

    // Send new game data up to parent via props
    onAddGame({
      name: name.trim(),
      url: url.trim(),
    });

    // Clear the form fields
    setName("");
    setUrl("");
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
            onChange={(e) => setName(e.target.value)} // updating local state
          />
        </label>
      </div>

      <div>
        <label>
          Game URL:&nbsp;
          <input
            type="url"
            value={url}
            placeholder="https://example.com/game-page"
            onChange={(e) => setUrl(e.target.value)} // updating local state
          />
        </label>
      </div>

      <button type="submit">Add Game</button>
    </form>
  );
}

export default Form;