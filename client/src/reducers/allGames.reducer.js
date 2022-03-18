import {GET_ALL_GAMES} from "../actions/game.actions";

const initialState = {};

export default function allGamesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_GAMES:
            return action.payload
        default:
            return state;
    }
}