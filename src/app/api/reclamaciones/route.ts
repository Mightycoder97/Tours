import '@/lib/env';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/ratelimit';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getBrandConfig } from '@/lib/brand';

export interface ReclamacionPayload {
  tenant?: string;
  locale?: 'es' | 'en';
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

/**
 * Adds business days (skipping Saturdays and Sundays) to a starting Date.
 * Under Peruvian administrative and consumer protection law (Ley N° 29571 Art. 24,
 * amended by Ley N° 31435 and D.S. N° 101-2022-PCM), the statutory response deadline
 * is fifteen (15) non-extendable business days (quince (15) días hábiles improrrogables).
 */
export function addBusinessDays(startDate: Date, businessDays: number): Date {
  const result = new Date(startDate);
  let daysAdded = 0;
  while (daysAdded < businessDays) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay(); // 0 is Sunday, 6 is Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysAdded++;
    }
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      req.headers.get('x-real-ip') ??
      '127.0.0.1';

    let body: ReclamacionPayload;
    try {
      body = (await req.json()) as ReclamacionPayload;
    } catch {
      return NextResponse.json(
        { error: 'Invalid request format. / Formato de solicitud inválido.' },
        { status: 400 }
      );
    }

    const isEn = body.locale === 'en';

    const { allowed } = checkRateLimit(`reclamaciones:${ip}`);
    if (!allowed) {
      return NextResponse.json(
        {
          error: isEn
            ? 'Too many requests. Please wait a few minutes before trying again.'
            : 'Demasiadas solicitudes. Por favor espera unos minutos antes de intentar nuevamente.',
        },
        { status: 429 }
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
      return NextResponse.json(
        { error: isEn ? 'Please enter your full first and last name.' : 'Ingrese sus nombres y apellidos completos.' },
        { status: 400 }
      );
    }
    if (!VALID_DOC_TYPES.has(consumerDocType)) {
      return NextResponse.json(
        { error: isEn ? 'Invalid document type.' : 'Tipo de documento inválido.' },
        { status: 400 }
      );
    }
    if (!consumerDocNumber) {
      return NextResponse.json(
        { error: isEn ? 'Please enter your identity document number.' : 'Ingrese el número de su documento de identidad.' },
        { status: 400 }
      );
    }
    if (consumerDocType === 'DNI' && !/^\d{8}$/.test(consumerDocNumber)) {
      return NextResponse.json(
        { error: isEn ? 'DNI must contain exactly 8 numeric digits.' : 'El DNI debe tener exactamente 8 dígitos numéricos.' },
        { status: 400 }
      );
    }
    if (consumerDocType === 'RUC' && !/^\d{11}$/.test(consumerDocNumber)) {
      return NextResponse.json(
        { error: isEn ? 'RUC must contain exactly 11 numeric digits.' : 'El RUC debe tener exactamente 11 dígitos numéricos.' },
        { status: 400 }
      );
    }
    if (!consumerAddress || consumerAddress.length < 5) {
      return NextResponse.json(
        { error: isEn ? 'Please enter your full address.' : 'Ingrese su domicilio completo.' },
        { status: 400 }
      );
    }
    if (!consumerPhone || consumerPhone.length < 6) {
      return NextResponse.json(
        { error: isEn ? 'Please enter a valid phone number.' : 'Ingrese un número de teléfono válido.' },
        { status: 400 }
      );
    }
    if (!consumerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consumerEmail)) {
      return NextResponse.json(
        { error: isEn ? 'Please enter a valid email address.' : 'Ingrese un correo electrónico válido.' },
        { status: 400 }
      );
    }
    if (isMinor && !guardianName) {
      return NextResponse.json(
        {
          error: isEn
            ? 'If the consumer is a minor, you must provide the full name of the parent or legal guardian.'
            : 'Si el consumidor es menor de edad, debe indicar el nombre del padre, madre o apoderado.',
        },
        { status: 400 }
      );
    }
    if (!VALID_GOOD_TYPES.has(goodType)) {
      return NextResponse.json(
        {
          error: isEn
            ? 'Please select the type of contracted good (Product or Service).'
            : 'Seleccione el tipo de bien contratado (Producto o Servicio).',
        },
        { status: 400 }
      );
    }
    if (!goodDescription || goodDescription.length < 3) {
      return NextResponse.json(
        {
          error: isEn
            ? 'Please describe the product or service involved.'
            : 'Describa el producto o servicio involucrado.',
        },
        { status: 400 }
      );
    }
    if (!VALID_REQUIREMENT_TYPES.has(requirementType)) {
      return NextResponse.json(
        {
          error: isEn
            ? 'Please select the requirement type (Claim or Complaint).'
            : 'Seleccione el tipo de requerimiento (Reclamo o Queja).',
        },
        { status: 400 }
      );
    }
    if (!detail || detail.length < 10) {
      return NextResponse.json(
        {
          error: isEn
            ? 'Please provide the detailed reason for your claim or complaint (minimum 10 characters).'
            : 'Ingrese el detalle del motivo de su reclamo o queja (mínimo 10 caracteres).',
        },
        { status: 400 }
      );
    }
    if (!consumerRequest || consumerRequest.length < 5) {
      return NextResponse.json(
        {
          error: isEn
            ? 'Please enter the consumer request or expected solution.'
            : 'Ingrese el pedido o solución esperada por el consumidor.',
        },
        { status: 400 }
      );
    }
    if (!consumerSignature || consumerSignature.length < 3) {
      return NextResponse.json(
        {
          error: isEn
            ? 'Please enter your full name in the Consumer Signature field.'
            : 'Ingrese su nombre completo en el campo de Firma del Consumidor.',
        },
        { status: 400 }
      );
    }

