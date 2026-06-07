'use client';

import { useState } from 'react';

interface ManagerSurveyProps {
  gatingId: string;
  onComplete: () => void;
}

const HARDEST_ISSUES = [
  'Burnout',
  'Disengagement',
  'Workload imbalance',
  'Low morale',
  'Lack of recognition',
  'Manager / employee relationship issues',
  'Team conflict',
  'Retention risk',
  'Performance decline',
];

const FRUSTRATIONS = [
  'Feedback comes too late',
  'Employees are not fully honest',
  'Reviews are too subjective',
  'Managers lack enough data',
  'Reviews focus too much on past performance',
  'Hard to connect feedback to action',
  'Process takes too much time',
];

const INSIGHTS = [
  'Burnout risk',
  'Engagement trends',
  'Workload balance',
  'Recognition gaps',
  'Manager effectiveness feedback',
  'Team relationship health',
  'Retention risk',
  'Coaching recommendations',
];

export default function ManagerSurvey({ gatingId, onComplete }: ManagerSurveyProps) {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState<string[]>([]);
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState<string[]>([]);
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');
  const [q7, setQ7] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const toggleMultiSelect = (array: string[], item: string, max: number) => {
    if (array.includes(item)) {
      return array.filter((i) => i !== item);
    }
    if (array.length < max) {
      return [...array, item];
    }
    return array;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!q1 || !q3 || !q5 || !q6 || q2.length === 0 || q4.length === 0) {
      setError('Please answer all required questions');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/manager-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gatingId,
          q1,
          q2,
          q3,
          q4,
          q5,
          q6,
          q7,
        }),
      });

      if (!response.ok) throw new Error('Failed to save response');

      onComplete();
    } catch (err) {
      setError('Failed to save your response. Please try again.');
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manager Survey</h1>
        <p className="text-gray-600">
          This survey helps us understand your team visibility and performance evaluation challenges.
          <br className="hidden sm:block" />
          <span className="text-sm">Estimated time: 90 seconds or less</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Q1 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            1. How confident are you that you can identify employee disengagement before it becomes a serious issue?
          </label>
          <div className="space-y-2">
            {['Very confident', 'Somewhat confident', 'Neutral', 'Not very confident', 'Not confident at all'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="q1"
                  value={option}
                  checked={q1 === option}
                  onChange={(e) => setQ1(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            2. What are the hardest employee issues for you to spot early? (Select up to 3)
          </label>
          <div className="space-y-2">
            {HARDEST_ISSUES.map((issue) => (
              <label key={issue} className="flex items-center">
                <input
                  type="checkbox"
                  checked={q2.includes(issue)}
                  onChange={() => setQ2(toggleMultiSelect(q2, issue, 3))}
                  disabled={!q2.includes(issue) && q2.length >= 3}
                  className="mr-3"
                />
                <span className={!q2.includes(issue) && q2.length >= 3 ? 'text-gray-400' : 'text-gray-700'}>{issue}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            3. How useful are your current performance evaluation methods?
          </label>
          <div className="space-y-2">
            {['Very useful', 'Somewhat useful', 'Neutral', 'Not very useful', 'Not useful at all'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="q3"
                  value={option}
                  checked={q3 === option}
                  onChange={(e) => setQ3(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q4 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            4. What is your biggest frustration with current employee feedback or performance review processes?
          </label>
          <div className="space-y-2">
            {FRUSTRATIONS.map((frustration) => (
              <label key={frustration} className="flex items-center">
                <input
                  type="checkbox"
                  checked={q4.includes(frustration)}
                  onChange={() => setQ4(toggleMultiSelect(q4, frustration, 3))}
                  disabled={!q4.includes(frustration) && q4.length >= 3}
                  className="mr-3"
                />
                <span className={!q4.includes(frustration) && q4.length >= 3 ? 'text-gray-400' : 'text-gray-700'}>{frustration}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q5 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            5. How valuable would it be to receive summarized workforce health insights without seeing employees' private conversations?
          </label>
          <div className="space-y-2">
            {['Extremely valuable', 'Very valuable', 'Somewhat valuable', 'Slightly valuable', 'Not valuable'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="q5"
                  value={option}
                  checked={q5 === option}
                  onChange={(e) => setQ5(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q6 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            6. Which insight would be most useful to you as a manager?
          </label>
          <div className="space-y-2">
            {INSIGHTS.map((insight) => (
              <label key={insight} className="flex items-center">
                <input
                  type="radio"
                  name="q6"
                  value={insight}
                  checked={q6 === insight}
                  onChange={(e) => setQ6(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{insight}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q7 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            7. Optional: What would make this kind of tool trustworthy and useful for managers?
          </label>
          <textarea
            value={q7}
            onChange={(e) => setQ7(e.target.value)}
            placeholder="Your answer here..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            rows={4}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
        >
          {isSubmitting ? 'Saving...' : 'Complete Manager Survey'}
        </button>
      </form>
    </div>
  );
}
