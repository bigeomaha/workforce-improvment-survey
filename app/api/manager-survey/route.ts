import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabaseClient();

    // @ts-ignore - Runtime insert, schema validation at database level
    const insertData = {
      gating_id: body.gatingId || null,
      q1_confidence: body.q1,
      q2_hardest_issues: body.q2,
      q3_evaluation_usefulness: body.q3,
      q4_frustration: body.q4,
      q5_insights_value: body.q5,
      q6_most_useful_insight: body.q6,
      q7_trustworthiness: body.q7,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await (supabase
      .from('manager_survey_responses')
      .insert(insertData as any)
      .select('id')
      .single() as any);

    if (error) throw error;

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (error) {
    console.error('Error saving manager survey:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}
