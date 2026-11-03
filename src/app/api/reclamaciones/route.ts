import '@/lib/env';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/ratelimit';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getBrandConfig } from '@/lib/brand';

export interface ReclamacionPayload {
  tenant?: string;
  consumerName: string;
  consumerDocType: 'DNI' | 'CE' | 'PASSPORT' | 'RUC';
  consumerDocNumber: string;
  consumerAddress: string;
  consumerPhone: string;
  consumerEmail: string;
  isMinor?: boolean;
  guardianName?: string;
  goodType: 'PRODUCTO' | 'SERVICIO';
  claimedAmount?: string | number | null;
  claimedCurrency?: 'PEN' | 'USD';
  goodDescription: string;
  bookingCode?: string;
  requirementType: 'RECLAMO' | 'QUEJA';
  detail: string;
  consumerRequest: string;
  consumerSignature: string;
}

const VALID_DOC_TYPES = new Set(['DNI', 'CE', 'PASSPORT', 'RUC']);
const VALID_GOOD_TYPES = new Set(['PRODUCTO', 'SERVICIO']);
const VALID_REQUIREMENT_TYPES = new Set(['RECLAMO', 'QUEJA']);

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      req.headers.get('x-real-ip') ??
      '127.0.0.1';

    const { allowed } = checkRateLimit(`reclamaciones:${ip}`);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor espera unos minutos antes de intentar nuevamente.' },
        { status: 429 }
      );
    }

    let body: ReclamacionPayload;
    try {
      body = (await req.json()) as ReclamacionPayload;
    } catch {
      return NextResponse.json(
        { error: 'Formato de solicitud inválido.' },
        { status: 400 }
      );
    }

    const brand = getBrandConfig(body.tenant);

    // Sanitización y validación de campos obligatorios (INDECOPI D.S. N° 011-2011-PCM)
    const consumerName = (body.consumerName || '').trim();
    const consumerDocType = (body.consumerDocType || 'DNI').trim().toUpperCase() as ReclamacionPayload['consumerDocType'];
    const consumerDocNumber = (body.consumerDocNumber || '').trim();
    const consumerAddress = (body.consumerAddress || '').trim();
    const consumerPhone = (body.consumerPhone || '').trim();
    const consumerEmail = (body.consumerEmail || '').trim();
    const isMinor = Boolean(body.isMinor);
    const guardianName = (body.guardianName || '').trim();
    const goodType = (body.goodType || 'SERVICIO').trim().toUpperCase() as ReclamacionPayload['goodType'];
    const claimedCurrency = body.claimedCurrency === 'PEN' ? 'PEN' : 'USD';
    const goodDescription = (body.goodDescription || '').trim();
    const bookingCode = (body.bookingCode || '').trim();
    const requirementType = (body.requirementType || '').trim().toUpperCase() as ReclamacionPayload['requirementType'];
    const detail = (body.detail || '').trim();
    const consumerRequest = (body.consumerRequest || '').trim();
    const consumerSignature = (body.consumerSignature || '').trim();

    if (!consumerName || consumerName.length < 3) {
      return NextResponse.json({ error: 'Ingrese sus nombres y apellidos completos.' }, { status: 400 });
    }
    if (!VALID_DOC_TYPES.has(consumerDocType)) {
      return NextResponse.json({ error: 'Tipo de documento inválido.' }, { status: 400 });
    }
    if (!consumerDocNumber) {
      return NextResponse.json({ error: 'Ingrese el número de su documento de identidad.' }, { status: 400 });
    }
    if (consumerDocType === 'DNI' && !/^\d{8}$/.test(consumerDocNumber)) {
      return NextResponse.json({ error: 'El DNI debe tener exactamente 8 dígitos numéricos.' }, { status: 400 });
    }
    if (consumerDocType === 'RUC' && !/^\d{11}$/.test(consumerDocNumber)) {
      return NextResponse.json({ error: 'El RUC debe tener exactamente 11 dígitos numéricos.' }, { status: 400 });
    }
    if (!consumerAddress || consumerAddress.length < 5) {
      return NextResponse.json({ error: 'Ingrese su domicilio completo.' }, { status: 400 });
    }
    if (!consumerPhone || consumerPhone.length < 6) {
      return NextResponse.json({ error: 'Ingrese un número de teléfono válido.' }, { status: 400 });
    }
    if (!consumerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consumerEmail)) {
      return NextResponse.json({ error: 'Ingrese un correo electrónico válido.' }, { status: 400 });
    }
    if (isMinor && !guardianName) {
      return NextResponse.json(
        { error: 'Si el consumidor es menor de edad, debe indicar el nombre del padre, madre o apoderado.' },
        { status: 400 }
      );
    }
    if (!VALID_GOOD_TYPES.has(goodType)) {
      return NextResponse.json({ error: 'Seleccione el tipo de bien contratado (Producto o Servicio).' }, { status: 400 });
    }
    if (!goodDescription || goodDescription.length < 3) {
      return NextResponse.json({ error: 'Describa el producto o servicio involucrado.' }, { status: 400 });
    }
    if (!VALID_REQUIREMENT_TYPES.has(requirementType)) {
      return NextResponse.json({ error: 'Seleccione el tipo de requerimiento (Reclamo o Queja).' }, { status: 400 });
    }
    if (!detail || detail.length < 10) {
      return NextResponse.json(
        { error: 'Ingrese el detalle del motivo de su reclamo o queja (mínimo 10 caracteres).' },
        { status: 400 }
      );
    }
    if (!consumerRequest || consumerRequest.length < 5) {
      return NextResponse.json(
        { error: 'Ingrese el pedido o solución esperada por el consumidor.' },
        { status: 400 }
      );
    }
    if (!consumerSignature || consumerSignature.length < 3) {
      return NextResponse.json(
        { error: 'Ingrese su nombre completo en el campo de Firma del Consumidor.' },
        { status: 400 }
      );
    }

    let parsedAmount: number | null = null;
    if (body.claimedAmount !== undefined && body.claimedAmount !== null && String(body.claimedAmount).trim() !== '') {
      const num = Number(body.claimedAmount);
      if (!Number.isFinite(num) || num < 0 || num > 99999999.99) {
        return NextResponse.json(
          { error: 'El monto reclamado debe ser un valor numérico válido (entre 0 y 99,999,999.99).' },
          { status: 400 }
        );
      }
      parsedAmount = Math.round(num * 100) / 100;
    }

    const now = new Date();
    const limaTodayIso = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(now);
    const year = limaTodayIso.slice(0, 4);
    const randomCode = crypto.randomUUID().split('-')[0].slice(0, 6).toUpperCase();
    const complaintCode = `LR-${year}-${randomCode}`;

    // Plazo máximo legal de respuesta: 30 días calendario (Ley N° 29571 / D.S. N° 101-2022-PCM)
    const deadlineDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const responseDeadlineIso = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(deadlineDate);
    const createdAtIso = now.toISOString();

    const defaultCompanyResponseText =
      'Hoja de Reclamación recibida y registrada satisfactoriamente. El área de Atención al Usuario evaluará su caso y enviará una respuesta formal a su correo electrónico en un plazo máximo de treinta (30) días calendario improrrogables, conforme a la Ley N° 29571.';

    // 1. Intentar guardar en Supabase con fallback seguro si la tabla aún no fue migrada
    let persistedInDb = false;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && supabaseKey) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabaseKey
        );

        const { error: dbError } = await supabase.from('complaints').insert({
          complaint_code: complaintCode,
          tenant: brand.id,
          provider_legal_name: brand.legalName,
          provider_ruc: brand.ruc,
          provider_address: brand.contact.address,
          consumer_name: consumerName,
          consumer_doc_type: consumerDocType,
          consumer_doc_number: consumerDocNumber,
          consumer_address: consumerAddress,
          consumer_phone: consumerPhone,
          consumer_email: consumerEmail,
          is_minor: isMinor,
          guardian_name: isMinor ? guardianName : null,
          good_type: goodType,
          claimed_amount: parsedAmount,
          claimed_currency: claimedCurrency,
          good_description: goodDescription,
          booking_code: bookingCode || null,
          requirement_type: requirementType,
          detail,
          consumer_request: consumerRequest,
          consumer_signature: consumerSignature,
          company_response: defaultCompanyResponseText,
          response_deadline: responseDeadlineIso,
          status: 'PENDIENTE',
        });

        if (dbError) {
          console.warn('[LibroReclamaciones] Aviso al insertar en Supabase (fallback activo):', dbError.message);
        } else {
          persistedInDb = true;
        }
      } catch (err) {
        console.warn('[LibroReclamaciones] Excepción no bloqueante al guardar en Supabase:', err);
      }
    }

    // 2. Enviar copia de la Hoja de Reclamación al consumidor y a la agencia vía Resend (no bloqueante)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const formattedAmount =
          parsedAmount !== null ? `${claimedCurrency === 'PEN' ? 'S/' : 'US$'} ${parsedAmount.toFixed(2)}` : 'No especificado';

        const emailHtml = `
          <div style="font-family: Arial, sans-serif; color: #1A1A1A; max-width: 680px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
            <div style="background-color: ${brand.colors.primaryDark}; color: #FFFFFF; padding: 24px;">
              <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">
                Libro de Reclamaciones Virtual — Ley N° 29571 y D.S. N° 011-2011-PCM
              </p>
              <h1 style="margin: 8px 0 4px; font-size: 22px;">Hoja de Reclamación N° ${escapeHtml(complaintCode)}</h1>
              <p style="margin: 0; font-size: 13px; opacity: 0.9;">
                Fecha de registro: ${escapeHtml(now.toLocaleDateString('es-PE', { timeZone: 'America/Lima' }))} | Plazo máximo de respuesta: ${escapeHtml(responseDeadlineIso)} (30 días calendario)
              </p>
            </div>

            <div style="padding: 24px; font-size: 14px; line-height: 1.5;">
              <h3 style="margin-top: 0; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                1. Datos del Proveedor
              </h3>
              <p style="margin: 4px 0;"><strong>Razón Social:</strong> ${escapeHtml(brand.legalName)} (${escapeHtml(brand.name)})</p>
              <p style="margin: 4px 0;"><strong>RUC:</strong> ${escapeHtml(brand.ruc)}</p>
              <p style="margin: 4px 0;"><strong>Dirección:</strong> ${escapeHtml(brand.contact.address)}</p>
              <p style="margin: 4px 0;"><strong>Teléfono / Correo:</strong> ${escapeHtml(brand.contact.phone)} | ${escapeHtml(brand.contact.email)}</p>

              <h3 style="margin-top: 20px; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                2. Identificación del Consumidor Reclamante
              </h3>
              <p style="margin: 4px 0;"><strong>Nombres y Apellidos:</strong> ${escapeHtml(consumerName)}</p>
              <p style="margin: 4px 0;"><strong>Documento de Identidad:</strong> ${escapeHtml(consumerDocType)} N° ${escapeHtml(consumerDocNumber)}</p>
              <p style="margin: 4px 0;"><strong>Domicilio:</strong> ${escapeHtml(consumerAddress)}</p>
              <p style="margin: 4px 0;"><strong>Teléfono / Correo:</strong> ${escapeHtml(consumerPhone)} | ${escapeHtml(consumerEmail)}</p>
              ${isMinor ? `<p style="margin: 4px 0;"><strong>Padre / Madre / Apoderado:</strong> ${escapeHtml(guardianName)}</p>` : ''}

              <h3 style="margin-top: 20px; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                3. Identificación del Bien Contratado
              </h3>
              <p style="margin: 4px 0;"><strong>Tipo de Bien:</strong> ${escapeHtml(goodType)}</p>
              <p style="margin: 4px 0;"><strong>Monto Reclamado:</strong> ${escapeHtml(formattedAmount)}</p>
              ${bookingCode ? `<p style="margin: 4px 0;"><strong>Código de Reserva:</strong> ${escapeHtml(bookingCode)}</p>` : ''}
              <p style="margin: 4px 0;"><strong>Descripción:</strong> ${escapeHtml(goodDescription)}</p>

              <h3 style="margin-top: 20px; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                4. Detalle de la Reclamación y Pedido del Consumidor
              </h3>
              <p style="margin: 4px 0;"><strong>Tipo de Requerimiento:</strong> ${escapeHtml(requirementType)}</p>
              <p style="margin: 8px 0;"><strong>Detalle del Motivo:</strong><br/>${escapeHtml(detail)}</p>
              <p style="margin: 8px 0;"><strong>Pedido del Consumidor:</strong><br/>${escapeHtml(consumerRequest)}</p>

              <h3 style="margin-top: 20px; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                5. Respuesta de la Empresa y Firmas
              </h3>
              <p style="margin: 4px 0;"><strong>Plazo máximo de respuesta:</strong> 30 días calendario (hasta el ${escapeHtml(responseDeadlineIso)})</p>
              <p style="margin: 4px 0;"><strong>Medidas / Estado inicial:</strong> ${escapeHtml(defaultCompanyResponseText)}</p>
              <p style="margin: 8px 0;"><strong>Firma del Consumidor:</strong> ${escapeHtml(consumerSignature)}</p>
              <p style="margin: 4px 0;"><strong>Firma del Representante del Negocio:</strong> ${escapeHtml(brand.legalName)} — Área de Atención al Usuario</p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || `${brand.name} <reservas@${brand.emailDomain}>`,
          to: [consumerEmail, brand.contact.email],
          subject: `Constancia de Hoja de Reclamación N° ${complaintCode} - ${brand.name}`,
          html: emailHtml,
        });
      } catch (emailErr) {
        console.warn('[LibroReclamaciones] Error no bloqueante al enviar correo:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      persistedInDb,
      complaint: {
        complaintCode,
        createdAt: createdAtIso,
        responseDeadline: responseDeadlineIso,
        provider: {
          legalName: brand.legalName,
          commercialName: brand.name,
          ruc: brand.ruc,
          address: brand.contact.address,
          phone: brand.contact.phone,
          email: brand.contact.email,
        },
        consumer: {
          name: consumerName,
          docType: consumerDocType,
          docNumber: consumerDocNumber,
          address: consumerAddress,
          phone: consumerPhone,
          email: consumerEmail,
          isMinor,
          guardianName: isMinor ? guardianName : undefined,
        },
        good: {
          type: goodType,
          claimedAmount: parsedAmount,
          claimedCurrency,
          description: goodDescription,
          bookingCode: bookingCode || undefined,
        },
        claim: {
          requirementType,
          detail,
          consumerRequest,
        },
        response: {
          maxDays: 30,
          deadline: responseDeadlineIso,
          measuresAdopted: defaultCompanyResponseText,
          status: 'PENDIENTE DE RESPUESTA (MÁX. 30 DÍAS CALENDARIO)',
        },
        signatures: {
          consumer: consumerSignature,
          representative: `${brand.legalName} (RUC ${brand.ruc}) — Representante de Atención al Usuario`,
        },
      },
    });
  } catch (error) {
    console.error('[LibroReclamaciones] Error procesando reclamo:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar la Hoja de Reclamación. Intente nuevamente.' },
      { status: 500 }
    );
  }
}
