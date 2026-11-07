# MASTER LEGAL COMPLIANCE & STATUTORY IMPLEMENTATION PLAN
## Peruvian Tourism, Consumer Protection & Child Safeguards Regulatory Framework

**Document Version**: 1.0.0-PROD  
**Authoritative Status**: Official Architectural & Statutory Master Plan  
**Target Enterprise**: Machu Picchu Travel Adventure E.I.R.L. (Secondary Tenant: Sonqo Perú Travel E.I.R.L. — RUC `20616667549`)  
**R.U.C.**: `20564458385` (Tenant Sonqo: `20616667549`)  
**Commercial Registry & Fiscal Domicile**: Av. El Sol 123, Centro Histórico, Cusco, Perú (Tenant Sonqo: Cal. Fernando Túpac Amaru Mz. LL Lote 3, Urb. Túpac Amaru, Cusco, Perú)  
**Target Jurisdiction**: República del Perú — MINCETUR, GERCETUR Cusco, INDECOPI, MTC/SUTRAN, MIMP/MININTER, ANPDP-MINJUSDH  
**Platform Architecture**: Next.js 16.2.1 App Router (`src/app/[locale]/(public)`), React 19.2.4, TypeScript Strict, `next-intl` (Bilingual: `es`, `en`)  
**Scope**: Inbound & Adventure Tourism Digital Channel (`machupicchutravel.com` / `sonqoperutravel.com`)

---

## 1. Executive Summary & Regulatory Authority Matrix

### 1.1 Executive Summary

Operating an e-commerce platform and digital sales channel for inbound and adventure tourism services in the Cusco region and the Historic Sanctuary of Machu Picchu entails strict legal accountability under Peruvian statutory frameworks. Digital travel agencies (*Agencias de Viajes y Turismo que operan mediante Canales Digitales*) are not exempt from sector-specific duties; on the contrary, national decrees and regional directives classify digital booking platforms as licensed commercial establishments subject to rigorous commercial disclosure, consumer rights enforcement, child sexual exploitation prevention, and minor passenger verification.

Failure to adhere to these mandates exposes the legal entity, its titular manager, and the web platform to severe administrative, financial, and criminal liabilities, including:
1. **Administrative Sanctions & Fines**: INDECOPI fines up to 450 UIT (Unidades Impositivas Tributarias) under Ley N° 29571; MINCETUR fines up to 10 UIT and automatic cancellation of the agency's commercial authorization in the *Directorio Nacional de Prestadores de Servicios Turísticos Calificados*; ANPDP fines up to 100 UIT under Ley N° 29733.
2. **Operational Shutdowns & Route Closures**: Immediate revocation by GERCETUR Cusco and SERNANP of operational access to the Inca Trail Network, train passenger manifests, and archaeological site ticketing quotas.
3. **Criminal Penalties**: Under Ley N° 30963 and the Peruvian Penal Code (Arts. 153, 179, 181-B), failure to prevent or report child sexual exploitation or facilitating unauthorized minor transport triggers custodial sentences of up to 25 years or life imprisonment.

This Master Compliance Plan provides the normative baseline, exact legal citations, verbatim bilingual statutory notices, architectural deliverables, and verification procedures required to establish full statutory parity across the digital platform.

---

### 1.2 Regulatory Authority Matrix

The following multi-institutional matrix defines the statutory oversight bodies governing Machu Picchu Travel Adventure E.I.R.L., their governing legal bases, jurisdictional scopes, and specific platform enforcement touchpoints:

