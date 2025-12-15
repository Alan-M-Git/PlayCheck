function Table({ games, onDeleteGame }) {
  if (!games.length) {
    return <p>No games added yet. Add one above!</p>;
  }

  return (
    <table className="game-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Game Name</th>
          <th>URL</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game, index) => (
          <tr key={game.id}>
            <td>{index + 1}</td>
            <td>{game.name}</td>
            <td>
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {game.url}
              </a>
            </td>
            <td>
              {/* Call parent callback with the game's id */}
              <button onClick={() => onDeleteGame(game.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;