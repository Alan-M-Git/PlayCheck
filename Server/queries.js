require('dotenv').config();
const { Pool } = require('pg');

// Initialize database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

// Test connection
pool.on('connect', () => {
  console.log('Connected to Neon database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Helper function to format date to YYYY-MM-DD
function formatDate(dateValue) {
  if (!dateValue) return null;
  // If it's already a string in YYYY-MM-DD format, return it
  if (typeof dateValue === 'string' && dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateValue;
  }
  // If it's a Date object or ISO string, extract just the date part
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to transform database row from snake_case to camelCase
function transformGameRow(row) {
  return {
    id: row.id,
    name: row.name,
    consoles: row.consoles,
    trophies: row.trophies,
    startDate: formatDate(row.start_date), // YYYY-MM-DD
    completed: Boolean(row.completed),      // Ensure boolean
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null       // Safe if column is missing
  };
}

async function getAllGames() {
  const result = await pool.query('SELECT * FROM games ORDER BY id');
  return result.rows.map(transformGameRow);
}

async function createGame(gameData) {
  const { name, consoles, trophies, startDate, completed } = gameData;

  if (!name || !consoles || trophies == null || !startDate) {
    throw new Error('Missing required fields.');
  }

  const result = await pool.query(
    `INSERT INTO games (name, consoles, trophies, start_date, completed)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, consoles, Number(trophies) || 0, startDate, Boolean(completed)]
  );

  return transformGameRow(result.rows[0]);
}

async function updateGame(id, gameData) {
  const { name, consoles, trophies, startDate, completed } = gameData;

  // Debug logging
  console.log('Updating game ID:', id);
  console.log('Received data:', JSON.stringify(gameData, null, 2));
  console.log('Completed value:', completed, 'Type:', typeof completed);

  // Build dynamic update query
  const updates = [];
  const values = [];
  let paramCount = 1;

  if (name !== undefined && name !== null) {
    updates.push(`name = $${paramCount++}`);
    values.push(name);
  }
  if (consoles !== undefined && consoles !== null) {
    updates.push(`consoles = $${paramCount++}`);
    values.push(consoles);
  }
  if (trophies !== undefined && trophies !== null) {
    updates.push(`trophies = $${paramCount++}`);
    values.push(Number(trophies));
  }
  if (startDate !== undefined && startDate !== null) {
    updates.push(`start_date = $${paramCount++}`);
    // Ensure YYYY-MM-DD
    values.push(formatDate(startDate));
  }
  if (completed !== undefined && completed !== null) {
    updates.push(`completed = $${paramCount++}`);
    // Explicit boolean conversion from various possible inputs
    const boolValue =
      completed === true ||
      completed === 'true' ||
      completed === 1 ||
      completed === '1';
    console.log('Setting completed to boolean:', boolValue, 'Type:', typeof boolValue);
    values.push(boolValue);
  }

  if (updates.length === 0) {
    throw new Error('No fields to update.');
  }

  // REMOVE updated_at update since the column may not exist
  values.push(id);

  const query = `UPDATE games SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  console.log('Executing SQL:', query);
  console.log('With values:', values);
  console.log('Value types:', values.map(v => `${v} (${typeof v})`));

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('Game not found.');
    }

    console.log('Database returned row:', result.rows[0]);
    const transformed = transformGameRow(result.rows[0]);
    console.log('Transformed row:', transformed);

    return transformed;
  } catch (dbError) {
    console.error('Database error:', dbError);
    console.error('Error code:', dbError.code);
    console.error('Error detail:', dbError.detail);
    console.error('Error hint:', dbError.hint);
    throw new Error(`Database error: ${dbError.message}`);
  }
}

async function deleteGame(id) {
  const result = await pool.query('DELETE FROM games WHERE id = $1 RETURNING *', [id]);

  if (result.rows.length === 0) {
    throw new Error('Game not found.');
  }

  return true;
}

module.exports = {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
};