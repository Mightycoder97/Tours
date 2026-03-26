import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { token_id, email, amount } = await req.json();
    
    // Convert to cents for Culqi
    const amountInCents = Math.round(amount * 100);

    const response = await fetch('https://api.culqi.com/v2/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CULQI_SECRET_KEY}`
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency_code: 'USD',
        email,
        source_id: token_id,
        description: 'Pago por paquete turístico - Machu Picchu Travel'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.user_message || 'Error procesando el pago con Culqi' }, { status: 400 });
    }

    return NextResponse.json({ success: true, chargeId: data.id });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno conectando a pasarela de cobros' }, { status: 500 });
  }
}
