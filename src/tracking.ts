// GA4 events imported into Google Ads as "Contatti" conversions.
export function trackPhoneClick() {
  if (typeof window.gtag === 'function') window.gtag('event', 'phone_click');
}
export function trackWhatsAppClick() {
  if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click');
}
