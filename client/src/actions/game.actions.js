import axios from "axios";

// game
export const GET_GAMES = "GET_GAMES";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const ADD_GAME = "ADD_GAME";
export const BUY_GAME = "BUY_GAME";
export const UNBUY_GAME = "UNBUY_GAME";
export const UPDATE_GAME = "UPDATE_GAME";
export const DELETE_GAME = "DELETE_GAME";

// trends
export const GET_TRENDSGAME = "GET_TRENDSGAME";

// review
export const ADD_REVIEW = "ADD_REVIEW";
export const EDIT_REVIEW = "EDIT_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";

// errors
export const GET_GAME_ERRORS = "GET_GAME_ERRORS";

export const getGames = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/game/`)
            .then((res) => {
                const array = res.data.slice(0, num);
                dispatch({type: GET_GAMES, payload: array});
                dispatch({type: GET_ALL_GAMES, payload: res.data});
            })
            .catch((err) => console.log(err));
    };
};

export const addGame = (data) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/game/`, data)
            .then((res) => {
                if (res.data.errors) {
                    dispatch({type: GET_GAME_ERRORS, payload: res.data.errors});
                } else {
                    dispatch({type: GET_GAME_ERRORS, payload: ""});
                }
            });
    };
};

export const buyGame = (gameId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/game/buy-game/` + gameId,
            data: {id: userId},
        })
            .then((res) => {
                dispatch({type: BUY_GAME, payload: {gameId, userId}});
            })
            .catch((err) => console.log(err));
    };
};

export const unbuyGame = (gameId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/game/unbuy-game/` + gameId,
            data: {id: userId},
        })
            .then((res) => {
                dispatch({type: UNBUY_GAME, payload: {gameId, userId}});
            })
            .catch((err) => console.log(err));
    };
};

export const updateGame = (gameId, description) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/game/${gameId}`,
            data: {description},
        })
            .then((res) => {
                dispatch({type: UPDATE_GAME, payload: {description, gameId}});
            })
            .catch((err) => console.log(err));
    };
};

export const deleteGame = (gameId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/game/${gameId}`,
        })
            .then((res) => {
                dispatch({type: DELETE_GAME, payload: {gameId}});
            })
            .catch((err) => console.log(err));
    };
};

export const addReview = (gameId, reviewerId, text, reviewerPseudo) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/game/review-game/${gameId}`,
            data: {reviewerId, text, reviewerPseudo},
        })
            .then((res) => {
                dispatch({type: ADD_REVIEW, payload: {gameId}});
            })
            .catch((err) => console.log(err));
    };
};

export const editReview = (gameId, reviewId, text) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/game/edit-review-game/${gameId}`,
            data: {reviewId, text},
        })
            .then((res) => {
                dispatch({type: EDIT_REVIEW, payload: {gameId, reviewId, text}});
            })
            .catch((err) => console.log(err));
    };
};

export const deleteReview = (gameId, reviewId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/game/delete-review-game/${gameId}`,
            data: {reviewId},
        })
            .then((res) => {
                dispatch({type: DELETE_REVIEW, payload: {gameId, reviewId}});
            })
            .catch((err) => console.log(err));
    };
};

export const getTrendsGame = (sortedArray) => {
    return (dispatch) => {
        dispatch({type: GET_TRENDSGAME, payload: sortedArray});
    };
};