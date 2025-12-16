// Table.jsx
function Table({ games, onDeleteGame, onToggleComplete }) {
  if (!games.length) {
    return <p>No games added yet. Add one above!</p>;
  }

  return (
    <table className="game-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Game Name</th>
          <th>Console</th>
          <th>Trophies</th>
          <th>Start Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game, index) => (
          <tr 
            key={game.id}
            style={{
              opacity: game.completed ? 0.6 : 1,
              textDecoration: game.completed ? 'line-through' : 'none'
            }}
          >
            <td>{index + 1}</td>
            <td>{game.name}</td>
            <td>{game.consoles}</td>
            <td>{game.trophies}</td>
            <td>{game.startDate}</td>
            <td>
              {game.completed ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>✓ Completed</span>
              ) : (
                <span style={{ color: 'gray' }}>In Progress</span>
              )}
            </td>
            <td>
              {/* Toggle completion status */}
              <button 
                onClick={() => onToggleComplete(game.id)}
                style={{ marginRight: '8px' }}
              >
                {game.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
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








