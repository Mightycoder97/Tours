import '@/lib/env';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/ratelimit';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getBrandConfig } from '@/lib/brand';

interface PassengerInput {
  firstName: string;
  lastName: string;
  docType: 'DNI' | 'PASSPORT' | 'CE';
  docNumber: string;
  nationality: string;
  isChild: boolean;
}

interface BookingPayload {
  tenant?: string;
  tourId: string;
  tourName: string;
  date: string;
  adults: number;
  children: number;
  totalPrice: number;
  currency?: 'USD' | 'PEN';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  paymentMethod: string;
  paymentRef: string;
  paymentStatus?: 'PAID' | 'PENDING';
  passengers: PassengerInput[];
}

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: Request) {
  try {
    const bookingData = await req.json() as BookingPayload;
    const brand = getBrandConfig(bookingData.tenant);

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
               req.headers.get('x-real-ip') ??
               '127.0.0.1';
    const { allowed } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor espera unos minutos antes de intentar nuevamente.' },
        { status: 429 }
      );
    }
    
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

    // Generate a reference code using the active brand's prefix (e.g., SNQ-XXXX or MTP-XXXX)
    const bookingCode = `${brand.bookingPrefix}-` + crypto.randomUUID().split('-')[0].toUpperCase();
    
    const baseInsertPayload = {
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
      payment_status: (bookingData.paymentStatus as 'PAID' | 'PENDING' | 'CANCELLED') || 'PENDING',
      payment_ref: bookingData.paymentRef,
    };

    // 1. Insert Booking to Supabase (with automatic fallback if `tenant` column migration hasn't been executed yet)
    let { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({ ...baseInsertPayload, tenant: brand.id })
      .select()
      .single();

    if (bookingError && bookingError.message?.includes('tenant')) {
      const fallbackRes = await supabase
        .from('bookings')
        .insert(baseInsertPayload)
        .select()
        .single();
      booking = fallbackRes.data;
      bookingError = fallbackRes.error;
    }

    if (bookingError) throw bookingError;

    // 2. Insert Passengers
    if (bookingData.passengers && bookingData.passengers.length > 0) {
      const passengersToInsert = bookingData.passengers.map((p: PassengerInput) => ({
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

    // 3. Send Branded Email (non-blocking so email errors never break a paid booking)
    if (process.env.RESEND_API_KEY) {
      const displayCurrency = bookingData.currency === 'PEN' ? 'PEN (S/)' : 'USD';
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || `${brand.name} <reservas@${brand.emailDomain}>`,
          to: bookingData.contactEmail,
          subject: `Confirmación de Reserva #${bookingCode} - ${brand.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: ${brand.colors.primaryDark}; max-w: 600px; margin: 0 auto;">
              <h2 style="color: ${brand.colors.primary};">¡Tu reserva en ${brand.name} está confirmada!</h2>
              <p>Hola ${bookingData.contactName},</p>
              <p>Gracias por tu compra. Aquí tienes los detalles de tu viaje:</p>
              <div style="background-color: #F6F4FC; border-left: 4px solid ${brand.colors.primary}; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Marca / Operador:</strong> ${brand.name}</p>
                <p><strong>Código de Reserva:</strong> ${bookingCode}</p>
                <p><strong>Tour:</strong> ${bookingData.tourName}</p>
                <p><strong>Fecha:</strong> ${selectedDate}</p>
                <p><strong>Pasajeros:</strong> ${bookingData.adults} Adulto(s), ${bookingData.children} Niño(s)</p>
                <p><strong>Total Pagado:</strong> ${displayCurrency} ${Number(bookingData.totalPrice).toFixed(2)}</p>
              </div>
              <p>Por favor, preséntate 30 minutos antes en el punto de encuentro con los documentos originales de todos los pasajeros.</p>
              <p>¡Buen viaje!</p>
            </div>
          `
        });
      } catch (emailError) {
        console.error('[Bookings] Error enviando correo de confirmación:', emailError);
      }
    }

    return NextResponse.json({ success: true, bookingCode });

  } catch (error) {
    console.error('Booking creation failed:', error);
    return NextResponse.json({ error: 'Error processing internal booking' }, { status: 500 });
  }
}