| Regulatory Authority | Acronym | Primary Statutory Base | Jurisdictional Scope & Mandate | Digital Platform Enforcement Touchpoints | Non-Compliance Sanctions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ministerio de Comercio Exterior y Turismo** | **MINCETUR** | • Ley N° 29408 (Ley General de Turismo)<br>• D.S. N° 005-2020-MINCETUR<br>• R.M. N° 061-2021-MINCETUR<br>• R.M. N° 108-2020-MINCETUR | National oversight of tourism service providers; regulation of travel agencies; approval of official badges; ESNNA prevention policy. | • Commercial identification data in footer & homepage (Art. 22).<br>• Official badge "Agencia Registrada" (`1.png`).<br>• Verbatim bilingual ESNNA warning & badge (`2.png`).<br>• Directorio Nacional enrollment disclosure. | Fines up to 10 UIT; temporary suspension or definitive cancellation of tourist service registration; digital domain blocking. |
| **Gerencia Regional de Comercio Exterior, Turismo y Artesanía del Cusco** | **GERCETUR Cusco** (ex-DIRCETUR) | • D.S. N° 005-2020-MINCETUR (Art. 12)<br>• D.S. N° 005-2016-MINCETUR<br>• Ordenanza Regional Cusco N° 120-2016-CR/GRC.CUSCO | Regional tourism registry and licensing; inspection of physical agencies operating in Cusco; enforcement of adventure tourism safety standards and official guide credentialing. | • Regional accreditation notice in footer and about pages.<br>• Adventure tourism safety notices in trek descriptions.<br>• Certified guide disclosure (COLTUR / GCOT). | Revocation of regional operating certificate; suspension of municipal commercial license; blacklisting from regional tourist corridors. |
| **Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual** | **INDECOPI** | • Ley N° 29571 (Código de Protección y Defensa del Consumidor)<br>• D.S. N° 011-2011-PCM<br>• Ley N° 31435<br>• D.S. N° 101-2022-PCM | Consumer protection in e-commerce; enforcement of transparent pricing, cancellation terms, and the Virtual Complaints Book (*Libro de Reclamaciones Virtual*). | • Accessible link to Libro de Reclamaciones Virtual on all pages.<br>• Peremptory 15 business days response deadline notice.<br>• Digital complaint form with unique tracking code and email dispatch.<br>• Clear refund scale and force majeure clauses. | Fines up to 450 UIT; public listing in the Sanctions Registry (*Registro de Infracciones*); restitution orders to consumers. |
| **Ministerio de Transportes y Comunicaciones / Superintendencia de Transporte Terrestre** | **MTC / SUTRAN** | • Ley N° 30802<br>• D.S. N° 017-2009-MTC<br>• Directiva N° 001-2021-SUTRAN | Oversight of interprovincial tourist ground transport, tourist trains (PeruRail / Inca Rail), tourist buses (Consettur), and passenger identity verification. | • Reactive checkout warning banner for bookings containing minors.<br>• Clear notice of mandatory original physical DNI/passport.<br>• Explicit requirement for Notarized Travel Authorizations. | Interception and refusal of boarding; vehicle impoundment; cancellation of transport permits; carrier disputes. |
| **Ministerio de la Mujer y Poblaciones Vulnerables / Ministerio del Interior** | **MIMP / MININTER / PNP** | • Ley N° 29408 (Arts. 43-44)<br>• Ley N° 30963<br>• Ley N° 30802<br>• D.S. N° 003-2010-MINCETUR | Child protection; prevention of commercial sexual exploitation of children and adolescents (ESNNA); human trafficking criminal investigation; 24-hour reporting hotlines. | • Verbatim statutory bilingual statement (ES / EN).<br>• Active `tel:` links to Línea 100, Línea 1818, Central 105.<br>• Dedicated `/protegeme` route and modal.<br>• Zero-tolerance terms clause. | Criminal prosecution of legal representatives; custodial sentences up to 25 years or life imprisonment; immediate asset seizure. |
| **Autoridad Nacional de Protección de Datos Personales** | **ANPDP (MINJUSDH)** | • Ley N° 29733 (Ley de Protección de Datos Personales)<br>• D.S. N° 003-2013-JUS | Regulation and enforcement of personal data protection, cross-border data transfers, and ARCO rights guarantee in private and commercial databases. | • Privacy policy disclosing data bank owner and purpose.<br>• Unbundled consent for promotional marketing.<br>• Explicit operational disclosures for MINCUL/train ticket issuance.<br>• Formal ARCO rights exercise mechanism. | Fines ranging from 0.5 UIT up to 100 UIT; mandatory cessation of database processing; administrative audits. |

---

## 2. Complete Statutory Obligations Mapping

### 2.1 Commercial Identification & Official Registered Agency Badge
**Statutory Authorities**:
- **Decreto Supremo N° 005-2020-MINCETUR**: *Reglamento de Agencias de Viajes y Turismo*, Articles 17 & 22.
- **Resolución Ministerial N° 061-2021-MINCETUR**: *Aprueba el Distintivo de Agencia de Viajes y Turismo Registrada*.

#### Article 22 Mandates (Canales Digitales de Comercialización):
Any travel and tourism agency that commercializes services through websites, electronic platforms, or mobile applications must visibly, clearly, and permanently display on its main access interfaces:
1. **Razón Social** (Corporate Legal Name): `Machu Picchu Travel Adventure E.I.R.L.` (Tenant Sonqo: `Sonqo Perú Travel E.I.R.L.`)
2. **R.U.C.** (Registro Único de Contribuyentes): `20564458385` (Tenant Sonqo: `20616667549`)
3. **Physical / Fiscal Domicile**: `Av. El Sol 123, Centro Histórico, Cusco, Perú` (Tenant Sonqo: `Cal. Fernando Túpac Amaru Mz. LL Lote 3, Urb. Túpac Amaru, Cusco, Perú`)
4. **Direct Contact Telephone**: `+51 955 723 329` (Tenant Sonqo: `+51 984 228 417`)
5. **Customer Service & Bookings Email**: `reservasmtaperu@gmail.com` (Tenant Sonqo: `sonqoperutravel@gmail.com`)
6. **Operating Hours**: Customer support schedule (e.g., *Lunes a Domingo: 06:00 - 22:00 UTC-5*).
7. **Directorio Nacional Reference**: Active notice confirming registration in the *Directorio Nacional de Prestadores de Servicios Turísticos Calificados de MINCETUR*.

#### Article 17 & R.M. N° 061-2021-MINCETUR Mandates (Official Registered Agency Badge):
- Registered agencies must exhibit the official emblem **"Agencia de Viajes y Turismo Registrada"** on all physical and digital communication channels.
- **Asset**: `public/imagenes/logos/1.png` (Dimensions: 346 × 578 px, high-resolution vertical emblem depicting the official MINCETUR golden sun/compass with navy blue typography).
- **Display Criteria**:
  - The emblem has a solid white `#FFFFFF` background. When rendered within dark UI elements (such as the `#1a1a2e` footer or `#213E4C` Sonqo footer), it must be framed in a crisp white container card (`bg-white rounded-xl p-2.5 shadow-sm border border-white/20`) to prevent clipping and ensure visual elegance.
  - Accompanied by descriptive accessibility text (`alt="Agencia de Viajes y Turismo Registrada - MINCETUR Perú"`) and a subtext label indicating registration under the regional authority GERCETUR Cusco.

---

