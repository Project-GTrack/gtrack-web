import './App.css';
import { Routes, Route} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import SchedulesPage from './pages/SchedulesPage';
import DumpstersPage from './pages/DumpstersPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<SignInPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/employees" element={<EmployeesPage/>} />
        <Route path="/schedules" element={<SchedulesPage/>} />
        <Route path="/dumpsters" element={<DumpstersPage/>} />
        <Route path="/reports" element={<ReportsPage/>} />
      </Routes>
    </div>
  );
}

export default App;
