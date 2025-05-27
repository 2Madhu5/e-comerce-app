const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// Azure SQL config using environment variables
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

sql.connect(config)
  .then(pool => {
    if (pool.connected) {
      console.log('Connected to Azure SQL Database');
    }

    app.get('/users', async (req, res) => {
      try {
        const result = await pool.request().query('SELECT * FROM users');
        res.json(result.recordset);
      } catch (err) {
        console.error('Query error:', err);
        res.status(500).send('Query failed');
      }
    });

    app.get('/products', async (req, res) => {
      try {
        const result = await pool.request().query('SELECT * FROM products');
        res.json(result.recordset);
      } catch (err) {
        console.error('Query error:', err);
        res.status(500).send('Query failed');
      }
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

