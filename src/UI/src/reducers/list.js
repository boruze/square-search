import Immutable from "immutable";

const actionTypes = {
    SET_ITEMS: "SET_ITEMS",
    ADD_ITEM: "ADD_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_LIST_MESSAGE: "SET_LIST_MESSAGE"
}

export const actions = {
    setItems: (items, total) => {
        return {
            type: actionTypes.SET_ITEMS,
            items: items,
            total: total
        }
    },
    deleteItem: (key) => {
        return {
            type: actionTypes.REMOVE_ITEM,
            key: key
        }
    },
    setListMessage: (message) => {
        return {
            type: actionTypes.SET_LIST_MESSAGE,
            message: message,
        }
    }
}

export default function ListReducer (state = Immutable.fromJS({lists: []}), action) {
    if (action.type !== actionTypes.SET_LIST_MESSAGE) {
            state = state.set("message", undefined);
        }
    switch (action.type) {
        case actionTypes.SET_ITEMS:
            state = state.set("lists", Immutable.fromJS(action.items));
            return state.set("totalCount", action.total);
        case actionTypes.REMOVE_ITEM:
            return state.set("lists", state.get("lists").delete(action.key));
        case actionTypes.SET_LIST_MESSAGE:
            return state.set("message", Immutable.fromJS(action.message));
        default:
            return state;
    }
}