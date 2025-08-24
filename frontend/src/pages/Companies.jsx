import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/companies"); // Replace with your API
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading companies...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Companies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {companies.length > 0 ? (
          companies.map((company) => (
            <div
              key={company.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{company.name}</h2>
              <p className="text-gray-600 mb-4">{company.description}</p>
              <Link
                to={`/companies/${company.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Jobs
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No companies available.</p>
        )}
      </div>
    </div>
  );
}
