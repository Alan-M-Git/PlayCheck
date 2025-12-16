const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

let games = [];
let nextId = 1;

app.use(cors());
app.use(express.json());

app.get('/api/games', (req, res) => {
  res.json(games);
});

app.post('/api/games', (req, res) => {
  const { name, consoles, trophies, startDate, completed } = req.body;

  if (!name || !consoles || trophies == null || !startDate) {
    return res.status(400).json({ message: 'Missing required fields.' });
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
  res.status(201).json(newGame);
});

app.put('/api/games/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = games.findIndex((g) => g.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Game not found.' });
  }

  const { name, consoles, trophies, startDate, completed } = req.body;
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
  res.json(updatedGame);
});

app.delete('/api/games/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = games.findIndex((g) => g.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Game not found.' });
  }

  games.splice(index, 1);
  res.status(204).send();
});

//Start Server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});