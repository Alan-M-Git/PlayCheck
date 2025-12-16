let games = [];
let nextId = 1;

function getAllGames() {
  return games;
}

function createGame(gameData) {
  const { name, consoles, trophies, startDate, completed } = gameData;

  if (!name || !consoles || trophies == null || !startDate) {
    throw new Error('Missing required fields.');
  }

  const newGame = {
    id: nextId++,
    name,
    consoles,
    trophies: Number(trophies) || 0,
    startDate,
    completed: !!completed,
  };

  games.push(newGame);
  return newGame;
}

function updateGame(id, gameData) {
  const index = games.findIndex((g) => g.id === id);

  if (index === -1) {
    throw new Error('Game not found.');
  }

  const { name, consoles, trophies, startDate, completed } = gameData;
  const existing = games[index];

  const updatedGame = {
    ...existing,
    name: name ?? existing.name,
    consoles: consoles ?? existing.consoles,
    trophies: trophies != null ? Number(trophies) : existing.trophies,
    startDate: startDate ?? existing.startDate,
    completed: typeof completed === 'boolean' ? completed : existing.completed,
  };

  games[index] = updatedGame;
  return updatedGame;
}

function deleteGame(id) {
  const index = games.findIndex((g) => g.id === id);

  if (index === -1) {
    throw new Error('Game not found.');
  }

  games.splice(index, 1);
  return true;
}

module.exports = {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
};