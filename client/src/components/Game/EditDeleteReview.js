import React, {useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {deleteReview, editReview} from "../../actions/game.actions";
import {UidContext} from "../AppContext";

const EditDeleteReview = ({review, gameId}) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(editReview(gameId, review._id, text));
            setText("");
            setEdit(false);
        }
    };

    const handleDelete = () => dispatch(deleteReview(gameId, review._id));

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === review.commenterId) {
                setIsAuthor(true);
            }
        };
        checkAuthor();
    }, [uid, review.reviewerId]);

    return (
        <div className="edit-review">
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-review"/>
        </span>
            )}
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className="edit-review-form">
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>
                        Editer
                    </label>
                    <br/>
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={review.text}
                    />
                    <br/>
                    <div className="btn">
            <span
                onClick={() => {
                    if (window.confirm("Voulez-vous supprimer cet avis ?")) {
                        handleDelete();
                    }
                }}
            >
              <img src="./img/icons/trash.svg" alt="delete"/>
            </span>
                        <input type="submit" value="Valider modification"/>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditDeleteReview;