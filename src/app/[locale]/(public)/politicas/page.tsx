import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getBrandConfig } from '@/lib/brand';
import { Link } from '@/i18n/navigation';

import { buildPageAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: 'meta.privacyPage' });
  const brand = getBrandConfig();
  return {
    title: tMeta('title'),
    description: `${tMeta('description')} (${brand.legalName} — RUC ${brand.ruc}).`,
    alternates: buildPageAlternates(locale, '/politicas'),
  };
}

export default async function PoliticasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.privacy' });
  const brand = getBrandConfig();
  const isEn = locale === 'en';

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="font-serif text-3xl sm:text-4xl text-primary-dark mb-2">
          {t('title')}
        </h1>
        <p className="text-text-light text-sm mb-10">
          {t('legalBasis')} | {t('legalNameLabel')}: <strong>{brand.legalName}</strong> | {t('rucLabel')}: <strong>{brand.ruc}</strong>
        </p>

        {isEn ? (
          <div className="space-y-8 text-text-main">
            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">1. Data Controller</h2>
              <p className="text-text-light leading-relaxed">
                <strong>{brand.legalName}</strong> (commercial name: <strong>{brand.name}</strong>), with Tax ID (RUC) <strong>{brand.ruc}</strong> and registered address at <strong>{brand.contact.address}</strong>, is responsible for the processing and protection of personal data collected through this website, in strict compliance with Peruvian Law N° 29733 — Personal Data Protection Law before the National Authority for Personal Data Protection (ANPDP).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">2. Personal Data We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-text-light">
                <li><strong>Identity data</strong>: first names, last names, date of birth, and type and number of identity document (National ID / DNI, Foreigner ID Card, or Passport).</li>
                <li><strong>Contact data</strong>: email address, phone number, residential address, and nationality.</li>
                <li><strong>Transaction data</strong>: booking history, travel dates, number of passengers, amounts paid, and payment references.</li>
                <li><strong>Technical data</strong>: IP address, browser type, and essential session cookies (we never store sensitive payment card numbers or CVV/CVC codes).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">3. Purpose of Data Processing</h2>
              <ul className="list-disc pl-6 space-y-2 text-text-light">
                <li>Management, processing, and confirmation of tour and travel package bookings.</li>
                <li>Purchase of nominal admission tickets with the Peruvian Ministry of Culture (MINCUL), SERNANP, and railway operators (PeruRail and Inca Rail).</li>
                <li>Delivery of electronic vouchers, booking confirmations, and operational communications related to the contracted service.</li>
                <li>Handling inquiries, change/refund requests, and Virtual Complaints Book (Libro de Reclamaciones) submissions pursuant to INDECOPI regulations.</li>
                <li>Compliance with legal, regulatory, and tax obligations before Peruvian authorities (SUNAT, MINCETUR).</li>
                <li>Sending commercial and promotional communications (solely when the user has granted explicit consent).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">4. Data Transfers and Processors</h2>
              <p className="text-text-light leading-relaxed">To operate our services securely, your data is processed through technology providers that comply with high international security standards:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-text-light">
                <li><strong>Supabase Inc. (USA)</strong> — Secure cloud database storage with encryption at rest and in transit.</li>
                <li><strong>Resend Inc. (USA)</strong> — Transactional email delivery for booking confirmations and official receipts.</li>
                <li><strong>Culqi S.A.C. (Peru)</strong> — Secure credit/debit card and Yape payment processing (PCI-DSS certified).</li>
                <li><strong>PayPal Holdings Inc. (USA)</strong> — Secure international payment processing.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">5. Data Subject Rights (ARCO Rights)</h2>
              <p className="text-text-light leading-relaxed mb-3">Pursuant to Law N° 29733, every personal data holder has the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-text-light">
                <li><strong>Information and Access</strong>: know what personal data of yours is stored and how it is processed.</li>
                <li><strong>Rectification</strong>: request the updating or correction of inaccurate or incomplete data.</li>
                <li><strong>Cancellation (Deletion)</strong>: request the deletion of your personal data when it is no longer necessary for contractual or legal purposes.</li>
                <li><strong>Opposition</strong>: object to the processing of your personal data for commercial or advertising purposes.</li>
              </ul>
              <p className="text-text-light mt-3">
                To exercise any of these rights free of charge, please send a request to <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline font-medium">{brand.contact.email}</a> indicating the ARCO right you wish to exercise and attaching a simple copy of your identity document.
              </p>
            </section>

            <section id="cookies" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">6. Cookies Policy</h2>
              <p className="text-text-light leading-relaxed">
                We use technical and essential cookies required for the proper functioning of the website (maintaining user sessions, shopping cart items, and language preferences). Users may configure or disable cookies from their browser settings at any time.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">7. Contact and Customer Support</h2>
              <p className="text-text-light leading-relaxed">
                For any inquiries regarding personal data protection: <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline font-medium">{brand.contact.email}</a> | Phone / WhatsApp: <a href={`https://wa.me/${brand.contact.cleanPhone}`} className="text-primary hover:underline font-medium">{brand.contact.phone}</a> | Address: {brand.contact.address} (Business hours: Monday to Sunday from 07:00 to 21:00 hrs PET). You may also consult our <Link href="/condiciones" className="text-primary hover:underline font-medium">Terms and Conditions</Link> and our <Link href="/cambios-y-devoluciones" className="text-primary hover:underline font-medium">Changes and/or Returns Policy</Link>.
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-8 text-text-main">
            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">1. Responsable del Tratamiento</h2>
              <p className="text-text-light leading-relaxed">
                <strong>{brand.legalName}</strong> (nombre comercial: <strong>{brand.name}</strong>), con RUC <strong>{brand.ruc}</strong> y domicilio legal en <strong>{brand.contact.address}</strong>, es responsable del tratamiento y protección de los datos personales recopilados a través de este sitio web, conforme a la Ley N° 29733 – Ley de Protección de Datos Personales del Perú ante la Autoridad Nacional de Protección de Datos Personales (ANPDP).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">2. Datos que Recopilamos</h2>
              <ul className="list-disc pl-6 space-y-2 text-text-light">
                <li><strong>Datos de identidad</strong>: nombres, apellidos, fecha de nacimiento, tipo y número de documento de identidad (DNI, Carnet de Extranjería o Pasaporte).</li>
                <li><strong>Datos de contacto</strong>: correo electrónico, número de teléfono, domicilio y nacionalidad.</li>
                <li><strong>Datos de transacción</strong>: historial de reservas, fechas de viaje, número de pasajeros, montos pagados y referencias de pago.</li>
                <li><strong>Datos técnicos</strong>: dirección IP, tipo de navegador y cookies esenciales de sesión (sin almacenar datos sensibles de tarjetas de pago).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">3. Finalidad del Tratamiento</h2>
              <ul className="list-disc pl-6 space-y-2 text-text-light">
                <li>Gestión, procesamiento y confirmación de reservas de tours y paquetes turísticos.</li>
                <li>Adquisición de boletos nominales ante el Ministerio de Cultura del Perú, SERNANP y operadores ferroviarios (PeruRail e Inca Rail).</li>
                <li>Envío de vouchers electrónicos, confirmaciones y comunicaciones operativas relacionadas con el servicio contratado.</li>
                <li>Atención de consultas, solicitudes de cambios/devoluciones y hojas del Libro de Reclamaciones conforme a INDECOPI.</li>
                <li>Cumplimiento de obligaciones legales y tributarias (SUNAT, MINCETUR).</li>
                <li>Envío de comunicaciones comerciales y promocionales (únicamente con consentimiento explícito del usuario).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">4. Transferencias y Encargados de Tratamiento</h2>
              <p className="text-text-light leading-relaxed">Para operar nuestros servicios de forma segura, sus datos son procesados a través de proveedores tecnológicos que cumplen altos estándares internacionales de seguridad:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-text-light">
                <li><strong>Supabase Inc. (USA)</strong> — Almacenamiento seguro en la nube con cifrado en reposo y tránsito.</li>
                <li><strong>Resend Inc. (USA)</strong> — Envío de correos transaccionales de confirmación de reservas y constancias.</li>
                <li><strong>Culqi S.A.C. (Perú)</strong> — Procesamiento seguro de pagos con tarjeta y Yape (certificación PCI-DSS).</li>
                <li><strong>PayPal Holdings Inc. (USA)</strong> — Procesamiento seguro de pagos internacionales.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">5. Derechos del Titular (Derechos ARCO)</h2>
              <p className="text-text-light leading-relaxed mb-3">Conforme a la Ley N° 29733, todo titular de datos personales tiene derecho a:</p>
              <ul className="list-disc pl-6 space-y-2 text-text-light">
                <li><strong>Información y Acceso</strong>: conocer qué datos personales suyos se encuentran almacenados y cómo son tratados.</li>
                <li><strong>Rectificación</strong>: solicitar la actualización o corrección de datos inexactos o incompletos.</li>
                <li><strong>Cancelación (Supresión)</strong>: solicitar la eliminación de sus datos cuando ya no sean necesarios para la finalidad contractual o legal.</li>
                <li><strong>Oposición</strong>: oponerse al tratamiento de sus datos para fines comerciales o publicitarios.</li>
              </ul>
              <p className="text-text-light mt-3">
                Para ejercer cualquiera de estos derechos de forma gratuita, envíe una solicitud a <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline font-medium">{brand.contact.email}</a> indicando el derecho ARCO que desea ejercer y adjuntando copia simple de su documento de identidad.
              </p>
            </section>

            <section id="cookies" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">6. Política de Cookies</h2>
              <p className="text-text-light leading-relaxed">
                Utilizamos cookies técnicas y esenciales para el correcto funcionamiento del sitio web (mantenimiento de la sesión, carrito de compras y preferencia de idioma). El usuario puede configurar o deshabilitar las cookies desde las preferencias de su navegador en cualquier momento.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary-dark mb-3">7. Contacto y Atención al Cliente</h2>
              <p className="text-text-light leading-relaxed">
                Para cualquier consulta sobre protección de datos personales: <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline font-medium">{brand.contact.email}</a> | Teléfono / WhatsApp: <a href={`https://wa.me/${brand.contact.cleanPhone}`} className="text-primary hover:underline font-medium">{brand.contact.phone}</a> | Dirección: {brand.contact.address} (Horario de atención: Lunes a Domingo de 07:00 a 21:00 hrs PET). También puede consultar nuestros <Link href="/condiciones" className="text-primary hover:underline font-medium">Términos y Condiciones</Link> y nuestras <Link href="/cambios-y-devoluciones" className="text-primary hover:underline font-medium">Políticas de Cambios y/o Devoluciones</Link>.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
