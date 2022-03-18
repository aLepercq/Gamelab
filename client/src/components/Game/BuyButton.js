import React, {useContext, useEffect, useState} from "react";
import {UidContext} from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {useDispatch} from "react-redux";
import {buyGame, unbuyGame} from "../../actions/game.actions";

const BuyButton = ({game}) => {
    const [bought, setBought] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const Buy = () => {
        dispatch(buyGame(game._id, uid))
        setBought(true);
    };

    const unBuy = () => {
        dispatch(unbuyGame(game._id, uid))
        setBought(false);
    };

    useEffect(() => {
        if (game.buyers.includes(uid)) setBought(true);
        else setBought(false);
    }, [uid, game.buyers, bought]);

    return (
        <div className="buy-container">
            {uid === null && (
                <Popup
                    trigger={<img src="./img/icons/caddie.png" alt="like"/>}
                    position={["bottom center", "bottom right", "bottom left"]}
                    closeOnDocumentClick
                >
                    <div>Connectez-vous pour acheter le jeu !</div>
                </Popup>
            )}
            {uid && bought === false && (
                <img src="./img/icons/caddie.png" onClick={Buy} alt="acheter"/>
            )}
            {uid && bought && (
                <img src="./img/icons/caddie-filled.png" onClick={unBuy} alt="annuler achat"/>
            )}
            <span>{game.buyers.length}</span>
        </div>
    );
};

export default BuyButton;