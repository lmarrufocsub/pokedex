import "./styles/tracker.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tracker() {

    const navigate = useNavigate();

    const [total, setTotal] = useState(0);
    const [userName, setUserName] = useState("");
    const [recent, setRecent] = useState(0);
    
    useEffect(() => {
        setUserName(sessionStorage.getItem("userName"));
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        fetch(`http://localhost:5000/count?userId=${userId}`)
            .then(res => res.json())
            .then(data => setTotal(data.total));
    }, [])

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        fetch(`http://localhost:5000/recent?userId=${userId}`)
            .then(res => res.json())
            .then(data => setRecent(data));
    })

    return (
        <div className="trackerContainer">
            <h1>Pokémon Tracker</h1>
            <p>Welcome, {userName}!</p>
            <div className="trackerDivider">
                <div className="trackerLeft">
                    <p>Recently Caught</p>
                    <img className="logo" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${recent}.png`}/>
                </div>
                <div className="trackerRight">
                    <p>Total Pokémon Caught</p>
                    <p>{total} / 151</p>
                </div>
            </div>
        </div>
    );
}

export default Tracker;