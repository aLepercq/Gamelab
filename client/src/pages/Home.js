import React, {useContext} from "react";
import {UidContext} from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/log";
import FriendsHint from "../components/Profil/FriendsHint";
import Trends from "../components/Trends";

const Home = () => {
    const uid = useContext(UidContext);

    return (
        <div className="home">
            <div className="left-side">
            </div>
            <div className="main">
                <div className="home-header">
                    {uid ? <NewPostForm/> : <Log signin={true} signup={false}/>}
                </div>
                <Thread/>
            </div>
            <div className="right-side">
                <div className="right-side-container">
                </div>
            </div>
        </div>
    );
};

export default Home;