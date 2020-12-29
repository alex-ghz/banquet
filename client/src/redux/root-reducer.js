import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/user.reducer";
import pageReducer from "./page/page.reducer";
import notificationReducer from "./notification/notification.reducer";
import menuReducer from "./menu/menu.reducer";

const persistConfig = {
	key: 'root',
	storage
};

const rootReducer = combineReducers({
	user: userReducer,
	page: pageReducer,
	notification: notificationReducer,
	menu: menuReducer
});

export default persistReducer(persistConfig, rootReducer);