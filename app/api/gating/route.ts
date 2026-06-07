import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { isManager } = await request.json();
    const supabase = getSupabaseClient();

    // @ts-ignore - Runtime insert, schema validation at database level
    const insertData = {
      is_manager: isManager,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await (supabase
      .from('gating_responses')
      .insert(insertData as any)
      .select('id')
      .single() as any);

    if (error) throw error;

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (error) {
    console.error('Error saving gating response:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}
