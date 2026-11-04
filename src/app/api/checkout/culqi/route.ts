import { NextResponse } from 'next/server';
import { getBrandConfig } from '@/lib/brand';

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
    const brand = getBrandConfig();
    const culqiSecretKey = process.env.CULQI_SECRET_KEY;
    if (!culqiSecretKey) {
      console.error('[Culqi] CULQI_SECRET_KEY no está configurada en las variables de entorno.');
      return NextResponse.json(
        { error: 'Error de configuración en el servidor de pagos.' },
        { status: 500 }
      );
    }

    const {
      token_id,
      email,
      amount,
      currency = 'PEN',
      description,
      metadata,
      antifraud_details,
    } = await req.json();

    if (!token_id || !email || !amount) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos: token_id, email, amount' },
        { status: 400 }
      );
    }

    if (!['PEN', 'USD'].includes(currency)) {
      return NextResponse.json(
        { error: `Moneda no soportada: ${currency}. Solo se aceptan PEN o USD.` },
        { status: 400 }
      );
    }

    // Culqi espera el monto en centavos (entero sin decimales)
    const amountInCents = Math.round(Number(amount) * 100);

    if (isNaN(amountInCents) || amountInCents <= 0) {
      return NextResponse.json(
        { error: 'El monto ingresado es inválido.' },
        { status: 400 }
      );
    }

    const rawDescription = String(description || `Tour - ${brand.name}`).trim();
    const safeDescription =
      rawDescription.length < 5
        ? `${rawDescription} - Tour Perú`.slice(0, 80)
        : rawDescription.slice(0, 80);

    const payload: Record<string, unknown> = {
      amount: amountInCents,
      currency_code: currency,
      email: String(email).trim(),
      source_id: token_id,
      description: safeDescription,
    };

    if (metadata && typeof metadata === 'object') {
      payload.metadata = metadata;
    }

    if (antifraud_details && typeof antifraud_details === 'object') {
      const cleanAntiFraud: Record<string, string> = {};
      if (antifraud_details.first_name?.trim()) {
        cleanAntiFraud.first_name = String(antifraud_details.first_name).trim().slice(0, 50);
      }
      if (antifraud_details.last_name?.trim()) {
        cleanAntiFraud.last_name = String(antifraud_details.last_name).trim().slice(0, 50);
      }
      const cleanPhone = String(antifraud_details.phone_number || '').replace(/\D/g, '').slice(0, 14);
      if (cleanPhone.length >= 6 && cleanPhone.length <= 14) {
        cleanAntiFraud.phone_number = cleanPhone;
      }
      if (antifraud_details.country_code?.trim()) {
        cleanAntiFraud.country_code = String(antifraud_details.country_code).trim().slice(0, 2).toUpperCase();
      }
      if (Object.keys(cleanAntiFraud).length > 0) {
        payload.antifraud_details = cleanAntiFraud;
      }
    }

    const response = await fetch('https://api.culqi.com/v2/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${culqiSecretKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || data.object === 'error') {
      console.error('[Culqi] Cargo fallido:', data);
      const errorMessage =
        data.user_message ||
        data.merchant_message ||
        data.message ||
        'Error procesando el pago con Culqi';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      chargeId: data.id,
      referenceCode: data.reference_code,
    });
  } catch (error) {
    console.error('[Culqi] Error interno:', error);
    return NextResponse.json(
      { error: 'Error interno conectando a la pasarela de cobros' },
      { status: 500 }
    );
  }
}
