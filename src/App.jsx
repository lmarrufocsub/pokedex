import { useEffect, useState } from 'react'
import './App.css'
import PokedexList from './PokedexList'
import PokemonDetails from './PokemonDetails'
import PokemonSelection from './PokemonSelection'
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import PokemonQuiz from './PokemonQuiz';
import ProtectedRoute from './ProtectedRoute'

function App() {
  const location = useLocation()
  const [userId, setUserId] = useState(() => sessionStorage.getItem("userId"))
  const [token, setToken] = useState(0)

  useEffect(() => {
    const storedId = sessionStorage.getItem("userId")
    setUserId(storedId)
  }, [location])

  useEffect(() => {
    if (!userId) {
      setToken(0);
      return;
    }

    const fetchTokens = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/tokens?userId=${userId}`
        );
        if (!res.ok) {
          console.error("Failed to fetch tokens");
          return;
        }
        const data = await res.json();
        setToken(data.tokens);
      } catch (err) {
        console.error("Error fetching tokens:", err);
      }
    };

    fetchTokens();
  }, [userId])

  const handleLogout = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userId");
    setUserId(null);
    Navigate("/login");
  };

  const handleCorrectQuizAnswer = async () => {
    if (!userId) return;

    try {
      const res = await fetch("http://localhost:5000/tokens/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount: 1 }),
      });

      if (!res.ok) {
        console.error("Failed to add token");
        return;
      }

      const data = await res.json();
      setToken(data.tokens);
    } catch (err) {
      console.error("Error updating tokens:", err);
    }
  }

  const handleUseToken = async (cost = 1) => {
  if (!userId) return;

  if (token < cost) {
    console.warn("Not enough tokens");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/tokens/use", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount: cost }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to use token:", errorData.error || res.statusText);
      return;
    }

    const data = await res.json();
    setToken(data.tokens);
  } catch (err) {
    console.error("Error using token:", err);
  }
};

  return (
    <div className='app'>
      {userId && <Navbar navbartoken={token} handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            userId
              ? <Navigate to="/profile" replace />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={
            userId
              ? <Navigate to="/profile" replace />
              : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            userId
              ? <Navigate to="/profile" replace />
              : <Signup />
          }
        />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/pokedex' element={<ProtectedRoute><PokedexList /></ProtectedRoute>} />
        <Route path='/pokemon-details/:id' element={<ProtectedRoute><PokemonDetails /></ProtectedRoute>} />
        <Route path='/pokemon-quiz' element={<ProtectedRoute><PokemonQuiz onCorrectAnswer={handleCorrectQuizAnswer} /></ProtectedRoute>} />
        <Route path='/pokemon-selection' element={<ProtectedRoute><PokemonSelection selectiontoken={token} handleUseToken={() => handleUseToken(1)} /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
