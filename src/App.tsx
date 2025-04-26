import SearchPage from './pages/SearchPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LoginPage from './pages/LoginPage';
import TermsOfUse from './pages/TermsOfUse';
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import MainLayout from './MainLayout';
import PrivateRoute from './components/PrivateRoute';
import SearchResults from './pages/SearchResults';
import SignupPage from './pages/SignupPage';

function App() {
  return (
      <Router>
      <Routes>
        {/* Apply MainLayout to all pages */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage/>} />
          <Route element={<PrivateRoute/>}>
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route element={<PrivateRoute/>}>
            <Route path="/searchResults/:patentid/:timestamp/" element={<SearchResults />} />
          </Route>
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
