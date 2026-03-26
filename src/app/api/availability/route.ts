import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tourId = searchParams.get('tour_id');

    if (!tourId) {
      return NextResponse.json({ error: 'tour_id is required' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('tour_availability')
      .select('id, available_date, max_capacity, booked_count')
      .eq('tour_id', tourId)
      .eq('is_active', true)
      .gte('available_date', today)
      .order('available_date', { ascending: true });

    if (error) throw error;

    const dates = (data || []).map(slot => ({
      date: slot.available_date,
      max_capacity: slot.max_capacity,
      booked_count: slot.booked_count,
      spots_left: slot.max_capacity - slot.booked_count,
    }));

    return NextResponse.json({ dates });
  } catch (error) {
    console.error('Availability fetch error:', error);
    return NextResponse.json({ error: 'Error fetching availability' }, { status: 500 });
  }
}
