import type { Metadata } from 'next';
import { getBrandConfig } from '@/lib/brand';
import { Link } from '@/i18n/navigation';

export function generateMetadata(): Metadata {
  const brand = getBrandConfig();
  return {
    title: `Política de Privacidad | ${brand.name}`,
    description: `Política de tratamiento de datos personales de ${brand.legalName} (RUC ${brand.ruc}) conforme a la Ley N° 29733 de Protección de Datos Personales del Perú.`,
  };
}

export default function PoliticasPage() {
  const brand = getBrandConfig();

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="font-serif text-3xl sm:text-4xl text-primary-dark mb-2">Política de Privacidad y Protección de Datos Personales</h1>
        <p className="text-text-light text-sm mb-10">
          Conforme a la Ley N° 29733 y su Reglamento (D.S. N° 003-2013-JUS) | Razón Social: <strong>{brand.legalName}</strong> | RUC: <strong>{brand.ruc}</strong>
        </p>

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
      </div>
    </div>
  );
}
