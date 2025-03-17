
import { supabase } from './supabase';

// Interface for payment gateway settings
export interface PaymentGateways {
  stripe_publishable_key?: string;
  stripe_secret_key?: string;
  stripe_enabled?: boolean;
  paypal_client_id?: string;
  paypal_client_secret?: string;
  paypal_enabled?: boolean;
}

// Get payment gateway settings from Supabase
export const getPaymentGateways = async (): Promise<PaymentGateways | null> => {
  try {
    const { data, error } = await supabase
      .from('payment_gateways')
      .select('*')
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching payment gateways:', error);
    return null;
  }
};

// Check if Stripe is configured and enabled
export const isStripeAvailable = async (): Promise<boolean> => {
  const paymentGateways = await getPaymentGateways();
  return !!(
    paymentGateways?.stripe_enabled &&
    paymentGateways?.stripe_publishable_key &&
    paymentGateways?.stripe_secret_key
  );
};

// Check if PayPal is configured and enabled
export const isPayPalAvailable = async (): Promise<boolean> => {
  const paymentGateways = await getPaymentGateways();
  return !!(
    paymentGateways?.paypal_enabled &&
    paymentGateways?.paypal_client_id &&
    paymentGateways?.paypal_client_secret
  );
};

// Get a list of available payment methods
export const getAvailablePaymentMethods = async (): Promise<string[]> => {
  const availableMethods = [];
  
  if (await isStripeAvailable()) {
    availableMethods.push('stripe');
  }
  
  if (await isPayPalAvailable()) {
    availableMethods.push('paypal');
  }
  
  return availableMethods;
};

// Example function to handle Stripe client-side initialization
export const initStripe = async (): Promise<any> => {
  const paymentGateways = await getPaymentGateways();
  
  if (paymentGateways?.stripe_enabled && paymentGateways?.stripe_publishable_key) {
    // In a real implementation, you would load the Stripe.js script
    // and initialize Stripe with the publishable key
    console.log('Initializing Stripe with key:', paymentGateways.stripe_publishable_key);
    return {
      initialized: true,
      publishableKey: paymentGateways.stripe_publishable_key
    };
  }
  
  return { initialized: false };
};

// Example function to handle PayPal client-side initialization
export const initPayPal = async (): Promise<any> => {
  const paymentGateways = await getPaymentGateways();
  
  if (paymentGateways?.paypal_enabled && paymentGateways?.paypal_client_id) {
    // In a real implementation, you would load the PayPal script
    // and initialize PayPal with the client ID
    console.log('Initializing PayPal with client ID:', paymentGateways.paypal_client_id);
    return {
      initialized: true,
      clientId: paymentGateways.paypal_client_id
    };
  }
  
  return { initialized: false };
};
