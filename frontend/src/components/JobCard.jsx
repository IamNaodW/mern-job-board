// src/components/JobCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <div className="border rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Company:</span> {job.company}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Location:</span> {job.location}
      </p>
      <p className="text-gray-600 mb-3">
        <span className="font-medium">Type:</span> {job.type}
      </p>
      <Link
        to={`/jobs/${job._id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
      >
        View Details
      </Link>
    </div>
  );
}
