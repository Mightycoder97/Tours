import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getBrandConfig } from '@/lib/brand';
import { Link } from '@/i18n/navigation';
import {
  ShieldAlert,
  ShieldCheck,
  PhoneCall,
  AlertTriangle,
  Building2,
  FileCheck2,
  Scale,
  Users,
  CheckCircle2,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const brand = getBrandConfig();
  const isEn = locale === 'en';

  return {
    title: isEn
      ? `Child Protection & Anti-ESNNA Compliance Notice | ${brand.name}`
      : `Prevención de la ESNNA — Código de Conducta y Protección al Menor | ${brand.name}`,
    description: isEn
      ? `Official child protection policy and zero-tolerance commitment against the Sexual Exploitation of Children and Adolescents (ESNNA) pursuant to Peruvian Law N° 29408 and R.M. N° 108-2020-MINCETUR.`
      : `Política oficial de protección a menores y compromiso institucional de tolerancia cero frente a la Explotación Sexual de Niñas, Niños y Adolescentes (ESNNA) conforme a la Ley N° 29408 y R.M. N° 108-2020-MINCETUR.`,
  };
}

export default async function ProtegemePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const brand = getBrandConfig();
  const isEn = locale === 'en';

  return (
    <div className="bg-surface min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-10">
        
        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-red-700" />
            {isEn ? 'Official Tourism Compliance Notice' : 'Aviso Oficial del Sector Turismo'}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-dark tracking-tight">
            {isEn
              ? 'Prevention of Sexual Exploitation of Children and Adolescents (ESNNA)'
              : 'Prevención de la Explotación Sexual de Niñas, Niños y Adolescentes (ESNNA)'}
          </h1>

          <p className="text-text-light text-sm sm:text-base leading-relaxed">
            {isEn
              ? `In accordance with Peruvian General Tourism Law N° 29408, Ministerial Resolution N° 108-2020-MINCETUR, and Supreme Decree N° 005-2020-MINCETUR, ${brand.legalName} declares its absolute zero-tolerance commitment against the Sexual Exploitation of Children and Adolescents in all tourism activities.`
              : `En cumplimiento estricto de la Ley General de Turismo (Ley N° 29408, Arts. 43 y 44), la Resolución Ministerial N° 108-2020-MINCETUR y el Reglamento de Agencias de Viajes y Turismo (D.S. N° 005-2020-MINCETUR), ${brand.legalName} asume y difunde su política de tolerancia cero frente a cualquier forma de Explotación Sexual de Niñas, Niños y Adolescentes en el ámbito de los servicios turísticos.`}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs text-text-light border-t border-gray-100">
            <span>
              <strong>{isEn ? 'Legal Name' : 'Razón Social'}:</strong> {brand.legalName}
            </span>
            <span>•</span>
            <span>
              <strong>RUC:</strong> {brand.ruc}
            </span>
            <span>•</span>
            <span>
              <strong>{isEn ? 'Accreditation' : 'Acreditación'}:</strong> MINCETUR & GERCETUR Cusco
            </span>
          </div>
        </div>

        {/* Official Badges Display */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-light text-center mb-6">
            {isEn ? 'Official Badges Authorized by MINCETUR' : 'Distintivos Oficiales Autorizados por MINCETUR'}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            {/* MINCETUR Badge 1 */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center text-center w-[160px] sm:w-[170px]">
              <Image
                src="/imagenes/logos/1.png"
                alt="Agencia de Viajes y Turismo Registrada - MINCETUR"
                width={130}
                height={190}
                className="object-contain max-h-[140px] w-auto"
                priority
              />
              <span className="text-xs font-bold text-gray-800 uppercase tracking-tight mt-3 leading-tight">
                Agencia Registrada
              </span>
              <span className="text-[10px] text-gray-500 mt-0.5">
                R.M. N° 061-2021-MINCETUR
              </span>
              <span className="text-[10px] text-primary-dark font-semibold mt-1">
                {brand.minceturRegistrationCode || 'DIRCETUR-CUSCO-2024-00129'}
              </span>
            </div>

            {/* Protégeme Badge 2 */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center text-center w-[230px] sm:w-[260px]">
              <Image
                src="/imagenes/logos/2.png"
                alt="Protégeme - Turismo Responsable para prevenir la explotación sexual de niñas, niños y adolescentes"
                width={240}
                height={160}
                className="object-contain max-h-[140px] w-auto"
                priority
              />
              <span className="text-xs font-bold text-primary-dark uppercase tracking-tight mt-3 leading-tight">
                Protégeme ESNNA
              </span>
              <span className="text-[10px] text-gray-500 mt-0.5">
                R.M. N° 108-2020-MINCETUR
              </span>
              <span className="text-[10px] text-gray-600 font-semibold mt-1">
                Turismo Responsable
              </span>
            </div>
          </div>
        </div>

        {/* Verbatim Statutory Statements (R.M. N° 108-2020-MINCETUR) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-2xl text-primary-dark">
              {isEn ? 'Mandatory Statutory Bilingual Statement' : 'Declaración Estatutaria Obligatoria Bilingüe'}
            </h2>
          </div>

          {/* Spanish Verbatim */}
          <div className="bg-red-50 border-2 border-red-500/80 rounded-2xl p-6 sm:p-8 relative shadow-xs">
            <span className="absolute -top-3 left-6 px-3 py-0.5 bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
              Texto Oficial en Español — R.M. N° 108-2020-MINCETUR
            </span>
            <blockquote className="font-serif text-base sm:text-lg lg:text-xl font-bold text-red-950 uppercase tracking-wide leading-relaxed pt-2">
              &ldquo;EN ESTA AGENCIA NO PROMOVEMOS NI PERMITIMOS LA EXPLOTACIÓN SEXUAL DE NIÑAS, NIÑOS Y ADOLESCENTES, NI CUALQUIER OTRO ILÍCITO PENAL DEL CUAL TOMEMOS CONOCIMIENTO EN EL DESARROLLO DE NUESTRA ACTIVIDAD, CONFORME A LO DISPUESTO EN LA LEY N° 29408.&rdquo;
            </blockquote>
          </div>

          {/* English Verbatim */}
          <div className="bg-blue-50 border-2 border-blue-500/80 rounded-2xl p-6 sm:p-8 relative shadow-xs">
            <span className="absolute -top-3 left-6 px-3 py-0.5 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
              Official Verbatim Text in English — R.M. N° 108-2020-MINCETUR
            </span>
            <blockquote className="font-serif text-base sm:text-lg lg:text-xl font-bold text-blue-950 uppercase tracking-wide leading-relaxed pt-2">
              &ldquo;IN THIS TRAVEL AGENCY, WE DO NOT PROMOTE OR PERMIT THE SEXUAL EXPLOITATION OF GIRLS, CHILDREN AND TEENAGERS, NOR ANY OTHER CRIME OF WHICH WE TAKE KNOWLEDGE IN DEVELOPMENT OF OUR ACTIVITY, ACCORDING TO LAW N° 29408.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Code of Conduct & Operational Commitments */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-2xl text-primary-dark">
              {isEn ? 'Operational Code of Conduct & Child Safeguards' : 'Código de Conducta Operativo y Salvaguardas'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-text-light">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-text-main">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{isEn ? 'Identity Verification for Minors' : 'Verificación de Identidad de Menores'}</span>
              </div>
              <p>
                {isEn
                  ? 'All child passengers must present original physical identity documents (DNI or Passport) and proof of parentage or notarized travel permit pursuant to Law N° 30802 before boarding transport or entering accommodations.'
                  : 'Todo menor de edad debe presentar su documento original físico (DNI o Pasaporte) y acreditar parentesco o portar autorización notarial de viaje (Ley N° 30802) antes de abordar transportes turísticos u hospedajes.'}
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-text-main">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{isEn ? 'Zero Tolerance & Service Refusal' : 'Tolerancia Cero y Denegación'}</span>
              </div>
              <p>
                {isEn
                  ? 'Our agency immediately cancels reservations and refuses service to anyone suspected of attempting, facilitating, or engaging in child sexual exploitation or human trafficking.'
                  : 'Nuestra agencia cancelará de inmediato reservas y denegará la prestación de servicios a cualquier persona respecto de la cual existan indicios o conductas vinculadas a la explotación sexual de menores.'}
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-text-main">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{isEn ? 'Mandatory Immediate Reporting' : 'Deber de Denuncia Inmediata'}</span>
              </div>
              <p>
                {isEn
                  ? 'Staff, certified tour guides, and transport drivers have the legal obligation to immediately report any suspicious situation to the National Police (PNP 105), Línea 1818, or Línea 100.'
                  : 'Nuestro personal, guías oficiales de turismo y conductores tienen la obligación legal y funcional de denunciar inmediatamente cualquier indicio o sospecha ante la Policía Nacional del Perú y autoridades competentes.'}
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-text-main">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{isEn ? 'Staff Training & Supplier Audits' : 'Capacitación y Red de Proveedores'}</span>
              </div>
              <p>
                {isEn
                  ? 'We work exclusively with registered suppliers, certified hotels, and licensed transport providers compliant with MINCETUR quality and child safeguard guidelines.'
                  : 'Operamos exclusivamente con proveedores formales registrados en el Directorio de MINCETUR y alineados con el Código de Conducta de Protección de los Derechos de las Niñas, Niños y Adolescentes.'}
              </p>
            </div>
          </div>
        </div>

        {/* Statutory Legal Framework References */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-2xl text-primary-dark">
              {isEn ? 'Statutory Legal Framework in Peru' : 'Marco Jurídico y Normativa Aplicable en el Perú'}
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-text-light divide-y divide-gray-100">
            <div className="pt-2">
              <strong className="text-text-main">Ley N° 29408 — Ley General de Turismo:</strong>
              <p className="mt-1">
                Artículos 43 y 44: Establecen la obligación ineludible de los prestadores de servicios turísticos de prevenir la explotación sexual de niñas, niños y adolescentes, adoptar códigos de conducta y denunciar de inmediato cualquier hecho ilícito ante la autoridad competente.
              </p>
            </div>

            <div className="pt-3">
              <strong className="text-text-main">Decreto Supremo N° 003-2010-MINCETUR:</strong>
              <p className="mt-1">
                Reglamento de la Ley General de Turismo, detallando las responsabilidades de los operadores y prestadores de servicios turísticos respecto a la prevención de delitos contra la indemnidad sexual.
              </p>
            </div>

            <div className="pt-3">
              <strong className="text-text-main">Ley N° 30963:</strong>
              <p className="mt-1">
                Ley que modifica el Código Penal para sancionar con penas privativas de la libertad severas (hasta 25 años o cadena perpetua) los delitos de explotación sexual infantil, pornografía infantil y trata de personas.
              </p>
            </div>

            <div className="pt-3">
              <strong className="text-text-main">Ley N° 30802:</strong>
              <p className="mt-1">
                Ley que establece condiciones obligatorias para el ingreso de niñas, niños y adolescentes a establecimientos de hospedaje y al abordaje de medios de transporte turístico, exigiendo acreditación de parentesco o autorización notarial de viaje.
              </p>
            </div>

            <div className="pt-3">
              <strong className="text-text-main">Resolución Ministerial N° 108-2020-MINCETUR:</strong>
              <p className="mt-1">
                Aprueba las características técnicas y el modelo oficial del afiche contra la ESNNA que debe ser exhibido de manera obligatoria y visible en establecimientos físicos y plataformas digitales de turismo.
              </p>
            </div>

            <div className="pt-3">
              <strong className="text-text-main">Decreto Supremo N° 005-2020-MINCETUR:</strong>
              <p className="mt-1">
                Reglamento de Agencias de Viajes y Turismo. En sus artículos 17 y 22 dispone la exhibición obligatoria del distintivo de Agencia Registrada y los datos de identificación comercial en canales digitales.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Hotlines Directory */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-2xl text-primary-dark">
              {isEn
                ? 'Official 24-Hour Free Emergency & Reporting Directory'
                : 'Directorio de Denuncia y Auxilio Gratuito las 24 Horas'}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-text-light">
            {isEn
              ? 'If you witness or suspect any situation involving child sexual exploitation, violence, or human trafficking, contact these official 24/7 emergency hotlines immediately:'
              : 'Si detectas o sospechas de cualquier situación de riesgo, agresión o explotación sexual de menores, comunícate de inmediato con las siguientes líneas oficiales y gratuitas las 24 horas:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Linea 100 */}
            <a
              href="tel:100"
              className="group p-5 rounded-2xl border border-gray-200 bg-gray-50/50 hover:border-primary hover:bg-primary/5 transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-lg shrink-0">
                100
              </div>
              <div>
                <h3 className="font-bold text-text-main group-hover:text-primary transition-colors text-base">
                  Línea 100 (MIMP)
                </h3>
                <p className="text-xs text-text-light mt-1 leading-relaxed">
                  Ministerio de la Mujer y Poblaciones Vulnerables. Orientación, soporte legal y psicológico ante violencia familiar o sexual. Gratuito, confidencial y 24/7 a nivel nacional.
                </p>
              </div>
            </a>

            {/* Linea 1818 */}
            <a
              href="tel:1818"
              className="group p-5 rounded-2xl border border-gray-200 bg-gray-50/50 hover:border-primary hover:bg-primary/5 transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg shrink-0">
                1818
              </div>
              <div>
                <h3 className="font-bold text-text-main group-hover:text-primary transition-colors text-base">
                  Línea 1818 (MININTER)
                </h3>
                <p className="text-xs text-text-light mt-1 leading-relaxed">
                  Ministerio del Interior — Central Única de Denuncias. Opción especializada en delitos de trata de personas y explotación sexual. Gratuito y confidencial.
                </p>
              </div>
            </a>

            {/* Central 105 */}
            <a
              href="tel:105"
              className="group p-5 rounded-2xl border border-gray-200 bg-gray-50/50 hover:border-primary hover:bg-primary/5 transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg shrink-0">
                105
              </div>
              <div>
                <h3 className="font-bold text-text-main group-hover:text-primary transition-colors text-base">
                  Central 105 (PNP)
                </h3>
                <p className="text-xs text-text-light mt-1 leading-relaxed">
                  Policía Nacional del Perú — Central de Emergencias. Para intervenciones inmediatas en flagrancia delictiva y operativos de rescate en todo el territorio nacional.
                </p>
              </div>
            </a>

            {/* POLTUR Cusco */}
            <a
              href="tel:+5184249769"
              className="group p-5 rounded-2xl border border-gray-200 bg-gray-50/50 hover:border-primary hover:bg-primary/5 transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                POLTUR
              </div>
              <div>
                <h3 className="font-bold text-text-main group-hover:text-primary transition-colors text-base">
                  POLTUR Cusco: (084) 249769
                </h3>
                <p className="text-xs text-text-light mt-1 leading-relaxed">
                  Policía de Turismo de Cusco (Plaza Túpac Amaru / Av. El Sol). Atención directa, patrullaje y auxilio inmediato a visitantes nacionales y extranjeros en la región Cusco.
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Commercial & Contact Card */}
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 text-sm text-text-main">
            <div className="flex items-center gap-2 font-bold text-primary-dark">
              <Building2 className="w-5 h-5 text-primary" />
              <span>{brand.legalName}</span>
            </div>
            <p className="text-xs text-text-light">
              RUC: <strong>{brand.ruc}</strong> · {brand.contact.address}
            </p>
            <p className="text-xs text-text-light">
              Email: <strong>{brand.contact.email}</strong> · Tel: <strong>{brand.contact.phone}</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/condiciones"
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-text-main text-xs font-semibold hover:bg-gray-50 transition-colors shadow-xs"
            >
              {isEn ? 'Terms & Conditions' : 'Términos y Condiciones'}
            </Link>
            <Link
              href="/libro-de-reclamaciones"
              className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors shadow-xs"
            >
              {isEn ? 'Complaints Book' : 'Libro de Reclamaciones'}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
