/**
 * Global site configuration.
 * ------------------------------------------------------------------
 * Update the values in this file to change the business details that
 * appear across every page (header, footer, schema, sitemap, etc.).
 * Nothing else in the codebase hard-codes these values.
 */

module.exports = {
  name: 'Roofex',
  legalName: 'Roofex Roofing LLC',
  tagline: 'Rise Above the Rest With Our Roofing',
  shortDescription:
    'Roofex delivers premium residential and commercial roofing — installation, repair, inspection and storm restoration — backed by 15+ years of craftsmanship and a written workmanship warranty.',
  founded: '2009',

  // Contact / NAP (Name, Address, Phone) — keep consistent for local SEO
  phone: '(816) 555-0182',
  phoneHref: '+18165550182',
  emergencyPhone: '(816) 555-0199',
  email: 'hello@roofex.com',
  address: {
    street: '1200 Grand Boulevard, Suite 300',
    city: 'Kansas City',
    region: 'MO',
    regionName: 'Missouri',
    postalCode: '64106',
    country: 'US',
  },
  geo: { lat: 39.0997, lng: -94.5786 },
  hours: [
    { days: 'Monday – Friday', time: '7:00 AM – 6:00 PM' },
    { days: 'Saturday', time: '8:00 AM – 2:00 PM' },
    { days: 'Sunday', time: 'Closed (emergency service available)' },
  ],
  priceRange: '$$',
  license: 'Licensed & Insured — MO Contractor #MO-482913',
  insurance: 'Fully insured — $2M general liability',
  serviceArea: [
    'Kansas City',
    'Overland Park',
    'Olathe',
    'Independence',
    'Lee’s Summit',
    'Shawnee',
    'Lenexa',
    'Blue Springs',
    'Liberty',
    'Gladstone',
  ],
  social: {
    facebook: 'https://facebook.com/roofex',
    instagram: 'https://instagram.com/roofex',
    linkedin: 'https://linkedin.com/company/roofex',
    youtube: 'https://youtube.com/@roofex',
    x: 'https://x.com/roofex',
  },

  // Headline stats used on the home + about pages.
  // `count` + `suffix` drive the animated counter; `value` is the no-JS fallback.
  stats: [
    { value: '15+', count: 15, suffix: '+', label: 'Years in Business' },
    { value: '4,800+', count: 4800, suffix: '+', label: 'Roofs Completed' },
    { value: '98%', count: 98, suffix: '%', label: 'Customer Satisfaction' },
    { value: '10 yr', count: 10, suffix: ' yr', label: 'Workmanship Warranty' },
  ],

  certifications: [
    'GAF Master Elite® Contractor',
    'Owens Corning Preferred',
    'CertainTeed SELECT ShingleMaster',
    'BBB Accredited — A+ Rating',
    'OSHA Safety Certified Crews',
    'EPA Lead-Safe Certified Firm',
    'ENERGY STAR® Partner',
    'Fully Insured — $2M Liability',
  ],

  // Primary navigation. `mega: true` renders a dropdown of all services.
  nav: [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Services', url: '/services', mega: true },
    { label: 'Projects', url: '/projects' },
    { label: 'Blog', url: '/blog' },
    { label: 'FAQ', url: '/faq' },
    { label: 'Contact', url: '/contact' },
  ],
};
