import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/user.reducer";
import pageReducer from "./page/page.reducer";

const persistConfig = {
	key: 'root',
	storage
};

const rootReducer = combineReducers({
	user: userReducer,
	page: pageReducer
});

export default persistReducer(persistConfig, rootReducer);