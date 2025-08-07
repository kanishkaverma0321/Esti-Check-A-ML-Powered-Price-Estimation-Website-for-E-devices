import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import EstimationPage from './pages/EstimationPage.tsx';
import ComparisonPage from './pages/ComparisonPage.tsx';
import UserGuidePage from './pages/UserGuidePage.tsx';
import { AppProvider } from './context/AppContext.tsx';

function App() {
  return (
    <AppProvider>
      <Router basename="/Esti-Check-A-ML-Powered-Price-Estimation-Website-for-E-devices">
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/estimate" element={<EstimationPage />} />
              <Route path="/compare" element={<ComparisonPage />} />
              <Route path="/guide" element={<UserGuidePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
