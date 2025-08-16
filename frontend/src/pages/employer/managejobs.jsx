import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../api';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  async function loadJobs() {
    try {
      const data = await apiFetch('/employer/jobs');
      setJobs(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await apiFetch(`/employer/jobs/${id}`, { method: 'DELETE' });
      setJobs(jobs.filter(job => job._id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Jobs</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Job Title</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id}>
                <td className="border border-gray-300 p-2">{job.title}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="btn-secondary mr-2" onClick={() => alert('View not implemented')}>View</button>
                  <button className="btn-danger" onClick={() => handleDelete(job._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
