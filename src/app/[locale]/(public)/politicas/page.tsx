import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Machu Picchu Travel Adventures',
  description: 'Política de tratamiento de datos personales conforme a la Ley 29733 de Protección de Datos Personales del Perú.',
};

export default function PoliticasPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="font-serif text-4xl text-primary-dark mb-2">Política de Privacidad</h1>
        <p className="text-text-light text-sm mb-10">Conforme a la Ley 29733 | Vigente desde el 1 de enero de 2025 | RUC: 20564458385</p>

        <div className="space-y-8 text-text-main">

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">1. Responsable del Tratamiento</h2>
            <p className="text-text-light leading-relaxed">Machu Picchu Travel Adventures, con RUC 20564458385, domicilio en Cusco, Perú, es responsable del banco de datos personales denominado <strong>&ldquo;CLIENTES MACHUPICCHU TRAVEL&rdquo;</strong>, debidamente registrado ante la Autoridad Nacional de Protección de Datos Personales (ANPDP).</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">2. Datos que Recopilamos</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li><strong>Datos de identidad</strong>: nombre, apellidos, fecha de nacimiento, tipo y número de documento de identidad.</li>
              <li><strong>Datos de contacto</strong>: correo electrónico, número de teléfono, nacionalidad.</li>
              <li><strong>Datos de transacción</strong>: historial de reservas, fechas de viaje, número de pasajeros, montos pagados.</li>
              <li><strong>Datos técnicos</strong>: dirección IP, tipo de navegador, cookies de sesión (sin información personal identificable).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">3. Finalidad del Tratamiento</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li>Gestión y confirmación de reservas de tours.</li>
              <li>Envío de vouchers, confirmaciones y comunicaciones relacionadas con el servicio contratado.</li>
              <li>Cumplimiento de obligaciones legales (SUNAT, MINCETUR).</li>
              <li>Mejora de nuestros servicios y experiencia del usuario (solo con consentimiento explícito).</li>
              <li>Envío de comunicaciones comerciales y promocionales (solo con consentimiento explícito).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">4. Transferencias Internacionales</h2>
            <p className="text-text-light leading-relaxed">Para operar nuestros servicios, sus datos pueden ser transferidos a proveedores ubicados fuera del Perú que cumplen con estándares de seguridad adecuados:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-text-light">
              <li><strong>Supabase Inc. (USA)</strong> — Almacenamiento seguro de datos con cifrado en reposo.</li>
              <li><strong>Resend Inc. (USA)</strong> — Envío de correos transaccionales de confirmación.</li>
              <li><strong>Culqi S.A.C. (Perú)</strong> — Procesamiento de pagos con tarjeta (certificado PCI-DSS).</li>
              <li><strong>PayPal Holdings Inc. (USA)</strong> — Procesamiento de pagos internacionales.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">5. Derechos del Titular (ARCO)</h2>
            <p className="text-text-light leading-relaxed mb-3">Conforme a la Ley 29733, tiene derecho a:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li><strong>Acceso</strong>: conocer qué datos suyos tenemos.</li>
              <li><strong>Rectificación</strong>: corregir datos inexactos o incompletos.</li>
              <li><strong>Cancelación</strong>: solicitar la eliminación de sus datos.</li>
              <li><strong>Oposición</strong>: oponerse al tratamiento para fines comerciales.</li>
            </ul>
            <p className="text-text-light mt-3">Para ejercer estos derechos, envíe un correo a <a href="mailto:privacidad@machupicchutravel.com" className="text-primary hover:underline">privacidad@machupicchutravel.com</a> adjuntando copia de su documento de identidad.</p>
          </section>

          <section id="cookies">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">6. Política de Cookies</h2>
            <p className="text-text-light leading-relaxed">Utilizamos únicamente cookies esenciales para el funcionamiento del sitio (sesión, carrito de compras, preferencia de idioma). No utilizamos cookies de seguimiento publicitario de terceros sin su consentimiento explícito.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">7. Contacto</h2>
            <p className="text-text-light">Consultas sobre privacidad: <a href="mailto:privacidad@machupicchutravel.com" className="text-primary hover:underline">privacidad@machupicchutravel.com</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}
