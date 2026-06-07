import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { isManager } = await request.json();

    const { data, error } = await supabase
      .from('gating_responses')
      .insert([
        {
          is_manager: isManager,
          created_at: new Date().toISOString(),
        },
      ])
      .select('id')
      .single();

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
