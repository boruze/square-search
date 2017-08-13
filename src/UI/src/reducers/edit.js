import Immutable from "immutable";
import { LOCATION_CHANGE } from 'react-router-redux'

const actionTypes = {
    SET_NAME: "SET_NAME",
    SET_ID: "SET_ID",
    ADD_COORDINATE: "ADD_COORDINATE",
    UPDATE_COORDINATE: "UPDATE_COORDINATE",
    REMOVE_COORDINATE: "REMOVE_COORDINATE",
    SET_COORDINATES: "SET_COORDINATES",
    SET_MESSAGE: "SET_MESSAGE"
}

export const actions = {
    setName: (name) => {
        return {
            type: actionTypes.SET_NAME,
            name: name
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

export default function EditReducer (state = Immutable.fromJS({coordinates: []}), action) {
    const existingCoordinates = state.get("coordinates");
    if (action.type !== actionTypes.SET_MESSAGE){
            state = state.set("message", undefined);
        }
    switch (action.type) {
        case LOCATION_CHANGE:
            if (action.payload.pathname !== "/") {
                const id = action.payload.pathname.substring(1, action.payload.pathname.length);
                return state.set("id", +id);
            } else {
                return Immutable.fromJS({coordinates: [], message: undefined});
            }
        case actionTypes.SET_ID:
            return state.set("id", action.id);
        case actionTypes.SET_NAME:
            return state.set("name", action.name);
        case actionTypes.SET_COORDINATES:
            return state.set("coordinates", Immutable.fromJS(action.coordinates));
        case actionTypes.ADD_COORDINATE:
            return state.set("coordinates", existingCoordinates.push(action.coordinate));
        case actionTypes.UPDATE_COORDINATE:
            return state.set("coordinates", existingCoordinates.set(action.index, action.coordinate));
        case actionTypes.REMOVE_COORDINATE:
            return state.set("coordinates", existingCoordinates.delete(action.index));
        case actionTypes.SET_MESSAGE:
            return state.set("message", Immutable.fromJS(action.message));
        default:
            return state;
    }
}