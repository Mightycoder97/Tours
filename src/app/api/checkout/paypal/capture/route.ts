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
    const { orderID } = await req.json();
    if (!orderID) {
      return NextResponse.json({ error: "orderID es requerido" }, { status: 400 });
    }
    const accessToken = await generateAccessToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Error capturando orden en PayPal", details: data }, { status: response.status });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to capture order:", error);
    return NextResponse.json({ error: "No se pudo procesar el pago con PayPal." }, { status: 500 });
  }
}
