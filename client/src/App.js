import './App.css';
import { Routes, Route} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<SignInPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </div>
  );
}

export default App;
