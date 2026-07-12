import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export function CalculatorForm({ onCalculate }) {
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDob(value);
    setError('');

    if (!value) return;

    const selectedDate = new Date(value);
    const today = new Date();

    if (selectedDate > today) {
      setError('Date of Birth cannot be in the future.');
      return;
    }

    // Auto-calculate on valid date selection
    onCalculate(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!dob) {
      setError('Please select a Date of Birth.');
      return;
    }

    const selectedDate = new Date(dob);
    const today = new Date();

    if (selectedDate > today) {
      setError('Date of Birth cannot be in the future.');
      return;
    }

    onCalculate(dob);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 max-w-md mx-auto w-full transform transition-all hover:scale-[1.02]">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
          <Calendar size={24} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Enter Your Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={handleDateChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm animate-pulse">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
        >
          Calculate Legacy Values
        </button>
      </form>
    </div>
  );
}