### 2.2 ESNNA Prevention Framework, Verbatim Bilingual Notices & Emergency Hotlines
**Statutory Authorities**:
- **Ley N° 29408**: *Ley General de Turismo*, Articles 43 and 44.
- **Decreto Supremo N° 005-2020-MINCETUR**: Article 17, Clause 17.2, Subclauses (a, b, c).
- **Resolución Ministerial N° 108-2020-MINCETUR**: *Aprueba las características y el modelo oficial del afiche contra la ESNNA*.
- **Ley N° 30963**: *Ley que modifica el Código Penal respecto a las sanciones para los delitos de explotación sexual infantil, pornografía infantil y trata de personas*.
- **Decreto Supremo N° 003-2010-MINCETUR**: *Reglamento de la Ley General de Turismo*.

#### Mandatory Statutory Obligations:
1. **Duty to Prevent & Deny**: Travel agencies are legally prohibited from facilitating, contracting, hosting, or arranging any service that promotes or enables the Sexual Exploitation of Children and Adolescents (*Explotación Sexual de Niñas, Niños y Adolescentes - ESNNA*).
2. **Duty of Immediate Reporting**: Any agency employee, guide, or contractor who gains knowledge of any illicit act or suspected ESNNA within the course of tourist operations must report it immediately to competent authorities.
3. **Official "Protégeme" Badge**:
   - Registered agencies must prominently display the official "Protégeme" emblem.
   - **Asset**: `public/imagenes/logos/2.png` (Dimensions: 659 × 466 px, horizontal emblem depicting the protective blue hands, red suitcase, and child silhouettes).
   - Must be containerized with a clean white background card (`bg-white rounded-xl p-2 shadow-sm`) when placed on dark backdrops.

#### Exact Verbatim Statutory Bilingual Statements (R.M. N° 108-2020-MINCETUR):
The statutory text established by the Peruvian Ministry of Foreign Trade and Tourism must be reproduced **verbatim and unaltered** in both Spanish and English:

##### Spanish (Texto Oficial Literal - R.M. N° 108-2020-MINCETUR):
> **"EN ESTA AGENCIA NO PROMOVEMOS NI PERMITIMOS LA EXPLOTACIÓN SEXUAL DE NIÑAS, NIÑOS Y ADOLESCENTES, NI CUALQUIER OTRO ILÍCITO PENAL DEL CUAL TOMEMOS CONOCIMIENTO EN EL DESARROLLO DE NUESTRA ACTIVIDAD, CONFORME A LO DISPUESTO EN LA LEY N° 29408."**

##### English (Official Verbatim Text - R.M. N° 108-2020-MINCETUR):
> **"IN THIS TRAVEL AGENCY, WE DO NOT PROMOTE OR PERMIT THE SEXUAL EXPLOITATION OF GIRLS, CHILDREN AND TEENAGERS, NOR ANY OTHER CRIME OF WHICH WE TAKE KNOWLEDGE IN DEVELOPMENT OF OUR ACTIVITY, ACCORDING TO LAW N° 29408."**

#### Mandatory Statutory Legal Citations:
The digital presentation of the ESNNA notice must explicitly cite the governing legal authorities:
1. **Ley N° 29408**: Ley General de Turismo (Arts. 43 y 44).
2. **D.S. N° 003-2010-MINCETUR**: Aprueba el Reglamento de la Ley General de Turismo.
3. **Ley N° 30963**: Ley que modifica el Código Penal respecto a las sanciones para los delitos de explotación sexual infantil, pornografía infantil y trata de personas (penas de hasta 25 años o cadena perpetua).
4. **Ley N° 30802**: Ley que establece condiciones para el ingreso de niñas, niños y adolescentes a establecimientos de hospedaje y transporte turístico.
5. **R.M. N° 108-2020-MINCETUR**: Aprueba el modelo oficial del afiche y las especificaciones técnicas para la prevención de la ESNNA en prestadores de servicios turísticos.

#### 24-Hour Free Emergency Reporting Hotlines:
The digital platform must provide functional, clickable telephone links (`tel:`) and clear operational descriptions for all official 24/7 emergency hotlines:
1. **Línea 100 (MIMP - Ministerio de la Mujer y Poblaciones Vulnerables)**:
   - Protocol / Link: `tel:100`
   - Description: Servicio telefónico nacional gratuito disponible las 24 horas, los 365 días del año. Brinda información, contención emocional, orientación legal y articulación de rescate en casos de violencia y explotación contra niñas, niños y adolescentes.
2. **Línea 1818 (MININTER - Central Única de Denuncias)**:
   - Protocol / Link: `tel:1818` (Opción Trata de Personas)
   - Description: Central telefónica gratuita y confidencial del Ministerio del Interior para la denuncia ciudadana inmediata de trata de personas, explotación sexual comercial y delitos conexos a nivel nacional.
3. **Central 105 (PNP - Policía Nacional del Perú)**:
   - Protocol / Link: `tel:105`
   - Description: Central de Emergencias de la Policía Nacional para auxilio policial inmediato y respuesta operativa ante situaciones de flagrancia y rescate en todo el territorio peruano.
4. **POLTUR Cusco (División de Policía de Turismo del Cusco)**:
   - Protocol / Link: `tel:+5184249769` / `tel:+5184235123`
   - Description: División especializada de la Policía Nacional asignada a la seguridad turística, corredores arqueológicos y protección al turista en el departamento de Cusco.

#### Architectural Access Architecture:
To ensure maximum compliance and accessibility under Requirement R2:
- **Dedicated Route**: `/protegeme` (and alias `/esnna`) containing the comprehensive code of conduct, full statutory citations, and expandable emergency directory.
- **Interactive Modal**: Client-side component `ProtegemeModal.tsx` triggerable from the footer badge or navigation, allowing immediate on-page review without abandoning active booking funnels.
- **Footer Summary**: Permanent regulatory banner in `Footer.tsx` presenting the Protégeme badge, verbatim bilingual excerpt, and direct hotline buttons.

