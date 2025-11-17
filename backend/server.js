import express from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
const db = new sqlite3.Database("users.db");
db.run("PRAGMA foreign_keys = ON");

app.use(cors());
app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`
);

db.run(`CREATE TABLE IF NOT EXISTS pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  )`,
  async () => {
    const pokemonArr = [];
    for (let i = 1; i <= 151; i++) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      const data = await res.json();
      pokemonArr.push(data);
    };

    for (const { name } of pokemonArr) {
      await new Promise(resolve => {
        db.run("INSERT OR IGNORE INTO pokemon (name) VALUES (?)", name, resolve);
      });
    };
  }
);

db.run(`CREATE TABLE IF NOT EXISTS user_pokemon (
  user_id INTEGER NOT NULL,
  pokemon_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, pokemon_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
  )`
);

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.status(400).json({ error: "Username already taken" });

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });

          res.json({ message: "User registered successfully!", userId: this.lastID });
        }
      );
    } catch (hashError) {
      res.status(500).json({ error: hashError.message });
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ message: "User not found" });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result) {
        res.json({ message: `Welcome back, ${user.username}!`, user: { id: user.id, username: user.username } });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    });
  });
});

app.get("/count", (req, res) => {
  const userId = req.query.userId;

  db.get("SELECT COUNT(*) AS total FROM user_pokemon WHERE user_id = ?", [userId], (err, row) => {
      res.json({ total: row.total });
    }
  );
});

app.get("/recent", (req, res) => {
  const userId = req.query.userId;

  db.get("SELECT pokemon_id FROM user_pokemon WHERE user_id = ? ORDER BY created_at DESC LIMIT 1", [userId], (err, row) => {
      if(!row) {
        return res.json(null);
      } else {
        res.json(row.pokemon_id);
      }
    }
  );
});

app.get("/pokedex", (req, res) => {
  const userId = req.query.userId;

  db.all("SELECT user_pokemon.pokemon_id AS id, pokemon.name FROM user_pokemon JOIN pokemon ON pokemon.id = user_pokemon.pokemon_id WHERE user_pokemon.user_id = ? ORDER BY user_pokemon.pokemon_id ASC", [userId], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    if (rows.length === 0) {
      return res.json([])
    }

    res.json(rows)
  })
})

app.listen(5000, () => console.log("Server running on port 5000"));