// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Almacenamiento local (localStorage)
import authReducer from './authSlice'; // Asegúrate de tener un archivo authSlice.js

// Configuración de persistencia
const persistConfig = {
  key: 'root', // El nombre del key en el almacenamiento local
  storage, // Usamos el almacenamiento local
  whitelist: ['auth'], // Solo persistiremos el estado de la autenticación
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Configuración del store de Redux
const store = configureStore({
  reducer: {
    auth: persistedReducer, // Reducer persistido
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