---

### 2.3 GERCETUR Cusco & Regional Adventure Tourism Safety Standards
**Statutory Authorities**:
- **Decreto Supremo N° 005-2020-MINCETUR**: Article 12 (Competencia Regional).
- **Decreto Supremo N° 005-2016-MINCETUR**: *Reglamento de Seguridad para la Prestación del Servicio Turístico de Turismo de Aventura*.
- **Ley N° 28536**: *Ley del Guía Oficial de Turismo* y su modificatoria Ley N° 31614.
- **Reglamento de Uso Turístico Sostenible de la Red de Caminos Inca del Santuario Histórico de Machu Picchu** (Resolución Presidencial N° 195-2017-SERNANP).

#### Regional Commercial & Safety Obligations:
1. **Regional Inbound Agency Registration**:
   - The platform operates primarily in Cusco, the Sacred Valley, and Machu Picchu. It is subject to the direct oversight of the *Gerencia Regional de Comercio Exterior, Turismo y Artesanía del Gobierno Regional del Cusco* (GERCETUR Cusco).
   - Commercial disclosures must reference registration with GERCETUR Cusco and compliance with the *Directorio Nacional de Prestadores de Servicios Turísticos Calificados*.
2. **Adventure Tourism Safety Regulations (D.S. N° 005-2016-MINCETUR)**:
   - Applies to high-altitude trekking routes offered on the platform: Inca Trail (Camino Inca), Salkantay Trek, Ausangate Trek, Vinicunca Rainbow Mountain, and Humantay Lake.
   - Mandates:
     - Possession of certified, inspected adventure equipment conforming to international CE/UIAA safety standards.
     - Annual contingency and evacuation plan approved by regional authorities.
     - Mandatory carrying of specialized first aid kits, emergency communication radios, and medical oxygen bottles on all trekking expeditions above 3,500 meters above sea level.
     - Mandatory contracting of personal accident insurance policies for adventure participants.
3. **Professional Guiding Credentials**:
   - Under Ley N° 28536 and Ley N° 31614, guided tours within national archaeological sanctuaries and regional cultural corridors may only be conducted by licensed professionals holding a *Carné Oficial de Guía Oficial de Turismo* (GCOT) issued by GERCETUR/DIRCETUR or registered with the *Colegio de Licenciados en Turismo* (COLTUR Cusco).
   - Foreign or non-credentialed individuals are strictly prohibited from guiding.

---

### 2.4 INDECOPI / Consumer Protection, Libro de Reclamaciones & Ley N° 31435
**Statutory Authorities**:
- **Ley N° 29571**: *Código de Protección y Defensa del Consumidor*, Articles 24, 47, 48, 150, 151, and 152.
- **Decreto Supremo N° 011-2011-PCM**: *Reglamento del Libro de Reclamaciones*.
- **Ley N° 31435**: *Ley que modifica el artículo 24 de la Ley 29571 para reducir el plazo de atención de quejas y reclamos a quince días hábiles improrrogables*.
- **Decreto Supremo N° 101-2022-PCM**: Modifica el Reglamento del Libro de Reclamaciones para adecuarlo a la Ley N° 31435.

#### Mandatory Consumer Protection Deliverables:
1. **Libro de Reclamaciones Virtual**:
   - E-commerce platforms targeting consumers in Peru must provide a digital complaint book accessible via a prominent, easily identifiable link on the home page and throughout the browsing interface.
   - Must capture consumer identification (full name, DNI/passport, address, telephone, email), distinction between Product and Service, amount claimed, detailed description, and consumer's requested remedy (*Pedido del Consumidor*).
   - When the complainant is a minor, the form must capture the identification details of their parent or legal guardian.
   - Upon submission, the platform must automatically generate a serialized *Hoja de Reclamación Virtual* (Format: `REC-YYYYMMDD-XXXX`), deliver a digital copy immediately to the consumer's email via Resend, and archive the record in a secured database.
2. **Critical Correction of Response Deadline (Ley N° 31435 & D.S. N° 101-2022-PCM)**:
   - **Prior Rule**: Art. 24 allowed up to thirty (30) calendar days (*días calendario*).
   - **Current Law**: Promulgated in March 2022, **Ley N° 31435** amended Article 24 of Ley N° 29571, reducing the statutory deadline to **quince (15) días hábiles improrrogables** (15 non-extendable business days).
   - **Immediate Remediation**: The wording in `messages/es.json` (line 1006) and `messages/en.json` (line 1006) stating "treinta (30) días calendario" constitutes an explicit statutory violation subject to immediate INDECOPI fines. Both files must be amended to declare **quince (15) días hábiles improrrogables** / **fifteen (15) business days**.
3. **Route Normalization**:
   - In addition to `/libro-de-reclamaciones`, consumers and INDECOPI inspectors frequently navigate directly to `/reclamaciones`. A route alias at `/reclamaciones` redirecting to `/libro-de-reclamaciones` must be implemented to prevent 404 errors.
4. **Transparent Cancellation & Refund Scale (Arts. 47 & 48 Ley N° 29571)**:
   - Clear disclosure of refund tiers in `/condiciones` and `/cambios-y-devoluciones`:
     * More than 15 days prior to tour departure: 100% refund of the agency service fee.
     * 7 to 14 days prior to tour departure: 50% refund.
     * 48 hours to 6 days prior to tour departure: 25% refund.
     * Less than 48 hours prior or No-Show: 0% refund.
   - **Government Tickets Carve-Out**: Explicit contractual clause stating that official admission tickets to the Machu Picchu Sanctuary (issued nominally by the Ministry of Culture) and passenger train tickets (Inca Rail / PeruRail) are strictly non-refundable and non-transferable once issued by the government platform, as dictated by ministerial resolutions.

