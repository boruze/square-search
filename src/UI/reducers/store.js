import {createStore, applyMiddleware} from "redux";
import * as Immutable from "immutable";
import reducers from "./index";

const store = createStore(reducers);
export default store;