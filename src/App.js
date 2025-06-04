import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
// import AdminPage from './pages/AdminPage.js';
import AuthRoute from './components/auth/AuthRoute';
// import AdminRoute from './components/auth/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/mypage/:username"
          element={<AuthRoute element={UserPage} />}
        />
        {/* <Route path="/admimlab" element={<AdminRoute element={AdminPage} />} /> */}
        <Route
          path="/eungi"
          element={
            <div>
              Eungi Page <a href="./">Go Back</a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
