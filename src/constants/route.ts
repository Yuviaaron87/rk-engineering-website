export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '*',
} as const;

export interface NavItem {
  name: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Why Choose Us', href: '#why-choose-us' },
  { name: 'Projects', href: '#projects' },
  { name: 'Owner', href: '#owner' },
  { name: 'Contact', href: '#contact' },
];

export const COMPANY_DETAILS = {
  name: 'RK ENGINEERING',
  tagline: 'Reliable Electrical Solutions & Skilled Manpower',
  owner: 'Kannan R',
  role: 'Founder & Owner',
  phone: '+91 84897 94331',
  phoneRaw: '+918489794331',
  email: 'kannankanna26824@gmail.com',
  whatsappMessage: 'Hello RK ENGINEERING, I would like to enquire about your electrical services.',
  location: 'Tamil Nadu, India',
};
