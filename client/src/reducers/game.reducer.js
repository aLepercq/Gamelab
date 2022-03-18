import {
    DELETE_REVIEW,
    DELETE_GAME,
    EDIT_REVIEW,
    GET_GAMES,
    BUY_GAME,
    UNBUY_GAME,
    UPDATE_GAME,
} from "../actions/game.actions";

const initialState = {};

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GAMES:
            return action.payload;
        case BUY_GAME:
            return state.map((game) => {
                if (game._id === action.payload.gameId) {
                    return {
                        ...game,
                        buyers: [action.payload.userId, ...game.buyers],
                    };
                }
                return game;
            });
        case UNBUY_GAME:
            return state.map((game) => {
                if (game._id === action.payload.gameId) {
                    return {
                        ...game,
                        buyers: game.buyers.filter((id) => id !== action.payload.userId),
                    };
                }
                return game;
            });
        case UPDATE_GAME:
            return state.map((game) => {
                if (game._id === action.payload.gameId) {
                    return {
                        ...game,
                        description: action.payload.description,
                    };
                } else return game;
            });
        case DELETE_GAME:
            return state.filter((game) => game._id !== action.payload.gameId);
        case EDIT_REVIEW:
            return state.map((game) => {
                if (game._id === action.payload.gameId) {
                    return {
                        ...game,
                        reviews: game.reviews.map((review) => {
                            if (review._id === action.payload.reviewId) {
                                return {
                                    ...review,
                                    text: action.payload.text,
                                };
                            } else {
                                return review;
                            }
                        }),
                    };
                } else return game;
            });
        case DELETE_REVIEW:
            return state.map((game) => {
                if (game._id === action.payload.gameId) {
                    return {
                        ...game,
                        reviews: game.reviews.filter(
                            (review) => review._id !== action.payload.reviewId
                        ),
                    };
                } else return game;
            });
        default:
            return state;
    }
}