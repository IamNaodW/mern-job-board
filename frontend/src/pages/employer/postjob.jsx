import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api';

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await apiFetch('/employer/jobs', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      navigate('/employer/manage-jobs');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {/* inputs as before */}
        <input type="text" name="title" placeholder="Job Title" className="input" value={form.title} onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company Name" className="input" value={form.company} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" className="input" value={form.location} onChange={handleChange} required />
        <input type="text" name="salary" placeholder="Salary Range" className="input" value={form.salary} onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" className="input resize-y" value={form.description} onChange={handleChange} required />
        <textarea name="requirements" placeholder="Job Requirements" className="input resize-y" value={form.requirements} onChange={handleChange} required />
        <button type="submit" className="btn-primary w-full">Post Job</button>
      </form>
    </div>
  );
}
