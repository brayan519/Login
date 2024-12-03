// redux/authActions.js
import axios from 'axios';
import { loginSuccess } from './authSlice'; // Importamos la acción de éxito de login
import {jwtDecode} from 'jwt-decode';

export const loginUser = (formData) => async (dispatch) => {
  try {
    const data = localStorage.getItem('sistema');
    const decodedToken = jwtDecode(data);
    const systemKey = decodedToken.passwordAdmin;

    if (!systemKey) {
      throw new Error('Sistema no encontrado');
    }

    const response = await axios.post(
      'http://10.10.165.112:260/api/login',
      formData,
      { headers: { 'X-System-Key': systemKey } }
    );

    if (response.data.status === 'success') {
      const { user, tokens } = response.data;
      dispatch(loginSuccess({
        user,
        dailyToken: tokens.daily_token,
        weeklyToken: tokens.weekly_token,
      }));
      sessionStorage.setItem('daily_token', tokens.daily_token);
      sessionStorage.setItem('weekly_token', tokens.weekly_token);
    }
  } catch (err) {
      
    throw err;
  }
};
