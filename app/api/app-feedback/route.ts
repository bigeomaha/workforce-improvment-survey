import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('app_feedback_responses')
      .insert([
        {
          gating_id: body.gatingId || null,
          survey_type: body.surveyType,
          q1_version_reviewed: body.q1,
          q2_clarity: body.q2,
          q3_ease_of_use: body.q3,
          q4_most_useful: body.q4,
          q5_least_clear: body.q5,
          q6_trustworthiness: body.q6,
          q7_first_change: body.q7,
          created_at: new Date().toISOString(),
        },
      ])
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (error) {
    console.error('Error saving app feedback survey:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}
