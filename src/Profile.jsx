import Navbar from "./Navbar";
import Tracker from "./Tracker";
import Graph from "./Graph";
import "./styles/profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(sessionStorage.getItem("userName"));
    }, []);

    const handleLogout = async () => {
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <div className="profileContainer">
            <h1 style={{ marginBottom: "30px" }}>My Profile</h1>
            <br />
            <div className="profileBanner">
                <img className="profileIcon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" />
                <div className="profileName">
                    <p style={{ color: "#DC143C", fontWeight: "bold", fontSize: "20px" }}>{userName}</p>
                    <p>Trainer</p>
                    <p>Pallet Town, Kanto Region</p>
                </div>
            </div>
            <div className="activityContainer">
                <Tracker />
                <Graph />
            </div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Profile;