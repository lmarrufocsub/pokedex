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
  const tokenCount = 5
  const [token, setToken] = useState(tokenCount)

  useEffect(() => {
    const storedId = sessionStorage.getItem("userId")
    setUserId(storedId)
  }, [location])

  const handleLogout = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userId");
    setUserId(null);
    Navigate("/login");
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
        <Route path='/pokemon-quiz' element={<ProtectedRoute><PokemonQuiz /></ProtectedRoute>} />
        <Route path='/pokemon-selection' element={<ProtectedRoute><PokemonSelection selectiontoken={token} setToken={setToken} /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
