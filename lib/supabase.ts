import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SurveyType = 'gating' | 'manager' | 'employee' | 'app-feedback';

export interface GatingResponse {
  isManager: boolean;
  created_at: string;
}

export interface ManagerSurveyResponse {
  gating_id?: string;
  q1_confidence: string;
  q2_hardest_issues: string[];
  q3_evaluation_usefulness: string;
  q4_frustration: string[];
  q5_insights_value: string;
  q6_most_useful_insight: string;
  q7_trustworthiness: string;
  created_at: string;
}

export interface EmployeeSurveyResponse {
  gating_id?: string;
  q1_likelihood: string;
  q2_frequency: string;
  q3_honesty: string;
  q4_hesitations: string[];
  q5_useful_features: string[];
  q6_privacy_importance: string;
  q7_personal_need: string;
  created_at: string;
}

export interface AppFeedbackResponse {
  gating_id?: string;
  survey_type: 'manager' | 'employee';
  q1_version_reviewed: string;
  q2_clarity: string;
  q3_ease_of_use: string;
  q4_most_useful: string;
  q5_least_clear: string;
  q6_trustworthiness: string;
  q7_first_change: string;
  created_at: string;
}
