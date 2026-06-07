'use client';

import { useState } from 'react';

interface AppFeedbackSurveyProps {
  gatingId: string;
  surveyType: 'manager' | 'employee';
  onComplete: () => void;
}

const USEFUL_FEATURES = [
  'Health scorecard',
  'AI chatbot / companion',
  "Today's actionable items",
  'Chat history',
  'Manager / workforce insights',
  'Recognition or feedback features',
  'Overall dashboard',
];

const LEAST_CLEAR = [
  'Purpose of the app',
  'Health scores',
  'Privacy / data use',
  'Chatbot role',
  'Manager insights',
  'Navigation',
  'Terminology',
  'Nothing was confusing',
];

export default function AppFeedbackSurvey({ gatingId, surveyType, onComplete }: AppFeedbackSurveyProps) {
  const [activeIframe, setActiveIframe] = useState<'mobile' | 'desktop'>('mobile');
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');
  const [q7, setQ7] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!q1 || !q2 || !q3 || !q4 || !q5 || !q6) {
      setError('Please answer all required questions');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/app-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gatingId,
          surveyType,
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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Feedback Survey</h1>
        <p className="text-gray-600">
          Please review the prototype applications and answer a few quick questions about clarity, usefulness, trust, and usability.
          <br className="hidden sm:block" />
          <span className="text-sm">Estimated time: 90 seconds or less</span>
        </p>
      </div>

      {/* App Preview Section */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Prototype Preview</h2>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveIframe('mobile')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeIframe === 'mobile'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mobile App
          </button>
          <button
            onClick={() => setActiveIframe('desktop')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeIframe === 'desktop'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Desktop / Web App
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-300">
          {activeIframe === 'mobile' && (
            <iframe
              src="https://pulsecwi-mobile.base44.app/dashboard"
              title="Pulse Mobile App"
              className="w-full h-[600px]"
              style={{ border: 'none' }}
            />
          )}
          {activeIframe === 'desktop' && (
            <iframe
              src="https://pulsewi.com"
              title="Pulse Desktop App"
              className="w-full h-[600px]"
              style={{ border: 'none' }}
            />
          )}
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Take time to explore both applications before answering the questions below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Q1 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            1. Which version did you review?
          </label>
          <div className="space-y-2">
            {['Mobile app', 'Desktop / web app', 'Both'].map((option) => (
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
            2. How clear was the purpose of the application?
          </label>
          <div className="space-y-2">
            {['Very clear', 'Somewhat clear', 'Neutral', 'Not very clear', 'Not clear at all'].map((option) => (
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
            3. How easy was the application to understand and navigate?
          </label>
          <div className="space-y-2">
            {['Very easy', 'Somewhat easy', 'Neutral', 'Somewhat difficult', 'Very difficult'].map((option) => (
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
            4. What part of the app felt most useful?
          </label>
          <div className="space-y-2">
            {USEFUL_FEATURES.map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="radio"
                  name="q4"
                  value={feature}
                  checked={q4 === feature}
                  onChange={(e) => setQ4(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q5 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            5. What was least clear or most confusing?
          </label>
          <div className="space-y-2">
            {LEAST_CLEAR.map((option) => (
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
            6. How trustworthy does the application feel?
          </label>
          <div className="space-y-2">
            {['Very trustworthy', 'Somewhat trustworthy', 'Neutral', 'Not very trustworthy', 'Not trustworthy at all'].map((option) => (
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
            7. Optional: What is the one thing you would change first?
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
          {isSubmitting ? 'Saving...' : 'Complete All Surveys'}
        </button>
      </form>
    </div>
  );
}