---

### 2.5 Personal Data Protection & ARCO Rights (Ley N° 29733)
**Statutory Authorities**:
- **Ley N° 29733**: *Ley de Protección de Datos Personales*.
- **Decreto Supremo N° 003-2013-JUS**: *Reglamento de la Ley N° 29733*.

#### Data Protection Principles Applied to Tourism Bookings:
1. **Principle of Legality & Consent**: Passenger personal data (first name, last name, document type and number, date of birth, nationality, gender) collected during checkout is processed under the legal basis of executing the bilateral travel contract.
2. **Third-Party Data Transfers for Operational Execution**:
   - The platform must explicitly disclose in `/politicas` and during checkout that passenger identification data is transmitted to mandatory third-party government entities and regulated transport providers:
     * *Ministerio de Cultura del Perú (MINCUL)*: For nominal issuance of Machu Picchu and Sacred Valley entry tickets.
     * *Servicio Nacional de Áreas Naturales Protegidas por el Estado (SERNANP)*: For Inca Trail trekking permits.
     * *Ferrocarril Trasandino S.A. / PeruRail S.A. / Inca Rail S.A.C.*: For nominal train passenger manifests.
     * *Consettur Machu Picchu S.A.C.*: For tourist bus boarding between Aguas Calientes and the citadel.
     * Regulated payment processors: Culqi (Peru) and PayPal (International).
3. **Minors' Data Safeguards**: Personal data relating to minor travelers is processed solely to fulfill statutory entry permits and passenger manifests, under the express authorization of their accompanying parent or guardian.
4. **Separation of Promotional Consent**: Marketing opt-ins (newsletter, promotional offers) must remain separate, unbundled, and optional. Checkout cannot condition service purchase on promotional marketing consent.
5. **ARCO Rights Guarantee**: Users may exercise their rights of Access, Rectification, Cancellation, and Opposition (*Derechos ARCO*) by emailing `reservasmtaperu@gmail.com` with a copy of their identity document.

---

### 2.6 Child Safeguards & Minor Passenger Travel Authorization (Ley N° 30802)
**Statutory Authorities**:
- **Ley N° 30802**: *Ley que establece condiciones para el ingreso de niñas, niños y adolescentes a establecimientos de hospedaje y transporte turístico a fin de garantizar su protección e integridad*.
- **Ley N° 27337**: *Código de los Niños y Adolescentes*, Articles 111 and 112.
- **Decreto Supremo N° 017-2009-MTC**: *Reglamento Nacional de Administración de Transporte*.

#### Mandatory Travel Conditions for Minors in Peru:
1. **Mandatory Physical Original Identity Document**:
   - All minors (0 to 17 years old) must carry and produce their **original physical identity document** at every boarding gate, hotel reception, and national park checkpoint:
     * Peruvian minors: Original physical **D.N.I.** (Documento Nacional de Identidad).
     * Foreign minors: Original physical **Passport** (*Pasaporte*) or valid *Carné de Extranjería*.
     * Digital photos, photocopies, or image scans on smartphones are **strictly rejected** by Peruvian transport inspectors (SUTRAN, PeruRail, Inca Rail) and MINCUL rangers.
2. **Travel Accompanied by Parents**:
   - If accompanied by both parents: Production of original physical IDs verifying parentage (or original birth certificate if parent names are omitted on modern DNIs).
3. **Travel with One Parent, Relative, Third Party, or Unaccompanied**:
   - If the minor travels accompanied by **only one parent**: They must carry an original **Autorización Notarial de Viaje** (Notarized Travel Authorization) signed by the non-traveling parent granting express permission.
   - If the minor travels with **a relative or third party (or unaccompanied)**: They must carry an original Notarized Travel Authorization signed by **both parents**.
   - If one parent is deceased: Original death certificate. If the minor has been recognized by only one parent: Original birth certificate with single parental affiliation.
   - For foreign minors residing in Peru: Consular or notarized travel permit pursuant to migratory regulations.
4. **Checkout Warning Mandate**:
   - When a booking includes one or more child passengers (`children > 0` / `childrenInfo.length > 0`), the checkout interface (`src/app/[locale]/(public)/checkout/page.tsx`) must display an unavoidable, prominent warning banner informing the purchaser of these legal mandates before collecting payment.

---

## 3. Codebase Deliverables Matrix

The following matrix maps every statutory obligation to its exact architectural deliverable, target source files, components, routes, and UI elements within the Tours repository:

