import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import { InfoProvider } from './context/info';
import { ViewProvider } from './context/view';
import { AuthProvider } from './context/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ViewProvider>
      <InfoProvider>
        <App />
      </InfoProvider>
    </ViewProvider>
  </AuthProvider>
);
