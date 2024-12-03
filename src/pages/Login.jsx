// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/authActions';
import './styles.css';
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Si el usuario ya está autenticado, redirige al dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Fetch de datos del sistema
  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        const system_name = 'Legal Flow';
        const { data } = await axios.get(`http://10.10.165.112:260/api/session/init/${system_name}`);
        console.log(data);
        if (data.message !== 'Sistema encontrado') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message,
          }).then(() => {
            window.location.replace('https://www.uatf.edu.bo');
          });
        }
        localStorage.setItem('sistema', data.token);
      } catch (err) {
        console.error('Error al obtener el sistema:', err);
        setError('No se pudo cargar la información del sistema');
      }
    };

    fetchSystemData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await dispatch(loginUser(formData)); // Llama a la acción asincrónica loginUser
      navigate('/dashboard'); // Redirige al dashboard después del login exitoso
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Credenciales incorrectas');
      } else {
        setError('Ocurrió un error, por favor intente de nuevo');
      }
      console.error('Login Error:', err);
    }
  };

  return (
    <div className="body1">
      <img
        src="https://siadsis.uatf.edu.bo/assets/images/logo20.webp"
        alt="Background"
        className="img-login"
      />
      <div className="container-login">
        <h1>LOGIN</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        <Form onSubmit={handleLogin}>
          <div className="input-box">
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
          </div>
          <div className="input-box">
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
            </Form.Group>
            <i className="bx bx-lock-alt"></i>
          </div>
          <button className="btn-login" type="submit">
            Ingresar
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
