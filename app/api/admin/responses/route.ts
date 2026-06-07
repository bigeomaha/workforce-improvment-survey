import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();

    // Fetch all responses from all tables
    const [gatingRes, managerRes, employeeRes, feedbackRes] = await Promise.all([
      supabase.from('gating_responses').select('*').order('created_at', { ascending: false }),
      supabase.from('manager_survey_responses').select('*').order('created_at', { ascending: false }),
      supabase.from('employee_survey_responses').select('*').order('created_at', { ascending: false }),
      supabase.from('app_feedback_responses').select('*').order('created_at', { ascending: false }),
    ]);

    // Check for errors
    if (gatingRes.error) throw gatingRes.error;
    if (managerRes.error) throw managerRes.error;
    if (employeeRes.error) throw employeeRes.error;
    if (feedbackRes.error) throw feedbackRes.error;

    return NextResponse.json({
      gating: gatingRes.data || [],
      manager: managerRes.data || [],
      employee: employeeRes.data || [],
      feedback: feedbackRes.data || [],
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch responses' },
      { status: 500 }
    );
  }
}
