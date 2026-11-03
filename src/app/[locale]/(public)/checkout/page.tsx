'use client';

// Culqi Checkout Custom v1.0 — tipos cargados desde src/types/culqi.d.ts
// La declaración global de window.CulqiCheckout vive en ese archivo.

import { useCartStore, TEST_PEN_TOUR_SLUG } from '@/store/useCartStore';
import { Link, useRouter } from '@/i18n/navigation';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { ShieldCheck, User, CreditCard, Smartphone } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useTranslations } from 'next-intl';
import type { CulqiInstance } from '@/types/culqi';
import { getBrandConfig } from '@/lib/brand';

interface PassengerForm {
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: string;
  docType: string;
  docNumber: string;
}

/** Método de pago seleccionado: tarjeta usa USD, yape usa PEN */
type PaymentMethod = 'card' | 'yape' | 'paypal';

/** Llave pública de Culqi (debe tener prefijo NEXT_PUBLIC_) */
const CULQI_PUBLIC_KEY = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY ?? '';

/** Tasa de cambio referencial USD a PEN para cobros en Soles (Yape) */
const USD_TO_PEN_RATE = 3.80;

const COUNTRY_CODES: Record<string, string> = {
  'Perú': 'PE',
  'Estados Unidos': 'US',
  'España': 'ES',
  'Colombia': 'CO',
  'México': 'MX',
  'Chile': 'CL',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart, removeItem } = useCartStore();
  const t = useTranslations('checkout');
  const tc = useTranslations('common');
  const brand = getBrandConfig();

  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardCurrency, setCardCurrency] = useState<'USD' | 'PEN'>('USD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  /** true = el script de Culqi ya cargó */
  const [culqiReady, setCulqiReady] = useState(false);

  // Contact Info
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactPhonePrefix, setContactPhonePrefix] = useState('+51');
  const [acceptTerms, setAcceptTerms] = useState(false);

  /** Instancia activa de CulqiCheckout */
  const culqiRef = useRef<CulqiInstance | null>(null);

  const isPenCart = items.length > 0 && items.every(
    item => item.currency === 'PEN' || item.tourSlug === TEST_PEN_TOUR_SLUG
  );

  // Totales calculados en PEN y USD respetando tours nativos en PEN (ej. Paquete de prueba S/ 10.00)
  const totalInPen = Math.round(
    items.reduce((sum, item) => {
      const isPen = item.currency === 'PEN' || item.tourSlug === TEST_PEN_TOUR_SLUG;
      return sum + (isPen ? item.totalPrice : item.totalPrice * USD_TO_PEN_RATE);
    }, 0) * 100
  ) / 100;

  const totalInUsd = Math.round(
    items.reduce((sum, item) => {
      const isPen = item.currency === 'PEN' || item.tourSlug === TEST_PEN_TOUR_SLUG;
      return sum + (isPen ? item.totalPrice / USD_TO_PEN_RATE : item.totalPrice);
    }, 0) * 100
  ) / 100;

  const activeCardCurrency: 'PEN' | 'USD' = isPenCart ? 'PEN' : cardCurrency;

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
    currency: 'USD',
    intent: 'capture',
  };

  // Calcular pasajeros necesarios (el máximo entre todos los tours del carrito)
  const maxAdults   = items.length > 0 ? Math.max(...items.map(i => i.adults))   : 0;
  const maxChildren = items.length > 0 ? Math.max(...items.map(i => i.children)) : 0;

  const [adultsInfo,   setAdultsInfo]   = useState<PassengerForm[]>([]);
  const [childrenInfo, setChildrenInfo] = useState<PassengerForm[]>([]);

  // ── Inicializar formularios de pasajeros y detectar Culqi en SPA ───────────
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && typeof window.CulqiCheckout !== 'undefined') {
      setCulqiReady(true);
    }
    if (maxAdults > 0 && adultsInfo.length === 0) {
      setAdultsInfo(
        Array.from({ length: maxAdults }, () => ({
          firstName: '', lastName: '', nationality: 'Perú',
          birthDate: '', docType: 'DNI', docNumber: '',
        }))
      );
    }
    if (maxChildren > 0 && childrenInfo.length === 0) {
      setChildrenInfo(
        Array.from({ length: maxChildren }, () => ({
          firstName: '', lastName: '', nationality: 'Perú',
          birthDate: '', docType: 'DNI', docNumber: '',
        }))
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxAdults, maxChildren]);

  // Cerrar instancia de Culqi al desmontar la página
  useEffect(() => {
    return () => {
      if (culqiRef.current) {
        try {
          culqiRef.current.close();
        } catch {}
      }
    };
  }, []);

  if (!mounted) return <div className="min-h-screen" />;
  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleAdultChange = (index: number, field: keyof PassengerForm, value: string) => {
    const newAdults = [...adultsInfo];
    newAdults[index] = { ...newAdults[index], [field]: value };
    setAdultsInfo(newAdults);
  };

  const handleChildChange = (index: number, field: keyof PassengerForm, value: string) => {
    const newChildren = [...childrenInfo];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setChildrenInfo(newChildren);
  };

  const registerBooking = async (
    paymentRef: string,
    method: string,
    paymentStatus: 'PAID' | 'PENDING',
    paidCurrency: 'USD' | 'PEN' = isPenCart ? 'PEN' : 'USD'
  ) => {
    const allPassengers = [
      ...adultsInfo.map(a => ({ ...a, isChild: false })),
      ...childrenInfo.map(c => ({ ...c, isChild: true }))
    ];

    let lastBookingCode = '';
    let allSuccess = true;

    for (const item of items) {
      const isPenItem = item.currency === 'PEN' || item.tourSlug === TEST_PEN_TOUR_SLUG;
      const itemCurrency: 'USD' | 'PEN' = isPenItem ? 'PEN' : paidCurrency;
      const itemAmountPaid =
        itemCurrency === 'PEN' && !isPenItem
          ? Math.round(item.totalPrice * USD_TO_PEN_RATE * 100) / 100
          : item.totalPrice;

      const bookingData = {
        tenant: brand.id,
        tourId: item.tourId,
        tourName: item.tourName,
        date: item.date,
        adults: item.adults,
        children: item.children,
        totalPrice: itemAmountPaid,
        currency: itemCurrency,
        contactName: adultsInfo[0]?.firstName ? `${adultsInfo[0].firstName} ${adultsInfo[0].lastName}` : tc('client'),
        contactEmail,
        contactPhone: contactPhonePrefix + contactPhone,
        paymentMethod: method,
        paymentRef,
        paymentStatus,
        passengers: allPassengers
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (data.success) {
        lastBookingCode = data.bookingCode;
      } else {
        allSuccess = false;
        break;
      }
    }

    if (allSuccess) {
      clearCart();
      router.push(`/success?code=${lastBookingCode}`);
    } else {
      setFormError(t('errors.bookingRegistration'));
      setIsProcessing(false);
    }
  };

  const validatePassengers = (): string | null => {
    if (!contactEmail || !contactPhone) return 'Email y teléfono son requeridos';
    for (const p of adultsInfo) {
      if (!p.firstName.trim() || !p.lastName.trim()) return 'Nombre completo requerido para todos los pasajeros';
      if (!p.docNumber.trim()) return 'Número de documento requerido';
      if (p.docType === 'DNI' && !/^\d{8}$/.test(p.docNumber)) return 'DNI debe tener exactamente 8 dígitos';
      if (!p.birthDate) return 'Fecha de nacimiento requerida';
    }
    for (const p of childrenInfo) {
      if (!p.firstName.trim() || !p.lastName.trim()) return 'Nombre completo requerido para todos los niños';
      if (!p.docNumber.trim()) return 'Número de documento requerido para niños';
    }
    if (!acceptTerms) return t('policies.mustAcceptTerms');
    return null;
  };

  /**
   * Abre Culqi Checkout Custom.
   * - Tarjeta → USD
   * - Yape    → PEN (requerido por Culqi para billeteras móviles)
   */
  const handleCulqiPay = (e: FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'paypal') return;

    const validationError = validatePassengers();
    if (validationError) { setFormError(validationError); return; }
    setFormError(null);

    if (typeof window === 'undefined' || typeof window.CulqiCheckout === 'undefined') {
      setFormError('El sistema de pago aún se está cargando. Por favor espera un momento e intenta nuevamente.');
      return;
    }

    if (!CULQI_PUBLIC_KEY) {
      setFormError('Error de configuración: Llave pública de Culqi no configurada.');
      return;
    }

    // Moneda dinámica: PEN para Yape o cuando se selecciona PEN / paquete en Soles
    const isYape = paymentMethod === 'yape';
    const currency: 'PEN' | 'USD' = isYape ? 'PEN' : activeCardCurrency;
    const finalAmount = currency === 'PEN' ? totalInPen : totalInUsd;
    const amountInCents = Math.round(finalAmount * 100);

    // Cerrar modal previo si existiera
    if (culqiRef.current) {
      try {
        culqiRef.current.close();
      } catch {}
    }

    const updatedInstance = new window.CulqiCheckout(CULQI_PUBLIC_KEY, {
      settings: {
        title: brand.name,
        currency,
        amount: amountInCents,
      },
      client: {
        email: contactEmail,
      },
      options: {
        lang: 'auto',
        installments: false,
        modal: true,
        paymentMethods: {
          tarjeta:    paymentMethod === 'card',
          yape:       paymentMethod === 'yape',
          billetera:  false,
          bancaMovil: false,
          agente:     false,
          cuotealo:   false,
        },
        paymentMethodsSort: paymentMethod === 'yape' ? ['yape'] : ['tarjeta'],
      },
      appearance: {
        theme: 'default',
        hiddenCulqiLogo: false,
        hiddenBanner: false,
        hiddenEmail: false,
        menuType: 'sidebar',
        buttonCardPayText: 'Confirmar pago',
        logo: null,
        defaultStyle: {
          bannerColor:      brand.colors.primary,
          buttonBackground: brand.colors.primaryDark,
          menuColor:        brand.colors.primary,
          linksColor:       brand.colors.primary,
          buttonTextColor:  brand.colors.white,
          priceColor:       brand.colors.primary,
        },
      },
    });

    culqiRef.current = updatedInstance;

    // Resetear spinner si el usuario cierra el checkout sin pagar
    updatedInstance.closeCheckout = function () {
      setIsProcessing(false);
    };

    const handleSuccessOrError = async (instance: CulqiInstance) => {
      if (instance.token) {
        setIsProcessing(true);
        setFormError(null);
        try {
          try {
            instance.close();
          } catch {}

          const primaryPassenger = adultsInfo[0];
          const fullPhone = (contactPhonePrefix + contactPhone).replace(/\s+/g, '');
          const digitsOnlyPhone = fullPhone.replace(/\D/g, '').slice(0, 14);
          const actualMethod =
            paymentMethod === 'yape' || instance.token.id?.startsWith('ype_') ? 'yape' : 'culqi';

          const res = await fetch('/api/checkout/culqi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token_id: instance.token.id,
              email:    instance.token.email || contactEmail,
              amount:   finalAmount,
              currency,
              description: items.map(i => i.tourName).join(', ').slice(0, 80),
              metadata: {
                contactName: primaryPassenger ? `${primaryPassenger.firstName} ${primaryPassenger.lastName}` : '',
                contactPhone: fullPhone,
                tourCount: items.length.toString(),
                paymentMethod: actualMethod,
              },
              antifraud_details: primaryPassenger ? {
                first_name: primaryPassenger.firstName.trim(),
                last_name: primaryPassenger.lastName.trim(),
                phone_number: digitsOnlyPhone,
                country_code: COUNTRY_CODES[primaryPassenger.nationality] || 'PE',
              } : undefined,
            }),
          });

          const chargeData = await res.json();
          if (chargeData.success) {
            await registerBooking(chargeData.chargeId, actualMethod, 'PAID', currency);
          } else {
            setFormError(`Error de pago: ${chargeData.error || 'Error desconocido'}`);
            setIsProcessing(false);
          }
        } catch {
          setFormError('Error de red al conectar con la pasarela. Intenta nuevamente.');
          setIsProcessing(false);
        }
      } else if (instance.error) {
        setFormError(instance.error.user_message || 'Datos incorrectos. Verifica e intenta nuevamente.');
        setIsProcessing(false);
      }
    };

    // Definir callback en la instancia
    updatedInstance.culqi = async function (this: CulqiInstance) {
      await handleSuccessOrError(this || updatedInstance);
    };

    // Callback en window para compatibilidad
    if (typeof window !== 'undefined') {
      window.culqi = function () {
        handleSuccessOrError(updatedInstance);
      };
    }

    updatedInstance.open();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Culqi Checkout Custom v1.0 — nuevo SDK multipago */}
      <Script
        src="https://js.culqi.com/checkout-js"
        strategy="afterInteractive"
        onLoad={() => setCulqiReady(true)}
        onReady={() => setCulqiReady(true)}
      />
      <div className="bg-background-alt min-h-screen pt-24 sm:pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          
          {/* Stepper Header */}
          <div className="flex justify-center items-center mb-8 sm:mb-10 text-xs sm:text-sm font-bold text-text-light uppercase tracking-wider">
            <span className="flex items-center text-primary"><span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center mr-1 sm:mr-2">1</span> <span className="hidden sm:inline">{t('steps.cart')}</span></span>
            <span className="mx-2 sm:mx-4 text-gray-300">---</span>
            <span className="flex items-center text-primary"><span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center mr-1 sm:mr-2 bg-primary text-white">2</span> <span className="hidden sm:inline">{t('steps.payment')}</span><span className="sm:hidden">{t('steps.paymentShort')}</span></span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Form Area */}
            <div className="w-full lg:w-2/3">
              <form onSubmit={handleCulqiPay} className="space-y-6">
                
                <h1 className="text-xl sm:text-2xl font-serif text-primary-dark mb-4 sm:mb-6">{t('registerPassengers')}</h1>
                
                {/* Contact Person */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
                  <h2 className="text-sm font-bold text-text-main mb-1">{t('contactPerson.title')}</h2>
                  <p className="text-xs text-text-light mb-4">{t('contactPerson.description')}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex">
                      <select 
                        value={contactPhonePrefix}
                        onChange={(e) => setContactPhonePrefix(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-l-lg px-3 py-3 outline-none w-24 border-r-0"
                      >
                        <option value="+51">🇵🇪 +51</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+34">🇪🇸 +34</option>
                        <option value="+52">🇲🇽 +52</option>
                        <option value="+57">🇨🇴 +57</option>
                      </select>
                      <input 
                        required 
                        type="tel" 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-lg focus:ring-primary focus:border-primary outline-none transition-colors text-base" 
                        placeholder={t('contactPerson.phonePlaceholder')} 
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <input 
                        required 
                        type="email" 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary outline-none transition-colors text-base" 
                        placeholder={t('contactPerson.emailPlaceholder')} 
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </div>

                {/* Adults Form */}
                {adultsInfo.map((adult, index) => (
                  <div key={`adult-${index}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-bold text-primary flex items-center"><User className="w-4 h-4 mr-2"/> {t('passenger.adultTitle', { number: index + 1 })}</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required type="text" placeholder={t('passenger.firstNamePlaceholder')} value={adult.firstName} onChange={(e) => handleAdultChange(index, 'firstName', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary text-base" autoComplete="given-name" />
                      <input required type="text" placeholder={t('passenger.lastNamePlaceholder')} value={adult.lastName} onChange={(e) => handleAdultChange(index, 'lastName', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary text-base" autoComplete="family-name" />
                      <select required value={adult.nationality} onChange={(e) => handleAdultChange(index, 'nationality', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary text-base">
                        <option value="Perú">{t('nationality.peru')}</option>
                        <option value="Estados Unidos">{t('nationality.usa')}</option>
                        <option value="España">{t('nationality.spain')}</option>
                        <option value="Colombia">{t('nationality.colombia')}</option>
                        <option value="México">{t('nationality.mexico')}</option>
                        <option value="Chile">{t('nationality.chile')}</option>
                        <option value="Otro">{t('nationality.other')}</option>
                      </select>
                      <input required type="date" max={today} placeholder={t('passenger.birthDatePlaceholder')} value={adult.birthDate} onChange={(e) => handleAdultChange(index, 'birthDate', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary text-base" />
                      <div className="col-span-full flex flex-col sm:flex-row">
                        <select value={adult.docType} onChange={(e) => handleAdultChange(index, 'docType', e.target.value)} className="bg-white border border-gray-200 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none px-4 py-3 outline-none w-full sm:w-1/3 border-b-0 sm:border-b sm:border-r-0 text-base">
                          <option value="DNI">{t('docType.dni')}</option>
                          <option value="PASSPORT">{t('docType.passport')}</option>
                          <option value="CE">{t('docType.foreignId')}</option>
                        </select>
                        <input required type="text" placeholder={t('passenger.docNumberPlaceholder')} value={adult.docNumber} onChange={(e) => handleAdultChange(index, 'docNumber', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none outline-none focus:border-primary text-base" inputMode={adult.docType === 'DNI' || adult.docType === 'CE' ? 'numeric' : 'text'} pattern={adult.docType === 'DNI' || adult.docType === 'CE' ? '[0-9]*' : undefined} />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Children Form */}
                {childrenInfo.map((child, index) => (
                  <div key={`child-${index}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-bold text-primary flex items-center"><User className="w-4 h-4 mr-2"/> {t('passenger.childTitle', { number: index + 1 })}</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required type="text" placeholder={t('passenger.firstNamePlaceholder')} value={child.firstName} onChange={(e) => handleChildChange(index, 'firstName', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary text-base" autoComplete="given-name" />
                      <input required type="text" placeholder={t('passenger.lastNamePlaceholder')} value={child.lastName} onChange={(e) => handleChildChange(index, 'lastName', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary text-base" autoComplete="family-name" />
                      <select required value={child.nationality} onChange={(e) => handleChildChange(index, 'nationality', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary text-base">
                        <option value="Perú">{t('nationality.peru')}</option>
                        <option value="Estados Unidos">{t('nationality.usa')}</option>
                        <option value="España">{t('nationality.spain')}</option>
                        <option value="Colombia">{t('nationality.colombia')}</option>
                        <option value="México">{t('nationality.mexico')}</option>
                        <option value="Chile">{t('nationality.chile')}</option>
                        <option value="Otro">{t('nationality.other')}</option>
                      </select>
                      <input required type="date" max={today} placeholder={t('passenger.birthDatePlaceholder')} value={child.birthDate} onChange={(e) => handleChildChange(index, 'birthDate', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary text-base" />
                      <div className="col-span-full flex flex-col sm:flex-row">
                        <select value={child.docType} onChange={(e) => handleChildChange(index, 'docType', e.target.value)} className="bg-white border border-gray-200 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none px-4 py-3 outline-none w-full sm:w-1/3 border-b-0 sm:border-b sm:border-r-0 text-base">
                          <option value="DNI">{t('docType.dni')}</option>
                          <option value="PASSPORT">{t('docType.passport')}</option>
                          <option value="CE">{t('docType.foreignId')}</option>
                        </select>
                        <input required type="text" placeholder={t('passenger.docNumberPlaceholder')} value={child.docNumber} onChange={(e) => handleChildChange(index, 'docNumber', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none outline-none focus:border-primary text-base" inputMode={child.docType === 'DNI' || child.docType === 'CE' ? 'numeric' : 'text'} pattern={child.docType === 'DNI' || child.docType === 'CE' ? '[0-9]*' : undefined} />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Step 2: Pago */}
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-primary-dark mb-6 flex items-center pt-8 border-t">
                    {t('payment.selectMethod')}
                  </h2>
                  
                  <div className="space-y-4">
                    {/* ── Opción: Tarjeta de débito / crédito ── */}
                    <label
                      id="payment-method-card"
                      className={`block border rounded-xl p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'card'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:bg-white bg-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="radio-card"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                        />
                        <CreditCard className="w-5 h-5 ml-3 text-gray-500" />
                        <span className="ml-2 font-medium flex-1">{t('payment.creditDebitCard')}</span>
                        <div className="flex gap-2 text-xs font-bold text-gray-400">
                          <span className="bg-gray-100 px-2 py-1 rounded">VISA</span>
                          <span className="bg-gray-100 px-2 py-1 rounded">MC</span>
                          <span className="bg-gray-100 px-2 py-1 rounded">AMEX</span>
                        </div>
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="mt-4 pl-9 space-y-3">
                          {!isPenCart && (
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-text-light font-medium">Moneda de cobro:</span>
                              <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); setCardCurrency('USD'); }}
                                className={`px-3 py-1 rounded-full font-bold transition-colors ${
                                  activeCardCurrency === 'USD'
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-text-main hover:bg-gray-200'
                                }`}
                              >
                                USD (US$ {totalInUsd.toFixed(2)})
                              </button>
                              <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); setCardCurrency('PEN'); }}
                                className={`px-3 py-1 rounded-full font-bold transition-colors ${
                                  activeCardCurrency === 'PEN'
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-text-main hover:bg-gray-200'
                                }`}
                              >
                                PEN (S/ {totalInPen.toFixed(2)})
                              </button>
                            </div>
                          )}
                          <p className="text-sm text-text-light bg-gray-50 rounded-lg p-4 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 shrink-0 text-green-600" />
                            <span>
                              Se abrirá el formulario seguro de Culqi. Pago en{' '}
                              <strong>
                                {activeCardCurrency === 'PEN'
                                  ? `Soles (S/ ${totalInPen.toFixed(2)} PEN)`
                                  : `Dólares (US$ ${totalInUsd.toFixed(2)} USD)`}
                              </strong>.
                            </span>
                          </p>
                        </div>
                      )}
                    </label>

                    {/* ── Opción: Yape ── */}
                    <label
                      id="payment-method-yape"
                      className={`block border rounded-xl p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'yape'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:bg-white bg-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="radio-yape"
                          name="payment"
                          value="yape"
                          checked={paymentMethod === 'yape'}
                          onChange={() => setPaymentMethod('yape')}
                          className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                        />
                        <Smartphone className="w-5 h-5 ml-3 text-[#6E2ED6]" />
                        <span className="ml-2 font-medium flex-1">
                          <span className="text-[#6E2ED6] font-bold">Yape</span>
                          <span className="ml-2 text-xs text-gray-400 font-normal">Solo para residentes en Perú</span>
                        </span>
                        <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded">PEN</span>
                      </div>
                      {paymentMethod === 'yape' && (
                        <div className="mt-4 pl-9">
                          <div className="text-sm text-text-light bg-purple-50 rounded-lg p-4 space-y-2">
                            <p className="flex items-center gap-2">
                              <ShieldCheck className="w-5 h-5 shrink-0 text-[#6E2ED6]" />
                              Necesitarás el código de aprobación de <strong>6 dígitos</strong> de tu app Yape.
                            </p>
                            <p className="text-xs text-purple-900 font-medium">
                              Total a pagar: <strong>S/ {totalInPen.toFixed(2)} PEN</strong>
                              {!isPenCart && ` (T.C. ref: S/ ${USD_TO_PEN_RATE.toFixed(2)} por USD)`}
                            </p>
                          </div>
                        </div>
                      )}
                    </label>

                    {/* PayPal */}
                    <label className={`block border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-white bg-white'}`}>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="paypal" 
                          checked={paymentMethod === 'paypal'} 
                          onChange={() => setPaymentMethod('paypal')}
                          className="w-5 h-5 text-primary border-gray-300 focus:ring-primary" 
                        />
                        <span className="ml-3 font-medium flex-1 text-[#003087] font-bold italic">PayPal</span>
                      </div>
                      {paymentMethod === 'paypal' && (
                        <div className="mt-4 pl-8 pt-2">
                           <p className="text-sm text-gray-600 mb-4">{t('payment.paypalDescription')}</p>
                           <div className="relative z-0">
                             <PayPalScriptProvider options={paypalOptions}>
                               <PayPalButtons
                                 onClick={(_data, actions) => {
                                   const validationError = validatePassengers();
                                   if (validationError) {
                                     setFormError(validationError);
                                     return actions.reject();
                                   }
                                   setFormError(null);
                                   return actions.resolve();
                                 }}
                                 createOrder={async () => {
                                   const res = await fetch('/api/checkout/paypal/create', {
                                     method: 'POST',
                                     headers: { 'Content-Type': 'application/json' },
                                     body: JSON.stringify({ amount: totalInUsd }),
                                   });
                                   const order = await res.json();
                                   return order.id;
                                 }}
                                 onApprove={async (data) => {
                                   setIsProcessing(true);
                                   const res = await fetch('/api/checkout/paypal/capture', {
                                     method: 'POST',
                                     headers: { 'Content-Type': 'application/json' },
                                     body: JSON.stringify({ orderID: data.orderID }),
                                   });
                                   const captureData = await res.json();
                                   if (captureData.status === 'COMPLETED') {
                                     await registerBooking(captureData.id, 'paypal', 'PAID');
                                   } else {
                                     setIsProcessing(false);
                                     setFormError(t('errors.paymentNotCompleted'));
                                   }
                                 }}
                                 onError={() => {
                                   setFormError(t('errors.paypalError'));
                                 }}
                                />
                             </PayPalScriptProvider>
                           </div>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Policies */}
                  <div className="mt-8 space-y-3">
                     <label className="flex items-start cursor-pointer group">
                        <input
                          required
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => {
                            setAcceptTerms(e.target.checked);
                            if (e.target.checked && formError) setFormError(null);
                          }}
                          className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <span className="ml-3 text-sm text-text-main leading-relaxed">
                          {t('policies.acceptPrefix')}{' '}
                          <Link
                            href="/condiciones"
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="text-primary font-semibold underline hover:text-primary-dark"
                          >
                            {t('policies.termsAndConditions')}
                          </Link>
                          {t('policies.acceptMiddle')}{' '}
                          <Link
                            href="/cambios-y-devoluciones"
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="text-primary font-semibold underline hover:text-primary-dark"
                          >
                            {t('policies.changesAndReturns')}
                          </Link>{' '}
                          {t('policies.acceptAnd')}{' '}
                          <Link
                            href="/politicas"
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="text-primary font-semibold underline hover:text-primary-dark"
                          >
                            {t('policies.privacyPolicy')}
                          </Link>
                          .
                        </span>
                     </label>
                     <label className="flex items-start cursor-pointer group">
                        <input type="checkbox" className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                        <span className="ml-3 text-sm text-text-main group-hover:text-primary transition-colors">{t('policies.acceptMarketing')}</span>
                     </label>
                  </div>

                  {formError && (
                    <div role="alert" className="bg-error/10 border border-error/30 text-error rounded-xl p-4 mb-4 text-sm font-medium flex items-center gap-2 mt-6">
                      <span>⚠️</span>{formError}
                    </div>
                  )}

                  {(paymentMethod === 'card' || paymentMethod === 'yape') && (
                    <div className="mt-8">
                      <button
                        id="btn-culqi-pay"
                        type="submit"
                        disabled={isProcessing || !culqiReady}
                        className="w-full flex items-center justify-center bg-primary-dark text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isProcessing
                          ? t('payment.processing')
                          : !culqiReady
                          ? 'Cargando sistema de pago…'
                          : paymentMethod === 'yape'
                          ? `Pagar S/ ${totalInPen.toFixed(2)} con Yape`
                          : activeCardCurrency === 'PEN'
                          ? `Pagar S/ ${totalInPen.toFixed(2)} con Tarjeta`
                          : `Pagar US$ ${totalInUsd.toFixed(2)} con Tarjeta`}
                      </button>
                    </div>
                  )}
                </div>

              </form>
            </div>

            {/* Sidebar Summary */}
            <div className="w-full lg:w-1/3">
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-primary-dark mb-4 border-b pb-4">{t('sidebar.orderSummary', { count: items.length })}</h3>
                  <div className="space-y-6 mb-6">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                        {item.imageUrl ? (
                          <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                            <Image src={item.imageUrl} alt={item.tourName} fill className="object-cover" sizes="80px" />
                          </div>
                        ) : (
                          <div className="w-20 h-20 shrink-0 rounded-lg bg-gray-100" />
                        )}
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-text-main line-clamp-2 leading-tight mb-2">{item.tourName}</h4>
                          <p className="text-xs text-text-light flex items-center mb-1">
                             <span className="w-3 h-3 border rounded-sm mr-1 flex items-center justify-center font-mono text-[8px]">📅</span> 
                             {item.date?.split('T')[0] || item.date}
                          </p>
                          <p className="text-xs text-text-light flex items-center">
                             <span className="w-3 h-3 border rounded-sm mr-1 flex items-center justify-center font-mono text-[8px]">👥</span> 
                             {item.adults} {t('sidebar.adultsLabel', { count: item.adults })} {item.children > 0 && `, ${t('sidebar.childrenLabel', { count: item.children })}`}
                          </p>
                          <div className="mt-3 flex justify-between items-center w-full">
                             <div className="flex gap-3 text-xs font-bold text-primary cursor-pointer">
                               <button
                                 type="button"
                                 onClick={() => router.push(`/tours/${item.tourSlug}`)}
                                 className="underline hover:text-primary-dark transition-colors"
                               >
                                 {t('sidebar.edit')}
                               </button>
                               <button
                                 type="button"
                                 onClick={() => removeItem(item.tourId, item.date)}
                                 className="underline text-red-500 hover:text-red-700 transition-colors"
                               >
                                 {t('sidebar.delete')}
                               </button>
                             </div>
                             <span className="text-sm font-bold text-text-main">{(item.currency === 'PEN' || item.tourSlug === TEST_PEN_TOUR_SLUG) ? 'S/' : tc('currency')} {item.totalPrice}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="flex justify-between items-center p-2">
                      <span className="font-bold text-lg text-primary-dark">{t('sidebar.total')}</span>
                      <span className="font-serif text-2xl font-bold text-primary-dark">{isPenCart ? 'S/' : tc('currency')} {getTotal()}</span>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
