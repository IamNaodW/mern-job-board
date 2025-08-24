import React from 'react';
import Navbar from '../components/navbar.jsx';

export default function About() {
  return (
    <div>
      <div className="container mx-auto mt-20 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">About JobBoard</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to JobBoard! We connect talented professionals with top companies across the globe.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to make job searching and recruitment easier, faster, and more efficient. Whether you are a job seeker or an employer, JobBoard provides the tools to help you succeed.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Join our platform today and explore opportunities, post jobs, and connect with the right people.
        </p>
      </div>
    </div>
  );
}
