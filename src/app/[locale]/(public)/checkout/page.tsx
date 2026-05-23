'use client';

import { useCartStore } from '@/store/useCartStore';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState, FormEvent } from 'react';
import { Lock, ShieldCheck, User } from 'lucide-react';
import Image from 'next/image';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useTranslations } from 'next-intl';

interface PassengerForm {
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: string;
  docType: string;
  docNumber: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const t = useTranslations('checkout');
  const tc = useTranslations('common');
  
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Contact Info
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactPhonePrefix, setContactPhonePrefix] = useState('+51');

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
    currency: "USD",
    intent: "capture",
  };

  // Calculate passengers needed based on the maximum in any single cart item
  // (Assuming the same group takes all tours)
  const maxAdults = items.length > 0 ? Math.max(...items.map(i => i.adults)) : 0;
  const maxChildren = items.length > 0 ? Math.max(...items.map(i => i.children)) : 0;

  const [adultsInfo, setAdultsInfo] = useState<PassengerForm[]>([]);
  const [childrenInfo, setChildrenInfo] = useState<PassengerForm[]>([]);

  useEffect(() => {
    setMounted(true);
    // Initialize forms
    if (maxAdults > 0 && adultsInfo.length === 0) {
      setAdultsInfo(Array.from({ length: maxAdults }, () => ({ firstName: '', lastName: '', nationality: 'Perú', birthDate: '', docType: 'DNI', docNumber: '' })));
    }
    if (maxChildren > 0 && childrenInfo.length === 0) {
      setChildrenInfo(Array.from({ length: maxChildren }, () => ({ firstName: '', lastName: '', nationality: 'Perú', birthDate: '', docType: 'DNI', docNumber: '' })));
    }
  }, [maxAdults, maxChildren]);

  if (!mounted) return <div className="min-h-screen"></div>;
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

  const registerBooking = async (paymentRef: string, method: string) => {
    const allPassengers = [
      ...adultsInfo.map(a => ({ ...a, isChild: false })),
      ...childrenInfo.map(c => ({ ...c, isChild: true }))
    ];

    let lastBookingCode = '';
    let allSuccess = true;

    for (const item of items) {
      const bookingData = {
        tourId: item.tourId,
        tourName: item.tourName,
        date: item.date,
        adults: item.adults,
        children: item.children,
        totalPrice: item.totalPrice,
        contactName: adultsInfo[0]?.firstName ? `${adultsInfo[0].firstName} ${adultsInfo[0].lastName}` : tc('client'),
        contactEmail,
        contactPhone: contactPhonePrefix + contactPhone,
        paymentMethod: method,
        paymentRef,
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

  const handleSimulatePayment = async (e: FormEvent) => {
    e.preventDefault();
    if (paymentMethod !== 'card') return;
    
    setIsProcessing(true);
    setFormError(null);
    
    // In a real Culqi integration, Culqi.js would give us a token.
    // We mock that behavior here since we don't have the script loaded.
    const mockTokenId = "tok_test_" + Math.random().toString(36).substring(7);
    
    try {
      const res = await fetch('/api/checkout/culqi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token_id: mockTokenId, email: contactEmail, amount: getTotal() }),
      });
      const chargeData = await res.json();
      
      if (chargeData.success) {
        await registerBooking(chargeData.chargeId, 'culqi');
      } else {
        setFormError(t('errors.paymentRejected', { error: chargeData.error || 'Error' }));
        setIsProcessing(false);
      }
    } catch (err) {
       setFormError(t('errors.networkError'));
       setIsProcessing(false);
    }
  };

  return (
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
            <form onSubmit={handleSimulatePayment} className="space-y-6">
              
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
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-lg focus:ring-primary focus:border-primary outline-none transition-colors" 
                      placeholder={t('contactPerson.phonePlaceholder')} 
                    />
                  </div>
                  <div>
                    <input 
                      required 
                      type="email" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary outline-none transition-colors" 
                      placeholder={t('contactPerson.emailPlaceholder')} 
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
                    <input required type="text" placeholder={t('passenger.firstNamePlaceholder')} value={adult.firstName} onChange={(e) => handleAdultChange(index, 'firstName', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary" />
                    <input required type="text" placeholder={t('passenger.lastNamePlaceholder')} value={adult.lastName} onChange={(e) => handleAdultChange(index, 'lastName', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary" />
                    <select required value={adult.nationality} onChange={(e) => handleAdultChange(index, 'nationality', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary">
                      <option value="Perú">{t('nationality.peru')}</option>
                      <option value="Estados Unidos">{t('nationality.usa')}</option>
                      <option value="España">{t('nationality.spain')}</option>
                      <option value="Colombia">{t('nationality.colombia')}</option>
                      <option value="México">{t('nationality.mexico')}</option>
                      <option value="Chile">{t('nationality.chile')}</option>
                      <option value="Otro">{t('nationality.other')}</option>
                    </select>
                    <input required type="text" placeholder={t('passenger.birthDatePlaceholder')} value={adult.birthDate} onChange={(e) => handleAdultChange(index, 'birthDate', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary" />
                    <div className="col-span-full flex flex-col sm:flex-row">
                      <select value={adult.docType} onChange={(e) => handleAdultChange(index, 'docType', e.target.value)} className="bg-white border border-gray-200 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none px-4 py-3 outline-none w-full sm:w-1/3 border-b-0 sm:border-b sm:border-r-0">
                        <option value="DNI">{t('docType.dni')}</option>
                        <option value="PASSPORT">{t('docType.passport')}</option>
                        <option value="CE">{t('docType.foreignId')}</option>
                      </select>
                      <input required type="text" placeholder={t('passenger.docNumberPlaceholder')} value={adult.docNumber} onChange={(e) => handleAdultChange(index, 'docNumber', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none outline-none focus:border-primary" />
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
                    <input required type="text" placeholder={t('passenger.firstNamePlaceholder')} value={child.firstName} onChange={(e) => handleChildChange(index, 'firstName', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary" />
                    <input required type="text" placeholder={t('passenger.lastNamePlaceholder')} value={child.lastName} onChange={(e) => handleChildChange(index, 'lastName', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary" />
                    <select required value={child.nationality} onChange={(e) => handleChildChange(index, 'nationality', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary">
                      <option value="Perú">{t('nationality.peru')}</option>
                      <option value="Estados Unidos">{t('nationality.usa')}</option>
                      <option value="España">{t('nationality.spain')}</option>
                      <option value="Colombia">{t('nationality.colombia')}</option>
                      <option value="México">{t('nationality.mexico')}</option>
                      <option value="Chile">{t('nationality.chile')}</option>
                      <option value="Otro">{t('nationality.other')}</option>
                    </select>
                    <input required type="text" placeholder={t('passenger.birthDatePlaceholder')} value={child.birthDate} onChange={(e) => handleChildChange(index, 'birthDate', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-primary" />
                    <div className="col-span-full flex flex-col sm:flex-row">
                      <select value={child.docType} onChange={(e) => handleChildChange(index, 'docType', e.target.value)} className="bg-white border border-gray-200 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none px-4 py-3 outline-none w-full sm:w-1/3 border-b-0 sm:border-b sm:border-r-0">
                        <option value="DNI">{t('docType.dni')}</option>
                        <option value="PASSPORT">{t('docType.passport')}</option>
                        <option value="CE">{t('docType.foreignId')}</option>
                      </select>
                      <input required type="text" placeholder={t('passenger.docNumberPlaceholder')} value={child.docNumber} onChange={(e) => handleChildChange(index, 'docNumber', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none outline-none focus:border-primary" />
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
                  {/* Culqi / Tarjetas */}
                  <label className={`block border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-white bg-white'}`}>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="card" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')}
                        className="w-5 h-5 text-primary border-gray-300 focus:ring-primary" 
                      />
                      <span className="ml-3 font-medium flex-1">{t('payment.creditDebitCard')}</span>
                      <div className="flex gap-2 text-xs font-bold text-gray-400">
                        <span className="bg-gray-100 px-2 py-1 rounded">VISA</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">MC</span>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="mt-4 pl-4 sm:pl-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {/* Placeholder para Culqi Elements */}
                         <div className="col-span-full">
                           <input type="text" placeholder={t('payment.cardNumberPlaceholder')} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none" />
                         </div>
                         <div>
                           <input type="text" placeholder={t('payment.expiryPlaceholder')} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none" />
                         </div>
                         <div>
                           <input type="text" placeholder={t('payment.cvcPlaceholder')} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none" />
                         </div>
                         <p className="col-span-full text-xs text-gray-500 mt-2 flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-green-600"/> {t('payment.securePayments')}</p>
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
                               createOrder={async () => {
                                 const res = await fetch('/api/checkout/paypal/create', {
                                   method: 'POST',
                                   headers: { 'Content-Type': 'application/json' },
                                   body: JSON.stringify({ amount: getTotal() }),
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
                                   await registerBooking(captureData.id, 'paypal');
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
                      <input required type="checkbox" className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                      <span className="ml-3 text-sm text-text-main group-hover:text-primary transition-colors">{t('policies.acceptTerms')}</span>
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

                {paymentMethod !== 'paypal' && (
                  <div className="mt-8">
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center bg-primary-dark text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? t('payment.processing') : t('payment.continueToPay', { total: getTotal() })}
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
                           {item.date}
                        </p>
                        <p className="text-xs text-text-light flex items-center">
                           <span className="w-3 h-3 border rounded-sm mr-1 flex items-center justify-center font-mono text-[8px]">👥</span> 
                           {item.adults} {t('sidebar.adultsLabel', { count: item.adults })} {item.children > 0 && `, ${t('sidebar.childrenLabel', { count: item.children })}`}
                        </p>
                        <div className="mt-3 flex justify-between items-center w-full">
                           <div className="flex gap-3 text-xs font-bold text-primary underline cursor-pointer">
                              <span>{t('sidebar.edit')}</span>
                              <span>{t('sidebar.delete')}</span>
                           </div>
                           <span className="text-sm font-bold text-text-main">{tc('currency')} {item.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between items-center p-2">
                    <span className="font-bold text-lg text-primary-dark">{t('sidebar.total')}</span>
                    <span className="font-serif text-2xl font-bold text-primary-dark">{tc('currency')} {getTotal()}</span>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
