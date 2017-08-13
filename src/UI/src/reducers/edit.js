import Immutable from "immutable";
import {LOCATION_CHANGE} from 'react-router-redux'
import queryStringFromHash from "../services/query-string-parser";
import findUniqueSquaresPromise from "../services/square-search";

const actionTypes = {
    SET_NAME: "SET_NAME",
    SET_ID: "SET_ID",
    ADD_COORDINATE: "ADD_COORDINATE",
    UPDATE_COORDINATE: "UPDATE_COORDINATE",
    REMOVE_COORDINATE: "REMOVE_COORDINATE",
    SET_COORDINATES: "SET_COORDINATES",
    SET_VISIBLE_COORDINATES_FILTER: "SET_VISIBLE_COORDINATES_FILTER",
    SET_MESSAGE: "SET_MESSAGE",
    ADD_SQUARE: "ADD_SQUARE",
    CLEAR_SQUARES: "CLEAR_SQUARES",
    RECALCULATE_SQUARES: "RECALCULATE_SQUARES"
}

export const actions = {
    recalculateSquares: (onSquareFound) => {
        return {
            type: actionTypes.RECALCULATE_SQUARES,
            onSquareFound: onSquareFound
        }
    },
    setName: (name) => {
        return {
            type: actionTypes.SET_NAME,
            name: name
        }
    },
    addSquare: (square) => {
        return {
            type: actionTypes.ADD_SQUARE,
            square: square
        }
    },
    clearSquares: () => {
        return {
            type: actionTypes.CLEAR_SQUARES
        }
    },
    setId: (id) => {
        return {
            type: actionTypes.SET_ID,
            id: id
        }
    },
    setCoordinates: (coordinates) => {
        return {
            type: actionTypes.SET_COORDINATES,
            coordinates: coordinates
        }
    },
    addCoordinate: (coordinate) => {
        return {
            type: actionTypes.ADD_COORDINATE,
            coordinate: coordinate
        }
    },
    setVisibleCoordinateFilter: (coordinates) => {
        return {
            type: actionTypes.SET_VISIBLE_COORDINATES_FILTER,
            coordinates: coordinates
        }
    },
    updateCoordinate: (index, coordinate) => {
        return {
            type: actionTypes.UPDATE_COORDINATE,
            index: index,
            coordinate: coordinate
        }
    },
    removeCoordinate: (index) => {
        return {
            type: actionTypes.REMOVE_COORDINATE,
            index: index,
        }
    },
    setMessage: (message) => {
        return {
            type: actionTypes.SET_MESSAGE,
            message: message,
        }
    }
}

export default function EditReducer (state = Immutable.fromJS({coordinates: [], squares: [], filterVisibleCoordinates: {limit: 5, offset: 0}}), action) {
    const existingCoordinates = state.get("coordinates");
    if (action.type !== actionTypes.SET_MESSAGE
        || action.type !== actionTypes.ADD_SQUARE
        || action.type !== actionTypes.CLEAR_SQUARES){
            state = state.set("message", undefined);
        }
    switch (action.type) {
        case LOCATION_CHANGE:
            if (action.payload.pathname !== "/") {
                const id = action.payload.pathname.substring(1, action.payload.pathname.length);
                return state.set("id", +id);
            } else {
                return Immutable.fromJS({coordinates: [], squares: [], message: undefined, filterVisibleCoordinates: {}});
            }
        case actionTypes.SET_ID:
            return state.set("id", action.id);
        case actionTypes.SET_NAME:
            return state.set("name", action.name);
        case actionTypes.SET_COORDINATES:
            return state.set("coordinates", Immutable.fromJS(action.coordinates));
        case actionTypes.ADD_COORDINATE:
            return state.set("coordinates", existingCoordinates.insert(state.get("filterVisibleCoordinates").get("offset"), action.coordinate));
        case actionTypes.UPDATE_COORDINATE:
            return state.set("coordinates", existingCoordinates.set(action.index, action.coordinate));
        case actionTypes.REMOVE_COORDINATE:
            return state.set("coordinates", existingCoordinates.delete(action.index));
        case actionTypes.SET_MESSAGE:
            return state.set("message", Immutable.fromJS(action.message));
        case actionTypes.ADD_SQUARE:
            return state.set("squares", state.get("squares").push(action.square));
        case actionTypes.CLEAR_SQUARES:
            return state.set("squares", Immutable.fromJS([]));
        case actionTypes.SET_VISIBLE_COORDINATES_FILTER:
            return state.set("filterVisibleCoordinates", Immutable.fromJS(action.coordinates));
        case actionTypes.RECALCULATE_SQUARES:
            const filter = state.get("filterVisibleCoordinates").toJSON();
            findUniqueSquaresPromise(
                existingCoordinates.toJSON().slice(filter.offset, filter.limit),
                action.onSquareFound
            );
            return state;
        default:
            return state;
    }
}