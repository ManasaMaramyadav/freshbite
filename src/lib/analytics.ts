import { AnalyticsEvent, Product, Order } from '@/types';

// In-memory log for the interactive Analytics HUD
let eventLog: AnalyticsEvent[] = [];
const LISTENERS: Array<(events: AnalyticsEvent[]) => void> = [];

export function getEventLog(): AnalyticsEvent[] {
  if (typeof window !== 'undefined' && eventLog.length === 0) {
    try {
      const stored = localStorage.getItem('freshbite_analytics_events');
      if (stored) {
        eventLog = JSON.parse(stored);
      }
    } catch {
      // fallback
    }
  }
  return [...eventLog];
}

export function subscribeToAnalytics(callback: (events: AnalyticsEvent[]) => void) {
  LISTENERS.push(callback);
  return () => {
    const index = LISTENERS.indexOf(callback);
    if (index !== -1) LISTENERS.splice(index, 1);
  };
}

export function clearEventLog() {
  eventLog = [];
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('freshbite_analytics_events');
    } catch {
      // ignore
    }
  }
  LISTENERS.forEach((listener) => listener([]));
}

export function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  const event: AnalyticsEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    eventName,
    payload,
  };

  // Keep the latest 50 events in log
  eventLog = [event, ...eventLog].slice(0, 50);

  // Notify subscribed UI components (Analytics HUD)
  LISTENERS.forEach((listener) => listener([...eventLog]));

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('freshbite_analytics_events', JSON.stringify(eventLog));
      
      // Dispatch browser custom event for external analytics scripts (Google Tag Manager, Segment, etc.)
      window.dispatchEvent(
        new CustomEvent('freshbite:analytics', {
          detail: event,
        })
      );

      // Also push to a mock dataLayer if one exists or create window.dataLayer
      const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
      if (!win.dataLayer) {
        win.dataLayer = [];
      }
      win.dataLayer.push({
        event: eventName,
        ...payload,
        timestamp: event.timestamp,
      });
    } catch {
      // ignore
    }

    // Styled console log for developer visibility and testing
    console.log(
      `%c[FreshBite Analytics] %c${eventName}`,
      'color: #059669; font-weight: bold; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;',
      'color: #1c1917; font-weight: 600;',
      payload
    );
  }

  return event;
}

// Convenience helper methods
export const analytics = {
  trackPageView: (path: string, title?: string) => {
    trackEvent('page_view', { path, title: title || document.title });
  },

  trackSearch: (query: string, resultCount: number) => {
    trackEvent('search_query', { query, resultCount });
  },

  trackCategoryFilter: (category: string) => {
    trackEvent('category_filter', { category });
  },

  trackDietaryFilter: (tag: string, isActive: boolean) => {
    trackEvent('dietary_filter', { tag, isActive });
  },

  trackAddToCart: (product: Product, quantity: number) => {
    trackEvent('add_to_cart', {
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category,
      quantity,
      itemTotal: +(product.price * quantity).toFixed(2),
    });
  },

  trackRemoveFromCart: (productId: string, productName: string) => {
    trackEvent('remove_from_cart', {
      productId,
      productName,
    });
  },

  trackQuantityChange: (productId: string, productName: string, newQuantity: number) => {
    trackEvent('update_cart_quantity', {
      productId,
      productName,
      newQuantity,
    });
  },

  trackApplyPromo: (code: string, isValid: boolean, discountPercent?: number) => {
    trackEvent('apply_promo_code', {
      code,
      isValid,
      discountPercent: discountPercent ?? 0,
    });
  },

  trackBeginCheckout: (itemCount: number, subtotal: number, total: number) => {
    trackEvent('begin_checkout', {
      itemCount,
      subtotal,
      total,
    });
  },

  trackFormInteraction: (formName: string, fieldName: string, action: 'focus' | 'blur' | 'change') => {
    trackEvent('form_interaction', {
      formName,
      fieldName,
      action,
    });
  },

  trackCheckoutCompleted: (order: Order) => {
    trackEvent('checkout_completed', {
      orderId: order.orderId,
      total: order.total,
      subtotal: order.subtotal,
      itemCount: order.items.reduce((acc, item) => acc + item.quantity, 0),
      items: order.items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
      deliveryCity: order.deliveryDetails.city,
      paymentMethod: order.paymentMethod,
    });
  },

  trackContactSubmit: (inquiryType: string, emailDomain: string) => {
    trackEvent('contact_form_submit', {
      inquiryType,
      emailDomain,
    });
  },

  trackNavigation: (destination: string, linkText: string) => {
    trackEvent('navigation_click', {
      destination,
      linkText,
    });
  },
};
