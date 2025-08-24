import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    if (!user) return;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/jobs?postedBy=${user._id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // If your API returns { jobs: [...] }, adjust this:
        setJobs(data.jobs || data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  if (!user) return <p className="p-6">Please log in to manage your jobs.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Your Jobs</h1>

      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <p>No jobs posted yet. <Link to="/employer/post-job" className="text-blue-600 hover:underline">Post your first job</Link></p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.location}</p>
            <p className="text-gray-700 mb-2">{job.description.substring(0, 100)}...</p>
            <div className="flex justify-between mt-4">
              <Link
                to={`/employer/edit-job/${job._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </Link>
              <Link
                to={`/employer/job-applications/${job._id}`}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Applications
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
