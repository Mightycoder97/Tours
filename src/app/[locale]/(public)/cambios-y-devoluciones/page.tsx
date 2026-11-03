import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getBrandConfig } from '@/lib/brand';
import { RefreshCw, Clock, AlertTriangle, Phone, Mail, MapPin, FileText, BookOpen, ShieldCheck } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: 'meta.returnsPage' });
  const brand = getBrandConfig();
  return {
    title: `${tMeta('title')} | ${brand.name}`,
    description: `${tMeta('description')} (${brand.legalName} — RUC ${brand.ruc}).`,
  };
}

export default async function CambiosYDevolucionesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.returns' });
  const brand = getBrandConfig();
  const isEn = locale === 'en';

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="border-b border-gray-200 pb-8 mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <RefreshCw className="w-3.5 h-3.5" /> {t('badge')}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-dark mb-3">
            {t('title')}
          </h1>
          <p className="text-text-light text-sm">
            {t('period')} | {t('legalNameLabel')}: <strong>{brand.legalName}</strong> | {t('rucLabel')}: <strong>{brand.ruc}</strong>
          </p>
        </div>

        {isEn ? (
          <div className="prose prose-gray max-w-none space-y-10 text-text-main">
            {/* 1. Introduction */}
            <section id="introduccion" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                1. Introduction
              </h2>
              <div className="space-y-3 text-text-light leading-relaxed">
                <p>
                  This policy clearly and transparently establishes the conditions, timeframes, requirements, and procedures applicable for requesting date changes, rescheduling, cancellations, and refunds regarding the products and services offered by <strong>{brand.legalName}</strong> (commercial name: <strong>{brand.name}</strong>, Tax ID / RUC N° <strong>{brand.ruc}</strong>).
                </p>
                <p>
                  This policy applies to all products, travel packages, guided tours, tickets, and complementary services purchased through our online store (<a href={brand.domain} className="text-primary hover:underline font-medium">{brand.domain}</a>) and official digital customer service channels.
                </p>
              </div>
            </section>

            {/* 2. Conditions for Changes and Returns */}
            <section id="condiciones" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-4">
                2. Conditions for Changes and Returns
              </h2>

              <div className="space-y-4 text-text-light leading-relaxed">
                <div>
                  <h3 className="font-bold text-base text-primary-dark mb-2">
                    2.1. Timeframes to request a change or refund
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Full refund timeframe (100%):</strong> Customers may request a cancellation and a 100% refund within <strong>7, 15, or up to 30 days after purchase</strong>, provided that the request is submitted more than <strong>15 calendar days prior to the scheduled tour date</strong>.
                    </li>
                    <li>
                      <strong>Free date change / rescheduling timeframe:</strong> Customers may request a date change or passenger reassignment for their booking without administrative penalty up to <strong>7 calendar days prior</strong> to the scheduled service date (subject to quota availability and restrictions on already-issued government or railway tickets).
                    </li>
                    <li>
                      <strong>General refund scale according to advance notice before the tour date:</strong>
                    </li>
                  </ul>

                  <div className="overflow-x-auto my-4">
                    <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="px-4 py-3 text-left font-bold">Advance notice before service start</th>
                          <th className="px-4 py-3 text-left font-bold">Applicable refund percentage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="bg-white">
                          <td className="px-4 py-3 font-medium text-text-main">More than 15 calendar days before the tour</td>
                          <td className="px-4 py-3 text-green-700 font-bold">100% of the amount paid*</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-medium text-text-main">Between 7 and 14 calendar days before the tour</td>
                          <td className="px-4 py-3 text-yellow-700 font-bold">50% of the amount paid</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-3 font-medium text-text-main">Between 48 hours and 6 days before the tour</td>
                          <td className="px-4 py-3 text-orange-700 font-bold">25% of the amount paid</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-medium text-text-main">Less than 48 hours before or No-Show</td>
                          <td className="px-4 py-3 text-red-700 font-bold">0% (No refund)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-primary-dark mb-2">
                    2.2. Condition of the service or product
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      For tourist services and travel packages: the booking must be <strong>unused</strong> (neither partially nor totally initiated or executed), with its original vouchers and booking codes valid and unredeemed.
                    </li>
                    <li>
                      For physical items, travel kits, or promotional merchandise purchased or included: the product must be <strong>strictly unused, in its original sealed packaging, with all original tags attached, and free of damage or signs of wear</strong>.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-base text-primary-dark mb-2">
                    2.3. Products and services NOT eligible for changes or refunds
                  </h3>
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-2.5 mb-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="font-bold text-sm text-amber-900">
                        Eligibility restrictions:
                      </p>
                    </div>
                    <ul className="list-disc pl-6 space-y-1.5 text-sm text-amber-950">
                      <li>
                        <strong>Official tickets from the Ministry of Culture (MINCUL) and SERNANP:</strong> Admission tickets to the Historic Sanctuary of Machu Picchu, Huayna Picchu, Machu Picchu Mountain, and Inca Trail permits that <strong>have already been nominally issued</strong> do not allow date changes, name changes, or refunds by express regulation of the Peruvian Government.
                      </li>
                      <li>
                        <strong>Train tickets (PeruRail / Inca Rail) or airfare already issued</strong> under non-refundable promotional fares or outside the timeframe permitted by the railway operator.
                      </li>
                      <li>
                        <strong>Customized products, tailor-made private services</strong> with non-refundable third-party reservations, personal/intimate apparel, perishable foods or trek rations already purchased for the expedition, as well as services where the passenger failed to appear at the agreed pickup time (<em>No-Show</em>) or failed to carry their original physical identity document.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Process to Request a Change or Return */}
            <section id="proceso" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                3. Process to Request a Change or Return
              </h2>
              <p className="text-text-light leading-relaxed mb-4">
                To manage any request for a date change, package exchange, or refund, the booking holder must follow these three steps:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm mb-3">
                    1
                  </span>
                  <h3 className="font-bold text-base text-primary-dark mb-2">Initial Contact</h3>
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                    Contact our customer support team by sending an email to <a href={`mailto:${brand.contact.email}`} className="text-primary font-medium hover:underline">{brand.contact.email}</a> or messaging our phone / WhatsApp <a href={`https://wa.me/${brand.contact.cleanPhone}`} className="text-primary font-medium hover:underline">{brand.contact.phone}</a>.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm mb-3">
                    2
                  </span>
                  <h3 className="font-bold text-base text-primary-dark mb-2">Formal Request</h3>
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                    Complete the return or change request through our <Link href="/contacto" className="text-primary font-medium hover:underline">online support form</Link> or in the body of the email with the subject <em>&ldquo;Change / Refund Request – Booking #{brand.bookingPrefix}&rdquo;</em>.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm mb-3">
                    3
                  </span>
                  <h3 className="font-bold text-base text-primary-dark mb-2">Submit Documentation</h3>
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                    Attach the required documentation (and ship any physical product if applicable): <strong>booking code or order number</strong>, copy of the holder&apos;s ID/Passport, <strong>proof of purchase/payment</strong>, and supporting photos or screenshots of the product or service.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Refund and Exchange Options */}
            <section id="opciones-reembolso" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                4. Refund and Exchange Options
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-text-light leading-relaxed">
                <li>
                  <strong>Available refund methods:</strong>
                  <ul className="list-circle pl-6 mt-1.5 space-y-1.5">
                    <li>
                      <strong>Money refund:</strong> Direct refund to the original payment method used for the purchase (reversal to the credit/debit card processed via Culqi, Yape refund, PayPal account refund, or bank transfer).
                    </li>
                    <li>
                      <strong>Store credit (Travel Credit Note):</strong> Issuance of a credit voucher for 100% of the eligible amount, valid for <strong>12 months</strong> to be used on any future travel date.
                    </li>
                    <li>
                      <strong>Gift Card:</strong> Transferable digital voucher in favor of a family member or third party to purchase any tour or package from our catalog.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Estimated refund processing time:</strong> Once the request is approved and the documentation verified, <strong>{brand.legalName}</strong> will process the refund within <strong>5 to 10 business days</strong>. (For credit or debit card payments, the additional time required for the reversal to appear on the card statement depends exclusively on the operating timeframes of the customer&apos;s issuing bank).
                </li>
                <li>
                  <strong>Exchange options:</strong>
                  <ul className="list-circle pl-6 mt-1.5 space-y-1.5">
                    <li><strong>Replacement or rescheduling for the same product/service:</strong> Change to a new available travel date without administrative surcharge (when requested at least 7 days in advance).</li>
                    <li><strong>Exchange for another tour or item of equal value:</strong> Substitution of the contracted package for another tourist experience of equal commercial value.</li>
                    <li><strong>Exchange with fare adjustment or partial refund:</strong> If the newly chosen tour has a lower price within the permitted change window, a <strong>partial refund</strong> or store credit will be granted for the difference; if it has a higher price, the customer will only pay the fare difference.</li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* 5. Shipping Costs and Responsibility */}
            <section id="costos-envio" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                5. Shipping Costs and Responsibility
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Changes or returns requested voluntarily by the customer:</strong> Physical shipping costs (in case of returning physical merchandise or physical ticket delivery), as well as international bank fees, administrative fees from external operators, or seasonal fare differences voluntarily requested by the customer, <strong>are the sole responsibility of the customer</strong>, except in cases of error attributable to our store/agency.
                </li>
                <li>
                  <strong>Order errors or defective services:</strong> In the event of defective products, operational non-compliance attributable to the Agency, or errors in order issuance by <strong>{brand.legalName}</strong>, all shipping, ticket re-issuance, pickup, and associated handling will be <strong>100% free of charge for the customer</strong>, with the Merchant assuming all costs.
                </li>
              </ul>
            </section>

            {/* 6. Exceptions and Warranties */}
            <section id="excepciones-y-garantias" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                6. Exceptions and Warranties
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Special policy for order errors or defective services:</strong> Whenever it is verified that a product was delivered damaged or defective, or that an error attributable to the Agency occurred in the booking or provision of the contracted tour, a <strong>special immediate warranty policy</strong> will apply, offering at the consumer&apos;s choice: (a) priority replacement or rescheduling of the service at no cost, (b) an upgrade to a higher service category (subject to availability), or (c) a full (100%) refund of the amount paid.
                </li>
                <li>
                  <strong>Third-party supplier and manufacturer warranties:</strong> Certain components or products included in packages (such as railway services operated by PeruRail or Inca Rail, traveler assistance insurance, or third-party manufacturer equipment) carry their own supplier or manufacturer warranties and policies, which may be managed directly with said provider or with the free assistance of our customer support team.
                </li>
                <li>
                  <strong>Force majeure exceptions:</strong> In duly accredited extraordinary situations (official closure of Machu Picchu or the railway by government order, natural disasters, or serious medical emergency of the passenger supported by an official medical certificate), the Agency will prioritize open rescheduling or the recovery of unexecuted funds from the operators involved.
                </li>
              </ul>
            </section>

            {/* 7. Contact and Customer Support */}
            <section id="contacto-atencion" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                7. Contact and Customer Support
              </h2>
              <p className="text-text-light leading-relaxed mb-4">
                For any inquiry, change request, refund status check, or claim related to this policy, you may contact our Customer Support team through the following official channels:
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Merchant:</strong> {brand.legalName} (RUC: {brand.ruc})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Contact Number &amp; WhatsApp:</strong>{' '}
                    <a href={`https://wa.me/${brand.contact.cleanPhone}`} className="text-primary font-semibold hover:underline">
                      {brand.contact.phone}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Changes &amp; Returns Email:</strong>{' '}
                    <a href={`mailto:${brand.contact.email}`} className="text-primary font-semibold hover:underline">
                      {brand.contact.email}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>In-Person Support Address:</strong> {brand.contact.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Business Hours:</strong> Monday to Sunday from 07:00 to 21:00 hrs (Peru Time, GMT-5) at our commercial office | 24/7 on-route emergency support.
                  </span>
                </div>
              </div>

              {/* Related links */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/condiciones"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary bg-white hover:bg-primary/5 transition-colors"
                >
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-primary-dark">{t('termsLinkTitle')}</p>
                    <p className="text-xs text-text-light">{t('termsLinkSubtitle')}</p>
                  </div>
                </Link>
                <Link
                  href="/libro-de-reclamaciones"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary bg-white hover:bg-primary/5 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-primary-dark">{t('complaintsLinkTitle')}</p>
                    <p className="text-xs text-text-light">{t('complaintsLinkSubtitle')}</p>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        ) : (
          <div className="prose prose-gray max-w-none space-y-10 text-text-main">
            {/* 1. Introducción */}
            <section id="introduccion" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                1. Introducción
              </h2>
              <div className="space-y-3 text-text-light leading-relaxed">
                <p>
                  La presente política establece de manera clara y transparente las condiciones, plazos, requisitos y procedimientos aplicables para realizar cambios, reprogramaciones de fecha, cancelaciones y devoluciones respecto de los productos y servicios ofrecidos por <strong>{brand.legalName}</strong> (nombre comercial: <strong>{brand.name}</strong>, RUC N° <strong>{brand.ruc}</strong>).
                </p>
                <p>
                  Esta política aplica a todos los productos, paquetes turísticos, tours guiados, boletos y servicios complementarios adquiridos a través de nuestra tienda online (<a href={brand.domain} className="text-primary hover:underline font-medium">{brand.domain}</a>) y canales digitales oficiales de atención.
                </p>
              </div>
            </section>

            {/* 2. Condiciones para cambios y devoluciones */}
            <section id="condiciones" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-4">
                2. Condiciones para Cambios y Devoluciones
              </h2>

              <div className="space-y-4 text-text-light leading-relaxed">
                <div>
                  <h3 className="font-bold text-base text-primary-dark mb-2">
                    2.1. Plazos para solicitar un cambio o devolución
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Plazo para devolución completa (100%):</strong> El cliente puede solicitar la cancelación y devolución del 100% dentro de los <strong>7, 15 o hasta 30 días posteriores a la compra</strong>, siempre que la solicitud se realice con una anticipación mayor a <strong>15 días calendario antes de la fecha programada del tour</strong>.
                    </li>
                    <li>
                      <strong>Plazo para cambios de fecha / reprogramación sin costo:</strong> El cliente puede solicitar el cambio de fecha o de titularidad de su reserva sin penalidad administrativa hasta <strong>7 días calendario antes</strong> de la fecha programada del servicio (sujeto a disponibilidad de cupos y a las restricciones de boletos gubernamentales o ferroviarios ya emitidos).
                    </li>
                    <li>
                      <strong>Escala general de reembolsos según antelación a la fecha del tour:</strong>
                    </li>
                  </ul>

                  <div className="overflow-x-auto my-4">
                    <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="px-4 py-3 text-left font-bold">Plazo de antelación al inicio del servicio</th>
                          <th className="px-4 py-3 text-left font-bold">Porcentaje de reembolso aplicable</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="bg-white">
                          <td className="px-4 py-3 font-medium text-text-main">Más de 15 días calendario antes del tour</td>
                          <td className="px-4 py-3 text-green-700 font-bold">100% del importe pagado*</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-medium text-text-main">Entre 7 y 14 días calendario antes del tour</td>
                          <td className="px-4 py-3 text-yellow-700 font-bold">50% del importe pagado</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-3 font-medium text-text-main">Entre 48 horas y 6 días antes del tour</td>
                          <td className="px-4 py-3 text-orange-700 font-bold">25% del importe pagado</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-medium text-text-main">Menos de 48 horas antes o No-Show (inasistencia)</td>
                          <td className="px-4 py-3 text-red-700 font-bold">0% (Sin derecho a reembolso)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-primary-dark mb-2">
                    2.2. Estado del servicio o producto
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Para servicios y paquetes turísticos: la reserva debe encontrarse <strong>sin uso</strong> (no iniciada ni ejecutada parcial o totalmente), con sus vouchers y códigos de reserva originales vigentes y sin haber sido canjeados.
                    </li>
                    <li>
                      En caso de artículos físicos, kits de viaje o merchandising promocional adquirido o incluido: el producto debe estar <strong>estrictamente sin uso, en su empaque original sellado, con todas sus etiquetas originales y sin daños ni señales de desgaste</strong>.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-base text-primary-dark mb-2">
                    2.3. Productos y servicios NO elegibles para cambios o devoluciones
                  </h3>
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-2.5 mb-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="font-bold text-sm text-amber-900">
                        Restricciones de elegibilidad:
                      </p>
                    </div>
                    <ul className="list-disc pl-6 space-y-1.5 text-sm text-amber-950">
                      <li>
                        <strong>Boletos oficiales del Ministerio de Cultura (MINCUL) y SERNANP:</strong> Las entradas al Santuario Histórico de Machu Picchu, Huayna Picchu, Montaña Machu Picchu y permisos del Camino Inca que <strong>ya hayan sido emitidos nominalmente</strong> no admiten cambios de fecha, cambios de nombre ni devolución por disposición expresa del Estado Peruano.
                      </li>
                      <li>
                        <strong>Boletos de tren (PeruRail / Inca Rail) o pasajes aéreos ya emitidos</strong> bajo tarifas promocionales no reembolsables o fuera del plazo permitido por el operador ferroviario.
                      </li>
                      <li>
                        <strong>Productos personalizados, servicios privados diseñados a medida</strong> con reservas de terceros no reembolsables, prendas de uso personal/interior, alimentos perecibles o raciones de caminata ya adquiridas para la expedición, así como servicios en los que el pasajero no se presentó a la hora pactada (<em>No-Show</em>) o no portó su documento de identidad original.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Proceso para solicitar un cambio o devolución */}
            <section id="proceso" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                3. Proceso para Solicitar un Cambio o Devolución
              </h2>
              <p className="text-text-light leading-relaxed mb-4">
                Para gestionar cualquier solicitud de cambio de fecha, cambio de paquete o devolución, el titular de la compra debe seguir estos tres pasos:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm mb-3">
                    1
                  </span>
                  <h3 className="font-bold text-base text-primary-dark mb-2">Contacto Inicial</h3>
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                    Comunicarse con nuestro servicio de atención al cliente enviando un correo electrónico a <a href={`mailto:${brand.contact.email}`} className="text-primary font-medium hover:underline">{brand.contact.email}</a> o escribiendo al teléfono / WhatsApp <a href={`https://wa.me/${brand.contact.cleanPhone}`} className="text-primary font-medium hover:underline">{brand.contact.phone}</a>.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm mb-3">
                    2
                  </span>
                  <h3 className="font-bold text-base text-primary-dark mb-2">Solicitud Formal</h3>
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                    Completar la solicitud de devolución o cambio a través de nuestro <Link href="/contacto" className="text-primary font-medium hover:underline">formulario de atención en línea</Link> o en el cuerpo del correo con el asunto <em>&ldquo;Solicitud de Cambio / Devolución – Reserva #{brand.bookingPrefix}&rdquo;</em>.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm mb-3">
                    3
                  </span>
                  <h3 className="font-bold text-base text-primary-dark mb-2">Envío de Documentación</h3>
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                    Adjuntar la documentación requerida (y enviar el producto físico si correspondiera): <strong>código de reserva o número de pedido</strong>, copia del DNI/Pasaporte del titular, <strong>comprobante de compra/pago</strong> y fotos o capturas de respaldo del producto o servicio.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Opciones de reembolso y cambios */}
            <section id="opciones-reembolso" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                4. Opciones de Reembolso y Cambios
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-text-light leading-relaxed">
                <li>
                  <strong>Modalidades de reembolso disponibles:</strong>
                  <ul className="list-circle pl-6 mt-1.5 space-y-1.5">
                    <li>
                      <strong>Devolución de dinero:</strong> Reembolso directo al mismo medio de pago empleado en la compra original (extorno a tarjeta de crédito/débito procesada por Culqi, devolución vía Yape, reembolso a cuenta PayPal o transferencia bancaria).
                    </li>
                    <li>
                      <strong>Saldo a favor (Nota de Crédito Turística):</strong> Emisión de un bono por el 100% del monto elegible, con vigencia de <strong>12 meses</strong> para ser utilizado en cualquier fecha futura.
                    </li>
                    <li>
                      <strong>Tarjeta de regalo (Gift Card):</strong> Bono digital transferible a favor de un familiar o tercero para adquirir cualquier tour o paquete de nuestro catálogo.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Tiempo estimado para procesar el reembolso:</strong> Una vez aprobada la solicitud y verificada la documentación, <strong>{brand.legalName}</strong> procesará el reembolso dentro de un plazo de <strong>5 a 10 días hábiles</strong>. (En pagos con tarjeta de crédito o débito, el tiempo adicional en que el extorno se refleja en el estado de cuenta depende exclusivamente de los plazos operativos del banco emisor del cliente).
                </li>
                <li>
                  <strong>Opciones de cambio:</strong>
                  <ul className="list-circle pl-6 mt-1.5 space-y-1.5">
                    <li><strong>Reemplazo o reprogramación por el mismo producto/servicio:</strong> Cambio a una nueva fecha de viaje disponible sin recargo administrativo (solicitado con al menos 7 días de anticipación).</li>
                    <li><strong>Cambio por otro tour o artículo de igual valor:</strong> Sustitución del paquete contratado por otra experiencia turística de igual importe comercial.</li>
                    <li><strong>Cambio con ajuste o reembolso parcial:</strong> Si el nuevo tour elegido es de menor valor dentro del plazo de cambio permitido, se otorgará el <strong>reembolso parcial</strong> o saldo a favor por la diferencia; si es de mayor valor, el cliente solo abonará la diferencia tarifaria.</li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* 5. Costos y responsabilidad del envío */}
            <section id="costos-envio" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                5. Costos y Responsabilidad del Envío
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Cambios o devoluciones por decisión del cliente:</strong> Los costos de envío físico (en caso de devolución de productos o entrega física de tickets), así como las comisiones bancarias internacionales, gastos administrativos de operadores externos o diferencias tarifarias por cambio de temporada solicitados voluntariamente por el cliente, <strong>son de responsabilidad exclusiva del cliente</strong>, salvo error atribuible a nuestra tienda/agencia.
                </li>
                <li>
                  <strong>Errores en el pedido o servicios defectuosos:</strong> En caso de productos defectuosos, incumplimiento operativo imputable a la Agencia o errores en la emisión del pedido por parte de <strong>{brand.legalName}</strong>, el envío, reemisión de boletos, recojo y toda gestión asociada será <strong>100% gratuito para el cliente</strong>, asumiendo el Comercio la totalidad de los costos.
                </li>
              </ul>
            </section>

            {/* 6. Excepciones y garantías */}
            <section id="excepciones-y-garantias" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                6. Excepciones y Garantías
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Política especial por errores en el pedido o servicios defectuosos:</strong> Cuando se compruebe que un producto fue entregado dañado o defectuoso, o que existió un error atribuible a la Agencia en la reserva o prestación del tour contratado, se aplicará una <strong>política especial de garantía inmediata</strong> que comprende, a elección del consumidor: (a) la reposición o reprogramación prioritaria del servicio sin costo alguno, (b) un servicio de categoría superior (<em>upgrade</em> sujeto a disponibilidad), o (c) el reembolso íntegro (100%) del importe pagado.
                </li>
                <li>
                  <strong>Garantías de proveedores y fabricantes terceros:</strong> Determinados componentes o productos incluidos en los paquetes (tales como servicios ferroviarios operados por PeruRail o Inca Rail, seguros de asistencia al viajero o equipamiento de terceros fabricantes) cuentan con garantías y pólizas propias del proveedor o fabricante, las cuales pueden ser gestionadas directamente con dicho proveedor o a través del acompañamiento gratuito de nuestro equipo de soporte al cliente.
                </li>
                <li>
                  <strong>Excepciones por fuerza mayor:</strong> Ante situaciones extraordinarias debidamente acreditadas (cierre oficial de Machu Picchu o de la vía férrea por disposición gubernamental, desastres naturales o urgencia médica grave del pasajero sustentada con certificado médico oficial), la Agencia gestionará de forma prioritaria la reprogramación abierta o la recuperación de los fondos no ejecutados ante los operadores involucrados.
                </li>
              </ul>
            </section>

            {/* 7. Contacto y Atención al cliente */}
            <section id="contacto-atencion" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                7. Contacto y Atención al Cliente
              </h2>
              <p className="text-text-light leading-relaxed mb-4">
                Para cualquier consulta, solicitud de cambio, estado de reembolso o reclamo relacionado con la presente política, puede comunicarse con nuestro equipo de Atención al Cliente a través de los siguientes canales oficiales:
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Comercio:</strong> {brand.legalName} (RUC: {brand.ruc})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Número de Contacto y WhatsApp:</strong>{' '}
                    <a href={`https://wa.me/${brand.contact.cleanPhone}`} className="text-primary font-semibold hover:underline">
                      {brand.contact.phone}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Correo Electrónico de Cambios y Devoluciones:</strong>{' '}
                    <a href={`mailto:${brand.contact.email}`} className="text-primary font-semibold hover:underline">
                      {brand.contact.email}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Dirección de Atención Presencial:</strong> {brand.contact.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Horario de Atención:</strong> Lunes a Domingo de 07:00 a 21:00 hrs (Hora de Perú, GMT-5) en oficina comercial | Soporte de emergencias en ruta 24/7.
                  </span>
                </div>
              </div>

              {/* Enlaces relacionados */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/condiciones"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary bg-white hover:bg-primary/5 transition-colors"
                >
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-primary-dark">{t('termsLinkTitle')}</p>
                    <p className="text-xs text-text-light">{t('termsLinkSubtitle')}</p>
                  </div>
                </Link>
                <Link
                  href="/libro-de-reclamaciones"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary bg-white hover:bg-primary/5 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-primary-dark">{t('complaintsLinkTitle')}</p>
                    <p className="text-xs text-text-light">{t('complaintsLinkSubtitle')}</p>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
