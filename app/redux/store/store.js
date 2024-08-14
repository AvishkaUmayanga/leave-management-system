import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userNavbarSliceReducer from '../slices/userNavbarSlice';
import userSliceReducer from '../slices/userSlice';
import leaveSliceReducer from '../slices/leaveSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key : 'root',
  storage
};

const rootReducer = combineReducers({
    userNavbarSlice: userNavbarSliceReducer,
    userSlice: userSliceReducer,
    leaveSlice: leaveSliceReducer,
});

const persistedReducer  = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store)
export default store;
