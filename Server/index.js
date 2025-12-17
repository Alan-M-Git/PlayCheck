const express = require('express');
const cors = require('cors');
const path = require('path');
const { getAllGames, createGame, updateGame, deleteGame } = require('./queries');

const app = express();
const PORT = 8000;

// API routes must come before static file serving
app.use(cors());
app.use(express.json());

app.get('/api/games', async (req, res) => {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/games', async (req, res) => {
  try {
    const newGame = await createGame(req.body);
    res.status(201).json(newGame);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/games/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log('PUT request received for game ID:', id);
    console.log('Request body:', req.body);
    const updatedGame = await updateGame(id, req.body);
    res.json(updatedGame);
  } catch (error) {
    console.error('Error updating game:', error);
    console.error('Error stack:', error.stack);
    if (error.message === 'Game not found.') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

app.delete('/api/games/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteGame(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(404).json({ message: error.message });
  }
});

// Serve static files from the React app
const clientDistPath = path.join(__dirname, '..', 'Client', 'dist');
app.use(express.static(clientDistPath));

// Catch all handler: send back React's index.html file for any non-API routes
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  } else {
    next();
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`App is running on Port http://localhost:${PORT}`);
});