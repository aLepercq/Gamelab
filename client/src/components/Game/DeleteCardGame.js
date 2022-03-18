import React from "react";
import {useDispatch} from "react-redux";
import {deleteGame} from "../../actions/game.actions";

const DeleteCardGame = (props) => {
    const dispatch = useDispatch();

    const deleteQuote = () => dispatch(deleteGame(props.id));

    return (
        <div
            onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce jeu ?")) {
                    deleteQuote();
                }
            }}
        >
            <img src="./img/icons/trash.svg" alt="trash"/>
        </div>
    );
};

export default DeleteCardGame;