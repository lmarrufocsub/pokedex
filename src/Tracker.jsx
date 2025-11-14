import "./styles/tracker.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tracker() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userId");
        navigate("/login");
    };

    const [total, setTotal] = useState(0);
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
        setUserName(sessionStorage.getItem("userName"));
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        fetch(`http://localhost:5000/count?userId=${userId}`)
            .then(res => res.json())
            .then(data => setTotal(data.total));
    }, [])

    return (
        <div className="trackerContainer">
            <h1>Pokémon Tracker</h1>
            <p>Welcome, {userName}!</p>
            <div className="trackerDivider">
                <div className="trackerLeft">
                    <p>Recently Caught</p>
                    <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"/>
                </div>
                <div className="trackerRight">
                    <p>Total Pokémon Caught</p>
                    <p>{total} / 151</p>
                </div>
            </div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Tracker;