import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addReview, getGames} from "../../actions/game.actions";
import {isEmpty, timestampParser} from "../Utils";
import EditDeleteReview from "./EditDeleteReview";

const CardReviews = ({game}) => {
    const [text, setText] = useState("");
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleReview = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(addReview(game._id, userData._id, text, userData.pseudo))
                .then(() => dispatch(getGames()))
                .then(() => setText(''));
        }
    };

    return (
        <div className="reviews-container">
            {game.reviews.map((review) => {
                return (
                    <div
                        className={
                            review.reviewerId === userData._id
                                ? "review-container client"
                                : "review-container"
                        }
                        key={review._id}
                    >
                        <div className="left-part">
                            <img
                                src={
                                    !isEmpty(usersData[0]) &&
                                    usersData
                                        .map((user) => {
                                            if (user._id === review.reviewerId) return user.picture;
                                            else return null;
                                        })
                                        .join("")
                                }
                                alt="reviewer-pic"
                            />
                        </div>
                        <div className="right-part">
                            <div className="review-header">
                                <div className="pseudo">
                                    <h3>{review.reviewerPseudo}</h3>
                                </div>
                                <span>{timestampParser(review.timestamp)}</span>
                            </div>
                            <p>{review.text}</p>
                            <EditDeleteReview review={review} postId={game._id}/>
                        </div>
                    </div>
                );
            })}
            {userData._id && (
                <form action="" onSubmit={handleReview} className="review-form">
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Laisser un avis"
                    />
                    <br/>
                    <input type="submit" value="Envoyer"/>
                </form>
            )}
        </div>
    );
};

export default CardReviews;