| Statutory Obligation | Statutory Citation | Target File / Route | Architectural Component | Implementation Details | Milestone |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Legal Compliance Master Plan** | Ley N° 29408, D.S. N° 005-2020, Ley N° 29571 | `/LEGAL_COMPLIANCE_PLAN.md` | Master Markdown Specification | Authoritative compliance document documenting all statutory frameworks, verbatim text, deliverables matrix, and audit checklists. | **M1** |
| **Commercial Identification Display** | D.S. N° 005-2020-MINCETUR Art. 22 | `src/components/layout/Footer.tsx`<br>`src/lib/brand.ts` | Server Component `Footer`<br>`BrandConfig` interface | Display corporate legal name, RUC, physical address in Cusco, direct telephone (`tel:`), support email (`mailto:`), and customer service hours. Add `minceturRegistrationCode` to `BrandConfig`. | **M2** |
| **Official Registered Agency Badge** | R.M. N° 061-2021-MINCETUR<br>D.S. N° 005-2020 Art. 17 | `src/components/layout/Footer.tsx`<br>`public/imagenes/logos/1.png` | Footer Regulatory Badge Block | Containerize `1.png` (346×578) inside white contrast frame (`bg-white rounded-xl p-2.5 shadow-sm`); display official MINCETUR caption and verification link. | **M2** |
| **Official ESNNA "Protégeme" Badge** | R.M. N° 108-2020-MINCETUR<br>Ley N° 29408 | `src/components/layout/Footer.tsx`<br>`public/imagenes/logos/2.png` | Footer Regulatory Badge Block | Containerize `2.png` (659×466) inside white contrast frame; interactive trigger opening `ProtegemeModal` or linking to `/protegeme`. | **M2** |
| **Verbatim Bilingual ESNNA Statement** | R.M. N° 108-2020-MINCETUR Annex | `src/components/layout/Footer.tsx`<br>`src/app/[locale]/(public)/protegeme/page.tsx`<br>`src/components/ui/ProtegemeModal.tsx` | Footer Banner & Compliance Pages | Render exact verbatim Spanish and English statutory statements established in R.M. N° 108-2020-MINCETUR without alteration. | **M2** |
| **ESNNA Statutory Citations Display** | Ley N° 29408, D.S. 003-2010, Ley 30963, Ley 30802 | `src/components/layout/Footer.tsx`<br>`src/app/[locale]/(public)/protegeme/page.tsx` | Citation Block | Render explicit legal citations informing users of penal consequences (up to 25 years or life imprisonment for exploitation). | **M2** |
| **24-Hour Free Emergency Reporting Lines** | R.M. N° 108-2020-MINCETUR<br>MIMP / MININTER / PNP | `src/components/layout/Footer.tsx`<br>`src/app/[locale]/(public)/protegeme/page.tsx`<br>`src/components/ui/ProtegemeModal.tsx` | Emergency Hotline Action Buttons | Render active, clickable `tel:` links with badges: Línea 100 (`tel:100`), Línea 1818 (`tel:1818`), Central 105 (`tel:105`), and POLTUR Cusco (`tel:+5184249769`). | **M2** |
| **Dedicated ESNNA Compliance Route** | ORIGINAL_REQUEST R2<br>Ley N° 29408 | `src/app/[locale]/(public)/protegeme/page.tsx`<br>`src/app/[locale]/(public)/esnna/page.tsx` | Public Page Route (`/protegeme` + `/esnna`) | Comprehensive, SEO-indexed public compliance route presenting official emblems, verbatim bilingual texts, legal basis, and guide code of conduct. | **M2** |
| **Interactive ESNNA Modal Dialog** | ORIGINAL_REQUEST R2 | `src/components/ui/ProtegemeModal.tsx` | Client Component Modal | Reusable dialog accessible on one-click from footer or navbar badge; backdrop blur, ESC key dismiss, body scroll lock, tab focus containment. | **M2** |
| **Libro de Reclamaciones Route Alias** | INDECOPI D.S. N° 011-2011-PCM | `src/app/[locale]/(public)/reclamaciones/page.tsx` | Public Route Alias | Render / redirect `/reclamaciones` to `/libro-de-reclamaciones` to eliminate 404 errors for standard INDECOPI inspector queries. | **M2** |
| **15 Business Days Response Deadline Fix** | Ley N° 31435<br>D.S. N° 101-2022-PCM | `messages/es.json`<br>`messages/en.json` | Localization Dictionary (`responseMaxDeadlineText`) | Amend line 1006 from "treinta (30) días calendario" to "quince (15) días hábiles improrrogables" (ES) and "fifteen (15) business days" (EN). | **M2** |
| **Checkout Minor Traveler Warning Banner** | Ley N° 30802<br>SUTRAN Directiva 001-2021 | `src/app/[locale]/(public)/checkout/page.tsx` | Reactive Warning Alert Component | Conditionally rendered banner triggered when `maxChildren > 0` or `childrenInfo.length > 0`; details mandatory physical original ID and notarized travel permit. | **M3** |
| **Minor Passenger Validation Refinement** | Ley N° 30802 | `src/app/[locale]/(public)/checkout/page.tsx` | Form Validator `validatePassengers()` | Validate non-empty birth date and mandatory document number format (8-digit numeric validation for Peruvian DNI) for child records. | **M3** |
| **Terms & Conditions: ESNNA Clause** | Ley N° 29408<br>R.M. N° 108-2020-MINCETUR | `src/app/[locale]/(public)/condiciones/page.tsx` | Dedicated Section in Terms (ES & EN) | Add dedicated section detailing agency zero-tolerance, mandatory guide reporting duty, immediate exclusion without refund, and penal citations. | **M3** |
| **Terms & Conditions: Minor Traveler Clause** | Ley N° 30802<br>Ley N° 27337 | `src/app/[locale]/(public)/condiciones/page.tsx` | Dedicated Section in Terms (ES & EN) | Add dedicated section detailing documentation criteria, notarized permits, single-parent travel, and carrier denial liabilities. | **M3** |
| **GERCETUR Cusco Regional Accreditation** | D.S. N° 005-2016-MINCETUR<br>COLTUR Cusco | `src/components/layout/Footer.tsx`<br>`src/app/[locale]/(public)/condiciones/page.tsx` | Footer Badge & Terms Disclosure | Explicit statement of regional authorization under GERCETUR Cusco, licensed guide mandate, and adherence to adventure tourism safety protocols. | **M2 / M3** |

---

