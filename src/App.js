import LandingPage from "./pages/LandingPage";
// import OpnlyrPage from "./pages/OpnlyrPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/opl" element={<OpnlyrPage />} /> */}
        <Route
          path="/danny"
          element={
            <div>
              Danny Page <a href="./">Go Back</a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
