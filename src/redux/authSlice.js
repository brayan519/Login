// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  dailyToken: localStorage.getItem('dailyToken') || null,
  weeklyToken: localStorage.getItem('weeklyToken') || null,
  isAuthenticated: !!localStorage.getItem('user'), // Si hay un usuario, está autenticado
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, dailyToken, weeklyToken } = action.payload;
      state.user = user;
      state.dailyToken = dailyToken;
      state.weeklyToken = weeklyToken;
      state.isAuthenticated = true;

      // Guarda datos en localStorage
      localStorage.setItem('user', JSON.stringify(user));
      //localStorage.setItem('dailyToken', dailyToken);
      //localStorage.setItem('weeklyToken', weeklyToken);
    },
    logout: (state) => {
      state.user = null;
      state.dailyToken = null;
      state.weeklyToken = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
