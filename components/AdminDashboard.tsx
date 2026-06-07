'use client';

import { useState, useEffect } from 'react';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface GatingResponse {
  id: string;
  is_manager: boolean;
  created_at: string;
}

interface ManagerResponse {
  id: string;
  gating_id: string | null;
  q1_confidence: string;
  q2_hardest_issues: string[];
  q3_evaluation_usefulness: string;
  q4_frustration: string[];
  q5_insights_value: string;
  q6_most_useful_insight: string;
  q7_trustworthiness: string | null;
  created_at: string;
}

interface EmployeeResponse {
  id: string;
  gating_id: string | null;
  q1_likelihood: string;
  q2_frequency: string;
  q3_honesty: string;
  q4_hesitations: string[];
  q5_useful_features: string[];
  q6_privacy_importance: string;
  q7_personal_need: string | null;
  created_at: string;
}

interface AppFeedbackResponse {
  id: string;
  gating_id: string | null;
  survey_type: string;
  q1_version_reviewed: string;
  q2_clarity: string;
  q3_ease_of_use: string;
  q4_most_useful: string;
  q5_least_clear: string;
  q6_trustworthiness: string;
  q7_first_change: string | null;
  created_at: string;
}

type TabType = 'overview' | 'gating' | 'manager' | 'employee' | 'feedback';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [gatingData, setGatingData] = useState<GatingResponse[]>([]);
  const [managerData, setManagerData] = useState<ManagerResponse[]>([]);
  const [employeeData, setEmployeeData] = useState<EmployeeResponse[]>([]);
  const [feedbackData, setFeedbackData] = useState<AppFeedbackResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/responses');
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      setGatingData(data.gating || []);
      setManagerData(data.manager || []);
      setEmployeeData(data.employee || []);
      setFeedbackData(data.feedback || []);
      setError('');
    } catch (err) {
      setError('Failed to load survey responses');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (Array.isArray(value)) {
              return `"${value.join('; ')}"`;
            }
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const stats = {
    totalResponses: gatingData.length,
    managers: gatingData.filter((r) => r.is_manager).length,
    employees: gatingData.filter((r) => !r.is_manager).length,
    managerSurveys: managerData.length,
    employeeSurveys: employeeData.length,
    appFeedback: feedbackData.length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Survey Admin Dashboard
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Workforce Intelligence Survey Responses
            </p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'gating', label: `Gating (${gatingData.length})` },
            { id: 'manager', label: `Manager Surveys (${managerData.length})` },
            { id: 'employee', label: `Employee Surveys (${employeeData.length})` },
            { id: 'feedback', label: `App Feedback (${feedbackData.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2 font-medium whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading survey responses...</div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      label: 'Total Responses',
                      value: stats.totalResponses,
                      color: 'blue',
                    },
                    {
                      label: 'Managers',
                      value: stats.managers,
                      color: 'green',
                    },
                    {
                      label: 'Employees',
                      value: stats.employees,
                      color: 'purple',
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className={`bg-${stat.color}-50 border border-${stat.color}-200 rounded-lg p-6`}
                    >
                      <p className={`text-${stat.color}-700 text-sm font-medium`}>
                        {stat.label}
                      </p>
                      <p className={`text-${stat.color}-900 text-3xl font-bold mt-2`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      label: 'Manager Surveys',
                      value: stats.managerSurveys,
                      color: 'indigo',
                    },
                    {
                      label: 'Employee Surveys',
                      value: stats.employeeSurveys,
                      color: 'pink',
                    },
                    {
                      label: 'App Feedback',
                      value: stats.appFeedback,
                      color: 'amber',
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className={`bg-${stat.color}-50 border border-${stat.color}-200 rounded-lg p-6`}
                    >
                      <p className={`text-${stat.color}-700 text-sm font-medium`}>
                        {stat.label}
                      </p>
                      <p className={`text-${stat.color}-900 text-3xl font-bold mt-2`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Quick Export
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <button
                      onClick={() =>
                        exportToCSV(
                          gatingData,
                          `gating_responses_${new Date().toISOString().split('T')[0]}.csv`
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Export Gating
                    </button>
                    <button
                      onClick={() =>
                        exportToCSV(
                          managerData,
                          `manager_surveys_${new Date().toISOString().split('T')[0]}.csv`
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Export Managers
                    </button>
                    <button
                      onClick={() =>
                        exportToCSV(
                          employeeData,
                          `employee_surveys_${new Date().toISOString().split('T')[0]}.csv`
                        )
                      }
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Export Employees
                    </button>
                    <button
                      onClick={() =>
                        exportToCSV(
                          feedbackData,
                          `app_feedback_${new Date().toISOString().split('T')[0]}.csv`
                        )
                      }
                      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Export Feedback
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Tables */}
            {activeTab === 'gating' && (
              <DataTable
                title="Gating Responses"
                data={gatingData}
                onExport={() =>
                  exportToCSV(
                    gatingData,
                    `gating_responses_${new Date().toISOString().split('T')[0]}.csv`
                  )
                }
              />
            )}

            {activeTab === 'manager' && (
              <DataTable
                title="Manager Survey Responses"
                data={managerData}
                onExport={() =>
                  exportToCSV(
                    managerData,
                    `manager_surveys_${new Date().toISOString().split('T')[0]}.csv`
                  )
                }
              />
            )}

            {activeTab === 'employee' && (
              <DataTable
                title="Employee Survey Responses"
                data={employeeData}
                onExport={() =>
                  exportToCSV(
                    employeeData,
                    `employee_surveys_${new Date().toISOString().split('T')[0]}.csv`
                  )
                }
              />
            )}

            {activeTab === 'feedback' && (
              <DataTable
                title="App Feedback Responses"
                data={feedbackData}
                onExport={() =>
                  exportToCSV(
                    feedbackData,
                    `app_feedback_${new Date().toISOString().split('T')[0]}.csv`
                  )
                }
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

interface DataTableProps {
  title: string;
  data: any[];
  onExport: () => void;
}

function DataTable({ title, data, onExport }: DataTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={onExport}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          📥 Download CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-6 py-4 text-sm text-gray-700">
                    {Array.isArray(row[col])
                      ? row[col].join('; ')
                      : String(row[col] || '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