## 4. Step-by-Step Verification & Audit Procedures

This section defines the precise terminal commands, assertions, and manual inspection protocols to independently verify each legal deliverable without relying on external assumptions.

### 4.1 Automated CLI Verification Script
The following automated bash commands verify file existence, statutory text matching, and code compilation:

```bash
# 1. Verify existence and valid dimensions of official badge assets
file public/imagenes/logos/1.png public/imagenes/logos/2.png
sips -g pixelWidth -g pixelHeight public/imagenes/logos/1.png public/imagenes/logos/2.png
# Expected: 1.png is PNG (346x578), 2.png is PNG (659x466)

# 2. Verify verbatim Spanish ESNNA text presence in codebase
grep -rn "EN ESTA AGENCIA NO PROMOVEMOS NI PERMITIMOS LA EXPLOTACIÓN SEXUAL DE NIÑAS, NIÑOS Y ADOLESCENTES" src/ messages/
# Expected: Matches found in Footer, ProtegemeModal/page, and condiciones

# 3. Verify verbatim English ESNNA text presence in codebase
grep -rn "IN THIS TRAVEL AGENCY, WE DO NOT PROMOTE OR PERMIT THE SEXUAL EXPLOITATION OF GIRLS, CHILDREN AND TEENAGERS" src/ messages/
# Expected: Matches found in Footer, ProtegemeModal/page, and condiciones

# 4. Verify statutory citations presence
grep -rn "Ley N° 29408" src/
grep -rn "Ley N° 30802" src/
grep -rn "Ley N° 30963" src/
grep -rn "R.M. N° 108-2020-MINCETUR" src/

# 5. Verify 24-hour reporting hotline links
grep -rn "tel:100" src/
grep -rn "tel:1818" src/
grep -rn "tel:105" src/

# 6. Verify 15 business days deadline in localization messages (Ley N° 31435)
grep -rn "quince (15) días hábiles" messages/es.json
grep -rn "fifteen (15) business days" messages/en.json
# Ensure no stale references to "treinta (30) días calendario" remain in responseMaxDeadlineText:
grep -rn "treinta (30) días calendario" messages/es.json

# 7. Verify minor passenger alert in checkout
grep -rn "30802" src/app/\[locale\]/\(public\)/checkout/page.tsx

# 8. Full production compilation and typecheck
npm run build
# Expected: Exit code 0, 0 TypeScript errors, all static and dynamic routes generated cleanly
```

---

### 4.2 Manual & Visual Inspection Criteria

#### A. Footer Regulatory Layout Inspection:
1. Navigate to `http://localhost:3000/` (and `http://localhost:3000/en`).
2. Scroll to the footer:
   - **Badge 1 (`1.png`)**: Confirm the MINCETUR "Agencia Registrada" emblem is clearly rendered inside a high-contrast white rounded frame without distortion or clipping.
   - **Badge 2 (`2.png`)**: Confirm the "Protégeme" emblem is rendered inside a white frame and is clickable, opening the interactive compliance dialog or directing to `/protegeme`.
   - **Verbatim Text**: Confirm the verbatim anti-ESNNA statement is displayed legibly with high contrast.
   - **Hotlines**: Test clicking on `Línea 100`, `Línea 1818`, and `Central 105`. Confirm they initiate dialer protocols (`tel:100`, `tel:1818`, `tel:105`).
   - **Commercial Data**: Confirm `Machu Picchu Travel Adventure E.I.R.L.`, RUC `20564458385`, and `Av. El Sol 123, Centro Histórico, Cusco, Perú` are prominently displayed.

#### B. Dedicated Route Accessibility Inspection:
1. Navigate to `/protegeme` and `/en/protegeme`. Confirm HTTP 200 status, correct rendering of emblems, full statutory text, reporting directory, and guide code of conduct.
2. Navigate to `/esnna` and `/en/esnna`. Confirm proper rendering or seamless 301/308 redirect to `/protegeme`.
3. Navigate to `/reclamaciones` and `/en/reclamaciones`. Confirm seamless resolution to `/libro-de-reclamaciones`.
4. Navigate to `/libro-de-reclamaciones`. Inspect the response deadline notice in Section 4 of the form: confirm it explicitly specifies **15 días hábiles improrrogables** / **15 business days**.

#### C. Checkout Minor Safeguards Inspection (Ley N° 30802):
1. Navigate to any tour detail page (e.g., `/tours/machu-picchu-full-day`).
2. Add a tour with **2 Adults and 0 Children**:
   - Proceed to `/checkout`.
   - Confirm the Ley N° 30802 minor alert banner is **hidden** / not rendered.
3. Return and update cart to **1 Adult and 1 Child**:
   - Proceed to `/checkout`.
   - Confirm that as soon as a child passenger is present, a prominent amber/blue compliance warning alert is **dynamically displayed** above the child passenger form.
   - Confirm the text explicitly instructs:
     > *"Aviso Legal Obligatorio — Ley N° 30802 (Viaje de Menores de Edad): Todo pasajero menor de 18 años debe portar su DNI o Pasaporte físico original. Si viaja acompañado por solo uno de sus padres, apoderados o terceros, o viaja solo, es requisito legal e indispensable presentar la Autorización Notarial o Judicial de Viaje correspondiente. El incumplimiento impedirá el embarque en trenes/buses y el ingreso a Machu Picchu sin derecho a reembolso."*
4. Attempt to submit the form without filling child birth date or child DNI number: confirm client-side validation blocks submission.

