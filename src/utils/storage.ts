export interface Enquiry {
  id: string;
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  serviceRequired: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'responded';
}

const STORAGE_KEY = 'rk_engineering_enquiries';

// Initial mock data if empty
const DEFAULT_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    fullName: 'Suresh V',
    companyName: 'Chennai Manufacturing Ltd',
    phone: '+91 94441 23456',
    email: 'suresh@chennaimanufacturing.com',
    serviceRequired: 'Electrical Manpower Supply',
    message: 'We require 12 certified industrial electricians for a 15-day plant shutdown and maintenance project in Sriperumbudur.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'unread',
  },
  {
    id: 'enq-2',
    fullName: 'Anand Kumar',
    companyName: 'Apex Auto Components',
    phone: '+91 98402 87654',
    email: 'anand.k@apexauto.in',
    serviceRequired: 'Panel Wiring & Installation',
    message: 'Need installation and wiring of 4 main MCC power panels and APFC panel for our new assembly line expansion.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'unread',
  },
  {
    id: 'enq-3',
    fullName: 'Ramesh Sundaram',
    companyName: 'Southern Precision Foundries',
    phone: '+91 97890 12345',
    email: 'ramesh@spf.co.in',
    serviceRequired: 'Cable Laying & Termination',
    message: 'HT cable trenching and 33kV termination required for furnace section. Please provide site quotation.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'responded',
  },
];

export const getEnquiries = (): Enquiry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ENQUIRIES));
      return DEFAULT_ENQUIRIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading enquiries from localStorage', error);
    return DEFAULT_ENQUIRIES;
  }
};

export const saveEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry => {
  const current = getEnquiries();
  const newEnquiry: Enquiry = {
    ...enquiryData,
    id: `enq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'unread',
  };

  const updated = [newEnquiry, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newEnquiry;
};

export const updateEnquiryStatus = (id: string, status: Enquiry['status']): Enquiry[] => {
  const current = getEnquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteEnquiry = (id: string): Enquiry[] => {
  const current = getEnquiries();
  const updated = current.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const clearAllEnquiries = (): Enquiry[] => {
  localStorage.removeItem(STORAGE_KEY);
  return [];
};
