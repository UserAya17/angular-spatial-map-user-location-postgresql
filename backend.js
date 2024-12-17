const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// PostgreSQL database configuration
const pool = new Pool({
    user: 'admin', // Remplacez par vos identifiants
    host: 'localhost',
    database: 'mydatabase',
    password: 'admin',
    port: 5432
});

// Autoriser les requêtes cross-origin
app.use(cors());

// Endpoint pour récupérer les marchés
app.get('/markets', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, ST_AsText(location) AS coordinates FROM markets');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur API démarré sur http://localhost:${port}`);
});
