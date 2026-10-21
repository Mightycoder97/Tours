import { NextResponse } from 'next/server';

const PAYPAL_API = process.env.NODE_ENV === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

async function generateAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Credenciales de PayPal no configuradas en el servidor.');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  
  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || 'No se pudo obtener access_token de PayPal');
  }
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    const numericAmount = Number(amount);
    if (!numericAmount || isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json({ error: "Monto inválido para orden PayPal" }, { status: 400 });
    }

    const accessToken = await generateAccessToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: numericAmount.toFixed(2),
            },
            description: "Reserva de Paquetes VIP - Machu Picchu Travel",
          },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Error al crear orden en PayPal", details: data }, { status: response.status });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "No se pudo conectar a PayPal (Create)" }, { status: 500 });
  }
}
