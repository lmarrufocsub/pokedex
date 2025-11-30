import Tracker from "./Tracker";
import Graph from "./Graph";
import SetHometown from "./SetHometown";
import ChangeUsername from "./ChangeUsername";
import "./styles/profile.css";
import { useEffect, useState } from "react";

function Profile() {

    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(sessionStorage.getItem("userName"));
    }, []);

// Old button
/*
    const handleLogout = async () => {
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userId");
        navigate("/login");
    };
*/

    const [homeVisible, setHomeVisible] = useState(false);

    const handleSetHometown = () => {
        setHomeVisible(prevState => !prevState);
    };

    const [homeTown, setHomeTown] = useState("Pallet Town");
    const [region, setRegion] = useState("Kanto Region");

    const [changeVisible, setChangeVisible] = useState(false);
    const handleSetChangeVisible = () => {
        setChangeVisible(prevState => !prevState);
    };

    return (
        <div className="profileContainer">
            <h1 style={{ marginBottom: "30px", marginTop: "30px" }}>My Profile</h1>
            <br />
            <div className="profileBanner">
                <img className="profileIcon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" />
                <div className="profileName">
                    <p style={{ color: "#DC143C", fontWeight: "bold", fontSize: "20px" }}>{userName}</p>
                    <p>Trainer</p>
                    <p>{homeTown},</p>
                    <p>{region}</p>
                </div>
                <div className="profileButtonContainer">
                    <button className="profileButton" onClick={handleSetChangeVisible}>{changeVisible ? "Cancel" : "Change Username"}</button>
                    <button className="profileButton" onClick={() => {alert("Due to recent cyberattacks by Team Rocket, password resets are temporarily disabled for security. Please contact our technical support team to request a password reset email.")}}>Reset Password</button>
                    <button className="profileButton" onClick={handleSetHometown}>{homeVisible ? "Cancel" : "Set Hometown"}</button>
                </div>
            </div>
            {changeVisible && <ChangeUsername />}
            {homeVisible && <SetHometown onSelectTown={(town, regionName) => {
                setHomeTown(town);
                setRegion(regionName);
            }} />}
            <div className="activityContainer">
                <Tracker />
                <Graph />
            </div>
        </div>
    )
}

export default Profile;