import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {dateParser, isEmpty} from "../Utils";
import BuyButton from "./BuyButton";
import {updateGame} from "../../actions/game.actions";
import DeleteCardGame from "./DeleteCardGame";
import CardReviews from "./CardReviews";

const CardGame = ({game}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showReviews, setShowReviews] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updateGame(game._id, textUpdate));
        }
        setIsUpdated(false);
    };

    function getPrice(price) {
        let finalPrice;
        if (price > 0) {
            finalPrice = price + '€';
        } else {
            finalPrice = 'GRATUIT';
        }
        return finalPrice;
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
        <li className="cardgame-container" key={game._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"/>
            ) : (
                <>
                    <div className="cardgame-left">
                        {game.picture && (
                            <a href={game.link} target="_blank">
                                <img src={game.picture} alt="game-pic" className="cardgame-pic"/>
                            </a>
                        )}
                    </div>
                    <div className="cardgame-right">
                        <div className="cardgame-header">
                            <div className="title">
                                <h1>
                                    {isUpdated === false && <p>{game.title}</p>}
                                </h1>
                            </div>
                            <span>{dateParser(game.createdAt)}</span>
                        </div>
                        {isUpdated === false && <p>{game.description}</p>}
                        <span className="info-title">Auteur</span>
                        {isUpdated === false && <p>{game.author}</p>}
                        <span className="info-title">Version</span>
                        {isUpdated === false && <p>{game.version}</p>}
                        <span className="info-title">Age</span>
                        {isUpdated === false && <p>{game.pegi}</p>}
                        <span className="info-title">Genre</span>
                        {isUpdated === false && <p>{game.tags[0]}</p>}
                        <span className="info-title">Prix</span>
                        {isUpdated === false && <p>{getPrice(game.price[0].value)}</p>}
                        {isUpdated && (
                            <div className="update-post">
                <textarea
                    defaultValue={game.description}
                    onChange={(e) => setTextUpdate(e.target.value)}
                />
                                <div className="button-container">
                                    <button className="btn" onClick={updateItem}>
                                        Valider modification
                                    </button>
                                </div>
                            </div>
                        )}
                        {game.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={game.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={game._id}
                            />
                        )}
                        {userData._id === game.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit"/>
                                </div>
                                <DeleteCardGame id={game._id}/>
                            </div>
                        )}
                        <div className="cardgame-footer">
                            <div className="review-icon">
                                <img
                                    onClick={() => setShowReviews(!showReviews)}
                                    src="./img/icons/message1.svg"
                                    alt="review"
                                />
                                <span>{game.reviews.length}</span>
                            </div>
                            <BuyButton game={game}/>
                            <img src="./img/icons/share.svg" alt="share"/>
                        </div>
                        {showReviews && <CardReviews game={game}/>}
                    </div>
                </>
            )}
        </li>
    );
};

export default CardGame;