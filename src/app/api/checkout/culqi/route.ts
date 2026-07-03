import { NextResponse } from 'next/server';

/**
 * POST /api/checkout/culqi
 * Recibe el token generado por Culqi Checkout Custom y crea un cargo.
 *
 * Body:
 *   token_id  — ID del token (source_id para Culqi)
 *   email     — Email del cliente
 *   amount    — Monto en la unidad principal (e.g. 80.00 USD o 280.00 PEN)
 *   currency  — 'USD' | 'PEN' (default: 'PEN')
 */
export async function POST(req: Request) {
  try {
    const { token_id, email, amount, currency = 'PEN' } = await req.json();

    if (!token_id || !email || !amount) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos: token_id, email, amount' },
        { status: 400 }
      );
    }

    if (!['PEN', 'USD'].includes(currency)) {
      return NextResponse.json(
        { error: `Moneda no soportada: ${currency}` },
        { status: 400 }
      );
    }

    // Culqi espera el monto en centavos (sin decimales)
    const amountInCents = Math.round(amount * 100);

    const response = await fetch('https://api.culqi.com/v2/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CULQI_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency_code: currency,
        email,
        source_id: token_id,
        description: 'Tour - Machu Picchu Travel Adventures',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Culqi] Cargo fallido:', data);
      return NextResponse.json(
        { error: data.user_message || 'Error procesando el pago con Culqi' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, chargeId: data.id });
  } catch (error) {
    console.error('[Culqi] Error interno:', error);
    return NextResponse.json(
      { error: 'Error interno conectando a la pasarela de cobros' },
      { status: 500 }
    );
  }
}
