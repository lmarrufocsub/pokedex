import React, { useState } from "react";
import "./styles/login.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async () => {
        if (!username || !password) {
            setMessage("Please fill in both fields.");
            return;
    }

    try {
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setMessage(data.message || data.error);
        setUsername("");
        setPassword("");
    } catch (err) {
        setMessage("Error connecting to server");
    }};

  return (
    <div className="container" style={{ textAlign: "center", backgroundImage: "url('/assets/Screenshot 2025-11-10 205252.png')"}}>
        <div className="left">
            <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"/>
            <h1>Register an account with us!</h1>
            <br />
            <p>Join thousands of other trainers in Pokédex Online to collect and trade<br/>hundreds of Pokémon from the Kanto region and beyond!</p>
        </div>
        <div className="right">
            <h3 style={{fontSize: "50px", margin: 0}}>Pokédex Online</h3>
            <h2>Create an account</h2>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleSignup}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e0e0e0"><path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z"/></svg>
                Sign Up
            </button>
            <p>{message}</p>
            <br />
            <Link style={{color: "#e0e0e0"}} to="/login">Already have an account? Login here.</Link>
        </div>
    </div>
  );
}

export default Signup;