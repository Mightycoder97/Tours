'use client';

import { useState, FormEvent } from 'react';
import {
  Building2,
  User,
  FileText,
  AlertCircle,
  CheckCircle2,
  Printer,
  Send,
  ShieldAlert,
  Clock,
  PenTool,
  RotateCcw,
} from 'lucide-react';
import type { BrandConfig } from '@/lib/brand';
import { Link } from '@/i18n/navigation';

interface SubmittedComplaint {
  complaintCode: string;
  createdAt: string;
  responseDeadline: string;
  provider: {
    legalName: string;
    commercialName: string;
    ruc: string;
    address: string;
    phone: string;
    email: string;
  };
  consumer: {
    name: string;
    docType: string;
    docNumber: string;
    address: string;
    phone: string;
    email: string;
    isMinor?: boolean;
    guardianName?: string;
  };
  good: {
    type: 'PRODUCTO' | 'SERVICIO';
    claimedAmount: number | null;
    claimedCurrency: 'PEN' | 'USD';
    description: string;
    bookingCode?: string;
  };
  claim: {
    requirementType: 'RECLAMO' | 'QUEJA';
    detail: string;
    consumerRequest: string;
  };
  response: {
    maxDays: number;
    deadline: string;
    measuresAdopted: string;
    status: string;
  };
  signatures: {
    consumer: string;
    representative: string;
  };
}

