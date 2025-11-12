import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            setMessage("Please fill in both fields.");
            return;
    }

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("Login successful!");
            setUsername("");
            setPassword("");
            navigate("/profile");
        } else {
            setMessage(data.message || "Invalid username or password");
        }
        } catch (err) {
            setMessage("Error connecting to server");
        }
    };

    return (
        <div className="container" style={{ textAlign: "center", backgroundImage: "url('/assets/Screenshot 2025-11-06 225145.png')" }}>
            <div className="left">
                <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"/>
                <h1>Welcome back, Trainer!</h1>
                <br />
                <p>Log in to access your personal dashboard in Pokédex Online<br/>and continue your Pokémon journey!</p>
            </div>
            <div className="right">
                <h3 style={{fontSize: "50px", margin: 0}}>Pokédex Online</h3>
                <h2>Log in to your account</h2>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button onClick={handleLogin}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e0e0e0">
                        <path d="M480-144v-72h264v-528H480v-72h264q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H480Zm-72-168-51-51 81-81H144v-72h294l-81-81 51-51 168 168-168 168Z"/>
                    </svg>
                    Log In
                </button>
                <p>{message}</p>
                <br />
                <Link style={{ color: "#e0e0e0" }} to="/signup">
                    Don't have an account? Register here.
                </Link>
            </div>
        </div>
    );
}

export default Login;