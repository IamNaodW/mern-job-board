import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // Ideally, you get user info from context or API
  const userName = "Employer"; // Replace with actual user name from context/state

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {userName}!</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Total Jobs Posted</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Applications Received</h2>
          <p className="text-3xl font-bold">48</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Active Listings</h2>
          <p className="text-3xl font-bold">5</p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row gap-4">
        <Link
          to="/employer/post-job"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded text-center"
        >
          Post a New Job
        </Link>

        <Link
          to="/employer/manage-jobs"
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded text-center"
        >
          Manage Your Jobs
        </Link>
      </section>
    </div>
  );
}
