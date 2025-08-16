import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobseeker', // 'jobseeker' or 'employer'
    companyName: '',    // only required for employers
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate employer company name
    if (form.role === 'employer' && !form.companyName.trim()) {
      setError('Company name is required for employers');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(form);

      // Validate server response
      if (!data || !data.user) {
        throw new Error('Invalid server response');
      }

      // Save token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === 'employer') {
        navigate('/employer/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Server error, please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <label className="block mb-2 font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          type="email"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium">Password</label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Your Password"
          type="password"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        {form.role === 'employer' && (
          <>
            <label className="block mb-2 font-medium">Company Name</label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

// API call function
async function registerUser(userData) {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
}
