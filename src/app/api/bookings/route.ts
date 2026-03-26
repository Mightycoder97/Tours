import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: Request) {
  try {
    const bookingData = await req.json();
    
    // Validate capacity before booking
    const totalPassengers = (bookingData.adults || 0) + (bookingData.children || 0);
    const selectedDate = bookingData.date?.split('T')[0]; // Normalize to YYYY-MM-DD
    
    const { data: availSlot } = await supabase
      .from('tour_availability')
      .select('id, max_capacity, booked_count')
      .eq('tour_id', bookingData.tourId)
      .eq('available_date', selectedDate)
      .eq('is_active', true)
      .single();

    if (availSlot) {
      const spotsLeft = availSlot.max_capacity - availSlot.booked_count;
      if (totalPassengers > spotsLeft) {
        return NextResponse.json(
          { error: `Solo quedan ${spotsLeft} cupos disponibles para esta fecha.` },
          { status: 400 }
        );
      }
    }

    // Generate a reference code
    const bookingCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // 1. Insert Booking to Supabase (DB trigger will auto-increment booked_count)
    const { data: booking, error: bookingError } = await supabase.from('bookings').insert({
      booking_code: bookingCode,
      tour_id: bookingData.tourId,
      selected_date: selectedDate,
      adults: bookingData.adults,
      children: bookingData.children,
      total_usd: bookingData.totalPrice,
      
      passenger_name: bookingData.contactName,
      passenger_email: bookingData.contactEmail,
      passenger_phone: bookingData.contactPhone,
      
      payment_method: bookingData.paymentMethod,
      payment_status: 'PAID',
      payment_ref: bookingData.paymentRef
    }).select().single();

    if (bookingError) throw bookingError;

    // 2. Insert Passengers
    // Usually we would insert the passenger array here:
    if (bookingData.passengers && bookingData.passengers.length > 0) {
      const passengersToInsert = bookingData.passengers.map((p: any) => ({
        booking_id: booking.id,
        first_name: p.firstName,
        last_name: p.lastName,
        doc_type: p.docType,
        doc_number: p.docNumber,
        nationality: p.nationality,
        is_child: p.isChild || false
      }));
      await supabase.from('passengers').insert(passengersToInsert);
    }

    // 3. Send Email
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Reservas <reservas@tudominio.com>', // Replace with verified domain
        to: bookingData.contactEmail,
        subject: `Confirmación de Reserva #${bookingCode} - Machu Picchu Travel`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-w: 600px; margin: 0 auto;">
            <h2 style="color: #06C0B8;">¡Tu reserva está confirmada!</h2>
            <p>Hola ${bookingData.contactName},</p>
            <p>Gracias por tu compra. Aquí tienes los detalles de tu viaje:</p>
            <div style="background-color: #F5F5E9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Código de Reserva:</strong> ${bookingCode}</p>
              <p><strong>Tour:</strong> ${bookingData.tourName}</p>
              <p><strong>Fecha:</strong> ${bookingData.date}</p>
              <p><strong>Pasajeros:</strong> ${bookingData.adults} Adulto(s), ${bookingData.children} Niño(s)</p>
              <p><strong>Total Pagado:</strong> USD ${bookingData.totalPrice}</p>
            </div>
            <p>Por favor, preséntate 30 minutos antes en el punto de encuentro con los documentos originales de todos los pasajeros.</p>
            <p>¡Buen viaje!</p>
          </div>
        `
      });
    }

    return NextResponse.json({ success: true, bookingCode });

  } catch (error) {
    console.error('Booking creation failed:', error);
    return NextResponse.json({ error: 'Error processing internal booking' }, { status: 500 });
  }
}
