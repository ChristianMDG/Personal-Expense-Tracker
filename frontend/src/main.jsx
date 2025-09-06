import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom'; // <- Ajouté

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter> {/* <- Router ajouté ici */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
