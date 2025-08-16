import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/navbar.jsx';

// Pages
import Home from './pages/Homepage.jsx';
import Login from './pages/Loginpage.jsx';
import Register from './pages/RegisterPage.jsx';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';

// Employer Pages
import Dashboard from './pages/employer/Dashboard';
import PostJob from './pages/employer/postjob.jsx';
import ManageJobs from './pages/employer/managejobs.jsx';

export default function App() {
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Job Seeker Routes */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/profile" element={<Profile />} />

            {/* Employer Routes */}
            <Route path="/employer/dashboard" element={<Dashboard />} />
            <Route path="/employer/post-job" element={<PostJob />} />
            <Route path="/employer/manage-jobs" element={<ManageJobs />} />

            {/* Fallback */}
            <Route path="*" element={<h1 className="text-center text-2xl">Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
  );
}
