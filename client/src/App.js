import './App.css';
import { Routes, Route} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import SchedulesPage from './pages/SchedulesPage';
import DumpstersPage from './pages/DumpstersPage';
import ReportsPage from './pages/ReportsPage';
import TrackCollectorPage from './pages/TrackCollectorPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import EventsPage from './pages/EventsPage';
import TrucksPage from './pages/TrucksPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FirebaseAction from './pages/FirebaseAction';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Helmet from 'react-helmet'
function App() {
  return (
    <div className='App'>
      <LocalizationProvider dateAdapter={DateAdapter}>
      <Helmet>
        <link rel="icon" type="image/png" href="gtrack-favicon.ico" sizes="16x16" />
      </Helmet>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/settings" element={<AccountSettingsPage/>} />
          <Route path="/login" element={<SignInPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/announcements" element={<AnnouncementsPage/>} />
          <Route path="/events" element={<EventsPage/>} />
          <Route path="/employees" element={<EmployeesPage/>} />
          <Route path="/schedules" element={<SchedulesPage/>} />
          <Route path="/dumpsters" element={<DumpstersPage/>} />
          <Route path="/reports" element={<ReportsPage/>} />
          <Route path="/track" element={<TrackCollectorPage/>} />
          <Route path="/trucks" element={<TrucksPage/>} />
          <Route path="/action" element={<FirebaseAction/>} />
          <Route path="/forgot_password" element={<ForgotPasswordPage/>} />
        </Routes>
      </LocalizationProvider>
    </div>
  );
}

export default App;
