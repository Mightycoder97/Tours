import { NextResponse } from 'next/server';

const PAYPAL_API = process.env.NODE_ENV === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

async function generateAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString("base64");
  
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  
  const data = await response.json();
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
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
              value: amount.toString(),
            },
            description: "Reserva de Paquetes VIP - Machu Picchu Travel",
          },
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "No se pudo conectar a PayPal (Create)" }, { status: 500 });
  }
}
