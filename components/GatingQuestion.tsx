'use client';

import { useState } from 'react';

interface GatingQuestionProps {
  onSubmit: (isManager: boolean, gatingId: string) => void;
  isLoading: boolean;
}

export default function GatingQuestion({ onSubmit, isLoading }: GatingQuestionProps) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (selected === null) {
      setError('Please select an option');
      return;
    }

    try {
      const response = await fetch('/api/gating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isManager: selected }),
      });

      if (!response.ok) throw new Error('Failed to save response');

      const { id } = await response.json();
      onSubmit(selected, id);
    } catch (err) {
      setError('Failed to save your response. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Workforce Intelligence Survey
        </h1>
        <p className="text-gray-600 text-lg">
          This survey helps us understand your needs and experiences with workforce intelligence tools.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Question 1: Are you a manager of people or have you managed 8 or more people directly?
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => {
              setSelected(true);
              setError('');
            }}
            className={`w-full p-4 text-left rounded-lg border-2 transition ${
              selected === true
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="font-semibold text-gray-900">Yes</div>
            <div className="text-sm text-gray-600">I manage 8 or more people</div>
          </button>

          <button
            onClick={() => {
              setSelected(false);
              setError('');
            }}
            className={`w-full p-4 text-left rounded-lg border-2 transition ${
              selected === false
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="font-semibold text-gray-900">No</div>
            <div className="text-sm text-gray-600">I am an individual contributor or manage fewer than 8 people</div>
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
        >
          {isLoading ? 'Processing...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
