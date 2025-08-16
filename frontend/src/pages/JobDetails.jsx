import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../api';

export default function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const data = await apiFetch(`/jobs/${jobId}`);
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [jobId]);

  if (loading) return <p className="text-center mt-10">Loading job details...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!job) return <p className="text-center mt-10">Job not found</p>;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-700 mb-1"><strong>Company:</strong> {job.company}</p>
      <p className="text-gray-700 mb-1"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700 mb-1"><strong>Salary:</strong> {job.salary}</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Job Description</h2>
      <p>{job.description}</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Requirements</h2>
      <p>{job.requirements}</p>
    </div>
  );
}
