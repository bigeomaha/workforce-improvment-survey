'use client';

import { useState } from 'react';
import GatingQuestion from '@/components/GatingQuestion';
import ManagerSurvey from '@/components/ManagerSurvey';
import EmployeeSurvey from '@/components/EmployeeSurvey';
import AppFeedbackSurvey from '@/components/AppFeedbackSurvey';

type SurveyStep = 'gating' | 'manager' | 'employee' | 'app-feedback' | 'complete';

export default function Home() {
  const [step, setStep] = useState<SurveyStep>('gating');
  const [isManager, setIsManager] = useState(false);
  const [gatingId, setGatingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGatingSubmit = (manager: boolean, id: string) => {
    setIsManager(manager);
    setGatingId(id);
    setStep(manager ? 'manager' : 'employee');
  };

  const handleSurveyComplete = () => {
    setStep('app-feedback');
  };

  const handleAppFeedbackComplete = () => {
    setStep('complete');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {step === 'gating' && (
        <GatingQuestion onSubmit={handleGatingSubmit} isLoading={isLoading} />
      )}

      {step === 'manager' && (
        <ManagerSurvey gatingId={gatingId} onComplete={handleSurveyComplete} />
      )}

      {step === 'employee' && (
        <EmployeeSurvey gatingId={gatingId} onComplete={handleSurveyComplete} />
      )}

      {step === 'app-feedback' && (
        <AppFeedbackSurvey
          gatingId={gatingId}
          surveyType={isManager ? 'manager' : 'employee'}
          onComplete={handleAppFeedbackComplete}
        />
      )}

      {step === 'complete' && (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Your feedback has been successfully saved. We appreciate you taking the time to help us understand the needs and challenges around workforce intelligence.
            </p>
            <p className="text-gray-600">
              Your responses will help us build a better product for managers and employees.
            </p>
          </div>
          <button
            onClick={() => {
              setStep('gating');
              setIsManager(false);
              setGatingId('');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Take Survey Again
          </button>
        </div>
      )}
    </div>
  );
}