    let parsedAmount: number | null = null;
    if (body.claimedAmount !== undefined && body.claimedAmount !== null && String(body.claimedAmount).trim() !== '') {
      const num = Number(body.claimedAmount);
      if (!Number.isFinite(num) || num < 0 || num > 99999999.99) {
        return NextResponse.json(
          {
            error: isEn
              ? 'The claimed amount must be a valid number (between 0 and 99,999,999.99).'
              : 'El monto reclamado debe ser un valor numérico válido (entre 0 y 99,999,999.99).',
          },
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

    // Plazo máximo legal de respuesta: 15 días hábiles improrrogables (Ley N° 29571, Ley N° 31435 / D.S. N° 101-2022-PCM)
    const deadlineDate = addBusinessDays(now, 15);
    const responseDeadlineIso = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(deadlineDate);
    const createdAtIso = now.toISOString();

    const defaultCompanyResponseText = isEn
      ? 'Complaint Sheet received and registered satisfactorily. Our Customer Care Department will evaluate your case and send a formal response to your email address within a non-extendable maximum period of fifteen (15) business days, pursuant to Peruvian Law N° 29571, Law N° 31435, and Supreme Decree N° 101-2022-PCM.'
      : 'Hoja de Reclamación recibida y registrada satisfactoriamente. El área de Atención al Usuario evaluará su caso y enviará una respuesta formal a su correo electrónico en un plazo máximo de quince (15) días hábiles improrrogables, conforme a la Ley N° 29571, Ley N° 31435 y D.S. N° 101-2022-PCM.';
    const defaultStatusText = isEn
      ? 'PENDING RESPONSE (MAX. 15 BUSINESS DAYS)'
      : 'PENDIENTE DE RESPUESTA (MÁX. 15 DÍAS HÁBILES)';
    const defaultRepSignature = isEn
      ? `${brand.legalName} (RUC ${brand.ruc}) — Customer Care Representative`
      : `${brand.legalName} (RUC ${brand.ruc}) — Representante de Atención al Usuario`;

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
          parsedAmount !== null
            ? `${claimedCurrency === 'PEN' ? 'S/' : 'US$'} ${parsedAmount.toFixed(2)}`
            : isEn
            ? 'Not specified'
            : 'No especificado';
        const formattedGoodType =
          goodType === 'SERVICIO'
            ? isEn
              ? 'SERVICE (TOUR)'
              : 'SERVICIO'
            : isEn
            ? 'PRODUCT'
            : 'PRODUCTO';
        const formattedRequirementType =
          requirementType === 'RECLAMO'
            ? isEn
              ? 'CLAIM (RECLAMO)'
              : 'RECLAMO'
            : isEn
            ? 'COMPLAINT (QUEJA)'
            : 'QUEJA';
        const formattedRegDate = now.toLocaleDateString(isEn ? 'en-US' : 'es-PE', {
          timeZone: 'America/Lima',
        });

        const emailHtml = isEn
          ? `
          <div style="font-family: Arial, sans-serif; color: #1A1A1A; max-width: 680px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
            <div style="background-color: ${brand.colors.primaryDark}; color: #FFFFFF; padding: 24px;">
              <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">
                Virtual Complaints Book (Libro de Reclamaciones) — Law N° 29571 &amp; D.S. N° 011-2011-PCM
              </p>
              <h1 style="margin: 8px 0 4px; font-size: 22px;">Official Complaint Sheet N° ${escapeHtml(complaintCode)}</h1>
              <p style="margin: 0; font-size: 13px; opacity: 0.9;">
                Registration date: ${escapeHtml(formattedRegDate)} | Maximum response deadline: ${escapeHtml(responseDeadlineIso)} (15 business days)
              </p>
            </div>

            <div style="padding: 24px; font-size: 14px; line-height: 1.5;">
              <h3 style="margin-top: 0; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                1. Provider Information
              </h3>
              <p style="margin: 4px 0;"><strong>Legal Name:</strong> ${escapeHtml(brand.legalName)} (${escapeHtml(brand.name)})</p>
              <p style="margin: 4px 0;"><strong>Tax ID (RUC):</strong> ${escapeHtml(brand.ruc)}</p>
              <p style="margin: 4px 0;"><strong>Address:</strong> ${escapeHtml(brand.contact.address)}</p>
              <p style="margin: 4px 0;"><strong>Phone / Email:</strong> ${escapeHtml(brand.contact.phone)} | ${escapeHtml(brand.contact.email)}</p>

              <h3 style="margin-top: 20px; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                2. Claimant Consumer Identification
              </h3>
              <p style="margin: 4px 0;"><strong>Full Name:</strong> ${escapeHtml(consumerName)}</p>
              <p style="margin: 4px 0;"><strong>Identity Document:</strong> ${escapeHtml(consumerDocType)} N° ${escapeHtml(consumerDocNumber)}</p>
              <p style="margin: 4px 0;"><strong>Address:</strong> ${escapeHtml(consumerAddress)}</p>
              <p style="margin: 4px 0;"><strong>Phone / Email:</strong> ${escapeHtml(consumerPhone)} | ${escapeHtml(consumerEmail)}</p>
              ${isMinor ? `<p style="margin: 4px 0;"><strong>Parent / Legal Guardian:</strong> ${escapeHtml(guardianName)}</p>` : ''}

              <h3 style="margin-top: 20px; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                3. Identification of the Contracted Good
              </h3>
              <p style="margin: 4px 0;"><strong>Type of Good:</strong> ${escapeHtml(formattedGoodType)}</p>
              <p style="margin: 4px 0;"><strong>Claimed Amount:</strong> ${escapeHtml(formattedAmount)}</p>
              ${bookingCode ? `<p style="margin: 4px 0;"><strong>Booking Code:</strong> ${escapeHtml(bookingCode)}</p>` : ''}
              <p style="margin: 4px 0;"><strong>Description:</strong> ${escapeHtml(goodDescription)}</p>

              <h3 style="margin-top: 20px; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                4. Details of the Claim and Consumer&apos;s Request
              </h3>
              <p style="margin: 4px 0;"><strong>Requirement Type:</strong> ${escapeHtml(formattedRequirementType)}</p>
              <p style="margin: 8px 0;"><strong>Detailed Reason:</strong><br/>${escapeHtml(detail)}</p>
              <p style="margin: 8px 0;"><strong>Consumer&apos;s Request:</strong><br/>${escapeHtml(consumerRequest)}</p>

              <h3 style="margin-top: 20px; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                5. Company Response and Signatures
              </h3>
              <p style="margin: 4px 0;"><strong>Maximum response timeframe:</strong> 15 business days (until ${escapeHtml(responseDeadlineIso)})</p>
              <p style="margin: 4px 0;"><strong>Initial status / measures:</strong> ${escapeHtml(defaultCompanyResponseText)}</p>
              <p style="margin: 8px 0;"><strong>Consumer Signature:</strong> ${escapeHtml(consumerSignature)}</p>
              <p style="margin: 4px 0;"><strong>Business Representative Signature:</strong> ${escapeHtml(brand.legalName)} — Customer Care Department</p>
            </div>
          </div>
        `
          : `
          <div style="font-family: Arial, sans-serif; color: #1A1A1A; max-width: 680px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
            <div style="background-color: ${brand.colors.primaryDark}; color: #FFFFFF; padding: 24px;">
              <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">
                Libro de Reclamaciones Virtual — Ley N° 29571 y D.S. N° 011-2011-PCM
              </p>
              <h1 style="margin: 8px 0 4px; font-size: 22px;">Hoja de Reclamación N° ${escapeHtml(complaintCode)}</h1>
              <p style="margin: 0; font-size: 13px; opacity: 0.9;">
                Fecha de registro: ${escapeHtml(formattedRegDate)} | Plazo máximo de respuesta: ${escapeHtml(responseDeadlineIso)} (15 días hábiles improrrogables)
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
              <p style="margin: 4px 0;"><strong>Tipo de Bien:</strong> ${escapeHtml(formattedGoodType)}</p>
              <p style="margin: 4px 0;"><strong>Monto Reclamado:</strong> ${escapeHtml(formattedAmount)}</p>
              ${bookingCode ? `<p style="margin: 4px 0;"><strong>Código de Reserva:</strong> ${escapeHtml(bookingCode)}</p>` : ''}
              <p style="margin: 4px 0;"><strong>Descripción:</strong> ${escapeHtml(goodDescription)}</p>

              <h3 style="margin-top: 20px; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                4. Detalle de la Reclamación y Pedido del Consumidor
              </h3>
              <p style="margin: 4px 0;"><strong>Tipo de Requerimiento:</strong> ${escapeHtml(formattedRequirementType)}</p>
              <p style="margin: 8px 0;"><strong>Detalle del Motivo:</strong><br/>${escapeHtml(detail)}</p>
              <p style="margin: 8px 0;"><strong>Pedido del Consumidor:</strong><br/>${escapeHtml(consumerRequest)}</p>

              <h3 style="margin-top: 20px; color: ${brand.colors.primaryDark}; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px;">
                5. Respuesta de la Empresa y Firmas
              </h3>
              <p style="margin: 4px 0;"><strong>Plazo máximo de respuesta:</strong> 15 días hábiles improrrogables (hasta el ${escapeHtml(responseDeadlineIso)})</p>
              <p style="margin: 4px 0;"><strong>Medidas / Estado inicial:</strong> ${escapeHtml(defaultCompanyResponseText)}</p>
              <p style="margin: 8px 0;"><strong>Firma del Consumidor:</strong> ${escapeHtml(consumerSignature)}</p>
              <p style="margin: 4px 0;"><strong>Firma del Representante del Negocio:</strong> ${escapeHtml(brand.legalName)} — Área de Atención al Usuario</p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || `${brand.name} <reservas@${brand.emailDomain}>`,
          to: [consumerEmail, brand.contact.email],
          subject: isEn
            ? `Official Complaint Sheet Receipt N° ${complaintCode} - ${brand.name}`
            : `Constancia de Hoja de Reclamación N° ${complaintCode} - ${brand.name}`,
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
          maxDays: 15,
          deadline: responseDeadlineIso,
          measuresAdopted: defaultCompanyResponseText,
          status: defaultStatusText,
        },
        signatures: {
          consumer: consumerSignature,
          representative: defaultRepSignature,
        },
      },
    });
  } catch (error) {
    console.error('[LibroReclamaciones] Error procesando reclamo:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing the Complaint Sheet. / Ocurrió un error al procesar la Hoja de Reclamación.' },
      { status: 500 }
    );
  }
}
