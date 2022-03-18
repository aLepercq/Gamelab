import React, {useContext} from "react";
import NewGameForm from "../components/Game/NewGameForm";
import ThreadGame from "../components/ThreadGame";
import Log from "../components/log";

const Game = () => {
    return (
        <div className="game">
            <div className="left-side">
                <NewGameForm/>
            </div>
            <div className="main-game">
                <ThreadGame/>
            </div>
            <div className="right-side">
                <div className="right-side-container">
                </div>
            </div>
        </div>
    );
};

export default Game;