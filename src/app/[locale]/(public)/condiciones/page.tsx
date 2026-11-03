import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getBrandConfig } from '@/lib/brand';
import { ShieldCheck, Building2, Phone, Mail, MapPin, Clock, FileText, BookOpen, RefreshCw } from 'lucide-react';

export function generateMetadata(): Metadata {
  const brand = getBrandConfig();
  return {
    title: `Términos y Condiciones | ${brand.name}`,
    description: `Términos y condiciones generales de contratación, uso de la plataforma, precios, formas de pago, entrega de vouchers y protección de datos de ${brand.legalName} (RUC ${brand.ruc}).`,
  };
}

export default function CondicionesPage() {
  const brand = getBrandConfig();

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="border-b border-gray-200 pb-8 mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" /> Información Legal Obligatoria
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-dark mb-3">
            Términos y Condiciones
          </h1>
          <p className="text-text-light text-sm">
            Vigentes y actualizados para el periodo 2025 – 2026 | Razón Social: <strong>{brand.legalName}</strong> | RUC: <strong>{brand.ruc}</strong>
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-text-main">
          {/* 1. Información general del comercio */}
          <section id="informacion-general" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-4">
              1. Información General del Comercio
            </h2>
            <p className="text-text-light leading-relaxed mb-4">
              El presente sitio web (<a href={brand.domain} className="text-primary hover:underline font-medium">{brand.domain}</a>) es operado por <strong>{brand.legalName}</strong> (nombre comercial: <strong>{brand.name}</strong>), agencia de viajes y operadora de turismo receptivo legalmente constituida en la República del Perú y debidamente registrada ante el Ministerio de Comercio Exterior y Turismo (MINCETUR / GERCETUR Cusco), en adelante &ldquo;el Comercio&rdquo; o &ldquo;la Agencia&rdquo;.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-light">Razón Social</p>
                  <p className="font-semibold text-text-main">{brand.legalName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-light">RUC</p>
                  <p className="font-semibold text-text-main">{brand.ruc}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-light">Dirección</p>
                  <p className="font-semibold text-text-main">{brand.contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-light">Teléfono / WhatsApp</p>
                  <p className="font-semibold text-text-main">
                    <a href={`tel:+${brand.contact.cleanPhone}`} className="hover:text-primary transition-colors">
                      {brand.contact.phone}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-light">Correo Electrónico</p>
                  <p className="font-semibold text-text-main break-all">
                    <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">
                      {brand.contact.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Aceptación de Términos y Condiciones */}
          <section id="aceptacion" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              2. Aceptación de Términos y Condiciones
            </h2>
            <div className="space-y-3 text-text-light leading-relaxed">
              <p>
                El acceso, navegación y uso de esta plataforma web o aplicación, así como la solicitud o compra de cualquiera de nuestros productos y servicios turísticos, implica la lectura, comprensión y <strong>aceptación plena y sin reservas de los presentes Términos y Condiciones</strong> por parte del usuario o cliente.
              </p>
              <p>
                <strong>{brand.legalName}</strong> se reserva el derecho de actualizar, modificar o reemplazar cualquier parte de estos Términos y Condiciones en cualquier momento por motivos legales, regulatorios, operativos o comerciales. Las actualizaciones entrarán en vigor desde su publicación en este sitio web y serán notificadas oportunamente a los usuarios a través de los medios correspondientes (aviso visible en la plataforma web y/o comunicación directa al correo electrónico registrado en caso de reservas activas).
              </p>
            </div>
          </section>

          {/* 3. Registro y Cuenta de usuario */}
          <section id="registro-y-cuenta" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              3. Registro y Cuenta de Usuario
            </h2>
            <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
              <li>
                <strong>Datos verídicos y obligatorios:</strong> Para realizar compras y reservas en la plataforma, el usuario debe registrarse en el proceso de reserva proporcionando datos verídicos, exactos, vigentes y completos (nombres y apellidos completos tal como figuran en su documento oficial, tipo y número de documento de identidad —DNI, Carnet de Extranjería o Pasaporte—, fecha de nacimiento, nacionalidad, teléfono de contacto y correo electrónico válido), tanto del titular de la compra como de todos los pasajeros integrantes del viaje.
              </li>
              <li>
                <strong>Requisitos para el registro y uso de la web:</strong> Para contratar servicios o efectuar pagos en nuestra plataforma, el usuario debe ser <strong>mayor de edad (mínimo 18 años cumplidos)</strong> y contar con plena capacidad legal para celebrar contratos conforme a la legislación peruana. Los menores de edad únicamente pueden ser registrados como pasajeros acompañados por sus padres, tutores legales o apoderados con autorización notarial vigente.
              </li>
              <li>
                <strong>Confidencialidad de la cuenta y reserva:</strong> Es responsabilidad exclusiva del usuario mantener la confidencialidad de su cuenta, de sus códigos de reserva ({brand.bookingPrefix}-XXXX), vouchers electrónicos y de cualquier credencial o enlace enviado a su correo electrónico.
              </li>
              <li>
                <strong>Responsabilidad por uso indebido:</strong> Cualquier uso indebido de la cuenta, del código de reserva o de los boletos emitidos derivado de la falta de resguardo por parte del cliente será de responsabilidad exclusiva del usuario titular. En caso de detectar un acceso o uso no autorizado, el usuario deberá notificarlo de inmediato a <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">{brand.contact.email}</a>.
              </li>
            </ul>
          </section>

          {/* 4. Productos y servicios */}
          <section id="productos-y-servicios" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              4. Productos y Servicios
            </h2>
            <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
              <li>
                <strong>Descripción de productos y servicios ofrecidos:</strong> {brand.name} comercializa y opera paquetes turísticos, tours guiados de medio día y día completo (Full Day), expediciones de varios días, caminatas de aventura (Camino Inca, Salkantay Trek, Montaña de 7 Colores Vinicunca, Laguna Humantay, Valle Sagrado de los Incas), gestión de boletos oficiales de ingreso al Santuario Histórico de Machu Picchu, boletos de transporte ferroviario (PeruRail e Inca Rail), transporte turístico terrestre, guiado profesional bilingüe y experiencias culturales en Cusco y todo el Perú. Cada ficha de tour especifica detalladamente el itinerario, duración, servicios incluidos y no incluidos.
              </li>
              <li>
                <strong>Disponibilidad de stock y cupos:</strong> La disponibilidad de stock (cupos diarios por grupo, asientos de tren y boletos de ingreso regulados por el Ministerio de Cultura del Perú) es limitada y puede estar sujeta a cambios o agotamiento sin previo aviso hasta el momento en que se procese y confirme efectivamente el pago de la reserva.
              </li>
              <li>
                <strong>Restricciones de venta:</strong> De acuerdo con las políticas operativas del comercio y las normas de los sitios arqueológicos, pueden aplicarse restricciones de venta tales como cantidades mínimas o máximas de pasajeros por reserva, edades recomendadas o exigencias de condición física para rutas de alta montaña (superiores a 4,000 m s. n. m.), así como el carácter estrictamente personal e intransferible de los boletos estatales una vez emitidos.
              </li>
              <li>
                <strong>Periodos de prueba y renovaciones automáticas:</strong> Por la naturaleza de los paquetes y servicios turísticos de fecha determinada, <strong>no existen periodos de prueba gratuitos ni suscripciones con renovación o cobro automático</strong>. Todas las notificaciones referentes al servicio contratado, recordatorios e itinerarios son enviadas puntualmente al correo electrónico y WhatsApp del cliente.
              </li>
            </ul>
          </section>

          {/* 5. Precios y formas de pago */}
          <section id="precios-y-pagos" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              5. Precios y Formas de Pago
            </h2>
            <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
              <li>
                <strong>Moneda de presentación:</strong> Los precios de nuestros productos y servicios son presentados de forma clara en moneda extranjera (<strong>Dólares Americanos – USD / US$</strong>) y/o en moneda local (<strong>Soles Peruanos – PEN / S/</strong>). Durante el proceso de Checkout, el usuario visualiza el importe exacto en la moneda elegida antes de autorizar el pago. Cuando se realiza el cobro en Soles Peruanos (PEN) respecto de tarifas base en USD, se aplica e informa en pantalla el tipo de cambio referencial vigente del comercio.
              </li>
              <li>
                <strong>Métodos de pago aceptados:</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li><strong>Tarjetas de crédito y débito:</strong> Visa, Mastercard, American Express y Diners Club (en USD o PEN) procesadas en línea a través de la pasarela <strong>Culqi</strong>.</li>
                  <li><strong>Billeteras digitales:</strong> Pago directo con código de aprobación <strong>Yape</strong> (en Soles Peruanos – PEN) a través de <strong>Culqi</strong>.</li>
                  <li><strong>Pagos internacionales:</strong> Cuenta <strong>PayPal</strong> y tarjetas internacionales asociadas.</li>
                  <li><strong>Transferencias bancarias:</strong> Transferencias o depósitos a nuestras cuentas corporativas previa coordinación con el área de reservas.</li>
                </ul>
              </li>
              <li>
                <strong>Impuestos:</strong> Los precios publicados incluyen los impuestos de ley aplicables según la normativa tributaria peruana vigente (o las exoneraciones de exportación de servicios turísticos receptivos cuando corresponda legalmente), así como todos los conceptos expresamente indicados en el apartado <em>&ldquo;¿Qué incluye este paquete?&rdquo;</em> de cada tour. Gastos personales, propinas, alimentación no especificada o seguros opcionales no están incluidos salvo indicación expresa.
              </li>
              <li>
                <strong>Seguridad de la plataforma de pagos y responsabilidad del cliente:</strong> Todos los pagos en línea son procesados a través de pasarelas certificadas bajo el estándar internacional <strong>PCI-DSS</strong> (<em>Payment Card Industry Data Security Standard</em>) con cifrado seguro <strong>SSL/TLS</strong> (Culqi S.A.C. y PayPal Inc.). El Comercio no almacena ni accede a números completos de tarjetas ni códigos CVV/CVC. Es responsabilidad exclusiva del cliente verificar la exactitud de los montos antes de pagar y contar con la titularidad o autorización legítima para el uso del medio de pago empleado.
              </li>
            </ul>
          </section>

          {/* 6. Proceso de compra */}
          <section id="proceso-de-compra" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              6. Proceso de Compra
            </h2>
            <p className="text-text-light leading-relaxed mb-3">
              Para realizar una compra en nuestra plataforma web, el usuario debe seguir los siguientes pasos:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-text-light leading-relaxed mb-4">
              <li><strong>Elección del servicio:</strong> Ingresar al catálogo de tours (<Link href="/tours" className="text-primary hover:underline">/tours</Link>), elegir el paquete deseado, seleccionar la fecha disponible en el calendario y la cantidad de pasajeros (adultos y niños), y presionar el botón <em>&ldquo;Reservar Ahora&rdquo;</em>.</li>
              <li><strong>Revisión del carrito:</strong> Verificar el detalle de los servicios seleccionados y el subtotal en el carrito de compras (<Link href="/cart" className="text-primary hover:underline">/cart</Link>) y hacer clic en <em>&ldquo;Continuar al Pago&rdquo;</em>.</li>
              <li><strong>Registro de pasajeros y contacto:</strong> Completar en el formulario de Checkout (<Link href="/checkout" className="text-primary hover:underline">/checkout</Link>) los datos de contacto del titular (correo electrónico y teléfono) y los datos personales e identificación de cada pasajero.</li>
              <li><strong>Aceptación de condiciones legales:</strong> Marcar la casilla de conformidad aceptando los presentes Términos y Condiciones, las Políticas de Cambios y Devoluciones y la Política de Privacidad.</li>
              <li><strong>Pago en línea:</strong> Elegir el método de pago (Tarjeta vía Culqi, Yape o PayPal), completar los datos requeridos en la ventana segura de pago y confirmar la orden.</li>
            </ol>
            <div className="space-y-3 text-text-light leading-relaxed">
              <p>
                <strong>Confirmación y validación del pedido:</strong> Una vez aprobado el cobro por la pasarela de pagos, la plataforma genera automáticamente un código único de reserva (ej. <code>{brand.bookingPrefix}-XXXXXXXX</code>), redirige a la pantalla de confirmación y envía el voucher electrónico al correo registrado por el cliente.
              </p>
              <p>
                <strong>Posibles motivos de cancelación por parte del comercio:</strong> El Comercio se reserva el derecho de cancelar o anular un pedido —comunicándolo de inmediato al cliente— en los siguientes casos: (i) detección de transacción fraudulenta, no autorizada o observada por los controles antifraude de Culqi, PayPal o el banco emisor; (ii) falta de confirmación efectiva del pago; (iii) suministro de información de identidad falsa, inconsistente o inválida que impida adquirir los boletos oficiales ante las entidades gubernamentales; o (iv) agotamiento sobrevenido de cupos oficiales del Ministerio de Cultura antes de la emisión física/electrónica del boleto, supuesto en el cual se ofrecerá al cliente la reprogramación sin recargo o el reembolso del 100% del monto abonado.
              </p>
            </div>
          </section>

          {/* 7. Envíos y entrega */}
          <section id="envios-y-entrega" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              7. Envíos y Entrega (Entrega de Vouchers, Boletos y Ejecución del Servicio)
            </h2>
            <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
              <li>
                <strong>Cobertura de envíos y prestación del servicio:</strong>
                <ul className="list-circle pl-6 mt-1.5 space-y-1">
                  <li><strong>Entrega digital de documentos de viaje:</strong> Cobertura nacional (todo el Perú) e internacional a través del correo electrónico y WhatsApp proporcionados por el cliente.</li>
                  <li><strong>Prestación presencial y recojo de pasajeros:</strong> Cobertura en la ciudad de Cusco (hoteles ubicados en el Centro Histórico y zona urbana), Valle Sagrado, estación de Ollantaytambo, Machu Picchu Pueblo (Aguas Calientes) y los puntos de encuentro detallados en cada tour.</li>
                </ul>
              </li>
              <li>
                <strong>Tiempos estimados de entrega:</strong>
                <ul className="list-circle pl-6 mt-1.5 space-y-1">
                  <li><strong>Confirmación de reserva y recibo de pago:</strong> Entrega inmediata (automática) tras la aprobación del pago en la web.</li>
                  <li><strong>Vouchers definitivos, boletos de tren e ingresos oficiales:</strong> Entrega dentro de un plazo estimado de <strong>2 a 24 horas hábiles</strong> posteriores a la confirmación de la compra.</li>
                </ul>
              </li>
              <li>
                <strong>Costos de envío y condiciones aplicables:</strong> La emisión y envío electrónico de vouchers, boletos e itinerarios digitales es <strong>100% gratuito (sin costo de envío)</strong>. Cuando el tour contratado incluya la entrega física de tickets o el briefing presencial en el hotel del pasajero en la ciudad de Cusco, dicha entrega tampoco tiene costo adicional.
              </li>
              <li>
                <strong>Política sobre retrasos y problemas en la entrega:</strong> Si por problemas en el servidor de correo del destinatario, bandeja de correo no deseado (<em>spam</em>) o error involuntario al digitar el correo electrónico, el usuario no recibiera su voucher dentro del plazo estimado, podrá comunicarse en cualquier momento al teléfono/WhatsApp <a href={`https://wa.me/${brand.contact.cleanPhone}`} className="text-primary hover:underline">{brand.contact.phone}</a> o al correo <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">{brand.contact.email}</a> para recibir un reenvío inmediato sin costo. En caso de demoras atribuibles a mantenimientos temporales en los sistemas de emisión del Ministerio de Cultura o empresas ferroviarias, la Agencia informará oportunamente al cliente garantizando la entrega de sus boletos antes de la fecha de su viaje.
              </li>
            </ul>
          </section>

          {/* 8. Protección de datos personales */}
          <section id="proteccion-datos" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              8. Protección de Datos Personales
            </h2>
            <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
              <li>
                <strong>Cumplimiento con la Ley N° 29733:</strong> El Comercio garantiza la confidencialidad, seguridad y adecuado tratamiento de la información personal de sus usuarios en estricto cumplimiento de la <strong>Ley N° 29733 – Ley de Protección de Datos Personales del Perú</strong> y su Reglamento aprobado por Decreto Supremo N° 003-2013-JUS.
              </li>
              <li>
                <strong>Uso y finalidad de los datos recolectados:</strong> Los datos personales recabados (nombres, documentos de identidad, fecha de nacimiento, nacionalidad, teléfono y correo electrónico) se utilizan exclusivamente para: gestionar y ejecutar las reservas de los tours contratados, emitir boletos nominales ante el Ministerio de Cultura, SERNANP y operadores ferroviarios (PeruRail / Inca Rail), enviar confirmaciones y vouchers de viaje, cumplir obligaciones tributarias ante SUNAT y regulatorias ante MINCETUR, atender consultas o reclamos, y —únicamente si el usuario lo autoriza expresamente— remitir comunicaciones promocionales.
              </li>
              <li>
                <strong>Derechos del usuario sobre su información (Derechos ARCO) y cómo ejercerlos:</strong> El titular de los datos personales tiene derecho a solicitar en cualquier momento el <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> respecto de sus datos personales, así como revocar su consentimiento. Para ejercer estos derechos de forma gratuita, el usuario debe enviar una comunicación al correo <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">{brand.contact.email}</a> indicando su petición y adjuntando copia simple de su documento de identidad. Puede revisar el detalle íntegro en nuestra <Link href="/politicas" className="text-primary hover:underline font-medium">Política de Privacidad</Link>.
              </li>
            </ul>
          </section>

          {/* 9. Propiedad intelectual */}
          <section id="propiedad-intelectual" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              9. Propiedad Intelectual
            </h2>
            <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
              <li>
                <strong>Protección por derechos de autor:</strong> Todo el contenido alojado en este sitio web —incluyendo logotipos, marcas comerciales (<strong>{brand.name}</strong>), nombres de dominio, fotografías, videos, textos descriptivos, itinerarios, gráficos, diseño de interfaz y código fuente— es de titularidad exclusiva de <strong>{brand.legalName}</strong> o de sus respectivos licenciantes, y se encuentra protegido por la legislación peruana sobre Derechos de Autor y Propiedad Industrial (Decreto Legislativo N° 822 y Decreto Legislativo N° 1075, fiscalizados por INDECOPI) y convenios internacionales.
              </li>
              <li>
                <strong>Restricciones en el uso de la información publicada:</strong> Queda terminantemente prohibida la reproducción, copia, modificación, distribución, transmisión, republicación, extracción automatizada de datos o uso comercial total o parcial del contenido publicado en esta plataforma sin contar con la autorización previa, expresa y por escrito de <strong>{brand.legalName}</strong>. El uso del sitio web no otorga al usuario ningún derecho ni licencia sobre las marcas o contenidos del Comercio.
              </li>
            </ul>
          </section>

          {/* 10. Responsabilidad y limitaciones */}
          <section id="responsabilidad-y-limitaciones" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              10. Responsabilidad y Limitaciones
            </h2>
            <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
              <li>
                <strong>Fallos técnicos de la web:</strong> El Comercio implementa medidas de seguridad y disponibilidad continua en su plataforma; no obstante, no se hace responsable por interrupciones temporales del servicio web, demoras en la red de internet, fallos en equipos o navegadores del usuario, o incidencias técnicas en servidores de terceros que escapen a su control razonable.
              </li>
              <li>
                <strong>Uso adecuado de los productos y servicios adquiridos:</strong> Es responsabilidad del cliente y de todos los pasajeros hacer un uso adecuado de los servicios contratados, presentarse con la debida puntualidad en el lugar y hora de recojo acordados, portar obligatoriamente el <strong>documento de identidad físico original</strong> (DNI, Carnet de Extranjería o Pasaporte vigente con el que se emitieron los boletos), respetar el reglamento oficial de visita del Santuario Histórico de Machu Picchu y seguir las indicaciones de seguridad de los guías oficiales. Asimismo, el viajero declara encontrarse en condiciones de salud aptas para el tour elegido.
              </li>
              <li>
                <strong>Límites de responsabilidad por inconvenientes ajenos al comercio:</strong> <strong>{brand.legalName}</strong> no asume responsabilidad directa por daños, pérdidas, retrasos, cierres de rutas o cancelaciones originadas por <strong>casos fortuitos o de fuerza mayor</strong> ajenos al control de la Agencia (tales como desastres naturales, lluvias intensas, derrumbes, huelgas, paros, bloqueos de carreteras o vías férreas, disposiciones gubernamentales, cierre intempestivo de sitios arqueológicos por orden del Estado o demoras operativas propias de las empresas ferroviarias o aéreas). En dichos escenarios, la Agencia brindará asistencia inmediata al pasajero y gestionará las opciones de reprogramación o reembolso conforme a nuestra <Link href="/cambios-y-devoluciones" className="text-primary hover:underline font-medium">Política de Cambios y/o Devoluciones</Link>.
              </li>
            </ul>

            {/* Resumen de Escala de Cancelación */}
            <div className="mt-6">
              <h3 className="font-bold text-base text-primary-dark mb-2">
                Escala de Cancelación y Reembolsos (Resumen)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">Antelación de la solicitud</th>
                      <th className="px-4 py-3 text-left font-bold">Porcentaje de reembolso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-white">
                      <td className="px-4 py-3">Más de 15 días calendario antes del tour</td>
                      <td className="px-4 py-3 text-green-700 font-semibold">100% del importe pagado*</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3">Entre 7 y 14 días calendario antes del tour</td>
                      <td className="px-4 py-3 text-yellow-700 font-semibold">50% del importe pagado</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3">Entre 48 horas y 6 días antes del tour</td>
                      <td className="px-4 py-3 text-orange-700 font-semibold">25% del importe pagado</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3">Menos de 48 horas antes o No-Show (inasistencia)</td>
                      <td className="px-4 py-3 text-red-700 font-semibold">0% (Sin reembolso)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-text-light mt-2">
                *Excepto boletos de ingreso del Ministerio de Cultura (Machu Picchu / Camino Inca) o tickets de tren no reembolsables que ya hayan sido emitidos nominalmente. Revisa el detalle completo en nuestras <Link href="/cambios-y-devoluciones" className="text-primary hover:underline font-medium">Políticas de Cambios y/o Devoluciones</Link>.
              </p>
            </div>
          </section>

          {/* 11. Legislación aplicable y resolución de conflictos */}
          <section id="legislacion-y-conflictos" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              11. Legislación Aplicable y Resolución de Conflictos
            </h2>
            <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
              <li>
                <strong>Legislación aplicable:</strong> El presente documento, así como todas las reservas, compras y servicios contratados a través de esta plataforma, se rigen e interpretan íntegramente por la <strong>legislación vigente de la República del Perú</strong>, incluyendo el Código Civil y el Código de Protección y Defensa del Consumidor (Ley N° 29571).
              </li>
              <li>
                <strong>Resolución de conflictos:</strong> Cualquier controversia, discrepancia o reclamo que surja en relación con la interpretación o cumplimiento de estos Términos y Condiciones será resuelto en primera instancia mediante trato directo o conciliación entre el usuario y el Comercio. En caso de no llegar a un acuerdo, los conflictos serán resueltos a través de los centros de conciliación autorizados, ante el <strong>Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual (INDECOPI)</strong>, o ante las instancias judiciales competentes del distrito judicial de <strong>Cusco, Perú</strong>.
              </li>
            </ul>
          </section>

          {/* 12. Contacto y soporte */}
          <section id="contacto-y-soporte" className="scroll-mt-28">
            <h2 className="font-serif text-2xl text-primary-dark mb-3">
              12. Contacto y Soporte
            </h2>
            <p className="text-text-light leading-relaxed mb-4">
              En caso de cualquier consulta, solicitud de asistencia, cambio, devolución o reclamo sobre nuestros servicios o sobre los presentes Términos y Condiciones, nuestros canales oficiales de atención al cliente están a su disposición:
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>
                  <strong>Teléfono y WhatsApp de Atención:</strong>{' '}
                  <a href={`https://wa.me/${brand.contact.cleanPhone}`} className="text-primary font-semibold hover:underline">
                    {brand.contact.phone}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>
                  <strong>Correo Electrónico de Soporte:</strong>{' '}
                  <a href={`mailto:${brand.contact.email}`} className="text-primary font-semibold hover:underline">
                    {brand.contact.email}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>
                  <strong>Dirección de Oficina:</strong> {brand.contact.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>
                  <strong>Horario de Atención:</strong> Lunes a Domingo de 07:00 a 21:00 hrs (Hora de Perú, GMT-5) en oficina comercial | Asistencia en línea 24/7 para pasajeros con reserva activa.
                </span>
              </div>
            </div>

            {/* Enlaces rápidos a páginas legales complementarias */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/cambios-y-devoluciones"
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary bg-white hover:bg-primary/5 transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-sm text-primary-dark">Políticas de Cambios y/o Devoluciones</p>
                  <p className="text-xs text-text-light">Plazos, condiciones, reembolsos y reprogramaciones</p>
                </div>
              </Link>
              <Link
                href="/libro-de-reclamaciones"
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary bg-white hover:bg-primary/5 transition-colors"
              >
                <BookOpen className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-sm text-primary-dark">Libro de Reclamaciones Virtual</p>
                  <p className="text-xs text-text-light">Conforme al Código de Protección al Consumidor (INDECOPI)</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
