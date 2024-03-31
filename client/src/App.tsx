import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Components
import HomePage from './pages/HomePage';
import LoginPage  from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import AllUrls from './pages/AllUrls';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation can go here, e.g., <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          { <Route path="/login" element={<LoginPage />} /> }
          { <Route path="/createAccount" element={<CreateAccount />} /> }
          { <Route path="/allUrls" element={<AllUrls />} /> }
        </Routes>
        {/* Footer can go here, e.g., <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
