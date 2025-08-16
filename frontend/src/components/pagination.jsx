// src/components/Pagination.jsx
import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages === 0) return null;

  const pages = [];

  // Generate page numbers, simple approach; can improve later with ellipsis if many pages
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center space-x-2 mt-6">
      <button
        className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded border ${
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-100'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
}
