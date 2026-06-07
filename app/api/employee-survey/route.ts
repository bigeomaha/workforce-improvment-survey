import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabaseClient();

    // @ts-ignore - Runtime insert, schema validation at database level
    const insertData = {
      gating_id: body.gatingId || null,
      q1_likelihood: body.q1,
      q2_frequency: body.q2,
      q3_honesty: body.q3,
      q4_hesitations: body.q4,
      q5_useful_features: body.q5,
      q6_privacy_importance: body.q6,
      q7_personal_need: body.q7,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await (supabase
      .from('employee_survey_responses')
      .insert(insertData as any)
      .select('id')
      .single() as any);

    if (error) throw error;

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (error) {
    console.error('Error saving employee survey:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}
