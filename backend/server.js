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
  tokens INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`
);

db.run(`CREATE TABLE IF NOT EXISTS pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    types TEXT NOT NULL
  )`,
  async () => {
    const pokemonArr = [];
    for (let i = 1; i <= 201; i++) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      const data = await res.json();
      pokemonArr.push(data);
    };

    for (const p of pokemonArr) {
      const name = p.name;
      const types = p.types.map(t => t.type.name)
      await new Promise(resolve => {
        db.run("INSERT OR IGNORE INTO pokemon (name, types) VALUES (?, ?)", [name, JSON.stringify(types)], resolve);
      });
    };

    seedTestUsersAndPokemon();
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

function seedUserPokemon(userId, startId, endId) {
  for (let pid = startId; pid <= endId; pid++) {
    db.run(
      "INSERT OR IGNORE INTO user_pokemon (user_id, pokemon_id) VALUES (?, ?)",
      [userId, pid]
    );
  }
}

function upsertTestUser(username, password, startId, endId) {
  const saltRounds = 10;

  db.get("SELECT id FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      console.error("Error checking seed user:", err);
      return;
    }

    if (row) {
      console.log(`Seed user '${username}' already exists, ensuring Pokémon range.`);
      seedUserPokemon(row.id, startId, endId);
      return;
    }

    bcrypt.hash(password, saltRounds, (hashErr, hash) => {
      if (hashErr) {
        console.error("Error hashing seed password:", hashErr);
        return;
      }

      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hash],
        function (insertErr) {
          if (insertErr) {
            console.error("Error inserting seed user:", insertErr);
          } else {
            console.log(`Seeded test user '${username}'.`);
            const newUserId = this.lastID;
            seedUserPokemon(newUserId, startId, endId);
          }
        }
      );
    });
  });
}

function seedTestUsersAndPokemon() {
  upsertTestUser("test1", "test1", 1, 100);
  upsertTestUser("test2", "test2", 101, 200);
}


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
    if (!row) {
      return res.json(null);
    } else {
      res.json(row.pokemon_id);
    }
  }
  );
});

app.get("/pokedex", (req, res) => {
  const userId = req.query.userId;

  db.all("SELECT user_pokemon.pokemon_id AS id, pokemon.name, pokemon.types FROM user_pokemon JOIN pokemon ON pokemon.id = user_pokemon.pokemon_id WHERE user_pokemon.user_id = ? ORDER BY user_pokemon.pokemon_id ASC", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) {
      return res.json([])
    }

    const result = rows.map(row => ({
      id: row.id,
      name: row.name,
      types: JSON.parse(row.types)  // "['grass','poison']" -> ["grass","poison"]
    }));

    res.json(result);
  })
})

app.get("/pokemonselection", (req, res) => {

  db.all("SELECT * FROM pokemon ORDER BY RANDOM() LIMIT 3", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows)
  })
})

app.get("/graph", (req, res) => {
  const userId = req.query.userId;

  const sql = `SELECT DATE(created_at) AS date, COUNT(*) AS caught FROM user_pokemon
    WHERE user_id = ?
    AND created_at >= DATE('now', '-6 days')
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at);
  `;

  db.all(sql, [userId], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

app.get("/tokens", (req, res) => {
  const userId = req.query.userId;

  db.get(
    "SELECT tokens FROM users WHERE id = ?",
    [userId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "User not found" });

      res.json({ tokens: row.tokens });
    }
  );
})

app.post("/tokens/add", (req, res) => {
  const { userId, amount } = req.body;

  db.run(
    "UPDATE users SET tokens = tokens + ? WHERE id = ?",
    [amount, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      // optional: return new total
      db.get(
        "SELECT tokens FROM users WHERE id = ?",
        [userId],
        (getErr, row) => {
          if (getErr) return res.status(500).json({ error: getErr.message });
          res.json({ tokens: row.tokens });
        }
      );
    }
  );
});

app.post("/tokens/use", (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount || amount <= 0) {
    return res.status(400).json({ error: "userId and positive amount are required" });
  }

  db.run(
    "UPDATE users SET tokens = tokens - ? WHERE id = ? AND tokens >= ?",
    [amount, userId, amount],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(400).json({ error: "Not enough tokens" });
      }

      db.get(
        "SELECT tokens FROM users WHERE id = ?",
        [userId],
        (getErr, row) => {
          if (getErr) {
            return res.status(500).json({ error: getErr.message });
          }
          if (!row) {
            return res.status(404).json({ error: "User not found" });
          }

          res.json({ tokens: row.tokens });
        }
      );
    }
  );
});

app.get("/achievements", (req, res) => {

  const userId = req.query.userId;
  db.all("SELECT pokemon_id FROM user_pokemon WHERE user_id = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const pokemonIDs = [];
    const achievements = [];

    for (let i = 0; i < rows.length; i++)
    {
        pokemonIDs.push(rows[i].pokemon_id)
    }

    if (pokemonIDs.length >= 100)
    {
       achievements.push({
       id: 1,
       name: "Living on a Prayer",
       description: "You got a 100 pokemon.",
       img: "/assets/png"
       })
    }

    if (pokemonIDs.includes(19) || pokemonIDs.includes(20))
    {
       achievements.push({
       id: 2,
       name: "IT'S A RAT",
       description: "You caught Rattata or Raticate",
       img: "/assets/png"
       })
    }

    if (pokemonIDs.includes(69) || pokemonIDs.includes(70) || pokemonIDs.includes(71))
    {
       achievements.push({
       id: 3,
       name: "Plants vs Zombies",
       description: "You caught Bellsprout, Weepinbell, or Victreebel",
       img: "/assets/png"
       })
    }

    if (pokemonIDs.includes(100) || pokemonIDs.includes(101))
    {
       achievements.push({
       id: 4,
       name: "GOT A POKEBALL",
       description: "You caught Voltrob",
       img: "/assets/png"
       })
    }

    res.json(achievements);

  })
})

app.put("/update-username", (req, res) => {
  const { id, username } = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const sql = "UPDATE users SET username = ? WHERE id = ?";
  const params = [username, id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Failed to update username" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Username updated successfully" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));