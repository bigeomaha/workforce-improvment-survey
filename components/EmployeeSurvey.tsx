'use client';

import { useState } from 'react';

interface EmployeeSurveyProps {
  gatingId: string;
  onComplete: () => void;
}

const HESITATIONS = [
  'Fear my manager would see what I said',
  'Fear HR would use it against me',
  'Unclear privacy rules',
  'Too many notifications',
  'I do not want another app',
  'I do not trust workplace AI tools',
  'I do not see the personal benefit',
  'I would forget to use it',
];

const FEATURES = [
  'Private reflection / journaling',
  'Goal tracking',
  'Workload check-ins',
  'Recognition prompts',
  'Career growth support',
  'Well-being support',
  'Feedback preparation',
  'Manager conversation coaching',
];

export default function EmployeeSurvey({ gatingId, onComplete }: EmployeeSurveyProps) {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState<string[]>([]);
  const [q5, setQ5] = useState<string[]>([]);
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

    if (!q1 || !q2 || !q3 || !q6 || q4.length === 0 || q5.length === 0) {
      setError('Please answer all required questions');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/employee-survey', {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Survey</h1>
        <p className="text-gray-600">
          This survey helps us understand your needs and comfort with AI workplace companions.
          <br className="hidden sm:block" />
          <span className="text-sm">Estimated time: 90 seconds or less</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Q1 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            1. How likely would you be to use a private AI workplace companion if it helped with reflection, goals, feedback, recognition, and workplace support?
          </label>
          <div className="space-y-2">
            {['Very likely', 'Somewhat likely', 'Neutral', 'Not very likely', 'Not likely at all'].map((option) => (
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
            2. How often would you realistically interact with this type of chatbot?
          </label>
          <div className="space-y-2">
            {['Daily', 'A few times per week', 'Weekly', 'Only when prompted', 'Rarely or never'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="q2"
                  value={option}
                  checked={q2 === option}
                  onChange={(e) => setQ2(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            3. How honest would you be with the chatbot if your exact conversations stayed private?
          </label>
          <div className="space-y-2">
            {['Completely honest', 'Mostly honest', 'Somewhat honest', 'Not very honest', 'Not honest at all'].map((option) => (
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
            4. What would make you hesitant to use it? (Select up to 3)
          </label>
          <div className="space-y-2">
            {HESITATIONS.map((hesitation) => (
              <label key={hesitation} className="flex items-center">
                <input
                  type="checkbox"
                  checked={q4.includes(hesitation)}
                  onChange={() => setQ4(toggleMultiSelect(q4, hesitation, 3))}
                  disabled={!q4.includes(hesitation) && q4.length >= 3}
                  className="mr-3"
                />
                <span className={!q4.includes(hesitation) && q4.length >= 3 ? 'text-gray-400' : 'text-gray-700'}>{hesitation}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q5 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            5. Which features would be most useful to you? (Select up to 3)
          </label>
          <div className="space-y-2">
            {FEATURES.map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={q5.includes(feature)}
                  onChange={() => setQ5(toggleMultiSelect(q5, feature, 3))}
                  disabled={!q5.includes(feature) && q5.length >= 3}
                  className="mr-3"
                />
                <span className={!q5.includes(feature) && q5.length >= 3 ? 'text-gray-400' : 'text-gray-700'}>{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q6 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            6. How important is it that your employer only receives summarized trends and not your exact conversations?
          </label>
          <div className="space-y-2">
            {['Extremely important', 'Very important', 'Somewhat important', 'Slightly important', 'Not important'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="q6"
                  value={option}
                  checked={q6 === option}
                  onChange={(e) => setQ6(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q7 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            7. Optional: What would this app need to do for you personally so you would keep using it?
          </label>
          <textarea
            value={q7}
            onChange={(e) => setQ7(e.target.value)}
            placeholder="Your answer here..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
        >
          {isSubmitting ? 'Saving...' : 'Complete Employee Survey'}
        </button>
      </form>
    </div>
  );
}
