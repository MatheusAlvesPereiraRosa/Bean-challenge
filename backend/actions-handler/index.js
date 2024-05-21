const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'mydb',
    password: 'password',
    port: 5432,
});

const app = express();
app.use(express.json());

app.post('/save-pokemon', async (req, res) => {
    const { name, url } = req.body.input;

    try {
        const result = await pool.query('INSERT INTO pokemons (name, url) VALUES ($1, $2)', [name, url]);
        res.json({ success: true, message: 'Pokémon saved successfully!' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Failed to save Pokémon.' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Action handler running on port ${PORT}`);
});
