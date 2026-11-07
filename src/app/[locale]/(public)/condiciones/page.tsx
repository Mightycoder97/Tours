import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getBrandConfig } from '@/lib/brand';
import { ShieldCheck, Building2, Phone, Mail, MapPin, Clock, FileText, BookOpen, RefreshCw, ShieldAlert, AlertTriangle } from 'lucide-react';

import { buildPageAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: 'meta.termsPage' });
  const brand = getBrandConfig();
  return {
    title: tMeta('title'),
    description: `${tMeta('description')} (${brand.legalName} — RUC ${brand.ruc}).`,
    alternates: buildPageAlternates(locale, '/condiciones'),
  };
}

export default async function CondicionesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.terms' });
  const brand = getBrandConfig();
  const isEn = locale === 'en';

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="border-b border-gray-200 pb-8 mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" /> {t('badge')}
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
            {/* 1. General Merchant Information */}
            <section id="informacion-general" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-4">
                1. General Merchant Information
              </h2>
              <p className="text-text-light leading-relaxed mb-4">
                This website (<a href={brand.domain} className="text-primary hover:underline font-medium">{brand.domain}</a>) is operated by <strong>{brand.legalName}</strong> (commercial name: <strong>{brand.name}</strong>), a travel agency and inbound tour operator legally incorporated in the Republic of Peru and duly registered with the Ministry of Foreign Trade and Tourism (MINCETUR / GERCETUR Cusco), hereinafter referred to as &ldquo;the Merchant&rdquo; or &ldquo;the Agency&rdquo;.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-light">{t('legalNameLabel')}</p>
                    <p className="font-semibold text-text-main">{brand.legalName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-light">{t('rucLabel')}</p>
                    <p className="font-semibold text-text-main">{brand.ruc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-light">{t('addressLabel')}</p>
                    <p className="font-semibold text-text-main">{brand.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-light">{t('phoneLabel')}</p>
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
                    <p className="text-xs font-bold uppercase tracking-wider text-text-light">{t('emailLabel')}</p>
                    <p className="font-semibold text-text-main break-all">
                      <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">
                        {brand.contact.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Acceptance of Terms and Conditions */}
            <section id="aceptacion" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                2. Acceptance of Terms and Conditions
              </h2>
              <div className="space-y-3 text-text-light leading-relaxed">
                <p>
                  Accessing, browsing, and using this web platform or application, as well as requesting or purchasing any of our tourist products and services, implies that the user or customer has read, understood, and <strong>fully and unconditionally accepted these Terms and Conditions</strong>.
                </p>
                <p>
                  <strong>{brand.legalName}</strong> reserves the right to update, modify, or replace any part of these Terms and Conditions at any time for legal, regulatory, operational, or commercial reasons. Updates will take effect upon publication on this website and will be duly notified to users through the corresponding channels (visible notice on the web platform and/or direct communication to the registered email address in the case of active bookings).
                </p>
              </div>
            </section>

            {/* 3. User Registration and Account */}
            <section id="registro-y-cuenta" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                3. User Registration and Account
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Truthful and mandatory information:</strong> To make purchases and bookings on the platform, the user must register during the booking process by providing truthful, accurate, current, and complete information (full first and last names exactly as they appear on their official identity document, identity document type and number —National ID / DNI, Foreigner ID Card, or Passport—, date of birth, nationality, contact phone number, and valid email address), both for the primary purchaser and for all participating passengers.
                </li>
                <li>
                  <strong>Requirements for registration and website use:</strong> To contract services or make payments on our platform, the user must be <strong>of legal age (at least 18 years old)</strong> and have full legal capacity to enter into binding contracts under Peruvian law. Minors may only be registered as passengers accompanied by their parents, legal guardians, or authorized representatives with a valid notarized travel authorization in strict compliance with Peruvian Law N° 30802 (see Section 14 for comprehensive documentation and travel permit requirements).
                </li>
                <li>
                  <strong>Account and booking confidentiality:</strong> The user is solely responsible for maintaining the confidentiality of their account, booking codes ({brand.bookingPrefix}-XXXX), electronic vouchers, and any credentials or links sent to their email address.
                </li>
                <li>
                  <strong>Liability for misuse:</strong> Any misuse of the account, booking code, or issued tickets resulting from the customer&apos;s failure to safeguard their information shall be the sole responsibility of the primary account holder. Upon detecting any unauthorized access or use, the user must notify <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">{brand.contact.email}</a> immediately.
                </li>
              </ul>
            </section>

            {/* 4. Products and Services */}
            <section id="productos-y-servicios" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                4. Products and Services
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Description of products and services offered:</strong> {brand.name} markets and operates tour packages, half-day and full-day guided tours, multi-day expeditions, adventure treks (Inca Trail, Salkantay Trek, Vinicunca Rainbow Mountain, Humantay Lake, Sacred Valley of the Incas), official admission ticket management for the Historic Sanctuary of Machu Picchu, railway transport tickets (PeruRail and Inca Rail), tourist ground transportation, professional bilingual guiding, and cultural experiences in Cusco and throughout Peru. Each tour page details the exact itinerary, duration, included services, and exclusions.
                </li>
                <li>
                  <strong>Stock and quota availability:</strong> Stock availability (daily group quotas, train seats, and official entrance tickets regulated by the Peruvian Ministry of Culture) is limited and may be subject to change or sell-out without prior notice until payment for the booking has been effectively processed and confirmed.
                </li>
                <li>
                  <strong>Sales restrictions:</strong> In accordance with the Merchant&apos;s operational policies and archaeological site regulations, sales restrictions may apply, such as minimum or maximum passenger numbers per booking, recommended ages, or physical fitness requirements for high-mountain routes (above 4,000 m / 13,120 ft a.s.l.), as well as the strictly personal and non-transferable nature of government-issued admission tickets once emitted.
                </li>
                <li>
                  <strong>Trial periods and automatic renewals:</strong> Due to the nature of fixed-date travel packages and tourist services, <strong>there are no free trial periods or subscriptions with automatic renewal or recurring billing</strong>. All notifications regarding contracted services, reminders, and itineraries are sent directly to the customer&apos;s email and WhatsApp.
                </li>
              </ul>
            </section>

            {/* 5. Prices and Payment Methods */}
            <section id="precios-y-pagos" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                5. Prices and Payment Methods
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Display currency:</strong> Prices for our products and services are clearly displayed in foreign currency (<strong>United States Dollars – USD / US$</strong>) and/or in local currency (<strong>Peruvian Soles – PEN / S/</strong>). During the Checkout process, the user views the exact amount in the selected currency before authorizing payment. When payment is processed in Peruvian Soles (PEN) for USD base fares, the Merchant&apos;s current reference exchange rate is applied and displayed on screen.
                </li>
                <li>
                  <strong>Accepted payment methods:</strong>
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li><strong>Credit and debit cards:</strong> Visa, Mastercard, American Express, and Diners Club (in USD or PEN) processed online through the <strong>Culqi</strong> payment gateway.</li>
                    <li><strong>Digital wallets:</strong> Direct payment with <strong>Yape</strong> approval code (in Peruvian Soles – PEN) through <strong>Culqi</strong>.</li>
                    <li><strong>International payments:</strong> <strong>PayPal</strong> account and associated international cards.</li>
                    <li><strong>Bank transfers:</strong> Wire transfers or deposits to our corporate bank accounts upon prior coordination with our reservations department.</li>
                  </ul>
                </li>
                <li>
                  <strong>Taxes:</strong> Published prices include applicable statutory taxes under current Peruvian tax legislation (or inbound tourism export exemptions where legally applicable), as well as all items expressly listed under <em>&ldquo;What&apos;s included in this package?&rdquo;</em> on each tour page. Personal expenses, gratuities, unspecified meals, or optional insurance are not included unless expressly stated.
                </li>
                <li>
                  <strong>Payment platform security and customer responsibility:</strong> All online payments are processed through gateways certified under the international <strong>PCI-DSS</strong> (<em>Payment Card Industry Data Security Standard</em>) with secure <strong>SSL/TLS</strong> encryption (Culqi S.A.C. and PayPal Inc.). The Merchant neither stores nor accesses full card numbers or CVV/CVC security codes. The customer is solely responsible for verifying the accuracy of the amounts before paying and holding legitimate ownership or authorization to use the selected payment method.
                </li>
              </ul>
            </section>

            {/* 6. Purchase Process */}
            <section id="proceso-de-compra" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                6. Purchase Process
              </h2>
              <p className="text-text-light leading-relaxed mb-3">
                To complete a purchase on our web platform, the user must follow these steps:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-text-light leading-relaxed mb-4">
                <li><strong>Service selection:</strong> Browse the tour catalog (<Link href="/tours" className="text-primary hover:underline">/tours</Link>), select the desired package, choose an available departure date on the calendar and the number of passengers (adults and children), and click <em>&ldquo;Book Now&rdquo;</em>.</li>
                <li><strong>Cart review:</strong> Verify the selected services and subtotal in the shopping cart (<Link href="/cart" className="text-primary hover:underline">/cart</Link>) and click <em>&ldquo;Continue to Payment&rdquo;</em>.</li>
                <li><strong>Passenger and contact registration:</strong> Complete the Checkout form (<Link href="/checkout" className="text-primary hover:underline">/checkout</Link>) with the primary contact&apos;s details (email and phone number) and the personal and identity information for each passenger.</li>
                <li><strong>Acceptance of legal conditions:</strong> Check the agreement box accepting these Terms and Conditions, the Changes and Returns Policy, and the Privacy Policy.</li>
                <li><strong>Online payment:</strong> Select the payment method (Card via Culqi, Yape, or PayPal), enter the required payment details in the secure payment window, and confirm the order.</li>
              </ol>
              <div className="space-y-3 text-text-light leading-relaxed">
                <p>
                  <strong>Order confirmation and validation:</strong> Once the charge is approved by the payment gateway, the platform automatically generates a unique booking code (e.g., <code>{brand.bookingPrefix}-XXXXXXXX</code>), redirects to the confirmation screen, and sends the electronic voucher to the customer&apos;s registered email address.
                </p>
                <p>
                  <strong>Possible grounds for cancellation by the Merchant:</strong> The Merchant reserves the right to cancel or void an order —immediately notifying the customer— in the following cases: (i) detection of a fraudulent, unauthorized, or flagged transaction by the anti-fraud controls of Culqi, PayPal, or the issuing bank; (ii) lack of effective payment confirmation; (iii) submission of false, inconsistent, or invalid identity information that prevents purchasing official nominal tickets from government entities; or (iv) supervening depletion of official Ministry of Culture quotas prior to physical/electronic ticket issuance, in which case the customer will be offered free rescheduling or a 100% refund of the amount paid.
                </p>
              </div>
            </section>

            {/* 7. Shipping and Delivery */}
            <section id="envios-y-entrega" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                7. Shipping and Delivery (Delivery of Vouchers, Tickets, and Service Execution)
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Delivery coverage and service provision:</strong>
                  <ul className="list-circle pl-6 mt-1.5 space-y-1">
                    <li><strong>Digital delivery of travel documents:</strong> National (all of Peru) and international coverage via the email address and WhatsApp number provided by the customer.</li>
                    <li><strong>In-person service and passenger pickup:</strong> Coverage in the city of Cusco (hotels located in the Historic Center and urban area), Sacred Valley, Ollantaytambo station, Machu Picchu Town (Aguas Calientes), and the meeting points specified on each tour page.</li>
                  </ul>
                </li>
                <li>
                  <strong>Estimated delivery times:</strong>
                  <ul className="list-circle pl-6 mt-1.5 space-y-1">
                    <li><strong>Booking confirmation and payment receipt:</strong> Immediate (automatic) delivery upon payment approval on the website.</li>
                    <li><strong>Final vouchers, train tickets, and official entrance tickets:</strong> Delivery within an estimated timeframe of <strong>2 to 24 business hours</strong> following purchase confirmation.</li>
                  </ul>
                </li>
                <li>
                  <strong>Shipping costs and applicable conditions:</strong> The issuance and electronic delivery of digital vouchers, tickets, and itineraries is <strong>100% free of charge (zero shipping cost)</strong>. Whenever a contracted tour includes physical ticket delivery or an in-person briefing at the passenger&apos;s hotel in the city of Cusco, such delivery also carries no additional cost.
                </li>
                <li>
                  <strong>Policy on delays and delivery issues:</strong> If due to recipient mail server issues, spam folder filtering, or an unintentional typo when entering the email address, the user does not receive their voucher within the estimated timeframe, they may contact us at any time via phone/WhatsApp at <a href={`https://wa.me/${brand.contact.cleanPhone}`} className="text-primary hover:underline">{brand.contact.phone}</a> or email at <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">{brand.contact.email}</a> to receive an immediate resend at no cost. In case of delays attributable to temporary maintenance in the ticketing systems of the Ministry of Culture or railway operators, the Agency will promptly inform the customer and guarantee ticket delivery prior to their travel date.
                </li>
              </ul>
            </section>

            {/* 8. Personal Data Protection */}
            <section id="proteccion-datos" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                8. Personal Data Protection
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Compliance with Law N° 29733:</strong> The Merchant guarantees the confidentiality, security, and proper processing of its users&apos; personal information in strict compliance with <strong>Peruvian Law N° 29733 – Personal Data Protection Law</strong> and its Regulations approved by Supreme Decree N° 003-2013-JUS.
                </li>
                <li>
                  <strong>Use and purpose of collected data:</strong> Collected personal data (names, identity documents, date of birth, nationality, phone number, and email address) is used exclusively to: manage and execute bookings for contracted tours, issue nominal tickets with the Ministry of Culture, SERNANP, and railway operators (PeruRail / Inca Rail), send travel confirmations and vouchers, comply with tax obligations before SUNAT and regulatory obligations before MINCETUR, handle inquiries or claims, and —only if expressly authorized by the user— send promotional communications.
                </li>
                <li>
                  <strong>User rights over their information (ARCO Rights) and how to exercise them:</strong> Personal data holders have the right to request <strong>Access, Rectification, Cancellation, and Opposition (ARCO)</strong> regarding their personal data at any time, as well as to revoke their consent. To exercise these rights free of charge, the user must send an email to <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">{brand.contact.email}</a> stating their request and attaching a simple copy of their identity document. Full details can be reviewed in our <Link href="/politicas" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
                </li>
              </ul>
            </section>

            {/* 9. Intellectual Property */}
            <section id="propiedad-intelectual" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                9. Intellectual Property
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Copyright and trademark protection:</strong> All content hosted on this website —including logos, trademarks (<strong>{brand.name}</strong>), domain names, photographs, videos, descriptive texts, itineraries, graphics, interface design, and source code— is the exclusive property of <strong>{brand.legalName}</strong> or its respective licensors, and is protected by Peruvian Copyright and Industrial Property legislation (Legislative Decree N° 822 and Legislative Decree N° 1075, enforced by INDECOPI) and international treaties.
                </li>
                <li>
                  <strong>Restrictions on the use of published information:</strong> Any reproduction, copying, modification, distribution, transmission, republication, automated data scraping, or total or partial commercial use of the content published on this platform without the prior, express, and written authorization of <strong>{brand.legalName}</strong> is strictly prohibited. Use of the website does not grant the user any right or license over the Merchant&apos;s trademarks or content.
                </li>
              </ul>
            </section>

            {/* 10. Liability and Limitations */}
            <section id="responsabilidad-y-limitaciones" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                10. Liability and Limitations
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Website technical failures:</strong> The Merchant implements security and continuous availability measures on its platform; however, it is not liable for temporary interruptions of web service, internet network delays, failures in the user&apos;s devices or browsers, or technical incidents in third-party servers beyond its reasonable control.
                </li>
                <li>
                  <strong>Proper use of purchased products and services:</strong> It is the responsibility of the customer and all passengers to make proper use of the contracted services, arrive punctually at the agreed pickup location and time, carry their <strong>original physical identity document</strong> (National ID / DNI, Foreigner ID Card, or valid Passport used to issue the tickets), respect the official visiting rules of the Historic Sanctuary of Machu Picchu, and follow the safety instructions of official tour guides. Furthermore, the traveler declares to be in suitable health conditions for the selected tour.
                </li>
                <li>
                  <strong>Liability limits for events beyond the Merchant&apos;s control:</strong> <strong>{brand.legalName}</strong> assumes no direct liability for damages, losses, delays, route closures, or cancellations caused by <strong>fortuitous events or force majeure</strong> beyond the Agency&apos;s control (such as natural disasters, heavy rainfall, landslides, strikes, civil protests, road or railway blockades, government orders, unexpected closure of archaeological sites by State mandate, or operational delays of railway or airline companies). In such scenarios, the Agency will provide immediate assistance to the passenger and manage rescheduling or refund options in accordance with our <Link href="/cambios-y-devoluciones" className="text-primary hover:underline font-medium">Changes and/or Returns Policy</Link>.
                </li>
              </ul>

              {/* Cancellation Scale Summary */}
              <div className="mt-6">
                <h3 className="font-bold text-base text-primary-dark mb-2">
                  Cancellation and Refund Scale (Summary)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">Advance notice of request</th>
                        <th className="px-4 py-3 text-left font-bold">Refund percentage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-white">
                        <td className="px-4 py-3">More than 15 calendar days before the tour</td>
                        <td className="px-4 py-3 text-green-700 font-semibold">100% of the amount paid*</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3">Between 7 and 14 calendar days before the tour</td>
                        <td className="px-4 py-3 text-yellow-700 font-semibold">50% of the amount paid</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-4 py-3">Between 48 hours and 6 days before the tour</td>
                        <td className="px-4 py-3 text-orange-700 font-semibold">25% of the amount paid</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3">Less than 48 hours before or No-Show</td>
                        <td className="px-4 py-3 text-red-700 font-semibold">0% (No refund)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-text-light mt-2">
                  *Except Ministry of Culture admission tickets (Machu Picchu / Inca Trail) or non-refundable train tickets that have already been nominally issued. Review full details in our <Link href="/cambios-y-devoluciones" className="text-primary hover:underline font-medium">Changes and/or Returns Policy</Link>.
                </p>
              </div>
            </section>

            {/* 11. Applicable Law and Dispute Resolution */}
            <section id="legislacion-y-conflictos" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                11. Applicable Law and Dispute Resolution
              </h2>
              <ul className="list-disc pl-6 space-y-2.5 text-text-light leading-relaxed">
                <li>
                  <strong>Applicable law:</strong> This document, as well as all bookings, purchases, and services contracted through this platform, are governed by and construed in accordance with the <strong>laws in force in the Republic of Peru</strong>, including the Peruvian Civil Code and the Consumer Protection and Defense Code (Law N° 29571).
                </li>
                <li>
                  <strong>Dispute resolution:</strong> Any controversy, discrepancy, or claim arising in connection with the interpretation or performance of these Terms and Conditions shall be resolved in the first instance through direct negotiation or conciliation between the user and the Merchant. Failing agreement, disputes shall be resolved through authorized conciliation centers, before the <strong>National Institute for the Defense of Competition and the Protection of Intellectual Property (INDECOPI)</strong>, or before the competent courts of the judicial district of <strong>Cusco, Peru</strong>.
                </li>
              </ul>
            </section>

            {/* 12. Contact and Support */}
            <section id="contacto-y-soporte" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3">
                12. Contact and Support
              </h2>
              <p className="text-text-light leading-relaxed mb-4">
                In case of any inquiry, assistance request, change, refund, or claim regarding our services or these Terms and Conditions, our official customer support channels are at your disposal:
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Support Phone &amp; WhatsApp:</strong>{' '}
                    <a href={`https://wa.me/${brand.contact.cleanPhone}`} className="text-primary font-semibold hover:underline">
                      {brand.contact.phone}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Support Email Address:</strong>{' '}
                    <a href={`mailto:${brand.contact.email}`} className="text-primary font-semibold hover:underline">
                      {brand.contact.email}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Office Address:</strong> {brand.contact.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Business Hours:</strong> Monday to Sunday from 07:00 to 21:00 hrs (Peru Time, GMT-5) at our commercial office | 24/7 online assistance for passengers with an active booking.
                  </span>
                </div>
              </div>

              {/* Quick links to complementary legal pages */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/cambios-y-devoluciones"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary bg-white hover:bg-primary/5 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-primary-dark">{t('returnsLinkTitle')}</p>
                    <p className="text-xs text-text-light">{t('returnsLinkSubtitle')}</p>
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

            {/* 13. Prevention of Commercial Sexual Exploitation of Children and Adolescents (ESNNA) */}
            <section id="prevencion-esnna" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3 flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-primary shrink-0" />
                13. Prevention of Commercial Sexual Exploitation of Children and Adolescents (ESNNA) in Tourism
              </h2>
              
              {/* Verbatim Statutory Bilingual Declaration */}
              <div className="bg-primary/5 border-2 border-primary/30 rounded-2xl p-5 sm:p-6 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-primary text-white text-[11px] font-bold uppercase tracking-wider rounded-full">
                    Official Statutory Statement (R.M. N° 108-2020-MINCETUR / Ley N° 29408)
                  </span>
                </div>
                <blockquote className="font-serif text-base sm:text-lg text-primary-dark font-bold italic leading-relaxed my-3 border-l-4 border-primary pl-4">
                  &ldquo;IN THIS TRAVEL AGENCY, WE DO NOT PROMOTE OR PERMIT THE SEXUAL EXPLOITATION OF GIRLS, CHILDREN AND TEENAGERS, NOR ANY OTHER CRIME OF WHICH WE TAKE KNOWLEDGE IN DEVELOPMENT OF OUR ACTIVITY, ACCORDING TO LAW N° 29408.&rdquo;
                </blockquote>
                <blockquote className="font-serif text-sm sm:text-base text-gray-700 italic leading-relaxed pl-4 border-l-4 border-gray-300">
                  &ldquo;EN ESTA AGENCIA NO PROMOVEMOS NI PERMITIMOS LA EXPLOTACIÓN SEXUAL DE NIÑAS, NIÑOS Y ADOLESCENTES, NI CUALQUIER OTRO ILÍCITO PENAL DEL CUAL TOMEMOS CONOCIMIENTO EN EL DESARROLLO DE NUESTRA ACTIVIDAD, CONFORME A LO DISPUESTO EN LA LEY N° 29408.&rdquo;
                </blockquote>
                <p className="text-xs text-text-light mt-3">
                  Approved by Ministerial Resolution N° 108-2020-MINCETUR pursuant to Articles 43 and 44 of Peruvian General Tourism Law N° 29408 and Supreme Decree N° 005-2020-MINCETUR (Art. 17.2).
                </p>
              </div>

              <ul className="list-disc pl-6 space-y-3 text-text-light leading-relaxed">
                <li>
                  <strong>Zero-Tolerance Policy:</strong> <strong>{brand.legalName}</strong> maintains an uncompromising, zero-tolerance policy regarding the Commercial Sexual Exploitation of Children and Adolescents (ESNNA), child pornography, child labor, human trafficking, and any related offense in the course of tourist operations. Any client, passenger, employee, contractor, guide, or transport driver who promotes, facilitates, tolerates, or engages in actions contrary to the protection of minors will face immediate cancellation of all services without right to refund, immediate removal from the tour group, and immediate referral to Peruvian law enforcement authorities.
                </li>
                <li>
                  <strong>Civic and Statutory Duty to Report:</strong> In accordance with Article 44 of Law N° 29408, our personnel, operations team, and licensed guides are strictly trained and obligated to report immediately to the competent police and judicial authorities any suspected situation, risk, solicitation, or flagrant act of ESNNA. Travelers and third parties who observe suspicious situations are strongly urged to notify agency staff or report directly through the official national hotlines.
                </li>
                <li>
                  <strong>Severe Penal Sanctions under Law N° 30963:</strong> Pursuant to Peruvian Law N° 30963 modifying the Peruvian Penal Code, offenses of sexual exploitation of children and adolescents, promotion of child sexual tourism, distribution of child sexual abuse material, and trafficking of persons carry severe custodial prison sentences ranging from <strong>15 to 25 years of imprisonment, or life imprisonment (cadena perpetua)</strong> under aggravating circumstances.
                </li>
                <li>
                  <strong>Statutory Legal Framework:</strong> This policy is executed in strict adherence to:
                  <ul className="list-circle pl-6 mt-1.5 space-y-1 text-xs sm:text-sm">
                    <li><strong>Law N° 29408</strong> — General Tourism Law (Articles 43 and 44).</li>
                    <li><strong>Supreme Decree N° 003-2010-MINCETUR</strong> — Regulations of the General Tourism Law.</li>
                    <li><strong>Supreme Decree N° 005-2020-MINCETUR</strong> — Travel and Tourism Agencies Regulations (Art. 17.2).</li>
                    <li><strong>Ministerial Resolution N° 108-2020-MINCETUR</strong> — Official National Counter-ESNNA Display Poster and Mandatory Text.</li>
                    <li><strong>Law N° 30963</strong> — Criminal Code Amendments regarding Severe Penal Sanctions for Child Exploitation.</li>
                    <li><strong>Law N° 30802</strong> — Law Establishing Safeguard Conditions for Minors Entering Lodging and Tourist Transport.</li>
                  </ul>
                </li>
              </ul>

              {/* Official 24-Hour Hotlines */}
              <div className="mt-6">
                <h3 className="font-bold text-base text-primary-dark mb-3">
                  Official 24-Hour Free Emergency Reporting Hotlines (Peru)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-text-main">Línea 100 (MIMP)</p>
                      <p className="text-xs text-text-light mb-1">Ministry of Women and Vulnerable Populations. Free 24/7 national helpline from any telephone for orientation and protection against violence and child sexual abuse.</p>
                      <a href="tel:100" className="inline-flex items-center text-xs font-bold text-primary hover:underline">
                        Call Línea 100 &rarr;
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-text-main">Línea 1818 (MININTER)</p>
                      <p className="text-xs text-text-light mb-1">Ministry of the Interior — Specialized Single Reporting Center for Human Trafficking and Child Exploitation. Free, anonymous, and confidential 24/7.</p>
                      <a href="tel:1818" className="inline-flex items-center text-xs font-bold text-primary hover:underline">
                        Call Línea 1818 &rarr;
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-text-main">Central 105 (PNP)</p>
                      <p className="text-xs text-text-light mb-1">National Police of Peru — Immediate Emergency and Police Intervention Dispatch. 24 hours a day nationwide.</p>
                      <a href="tel:105" className="inline-flex items-center text-xs font-bold text-primary hover:underline">
                        Call PNP 105 &rarr;
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-text-main">POLTUR Cusco (Tourism Police)</p>
                      <p className="text-xs text-text-light mb-1">Specialized Tourism Police Division in Cusco. Direct tourist assistance and rapid response on tourist routes.</p>
                      <div className="flex gap-3 mt-1">
                        <a href="tel:+5184249769" className="text-xs font-bold text-primary hover:underline">+51 (84) 249769</a>
                        <span className="text-gray-300">|</span>
                        <a href="tel:+5184235123" className="text-xs font-bold text-primary hover:underline">+51 (84) 235123</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 14. Requirements and Documentation for Minor Passengers (Law N° 30802) */}
            <section id="menores-de-edad" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                14. Requirements, Travel Authorizations, and Documentation for Minor Passengers (Law N° 30802)
              </h2>
              <p className="text-text-light leading-relaxed mb-4">
                To guarantee the physical integrity, legal safety, and custody of children and adolescents traveling within the national territory, <strong>{brand.legalName}</strong> strictly enforces the provisions of <strong>Peruvian Law N° 30802</strong> (Law establishing mandatory conditions for the entry and transport of minors into tourist lodging establishments and passenger transport services) as well as Ministry of Transport regulations (Supreme Decree N° 017-2009-MTC and SUTRAN directives).
              </p>

              <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-5 sm:p-6 mb-6">
                <h3 className="font-bold text-base text-amber-950 flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  Mandatory Identification Rules for Minor Passengers
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <li>
                    <strong>Definition of Minor:</strong> Any person under eighteen (18) years of age on the date of travel is legally considered a minor under Peruvian jurisdiction.
                  </li>
                  <li>
                    <strong>Mandatory Original Physical Documents:</strong> All minor passengers must present their <strong>original physical identity document</strong> at every operational checkpoint. Digital screenshots, mobile device photos, or simple photocopies are strictly prohibited and will be rejected by railway staff, tourist bus staff, and government gate inspectors:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li><strong>Peruvian minors:</strong> Original physical National Identity Document (DNI amarillo or DNI azul depending on age).</li>
                      <li><strong>Foreign minors:</strong> Original valid physical Passport (and Virtual Andean Migration Card TAM Virtual when requested by immigration or supervisory authorities).</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <ul className="list-disc pl-6 space-y-3 text-text-light leading-relaxed">
                <li>
                  <strong>Rules on Accompanying Adults &amp; Mandatory Travel Authorizations:</strong>
                  <ul className="list-circle pl-6 mt-1.5 space-y-2">
                    <li>
                      <strong>Traveling accompanied by BOTH parents:</strong> Both parents must travel with the minor, carry their own matching original physical identity documents, and present proof of parentage (the minor&apos;s DNI indicating parental names or an official birth certificate).
                    </li>
                    <li>
                      <strong>Traveling accompanied by ONLY ONE parent:</strong> In accordance with Peruvian Law, the traveling parent must present an original <strong>Notarized Travel Authorization (<em>Autorización Notarial de Viaje</em>)</strong> granted by the non-traveling parent before a Peruvian notary public. If the non-traveling parent resides abroad, the authorization must be executed before a Peruvian Consular Office and, where applicable, apostilled or legalized by the Peruvian Ministry of Foreign Affairs (RREE).
                    </li>
                    <li>
                      <strong>Traveling accompanied by legal guardians, relatives, third parties, or school/tour groups:</strong> The accompanying adult must hold an original <strong>Notarized Travel Authorization (<em>Autorización Notarial de Viaje</em>)</strong> signed by BOTH parents (or by the legal guardian holding custody), expressly designating the accompanying guardian, specifying travel dates, destinations (Cusco, Sacred Valley, Machu Picchu), and transport modes.
                    </li>
                    <li>
                      <strong>Judicial Travel Authorization:</strong> In cases of absent parent, parental death (supported by official death certificate), loss/suspension of parental authority (patria potestad), or ongoing custody disputes, an official Judicial Travel Authorization issued by a Peruvian Family Court judge must be presented.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Transport and Accommodation Carrier Enforcement:</strong>
                  <ul className="list-circle pl-6 mt-1.5 space-y-2">
                    <li>
                      <strong>Railway Operators (Inca Rail &amp; PeruRail):</strong> Rail companies in Peru execute strict document checks at station boarding gates (Poroy, Ollantaytambo, Urubamba, Machu Picchu Pueblo). Minors without original physical IDs and required notarial permits are legally denied boarding without exception.
                    </li>
                    <li>
                      <strong>Citadel Bus Transfer (Consettur):</strong> Identity verification is carried out prior to boarding shuttle buses traveling the Hiram Bingham highway between Aguas Calientes and the Machu Picchu citadel.
                    </li>
                    <li>
                      <strong>Machu Picchu Sanctuary &amp; Inca Trail Network (MINCUL / SERNANP):</strong> Government checkpoints inspect nominal tickets against physical original documents. Passengers lacking required documents are denied entrance to the archaeological sanctuary.
                    </li>
                    <li>
                      <strong>Hotels and Tourist Lodging Establishments:</strong> Under Law N° 30802, all hotels and hostels in Peru are legally mandated to register the relationship of accompanying adults with minors and verify notarial authorizations before providing lodging.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Agency Disclaimer of Liability &amp; Exclusion of Refunds:</strong>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2 text-xs sm:text-sm text-text-main">
                    <p className="leading-relaxed mb-2">
                      <strong>{brand.legalName}</strong> acts solely as a compliant travel agency and operator. It is the sole, exclusive, and non-delegable responsibility of the contracting client, purchasing user, and accompanying adults to verify, obtain, and physically carry all required original identity documents and valid Notarized or Judicial Travel Authorizations.
                    </p>
                    <p className="leading-relaxed">
                      If any passenger or minor is denied boarding on transport (railway, bus, or road transfer), refused check-in at lodging establishments, or barred from entering the Machu Picchu Historic Sanctuary or Inca Trail by supervisory authorities or carriers due to missing, invalid, or photocopy-only documentation, <strong>the Agency disclaims all direct and indirect liability</strong>. Under such circumstances, all contracted services, transportation tickets, and government admission tickets shall be deemed forfeited and <strong>strictly non-refundable</strong>, and any auxiliary accommodation, return transport, or rebooking costs shall remain the sole financial responsibility of the customer.
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        ) : (
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
                    <p className="text-xs font-bold uppercase tracking-wider text-text-light">{t('legalNameLabel')}</p>
                    <p className="font-semibold text-text-main">{brand.legalName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-light">{t('rucLabel')}</p>
                    <p className="font-semibold text-text-main">{brand.ruc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-light">{t('addressLabel')}</p>
                    <p className="font-semibold text-text-main">{brand.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-light">{t('phoneLabel')}</p>
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
                    <p className="text-xs font-bold uppercase tracking-wider text-text-light">{t('emailLabel')}</p>
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
                  <strong>Requisitos para el registro y uso de la web:</strong> Para contratar servicios o efectuar pagos en nuestra plataforma, el usuario debe ser <strong>mayor de edad (mínimo 18 años cumplidos)</strong> y contar con plena capacidad legal para celebrar contratos conforme a la legislación peruana. Los menores de edad únicamente pueden ser registrados como pasajeros acompañados por sus padres, tutores legales o apoderados con autorización notarial vigente, en estricto cumplimiento de la Ley N° 30802 (ver requisitos detallados y autorizaciones en la Sección 14).
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
                    <p className="font-bold text-sm text-primary-dark">{t('returnsLinkTitle')}</p>
                    <p className="text-xs text-text-light">{t('returnsLinkSubtitle')}</p>
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

            {/* 13. Prevención de la Explotación Sexual de Niñas, Niños y Adolescentes (ESNNA) */}
            <section id="prevencion-esnna" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3 flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-primary shrink-0" />
                13. Prevención de la Explotación Sexual de Niñas, Niños y Adolescentes (ESNNA) en el Ámbito del Turismo
              </h2>

              {/* Declaración Estatutaria Verbatim Oficial */}
              <div className="bg-primary/5 border-2 border-primary/30 rounded-2xl p-5 sm:p-6 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-primary text-white text-[11px] font-bold uppercase tracking-wider rounded-full">
                    Declaración Oficial Obligatoria (R.M. N° 108-2020-MINCETUR / Ley N° 29408)
                  </span>
                </div>
                <blockquote className="font-serif text-base sm:text-lg text-primary-dark font-bold italic leading-relaxed my-3 border-l-4 border-primary pl-4">
                  &ldquo;EN ESTA AGENCIA NO PROMOVEMOS NI PERMITIMOS LA EXPLOTACIÓN SEXUAL DE NIÑAS, NIÑOS Y ADOLESCENTES, NI CUALQUIER OTRO ILÍCITO PENAL DEL CUAL TOMEMOS CONOCIMIENTO EN EL DESARROLLO DE NUESTRA ACTIVIDAD, CONFORME A LO DISPUESTO EN LA LEY N° 29408.&rdquo;
                </blockquote>
                <blockquote className="font-serif text-sm sm:text-base text-gray-700 italic leading-relaxed pl-4 border-l-4 border-gray-300">
                  &ldquo;IN THIS TRAVEL AGENCY, WE DO NOT PROMOTE OR PERMIT THE SEXUAL EXPLOITATION OF GIRLS, CHILDREN AND TEENAGERS, NOR ANY OTHER CRIME OF WHICH WE TAKE KNOWLEDGE IN DEVELOPMENT OF OUR ACTIVITY, ACCORDING TO LAW N° 29408.&rdquo;
                </blockquote>
                <p className="text-xs text-text-light mt-3">
                  Aprobado por Resolución Ministerial N° 108-2020-MINCETUR en cumplimiento de los artículos 43 y 44 de la Ley General de Turismo N° 29408 y el D.S. N° 005-2020-MINCETUR (Art. 17.2).
                </p>
              </div>

              <ul className="list-disc pl-6 space-y-3 text-text-light leading-relaxed">
                <li>
                  <strong>Política de Tolerancia Cero:</strong> <strong>{brand.legalName}</strong> mantiene una estricta política de tolerancia cero frente a la Explotación Sexual de Niñas, Niños y Adolescentes (ESNNA), pornografía infantil, trabajo forzoso infantil, trata de personas y cualquier otro delito que atente contra los derechos de los menores. Cualquier cliente, pasajero, colaborador, guía, conductor o proveedor que promueva, facilite, tolere o cometa actos vinculados a la ESNNA será objeto de la cancelación inmediata y definitiva de sus servicios sin derecho a reembolso alguno, su expulsión del tour y la denuncia inmediata ante las autoridades policiales y judiciales correspondientes.
                </li>
                <li>
                  <strong>Deber Cívico y Legal de Denuncia Inmediata:</strong> Conforme al artículo 44 de la Ley N° 29408, nuestro personal, equipo de operaciones y guías oficiales de turismo se encuentran debidamente instruidos y obligados a denunciar de inmediato ante las autoridades competentes cualquier situación de riesgo, indicio o flagrancia de ESNNA de la que tomen conocimiento. Se exhorta a los pasajeros y al público en general a denunciar de inmediato cualquier situación irregular a través de las líneas gratuitas nacionales.
                </li>
                <li>
                  <strong>Sanciones Penales Severas bajo la Ley N° 30963:</strong> En aplicación de la Ley N° 30963 que modificó el Código Penal peruano, los delitos de explotación sexual de niñas, niños y adolescentes, promoción del turismo sexual infantil, pornografía infantil y trata de personas son sancionados con <strong>penas privativas de la libertad de 15 a 25 años o cadena perpetua</strong> en circunstancias agravadas.
                </li>
                <li>
                  <strong>Marco Legal y Normativo Sectorial:</strong> Esta política se ejecuta en estricta conformidad con:
                  <ul className="list-circle pl-6 mt-1.5 space-y-1 text-xs sm:text-sm">
                    <li><strong>Ley N° 29408</strong> — Ley General de Turismo (Artículos 43 y 44).</li>
                    <li><strong>Decreto Supremo N° 003-2010-MINCETUR</strong> — Reglamento de la Ley General de Turismo.</li>
                    <li><strong>Decreto Supremo N° 005-2020-MINCETUR</strong> — Reglamento de Agencias de Viajes y Turismo (Art. 17.2).</li>
                    <li><strong>Resolución Ministerial N° 108-2020-MINCETUR</strong> — Modelo oficial del afiche y texto obligatorio contra la ESNNA.</li>
                    <li><strong>Ley N° 30963</strong> — Modificatoria del Código Penal respecto a penas privativas para la explotación sexual infantil.</li>
                    <li><strong>Ley N° 30802</strong> — Ley que establece condiciones para el ingreso de menores a hospedajes y transporte turístico.</li>
                  </ul>
                </li>
              </ul>

              {/* Líneas Oficiales de Denuncia 24 Horas */}
              <div className="mt-6">
                <h3 className="font-bold text-base text-primary-dark mb-3">
                  Líneas Telefónicas Oficiales Gratuitas de Denuncia 24 Horas (Perú)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-text-main">Línea 100 (MIMP)</p>
                      <p className="text-xs text-text-light mb-1">Ministerio de la Mujer y Poblaciones Vulnerables. Atención gratuita 24/7 a nivel nacional desde cualquier teléfono para orientación y denuncia contra la violencia y explotación sexual de menores.</p>
                      <a href="tel:100" className="inline-flex items-center text-xs font-bold text-primary hover:underline">
                        Llamar a Línea 100 &rarr;
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-text-main">Línea 1818 (MININTER)</p>
                      <p className="text-xs text-text-light mb-1">Ministerio del Interior — Central Única de Denuncias contra la Trata de Personas y Explotación Sexual. Gratuita, anónima y confidencial las 24 horas.</p>
                      <a href="tel:1818" className="inline-flex items-center text-xs font-bold text-primary hover:underline">
                        Llamar a Línea 1818 &rarr;
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-text-main">Central 105 (PNP)</p>
                      <p className="text-xs text-text-light mb-1">Policía Nacional del Perú — Central de Emergencias e Intervención Policial Inmediata las 24 horas del día a nivel nacional.</p>
                      <a href="tel:105" className="inline-flex items-center text-xs font-bold text-primary hover:underline">
                        Llamar a PNP 105 &rarr;
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-text-main">POLTUR Cusco (Policía de Turismo)</p>
                      <p className="text-xs text-text-light mb-1">División de Policía de Turismo de Cusco. Asistencia especializada y atención inmediata en circuitos turísticos de la región.</p>
                      <div className="flex gap-3 mt-1">
                        <a href="tel:+5184249769" className="text-xs font-bold text-primary hover:underline">+51 (84) 249769</a>
                        <span className="text-gray-300">|</span>
                        <a href="tel:+5184235123" className="text-xs font-bold text-primary hover:underline">+51 (84) 235123</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 14. Requisitos y Documentación para Pasajeros Menores de Edad (Ley N° 30802) */}
            <section id="menores-de-edad" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-primary-dark mb-3 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                14. Requisitos, Autorizaciones de Viaje y Documentación para Pasajeros Menores de Edad (Ley N° 30802)
              </h2>
              <p className="text-text-light leading-relaxed mb-4">
                Con el objeto de garantizar la protección integral, la custodia legal y la seguridad de niñas, niños y adolescentes en el territorio peruano, <strong>{brand.legalName}</strong> da estricto cumplimiento a las disposiciones de la <strong>Ley N° 30802</strong> (Ley que establece condiciones para el ingreso de niñas, niños y adolescentes a establecimientos de hospedaje y transporte turístico) y a la normativa sectorial de transportes (D.S. N° 017-2009-MTC y directivas de la SUTRAN).
              </p>

              <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-5 sm:p-6 mb-6">
                <h3 className="font-bold text-base text-amber-950 flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  Reglas Obligatorias de Identificación para Menores de Edad
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <li>
                    <strong>Definición legal de menor de edad:</strong> Toda persona menor de dieciocho (18) años a la fecha de ejecución del viaje es considerada jurídicamente menor de edad bajo la legislación peruana.
                  </li>
                  <li>
                    <strong>Documento de Identidad Físico Original Obligatorio:</strong> Todo menor de edad debe portar y exhibir su <strong>documento de identidad físico original</strong> en cada punto de control. Queda terminantemente prohibido el uso de fotocopias simples, imágenes en teléfonos móviles o capturas de pantalla, las cuales serán rechazadas por las empresas ferroviarias, de buses turísticos y las autoridades del Estado:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li><strong>Menores de nacionalidad peruana:</strong> Documento Nacional de Identidad (DNI) físico original (amarillo o azul según la edad).</li>
                      <li><strong>Menores de nacionalidad extranjera:</strong> Pasaporte físico original vigente (y Tarjeta Andina de Migración TAM Virtual cuando sea requerida por las autoridades migratorias o de control).</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <ul className="list-disc pl-6 space-y-3 text-text-light leading-relaxed">
                <li>
                  <strong>Reglas sobre Adultos Acompañantes y Autorizaciones Notariales Obligatorias:</strong>
                  <ul className="list-circle pl-6 mt-1.5 space-y-2">
                    <li>
                      <strong>Viaje en compañía de AMBOS padres:</strong> Ambos progenitores deben viajar junto al menor, portar sus respectivos documentos de identidad físicos originales y acreditar el vínculo de filiación (DNI del menor donde figuren los nombres de los padres o partida de nacimiento oficial).
                    </li>
                    <li>
                      <strong>Viaje en compañía de SOLO UNO de los padres:</strong> Conforme a la legislación peruana, el progenitor acompañante debe presentar obligatoriamente la <strong>Autorización Notarial de Viaje</strong> original otorgada por el padre o madre que no viaja ante un notario público peruano. Si el progenitor ausente reside en el extranjero, la autorización debe otorgarse ante el Consulado Peruano correspondiente y estar legalizada/apostillada ante el Ministerio de Relaciones Exteriores (RREE).
                    </li>
                    <li>
                      <strong>Viaje en compañía de tutores, familiares, terceros o delegaciones:</strong> El adulto acompañante debe portar la <strong>Autorización Notarial de Viaje</strong> original otorgada por AMBOS progenitores (o por el tutor que ostente la custodia legal), designando expresamente al adulto responsable y detallando fechas, ruta del viaje (Cusco, Valle Sagrado, Machu Picchu) y medios de transporte.
                    </li>
                    <li>
                      <strong>Autorización Judicial de Viaje:</strong> En casos de fallecimiento de uno de los padres (acreditado con acta de defunción original), suspensión de la patria potestad o controversia judicial, deberá presentarse la Autorización Judicial de Viaje expedida por el Juzgado de Familia competente.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Fiscalización y Control en Transportes, Hoteles y Monumentos:</strong>
                  <ul className="list-circle pl-6 mt-1.5 space-y-2">
                    <li>
                      <strong>Empresas Ferroviarias (Inca Rail y PeruRail):</strong> Realizan control estricto de documentos físicos originales en las salas de embarque de las estaciones (Poroy, Ollantaytambo, Urubamba, Machu Picchu Pueblo). Los menores que no cuenten con su documento original y la autorización notarial requerida no podrán abordar el tren bajo ninguna circunstancia.
                    </li>
                    <li>
                      <strong>Buses a la Ciudadela de Machu Picchu (Consettur):</strong> Verifican la identidad y edad del menor antes de autorizar el abordaje de los buses que ascienden por la carretera Hiram Bingham.
                    </li>
                    <li>
                      <strong>Santuario Histórico de Machu Picchu y Red de Caminos Inca (MINCUL / SERNANP):</strong> Los puestos de control oficial verifican los boletos nominales contra los documentos físicos originales. El ingreso es denegado si la documentación no coincide o no se presenta en físico.
                    </li>
                    <li>
                      <strong>Establecimientos de Hospedaje y Hoteles:</strong> Por mandato de la Ley N° 30802, todo hospedaje turístico en el Perú está obligado por ley a registrar la filiación de los adultos acompañantes con los menores y verificar la autorización notarial correspondiente al momento del check-in.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Exención de Responsabilidad de la Agencia y Pérdida de Reembolsos:</strong>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2 text-xs sm:text-sm text-text-main">
                    <p className="leading-relaxed mb-2">
                      <strong>{brand.legalName}</strong> actúa exclusivamente como agencia de viajes y operadora turística formal. Es responsabilidad exclusiva, indelegable y obligatoria del cliente contratante y de los adultos acompañantes tramitar, verificar y portar físicamente todos los documentos originales de identidad y las Autorizaciones Notariales o Judiciales de Viaje exigidas por ley.
                    </p>
                    <p className="leading-relaxed">
                      En caso de que a un pasajero menor de edad se le impida el embarque en transportes ferroviarios, terrestres o aéreos, se le deniegue el registro en hoteles o se le prohíba el ingreso a Machu Picchu o Caminos Inca por falta, invalidez, vencimiento o tenencia únicamente de copias o fotos de la documentación exigida, <strong>la Agencia queda totalmente exonerada de toda responsabilidad civil, penal o económica</strong>. En dicho supuesto, se perderá el 100% de los servicios y boletos contratados sin derecho a reembolso o compensación alguna, debiendo el cliente asumir cualquier gasto extraordinario de transporte, alojamiento o reprogramación.
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
