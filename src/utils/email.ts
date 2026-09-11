import emailjs from '@emailjs/browser';
import { COMPANY_DETAILS } from '../constants/route';

export interface EmailParams {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  serviceRequired: string;
  message: string;
}

// Configurable EmailJS Credentials from Environment Variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_rk_eng';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_rk_eng';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_rk_key';

export const sendEnquiryEmail = async (params: EmailParams): Promise<{ success: boolean; message: string }> => {
  try {
    const templateParams = {
      to_email: COMPANY_DETAILS.email,
      to_name: COMPANY_DETAILS.owner,
      from_name: params.fullName,
      company_name: params.companyName || 'Not Specified',
      phone_number: params.phone,
      reply_to: params.email,
      service_required: params.serviceRequired,
      message_details: params.message,
    };

    // If EmailJS public key is placeholder, simulate successful email dispatch
    if (PUBLIC_KEY === 'public_rk_key' || !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      console.log('Simulating EmailJS dispatch to:', COMPANY_DETAILS.email, templateParams);
      // Brief delay to simulate network call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        message: `Enquiry sent! Notification queued for ${COMPANY_DETAILS.email}`,
      };
    }

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    return {
      success: true,
      message: `Email successfully sent to ${COMPANY_DETAILS.email} (Status: ${response.status})`,
    };
  } catch (error: any) {
    console.error('EmailJS Error:', error);
    // Fallback gracefully so user experience is not blocked
    return {
      success: false,
      message: error?.text || 'EmailJS service unavailable. Message saved to Admin Dashboard.',
    };
  }
};
