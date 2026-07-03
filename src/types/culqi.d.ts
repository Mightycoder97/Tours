/**
 * Culqi Checkout Custom v1.0 — TypeScript Declarations
 * Docs: https://docs.culqi.com/es/documentacion/checkout/checkout-custom
 */

// ─── Settings ────────────────────────────────────────────────────────────────

export interface CulqiCheckoutSettings {
  /** Título mostrado en el checkout */
  title?: string;
  /** Moneda ISO 4217. 'PEN' requerido para Yape. */
  currency: 'PEN' | 'USD' | string;
  /** Monto en centavos (e.g. 8000 = S/80.00) */
  amount: number;
  /** Order ID requerido para PagoEfectivo, billeteras y Cuotéalo */
  order?: string;
}

// ─── Client ──────────────────────────────────────────────────────────────────

export interface CulqiCheckoutClient {
  /** Email del cliente pre-llenado */
  email?: string;
}

// ─── Payment Methods ─────────────────────────────────────────────────────────

export interface CulqiPaymentMethods {
  tarjeta?: boolean;
  yape?: boolean;
  billetera?: boolean;
  bancaMovil?: boolean;
  agente?: boolean;
  cuotealo?: boolean;
}

// ─── Options ─────────────────────────────────────────────────────────────────

export interface CulqiCheckoutOptions {
  /** Idioma. 'auto' detecta del navegador. */
  lang?: 'auto' | 'es' | 'en';
  /** Habilitar pago en cuotas */
  installments?: boolean;
  /** true = modal (popup), false = embebido en container */
  modal?: boolean;
  /** Selector del div contenedor (solo cuando modal = false) */
  container?: string;
  /** Métodos de pago habilitados */
  paymentMethods?: CulqiPaymentMethods;
  /** Orden de los métodos de pago */
  paymentMethodsSort?: string[];
}

// ─── Appearance ──────────────────────────────────────────────────────────────

export interface CulqiDefaultStyle {
  /** Color del banner (hex) */
  bannerColor?: string;
  /** Color de fondo del botón de pago (hex) */
  buttonBackground?: string;
  /** Color del menú de métodos de pago (hex) */
  menuColor?: string;
  /** Color de los links (hex) */
  linksColor?: string;
  /** Color del texto del botón (hex) */
  buttonTextColor?: string;
  /** Color del precio (hex) */
  priceColor?: string;
}

export interface CulqiCheckoutAppearance {
  theme?: 'default';
  /** Ocultar logo de Culqi */
  hiddenCulqiLogo?: boolean;
  /** Ocultar contenido del banner */
  hiddenBannerContent?: boolean;
  /** Ocultar banner completo */
  hiddenBanner?: boolean;
  /** Ocultar monto en la toolbar */
  hiddenToolBarAmount?: boolean;
  /** Ocultar campo de email */
  hiddenEmail?: boolean;
  /** Tipo de menú de métodos de pago */
  menuType?: 'sidebar' | 'sliderTop' | 'select';
  /** Texto del botón de pago con tarjeta */
  buttonCardPayText?: string;
  /** URL del logo de la tienda */
  logo?: string | null;
  /** Estilos básicos */
  defaultStyle?: CulqiDefaultStyle;
}

// ─── Config ──────────────────────────────────────────────────────────────────

export interface CulqiCheckoutConfig {
  settings: CulqiCheckoutSettings;
  client?: CulqiCheckoutClient;
  options?: CulqiCheckoutOptions;
  appearance?: CulqiCheckoutAppearance;
}

// ─── Token / Error ───────────────────────────────────────────────────────────

export interface CulqiToken {
  id: string;
  email: string;
  type?: string;
  card_number?: string;
  last_four?: string;
  expiration_month?: string;
  expiration_year?: string;
  brand?: string;
  bank_name?: string;
  bank_country?: string;
  country_code?: string;
  currency?: string;
  creation_date?: number;
  metadata?: Record<string, string>;
}

export interface CulqiError {
  type: string;
  merchant_message: string;
  user_message: string;
  param?: string;
  code?: string;
}

// ─── Instance ────────────────────────────────────────────────────────────────

export interface CulqiInstance {
  /** Abre el modal / formulario del checkout */
  open(): void;
  /** Cierra el modal */
  close(): void;
  /**
   * Callback que se invoca cuando el usuario completa o cancela el checkout.
   * Dentro del callback, `this.token` o `this.error` estarán disponibles.
   */
  culqi: ((this: CulqiInstance) => void) | null;
  /** Token generado al tokenizar con éxito */
  token?: CulqiToken;
  /** Error si la tokenización falla */
  error?: CulqiError;
}

// ─── Global Window ───────────────────────────────────────────────────────────

declare global {
  interface Window {
    /**
     * Constructor del Culqi Checkout Custom v1.0.
     * @param publicKey Llave pública pk_live_... o pk_test_...
     * @param config    Configuración del checkout
     */
    CulqiCheckout: new (
      publicKey: string,
      config: CulqiCheckoutConfig
    ) => CulqiInstance;
  }
}