#### D. Multi-Tenant Brand Switching Inspection:
1. Set environment variable `NEXT_PUBLIC_BRAND_TENANT=sonqo` or pass override.
2. Confirm the commercial legal name switches to `Sonqo Perú Travel E.I.R.L.` with RUC `20616667549`, fiscal domicile `Cal. Fernando Túpac Amaru Mz. LL Lote 3, Urb. Túpac Amaru, Cusco, Perú`, telephone `+51 984 228 417`, email `sonqoperutravel@gmail.com`, and all statutory MINCETUR / ESNNA / INDECOPI badges and disclosures intact.

---

## 5. Compliance Status & Ongoing Governance Checklist

### 5.1 Baseline vs. Target Compliance Status

| Compliance Dimension | Governing Law | Baseline State | Target State | Implementation Milestone |
| :--- | :--- | :--- | :--- | :--- |
| **Commercial Identification** | D.S. N° 005-2020 Art. 22 | Partial (in footer, missing registry notice) | Fully compliant: Razón Social, RUC, Cusco address, phone, email, and registration status prominently displayed. | M2 |
| **MINCETUR Registered Agency Badge** | R.M. N° 061-2021 | Missing from footer and layout | Fully compliant: `1.png` rendered with white frame, caption, and accreditation info. | M2 |
| **ESNNA "Protégeme" Badge** | R.M. N° 108-2020 | Missing from footer and layout | Fully compliant: `2.png` rendered with white frame and interactive modal link. | M2 |
| **Verbatim Anti-ESNNA Text** | R.M. N° 108-2020 | Absent from site | Fully compliant: Exact verbatim Spanish & English statutory statements rendered in footer and `/protegeme`. | M2 |
| **24-Hour Emergency Hotlines** | Ley N° 29408 / MIMP | Absent from layout | Fully compliant: Active `tel:` links to Línea 100, Línea 1818, Central 105, and POLTUR Cusco. | M2 |
| **Dedicated ESNNA Portal** | R.M. N° 108-2020 | Non-existent route (404) | Fully compliant: Accessible routes `/protegeme` and `/esnna` with code of conduct. | M2 |
| **Libro de Reclamaciones Deadline** | Ley N° 31435 | Non-compliant ("30 días calendario") | Fully compliant: Amended to "15 días hábiles improrrogables" in ES and EN messages. | M2 |
| **Route Alias `/reclamaciones`** | D.S. N° 011-2011-PCM | 404 Not Found | Fully compliant: Dedicated alias resolving to `/libro-de-reclamaciones`. | M2 |
| **Checkout Minor Warning** | Ley N° 30802 | Absent (no warning for child bookings) | Fully compliant: Dynamic reactive alert banner when `children > 0` detailing physical ID and notarized permit mandates. | M3 |
| **Terms: ESNNA Section** | Ley N° 29408 | Absent | Fully compliant: Dedicated section detailing zero-tolerance, reporting duties, and statutory penal citations. | M3 |
| **Terms: Minor Traveler Section** | Ley N° 30802 | Passing mention in Section 3 | Fully compliant: Dedicated section specifying documentation rules, single-parent permits, and carrier enforcement. | M3 |
| **Adventure Tourism Safety** | D.S. N° 005-2016-MINCETUR | Generic mentions | Fully compliant: Explicit notices regarding licensed guides, first aid, oxygen, and contingency plans. | M2 / M3 |
| **Personal Data Protection** | Ley N° 29733 | Compliant in `/politicas` | Fully maintained: Disclosures of operational transfers to MINCUL, SERNANP, PeruRail, and Inca Rail. | M2 / M3 |

---

### 5.2 Ongoing Governance & Periodic Legal Audit Protocol

To ensure continuous, long-term regulatory compliance across digital and operational channels, Machu Picchu Travel Adventure E.I.R.L. adopts the following ongoing governance protocol:

1. **Quarterly INDECOPI Claims Review**:
   - The Legal & Customer Service Committee audits all entries in the `reclamaciones` table quarterly.
   - Verification that 100% of claims and complaints received a formal written response via registered email within the statutory **15 business days** deadline under Ley N° 31435.
   - Archiving of digital receipts for at least two (2) years pursuant to D.S. N° 011-2011-PCM.
2. **Annual GERCETUR Cusco Accreditation Renewal**:
   - Validate annual renewal of the *Certificado de Autorización para Turismo de Aventura* and verified inclusion in the *Directorio Nacional de Prestadores de Servicios Turísticos Calificados*.
   - Audit all affiliated tour guides for active, valid GCOT/COLTUR credentials prior to high season (April of each year).
3. **Staff & Contractor ESNNA Training Protocol**:
   - Mandatory bi-annual training for all administrative staff, booking agents, tour leaders, and field drivers on the detection and immediate reporting of ESNNA under Ley N° 29408.
   - Explicit inclusion of the ESNNA zero-tolerance code of conduct in all contractor and supplier service agreements (hotels, transport providers, local restaurants).
4. **Platform Software Release Compliance Gate**:
   - Any pull request modifying `Footer.tsx`, `checkout/page.tsx`, `condiciones/page.tsx`, or `messages/*.json` must run the automated legal verification script (Section 4.1) and pass inspection before deployment to production.

---

### 5.3 Authoritative Regulatory Attestation

*This document constitutes the binding, authoritative legal compliance specification for the digital channels of Machu Picchu Travel Adventure E.I.R.L. All software modifications, UI component enhancements, and deployment pipelines executed in connection with project milestones M1 through M5 must strictly conform to the provisions, exact texts, and deliverables defined herein.*

**Approved by**: Legal Compliance & Operations Committee  
**Date of Ratification**: November 3, 2026  
**Jurisdiction**: Cusco, República del Perú
