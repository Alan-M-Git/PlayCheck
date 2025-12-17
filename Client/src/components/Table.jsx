// Table.jsx
function Table({ games, onDeleteGame, onToggleComplete }) {
  if (!games.length) {
    return <p>No games added yet. Add one above!</p>;
  }

  // Helper function to format date for display
  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    
    // If it's already in YYYY-MM-DD format, parse it directly
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    
    // If it's an ISO string, extract just the date part first
    const dateOnly = dateString.split('T')[0];
    if (dateOnly.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateOnly.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    
    // Fallback for any other format
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

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
            <td>{formatDateDisplay(game.startDate)}</td>
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








