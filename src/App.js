import React from 'react';  
import { Provider } from 'react-redux';  
import { store, persistor } from './redux/store'; // Importa el store y persistor
import { PersistGate } from 'redux-persist/integration/react';  // Importa PersistGate de Redux Persist
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importa Navigate desde react-router-dom
import Login from './pages/Login';  // Importa el componente Login
import Dashboard from './pages/Dashboard';  // Importa el componente Dashboard
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />  {/* Redirige a /login */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/error/404" />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
