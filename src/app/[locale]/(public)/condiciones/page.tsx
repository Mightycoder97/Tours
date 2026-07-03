import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Machu Picchu Travel Adventures',
  description: 'Términos y condiciones de servicio, políticas de reserva, cancelación y reembolso de Machu Picchu Travel Adventures.',
};

export default function CondicionesPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="font-serif text-4xl text-primary-dark mb-2">Términos y Condiciones</h1>
        <p className="text-text-light text-sm mb-10">Vigentes desde el 1 de enero de 2025 | RUC: 20564458385</p>

        <div className="prose prose-gray max-w-none space-y-8 text-text-main">
          
          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">1. Generalidades</h2>
            <p className="text-text-light leading-relaxed">Machu Picchu Travel Adventures (RUC: 20564458385), en adelante &ldquo;la Agencia&rdquo;, es una empresa legalmente constituida en Perú, autorizada por el Ministerio de Comercio Exterior y Turismo (MINCETUR). Al realizar una reserva a través de nuestro sitio web o canales de atención, el cliente acepta los presentes términos y condiciones.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">2. Reservas y Confirmación</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li>Las reservas se confirman únicamente tras la recepción del pago completo o del depósito acordado.</li>
              <li>Se enviará un voucher de confirmación al correo electrónico registrado en un plazo de 24 horas hábiles.</li>
              <li>Los cupos son limitados y se asignan en orden de llegada del pago.</li>
              <li>El cliente debe presentar el voucher de confirmación y su documento de identidad original el día del tour.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">3. Precios y Forma de Pago</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li>Todos los precios están expresados en dólares americanos (USD), salvo indicación contraria.</li>
              <li>Aceptamos pago con tarjeta de crédito/débito vía Culqi, PayPal, transferencia bancaria y efectivo en nuestras oficinas.</li>
              <li>Los precios incluyen los conceptos descritos en cada paquete. Los gastos personales, propinas y extras no están incluidos salvo indicación explícita.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">4. Política de Cancelación y Reembolso</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold">Antelación de cancelación</th>
                    <th className="px-4 py-3 text-left font-bold">Reembolso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white"><td className="px-4 py-3">Más de 15 días antes</td><td className="px-4 py-3 text-green-700 font-medium">100% del importe pagado</td></tr>
                  <tr className="bg-gray-50"><td className="px-4 py-3">Entre 7 y 14 días antes</td><td className="px-4 py-3 text-yellow-700 font-medium">50% del importe pagado</td></tr>
                  <tr className="bg-white"><td className="px-4 py-3">Entre 48 horas y 6 días</td><td className="px-4 py-3 text-orange-700 font-medium">25% del importe pagado</td></tr>
                  <tr className="bg-gray-50"><td className="px-4 py-3">Menos de 48 horas</td><td className="px-4 py-3 text-red-700 font-medium">Sin reembolso</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-text-light text-sm mt-3">Las cancelaciones deben realizarse por escrito a reservas@machupicchutravel.com o por WhatsApp al +51 955 723 329.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">5. Responsabilidades</h2>
            <p className="text-text-light leading-relaxed">La Agencia no se hace responsable por cancelaciones o modificaciones debidas a causas de fuerza mayor (condiciones climáticas extremas, paros, cierre de sitios turísticos por autoridades, etc.). En estos casos, se ofrecerá la reprogramación del servicio o un crédito a favor del cliente.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">6. Ley Aplicable</h2>
            <p className="text-text-light leading-relaxed">Estos términos se rigen por las leyes de la República del Perú. Cualquier controversia será sometida a la jurisdicción de los juzgados y tribunales de la ciudad de Cusco.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-primary-dark mb-3">7. Contacto</h2>
            <p className="text-text-light">Para consultas sobre estas condiciones: <a href="mailto:reservas@machupicchutravel.com" className="text-primary hover:underline">reservas@machupicchutravel.com</a> | WhatsApp: <a href="https://wa.me/51955723329" className="text-primary hover:underline">+51 955 723 329</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}
