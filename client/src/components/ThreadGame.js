import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGames} from "../actions/game.actions";
import CardGame from "./Game/CardGame";
import {isEmpty} from "./Utils";

const ThreadGame = () => {
    const [loadGame, setLoadGame] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const games = useSelector((state) => state.gameReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadGame(true);
        }
    }

    useEffect(() => {
        if (loadGame) {
            dispatch(getGames(count));
            setLoadGame(false);
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadGame, dispatch, count]);

    return (

        <div className="thread-container">

            <ul>
                {!isEmpty(games[0]) &&
                    games.map((game) => {
                        return <CardGame game={game} key={game._id}/>;
                    })}

            </ul>

        </div>
    );
};

export default ThreadGame;