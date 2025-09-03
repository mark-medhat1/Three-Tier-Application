import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.PGHOST || "postgres",
  user: process.env.PGUSER || "appuser",
  password: process.env.PGPASSWORD || "mark",
  database: process.env.PGDATABASE || "appdb",
  port: +(process.env.PGPORT || 5432)
});

// Health endpoint
app.get("/api/health", async (_req, res) => {
  try {
    const r = await pool.query("SELECT NOW() as now");
    res.send(`API OK @ ${r.rows[0].now.toISOString()}`);
  } catch (e) {
    res.status(500).send(`DB error: ${e.message}`);
  }
});

app.get("/api/products", async (_req, res) => {
  try {
    const r = await pool.query("SELECT * FROM products");
    res.json(r.rows);
  } catch (e) {
    res.status(500).send(`DB error: ${e.message}`);
  }
});


// Root endpoint
app.get("/", (_req, res) => {
  res.send("Welcome to the API");
});

app.listen(port, () => console.log(`API listening on ${port}`));