export default function LibroReclamacionesForm({ brand }: { brand: BrandConfig }) {
  // Datos del consumidor
  const [consumerName, setConsumerName] = useState('');
  const [consumerDocType, setConsumerDocType] = useState<'DNI' | 'CE' | 'PASSPORT' | 'RUC'>('DNI');
  const [consumerDocNumber, setConsumerDocNumber] = useState('');
  const [consumerAddress, setConsumerAddress] = useState('');
  const [consumerPhone, setConsumerPhone] = useState('');
  const [consumerEmail, setConsumerEmail] = useState('');
  const [isMinor, setIsMinor] = useState(false);
  const [guardianName, setGuardianName] = useState('');

  // Identificación del bien contratado
  const [goodType, setGoodType] = useState<'SERVICIO' | 'PRODUCTO'>('SERVICIO');
  const [claimedCurrency, setClaimedCurrency] = useState<'USD' | 'PEN'>('USD');
  const [claimedAmount, setClaimedAmount] = useState('');
  const [bookingCode, setBookingCode] = useState('');
  const [goodDescription, setGoodDescription] = useState('');

  // Detalle de la queja o reclamo
  const [requirementType, setRequirementType] = useState<'RECLAMO' | 'QUEJA'>('RECLAMO');
  const [detail, setDetail] = useState('');
  const [consumerRequest, setConsumerRequest] = useState('');

  // Firma y conformidad
  const [consumerSignature, setConsumerSignature] = useState('');
  const [signatureManuallyEdited, setSignatureManuallyEdited] = useState(false);
  const [acceptSwornDeclaration, setAcceptSwornDeclaration] = useState(false);

  // Estado de envío
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedComplaint | null>(null);

  const [todayFormatted] = useState(() =>
    new Date().toLocaleDateString('es-PE', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  const [estimatedDeadlineFormatted] = useState(() =>
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-PE', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!acceptSwornDeclaration) {
      setErrorMsg('Debe confirmar la declaración jurada y el tratamiento de datos para registrar el reclamo.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reclamaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant: brand.id,
          consumerName,
          consumerDocType,
          consumerDocNumber,
          consumerAddress,
          consumerPhone,
          consumerEmail,
          isMinor,
          guardianName: isMinor ? guardianName : undefined,
          goodType,
          claimedCurrency,
          claimedAmount: claimedAmount ? Number(claimedAmount) : null,
          bookingCode,
          goodDescription,
          requirementType,
          detail,
          consumerRequest,
          consumerSignature: consumerSignature.trim() || consumerName.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'No se pudo registrar su Hoja de Reclamación. Verifique los datos.');
        setIsSubmitting(false);
        return;
      }

      setSubmittedData(data.complaint);
      setIsSubmitting(false);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      setErrorMsg('Error de conexión al enviar la Hoja de Reclamación. Por favor intente nuevamente.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setConsumerName('');
    setConsumerDocNumber('');
    setConsumerAddress('');
    setConsumerPhone('');
    setConsumerEmail('');
    setIsMinor(false);
    setGuardianName('');
    setClaimedAmount('');
    setBookingCode('');
    setGoodDescription('');
    setDetail('');
    setConsumerRequest('');
    setConsumerSignature('');
    setSignatureManuallyEdited(false);
    setAcceptSwornDeclaration(false);
    setErrorMsg(null);
  };

  // ── VISTA DE CONSTANCIA IMPRIMIBLE (POST-ENVÍO) ──
  if (submittedData) {
    return (
      <div className="space-y-8 print:space-y-0">
        {/* Banner de éxito (oculto al imprimir) */}
        <div className="print:hidden bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-7 h-7 text-green-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-green-900">
                ¡Hoja de Reclamación Registrada con Éxito!
              </h2>
              <p className="text-sm text-green-800 mt-1">
                Código único de identificación: <strong className="font-mono text-base">{submittedData.complaintCode}</strong>. Hemos enviado una copia a <strong>{submittedData.consumer.email}</strong>.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-dark text-white text-sm font-bold hover:bg-primary transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" /> Imprimir / Guardar PDF
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-text-main text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Nuevo Registro
            </button>
          </div>
        </div>

        {/* Constancia Oficial de Hoja de Reclamación (INDECOPI Anexo I - D.S. N° 011-2011-PCM) */}
        <div className="bg-white border-2 border-gray-800 rounded-2xl overflow-hidden shadow-md print:shadow-none">
          {/* Encabezado Oficial */}
          <div className="bg-gray-900 text-white p-6 border-b-2 border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-300 font-bold">
                Código de Protección y Defensa del Consumidor — Ley N° 29571 | D.S. N° 011-2011-PCM
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl mt-1">
                LIBRO DE RECLAMACIONES — HOJA DE RECLAMACIÓN
              </h3>
            </div>
            <div className="bg-white text-gray-900 px-4 py-3 rounded-xl border border-gray-300 text-left md:text-right shrink-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Hoja de Reclamación N°</p>
              <p className="font-mono text-lg font-extrabold text-red-600">{submittedData.complaintCode}</p>
              <p className="text-xs text-gray-600">
                Fecha: {new Date(submittedData.createdAt).toLocaleDateString('es-PE', { timeZone: 'America/Lima' })}
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-300 text-sm">
            {/* Datos del Proveedor */}
            <div className="p-5 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-bold uppercase text-gray-500 block">Razón Social / Proveedor</span>
                <span className="font-bold text-gray-900">
                  {submittedData.provider.legalName} ({submittedData.provider.commercialName})
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-gray-500 block">RUC</span>
                <span className="font-bold text-gray-900">{submittedData.provider.ruc}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-gray-500 block">Dirección del Establecimiento</span>
                <span className="text-gray-800">{submittedData.provider.address}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-gray-500 block">Teléfono y Correo Electrónico</span>
                <span className="text-gray-800">
                  {submittedData.provider.phone} | {submittedData.provider.email}
                </span>
              </div>
            </div>

            {/* 1. Identificación del Consumidor Reclamante */}
            <div className="p-5">
              <h4 className="font-bold uppercase text-xs tracking-wider text-primary-dark bg-primary/10 px-3 py-1.5 rounded mb-3">
                1. Identificación del Consumidor Reclamante
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-gray-500 block">Nombres y Apellidos Completos:</span>
                  <span className="font-semibold text-gray-900">{submittedData.consumer.name}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Documento de Identidad:</span>
                  <span className="font-semibold text-gray-900">
                    {submittedData.consumer.docType}: {submittedData.consumer.docNumber}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs text-gray-500 block">Domicilio:</span>
                  <span className="font-semibold text-gray-900">{submittedData.consumer.address}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Teléfono:</span>
                  <span className="font-semibold text-gray-900">{submittedData.consumer.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Correo Electrónico:</span>
                  <span className="font-semibold text-gray-900">{submittedData.consumer.email}</span>
                </div>
                {submittedData.consumer.isMinor && submittedData.consumer.guardianName && (
                  <div className="sm:col-span-2">
                    <span className="text-xs text-gray-500 block">Padre / Madre / Apoderado (Menor de edad):</span>
                    <span className="font-semibold text-gray-900">{submittedData.consumer.guardianName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Identificación del Bien Contratado */}
            <div className="p-5">
              <h4 className="font-bold uppercase text-xs tracking-wider text-primary-dark bg-primary/10 px-3 py-1.5 rounded mb-3">
                2. Identificación del Bien Contratado (Información sobre la Queja o Reclamo)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div>
                  <span className="text-xs text-gray-500 block">Tipo de Bien:</span>
                  <span className="font-semibold text-gray-900">{submittedData.good.type}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Monto Reclamado:</span>
                  <span className="font-semibold text-gray-900">
                    {submittedData.good.claimedAmount !== null
                      ? `${submittedData.good.claimedCurrency === 'PEN' ? 'S/' : 'US$'} ${submittedData.good.claimedAmount.toFixed(2)}`
                      : 'No aplica / No especificado'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Código de Reserva (si aplica):</span>
                  <span className="font-semibold text-gray-900">
                    {submittedData.good.bookingCode || 'No especificado'}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Descripción del Producto o Servicio Involucrado:</span>
                <p className="font-semibold text-gray-900 mt-0.5">{submittedData.good.description}</p>
              </div>
            </div>

            {/* 3. Detalle de la Reclamación y Pedido del Consumidor */}
            <div className="p-5 space-y-3">
              <h4 className="font-bold uppercase text-xs tracking-wider text-primary-dark bg-primary/10 px-3 py-1.5 rounded">
                3. Detalle de la Reclamación y Pedido del Consumidor
              </h4>
              <div>
                <span className="text-xs text-gray-500 block">Tipo de Requerimiento:</span>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                  {submittedData.claim.requirementType} —{' '}
                  {submittedData.claim.requirementType === 'RECLAMO'
                    ? 'Disconformidad relacionada con los productos o servicios'
                    : 'Malestar por mala atención o trato inadecuado, sin relación con el producto o servicio'}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Detalle del Motivo del Reclamo o Queja:</span>
                <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg border border-gray-200 mt-1">
                  {submittedData.claim.detail}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Pedido del Consumidor (Solución Esperada):</span>
                <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg border border-gray-200 mt-1">
                  {submittedData.claim.consumerRequest}
                </p>
              </div>
            </div>

            {/* 4. Observaciones y Acciones Adoptadas por el Proveedor (Respuesta de la Empresa) */}
            <div className="p-5 space-y-2 bg-gray-50/60">
              <h4 className="font-bold uppercase text-xs tracking-wider text-primary-dark bg-primary/10 px-3 py-1.5 rounded">
                4. Observaciones y Acciones Adoptadas por el Proveedor (Respuesta de la Empresa)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-gray-500 block">Plazo Legal de Respuesta:</span>
                  <span className="font-bold text-gray-900">
                    Máximo {submittedData.response.maxDays} días calendario (Vence: {submittedData.response.deadline})
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Estado del Requerimiento:</span>
                  <span className="font-bold text-primary-dark">{submittedData.response.status}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Medidas adoptadas para solucionar el reclamo:</span>
                <p className="text-gray-800 text-xs sm:text-sm mt-1">
                  {submittedData.response.measuresAdopted}
                </p>
              </div>
            </div>

            {/* 5. Firmas (Consumidor y Representante del Negocio) */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white">
              <div className="border border-gray-300 rounded-xl p-4 text-center flex flex-col justify-between min-h-[130px]">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Firma del Consumidor</p>
                <div className="my-3 py-2 border-b border-dashed border-gray-400">
                  <p className="font-serif italic text-xl text-gray-900">{submittedData.signatures.consumer}</p>
                </div>
                <p className="text-[11px] text-gray-600">
                  {submittedData.consumer.name} — {submittedData.consumer.docType} {submittedData.consumer.docNumber}
                  <br />
                  Firmado electrónicamente el {new Date(submittedData.createdAt).toLocaleString('es-PE', { timeZone: 'America/Lima' })}
                </p>
              </div>

              <div className="border border-gray-300 rounded-xl p-4 text-center flex flex-col justify-between min-h-[130px]">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Firma del Representante del Negocio que Recibe el Reclamo
                </p>
                <div className="my-3 py-2 border-b border-dashed border-gray-400">
                  <p className="font-serif italic text-lg text-primary-dark">{submittedData.provider.legalName}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Sello de Recepción Electrónica — RUC {submittedData.provider.ruc}
                  </p>
                </div>
                <p className="text-[11px] text-gray-600">
                  Representante Legal / Área de Atención al Usuario
                  <br />
                  Recepción automática verificada ({submittedData.complaintCode})
                </p>
              </div>
            </div>

            {/* Pie Legal Obligatorio INDECOPI */}
            <div className="p-4 bg-gray-100 text-[11px] text-gray-700 space-y-1">
              <p>
                <strong>RECLAMO:</strong> Disconformidad relacionada con los productos o servicios. |{' '}
                <strong>QUEJA:</strong> Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público.
              </p>
              <p>
                * La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.
              </p>
              <p>
                * El proveedor debe dar respuesta al reclamo o queja en un plazo no mayor a treinta (30) días calendario, conforme a la Ley N° 29571 y el Decreto Supremo N° 011-2011-PCM (modificado por D.S. N° 101-2022-PCM).
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── FORMULARIO DE LIBRO DE RECLAMACIONES ──
  return (
    <div className="space-y-8">
      {/* Aviso Obligatorio de INDECOPI */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-start gap-3.5">
          <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs sm:text-sm text-amber-950">
            <p className="font-bold text-sm sm:text-base text-amber-900 uppercase tracking-wide">
              Aviso Obligatorio — Libro de Reclamaciones Virtual (Ley N° 29571 y D.S. N° 011-2011-PCM)
            </p>
            <p>
              Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571) y el Reglamento del Libro de Reclamaciones (Decreto Supremo N° 011-2011-PCM), este establecimiento cuenta con un <strong>Libro de Reclamaciones Virtual</strong> a tu disposición.
            </p>
            <p className="font-semibold">
              • El reclamo o queja registrado será respondido en un plazo máximo de treinta (30) días calendario a tu correo electrónico.
              <br />• Una vez enviado el formulario, recibirás inmediatamente un código único de identificación y una copia imprimible de tu Hoja de Reclamación.
            </p>
          </div>
        </div>
      </div>

      {/* Sección 1: Datos del Proveedor (Empresa o Negocio) */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-gray-100">
          <h2 className="font-serif text-xl sm:text-2xl text-primary-dark flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" /> 1. Datos del Proveedor (Empresa o Negocio)
          </h2>
          <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            Fecha de emisión: {todayFormatted}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-light block">
              Razón Social y Nombre Comercial
            </span>
            <span className="font-bold text-text-main">
              {brand.legalName} ({brand.name})
            </span>
          </div>
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-light block">
              RUC (Registro Único de Contribuyentes)
            </span>
            <span className="font-bold text-text-main">{brand.ruc}</span>
          </div>
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-light block">
              Dirección del Establecimiento
            </span>
            <span className="font-semibold text-text-main">{brand.contact.address}</span>
          </div>
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-light block">
              Teléfono de Contacto
            </span>
            <span className="font-semibold text-text-main">{brand.contact.phone}</span>
          </div>
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 sm:col-span-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-light block">
              Correo Electrónico del Proveedor
            </span>
            <span className="font-semibold text-text-main break-all">{brand.contact.email}</span>
          </div>
        </div>
      </div>

      {/* Formulario Principal */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección 2: Datos del Consumidor */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h2 className="font-serif text-xl sm:text-2xl text-primary-dark flex items-center gap-2 border-b border-gray-100 pb-3">
            <User className="w-5 h-5 text-primary" /> 2. Datos del Consumidor Reclamante
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label htmlFor="consumer-name" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Nombres y Apellidos Completos *
              </label>
              <input
                id="consumer-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={consumerName}
                onChange={(e) => {
                  const val = e.target.value;
                  setConsumerName(val);
                  if (!signatureManuallyEdited) {
                    setConsumerSignature(val);
                  }
                }}
                placeholder="Ej. Juan Carlos Pérez Quispe"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
              />
            </div>

            <div>
              <label htmlFor="consumer-doc-type" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Tipo de Documento *
              </label>
              <select
                id="consumer-doc-type"
                name="docType"
                required
                value={consumerDocType}
                onChange={(e) => setConsumerDocType(e.target.value as 'DNI' | 'CE' | 'PASSPORT' | 'RUC')}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
              >
                <option value="DNI">DNI (Documento Nacional de Identidad)</option>
                <option value="CE">CE (Carnet de Extranjería)</option>
                <option value="PASSPORT">Pasaporte</option>
                <option value="RUC">RUC</option>
              </select>
            </div>

            <div>
              <label htmlFor="consumer-doc-number" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Número de Documento *
              </label>
              <input
                id="consumer-doc-number"
                name="docNumber"
                type="text"
                required
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                inputMode={consumerDocType === 'DNI' || consumerDocType === 'RUC' ? 'numeric' : 'text'}
                maxLength={consumerDocType === 'DNI' ? 8 : consumerDocType === 'RUC' ? 11 : 25}
                value={consumerDocNumber}
                onChange={(e) => setConsumerDocNumber(e.target.value)}
                placeholder={consumerDocType === 'DNI' ? '8 dígitos numéricos' : 'Número de documento'}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
              />
            </div>

            <div>
              <label htmlFor="consumer-phone" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Teléfono / Celular *
              </label>
              <input
                id="consumer-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                value={consumerPhone}
                onChange={(e) => setConsumerPhone(e.target.value)}
                placeholder="Ej. +51 987 654 321"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
              />
            </div>

            <div>
              <label htmlFor="consumer-email" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Correo Electrónico *
              </label>
              <input
                id="consumer-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={consumerEmail}
                onChange={(e) => setConsumerEmail(e.target.value)}
                placeholder="correo@ejemplo.com (recibirá copia de la constancia)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="consumer-address" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Domicilio Completo (Dirección, Distrito, Ciudad, País) *
              </label>
              <textarea
                id="consumer-address"
                name="address"
                rows={2}
                required
                autoComplete="street-address"
                value={consumerAddress}
                onChange={(e) => setConsumerAddress(e.target.value)}
                placeholder="Ej. Av. La Cultura 450, Wanchaq, Cusco, Perú"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
              />
            </div>

            <div className="md:col-span-2 pt-1">
              <label className="inline-flex items-center gap-2.5 cursor-pointer text-sm text-text-main">
                <input
                  type="checkbox"
                  checked={isMinor}
                  onChange={(e) => setIsMinor(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <span>El consumidor es menor de edad (requiere datos del padre, madre o apoderado)</span>
              </label>
            </div>

            {isMinor && (
              <div className="md:col-span-2">
                <label htmlFor="guardian-name" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                  Nombres y Apellidos del Padre, Madre o Apoderado *
                </label>
                <input
                  id="guardian-name"
                  name="guardianName"
                  type="text"
                  required={isMinor}
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="Nombre completo del representante legal del menor"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
                />
              </div>
            )}
          </div>
        </div>

        {/* Sección 3: Información sobre la Queja o Reclamo y Bien Contratado */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h2 className="font-serif text-xl sm:text-2xl text-primary-dark flex items-center gap-2 border-b border-gray-100 pb-3">
            <FileText className="w-5 h-5 text-primary" /> 3. Información sobre la Queja o Reclamo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Fecha del Reclamo o Queja
              </span>
              <div className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700">
                {todayFormatted}
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Tipo de Bien Contratado *
              </span>
              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Tipo de Bien Contratado">
                <label
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-bold border cursor-pointer transition-colors ${
                    goodType === 'SERVICIO'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-50 text-text-main border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="goodType"
                    value="SERVICIO"
                    checked={goodType === 'SERVICIO'}
                    onChange={() => setGoodType('SERVICIO')}
                    className="sr-only"
                  />
                  <span>Servicio (Tour)</span>
                </label>
                <label
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-bold border cursor-pointer transition-colors ${
                    goodType === 'PRODUCTO'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-50 text-text-main border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="goodType"
                    value="PRODUCTO"
                    checked={goodType === 'PRODUCTO'}
                    onChange={() => setGoodType('PRODUCTO')}
                    className="sr-only"
                  />
                  <span>Producto</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="claimed-amount" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Monto Reclamado (Si aplica)
              </label>
              <div className="flex">
                <select
                  aria-label="Moneda del monto reclamado"
                  value={claimedCurrency}
                  onChange={(e) => setClaimedCurrency(e.target.value as 'USD' | 'PEN')}
                  className="bg-gray-100 border border-gray-200 border-r-0 rounded-l-xl px-3 py-3 text-sm font-bold text-text-main outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="PEN">PEN (S/)</option>
                </select>
                <input
                  id="claimed-amount"
                  name="claimedAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  max="99999999.99"
                  value={claimedAmount}
                  onChange={(e) => setClaimedAmount(e.target.value)}
                  placeholder="0.00 (Opcional)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="good-description" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Descripción del Producto o Servicio Involucrado *
              </label>
              <input
                id="good-description"
                name="goodDescription"
                type="text"
                required
                value={goodDescription}
                onChange={(e) => setGoodDescription(e.target.value)}
                placeholder="Ej. Tour Machu Picchu Full Day / Paquete Valle Sagrado VIP"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
              />
            </div>

            <div>
              <label htmlFor="booking-code" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Código de Reserva (Opcional)
              </label>
              <input
                id="booking-code"
                name="bookingCode"
                type="text"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
                placeholder={`Ej. ${brand.bookingPrefix}-A1B2C3`}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
              />
            </div>
          </div>

          {/* 4. Tipo de Requerimiento (Reclamo vs Queja) */}
          <div className="pt-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-text-main mb-2">
              Tipo de Requerimiento *
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  requirementType === 'RECLAMO'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 bg-gray-50 hover:bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="requirementType"
                  value="RECLAMO"
                  checked={requirementType === 'RECLAMO'}
                  onChange={() => setRequirementType('RECLAMO')}
                  className="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div>
                  <span className="font-bold text-sm text-primary-dark block">RECLAMO</span>
                  <span className="text-xs text-text-light leading-relaxed">
                    Disconformidad relacionada directamente con los productos o servicios adquiridos.
                  </span>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  requirementType === 'QUEJA'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 bg-gray-50 hover:bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="requirementType"
                  value="QUEJA"
                  checked={requirementType === 'QUEJA'}
                  onChange={() => setRequirementType('QUEJA')}
                  className="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div>
                  <span className="font-bold text-sm text-primary-dark block">QUEJA</span>
                  <span className="text-xs text-text-light leading-relaxed">
                    Malestar o descontento por mala atención o trato inadecuado, sin relación directa con el giro del producto o servicio.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Detalle del motivo del reclamo o queja */}
          <div>
            <label htmlFor="claim-detail" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
              Detalle del Motivo del Reclamo o Queja *
            </label>
            <textarea
              id="claim-detail"
              name="detail"
              rows={4}
              required
              minLength={10}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Describa de forma clara y detallada los hechos que motivan su reclamo o queja (fechas, horarios, personas o servicios involucrados)..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
            />
          </div>

          {/* Pedido del consumidor */}
          <div>
            <label htmlFor="consumer-request" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
              Pedido del Consumidor (Explicación de la Solución Esperada) *
            </label>
            <textarea
              id="consumer-request"
              name="consumerRequest"
              rows={3}
              required
              minLength={5}
              value={consumerRequest}
              onChange={(e) => setConsumerRequest(e.target.value)}
              placeholder="Indique qué solución espera recibir (ej. devolución de dinero, cambio de fecha/producto, reprogramación, mejora en la atención, etc.)..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-colors text-base"
            />
          </div>
        </div>

        {/* Sección 4: Respuesta de la Empresa */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-primary-dark flex items-center gap-2 border-b border-gray-100 pb-3">
            <Clock className="w-5 h-5 text-primary" /> 4. Respuesta de la Empresa y Compromiso de Atención
          </h2>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm space-y-2 text-text-main">
            <p>
              <strong>Plazo máximo de respuesta:</strong> Conforme al artículo 24° de la Ley N° 29571 (modificado por Ley N° 31435 y D.S. N° 101-2022-PCM), <strong>{brand.legalName}</strong> dará respuesta formal a su reclamo o queja en un plazo <strong>máximo de treinta (30) días calendario improrrogables</strong> (fecha límite estimada si registra hoy: <strong>{estimatedDeadlineFormatted}</strong>).
            </p>
            <p>
              <strong>Medidas adoptadas para solucionar el reclamo:</strong> Al registrarse la Hoja de Reclamación, nuestro Comité de Atención al Usuario asigna un código de seguimiento único, evalúa los descargos del área operativa involucrada y remite al correo electrónico del consumidor las medidas correctivas, reembolso, reprogramación o respuesta sustentada adoptada por la empresa.
            </p>
          </div>
        </div>

        {/* Sección 5: Firmas (Consumidor y Representante del Negocio) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h2 className="font-serif text-xl sm:text-2xl text-primary-dark flex items-center gap-2 border-b border-gray-100 pb-3">
            <PenTool className="w-5 h-5 text-primary" /> 5. Firmas de Conformidad
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Firma del Consumidor */}
            <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 flex flex-col justify-between">
              <div>
                <label htmlFor="consumer-signature" className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                  Firma del Consumidor (Firma Electrónica) *
                </label>
                <p className="text-xs text-text-light mb-3">
                  Escriba sus nombres y apellidos completos como firma electrónica de conformidad con lo declarado:
                </p>
                <input
                  id="consumer-signature"
                  name="consumerSignature"
                  type="text"
                  required
                  value={consumerSignature}
                  onChange={(e) => {
                    setSignatureManuallyEdited(true);
                    setConsumerSignature(e.target.value);
                  }}
                  placeholder={consumerName || 'Escriba su nombre completo para firmar'}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-primary outline-none font-serif italic text-lg text-gray-900"
                />
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-gray-300 text-center">
                <p className="font-serif italic text-xl text-gray-800 min-h-[28px]">
                  {consumerSignature || 'Firma del Consumidor'}
                </p>
                <p className="text-[11px] uppercase font-bold tracking-wider text-gray-500 mt-1">
                  Firma del Consumidor Reclamante
                </p>
              </div>
            </div>

            {/* Firma del Representante del Negocio */}
            <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 flex flex-col justify-between">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                  Firma del Representante del Negocio que Recibe el Reclamo
                </span>
                <p className="text-xs text-text-light mb-3">
                  Constancia de recepción electrónica suscrita por el representante autorizado del proveedor:
                </p>
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 text-center">
                  <p className="font-serif italic text-xl text-primary-dark">{brand.legalName}</p>
                  <p className="text-[11px] font-semibold text-gray-600 mt-0.5">
                    RUC: {brand.ruc} — Área de Atención al Usuario
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-gray-300 text-center">
                <p className="text-xs font-semibold text-gray-700">{brand.legalName}</p>
                <p className="text-[11px] uppercase font-bold tracking-wider text-gray-500 mt-0.5">
                  Firma del Representante del Negocio
                </p>
              </div>
            </div>
          </div>

          {/* Declaración Jurada y Política de Privacidad */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={acceptSwornDeclaration}
                onChange={(e) => setAcceptSwornDeclaration(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-xs sm:text-sm text-text-main leading-relaxed">
                Declaro bajo juramento que los datos consignados en la presente Hoja de Reclamación son verdaderos y autorizo el tratamiento de mis datos personales conforme a la{' '}
                <Link href="/politicas" className="text-primary font-semibold hover:underline" target="_blank">
                  Ley N° 29733 — Política de Privacidad
                </Link>{' '}
                para la gestión y respuesta de este requerimiento.
              </span>
            </label>
          </div>

          {errorMsg && (
            <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm font-medium flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-base shadow-lg hover:bg-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Registrando Hoja de Reclamación...' : 'Enviar y Generar Hoja de Reclamación'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
