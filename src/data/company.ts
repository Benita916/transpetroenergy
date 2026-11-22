export const COMPANY = {
  name: 'Transpetro Energy Limited',
  shortName: 'Transpetro Energy',
  tagline: 'Powering Progress. Delivering Energy.',
  secondaryStatement: 'Connecting Markets. Powering Industries.',
  businessLine: 'Petroleum Products Marketing, Supply and Distribution',
  address:
    'Gbenga Arije Road, Iriebe by Bright top feed road off trailer park, along Tap junction, Rivers State, Nigeria.',
  cityRegion: 'Iriebe / Oyigbo, Rivers State, Nigeria',
  phoneDisplay: '+234 816 498 8092',
  phoneHref: 'tel:+2348164988092',
  whatsappNumber: '2348164988092',
  whatsappHref:
    'https://wa.me/2348164988092?text=Hello%20Transpetro%20Energy%20Limited%2C%20I%20would%20like%20to%20discuss%20a%20petroleum%20products%20supply%20enquiry.',
  email: 'info.moore@transpetroenergy.org',
  emailHref: 'mailto:info.moore@transpetroenergy.org',
  websiteDisplay: 'www.transpetroenergy.org',
  websiteHref: 'https://www.transpetroenergy.org',
  rcNumber: '9895484',
  tin: '2623299722568',
  mdCeo: 'Anelechi Moore Ezeala',
  copyright: '© 2026 Transpetro Energy Limited. All Rights Reserved.',
  logoEmblem: '/assets/transpetro-emblem.png',
} as const;

export const IMAGES = {
  heroTerminal: '/src/assets/images/hero_energy_terminal_1795333920288.jpg',
  agoDieselSupply: '/src/assets/images/ago_diesel_supply_1795333920096.jpg',
  tankerLogistics: '/src/assets/images/tanker_logistics_fleet_1795333919523.jpg',
  maritimeTanker: '/src/assets/images/maritime_oil_tanker_1795333920695.jpg',
  industrialPower: '/src/assets/images/industrial_power_facility_1795333920034.jpg',
  pipelineInfrastructure: '/src/assets/images/pipeline_infrastructure_1795333919592.jpg',
} as const;

export interface NavItem {
  label: string;
  to: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products & Services', to: '/products-services' },
  { label: 'Supply & Logistics', to: '/supply-logistics' },
  { label: 'Markets', to: '/markets' },
  { label: 'Why Choose Us', to: '/why-choose-us' },
];

export const ENQUIRY_CATEGORIES = [
  'Product Supply',
  'Bulk Diesel Purchase',
  'Export Enquiry',
  'Business Partnership',
  'General Enquiry',
] as const;

export type EnquiryCategory = (typeof ENQUIRY_CATEGORIES)[number];

export interface ServiceOffering {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  enquiryCategory: EnquiryCategory;
}

export const SERVICES: ServiceOffering[] = [
  {
    id: 'ago-diesel-marketing',
    number: '01',
    title: 'Automotive Gas Oil (AGO / Diesel) Marketing & Supply',
    shortTitle: 'AGO / Diesel Supply',
    summary:
      'Structured marketing and commercial supply of Automotive Gas Oil tailored to industrial, power, and commercial fuel buyers.',
    description:
      'Transpetro Energy Limited focuses on the commercial marketing and supply of Automotive Gas Oil (AGO) for organisations that rely on uninterrupted diesel availability for power generation, heavy machinery, and operational continuity. We work directly with qualified product sources and commercial buyers to structure clear supply terms, specification alignment, and predictable delivery schedules.',
    highlights: [
      'Commercial and industrial AGO supply arrangements',
      'Clear documentation and transparent transaction structure',
      'Scheduled replenishment planning aligned with consumption needs',
    ],
    image: IMAGES.agoDieselSupply,
    imageAlt: 'Modern bulk diesel loading gantry with steel articulated loading arms and metering manifolds',
    enquiryCategory: 'Bulk Diesel Purchase',
  },
  {
    id: 'bulk-diesel-sourcing',
    number: '02',
    title: 'Bulk Diesel Sourcing & Supply',
    shortTitle: 'Bulk Diesel Sourcing',
    summary:
      'Dedicated bulk diesel procurement and volume coordination connecting large-scale buyers with reliable supply channels.',
    description:
      'For high-volume fuel consumers and institutional procurement teams, securing consistent bulk diesel supply requires disciplined market sourcing and responsive commercial coordination. We structure bulk diesel sourcing arrangements designed to align product availability, commercial terms, and delivery timing with each buyer’s operational profile.',
    highlights: [
      'Volume-focused sourcing for high-consumption operations',
      'Spot and recurring commercial supply frameworks',
      'Dedicated commercial contact from enquiry through delivery',
    ],
    image: IMAGES.heroTerminal,
    imageAlt: 'Coastal petroleum storage terminal with cylindrical storage tanks and maritime jetty at golden hour',
    enquiryCategory: 'Bulk Diesel Purchase',
  },
  {
    id: 'petroleum-products-trading',
    number: '03',
    title: 'Petroleum Products Trading',
    shortTitle: 'Petroleum Products Trading',
    summary:
      'Commercial petroleum products trading built around market responsiveness, disciplined counterparties, and transparent execution.',
    description:
      'Operating at the intersection of petroleum product supply and commercial demand, Transpetro Energy Limited facilitates structured petroleum products trading arrangements. Our commercial approach prioritises clear counterparty communication, documented transaction workflows, and prudent execution across domestic and regional trade opportunities.',
    highlights: [
      'Structured B2B petroleum products trade execution',
      'Direct engagement between verified suppliers and commercial off-takers',
      'Transparent pricing terms and commercial documentation',
    ],
    image: IMAGES.pipelineInfrastructure,
    imageAlt: 'Industrial steel petroleum transfer pipelines and precision valve manifolds along a coastal energy corridor',
    enquiryCategory: 'Product Supply',
  },
  {
    id: 'industrial-commercial-supply',
    number: '04',
    title: 'Industrial & Commercial Supply Arrangements',
    shortTitle: 'Industrial & Commercial Supply',
    summary:
      'Tailored petroleum supply programs designed for manufacturing plants, infrastructure operators, and commercial enterprises.',
    description:
      'Industrial and commercial organisations face strict uptime demands where fuel interruptions carry direct operational costs. Transpetro Energy Limited develops structured supply arrangements tailored to each client’s consumption cycle, site delivery protocols, and procurement governance requirements—exclusively serving commercial and institutional buyers rather than retail filling stations.',
    highlights: [
      'Customised supply schedules for plants, estates, and commercial facilities',
      'Contracted or call-off volume supply structures',
      'Consistent account communication and order tracking',
    ],
    image: IMAGES.industrialPower,
    imageAlt: 'Large-scale industrial manufacturing and power generation facility illuminated at twilight',
    enquiryCategory: 'Product Supply',
  },
  {
    id: 'distribution-coordination',
    number: '05',
    title: 'Petroleum Products Distribution & Supply Coordination',
    shortTitle: 'Distribution Coordination',
    summary:
      'End-to-end commercial supply and haulage coordination bridging product loading points and customer delivery sites.',
    description:
      'Reliable fuel delivery depends on careful coordination between product sourcing, loading schedules, road tanker logistics partners, and receiving facilities. We manage supply coordination and delivery communication across every stage of fulfilment so commercial buyers receive timely updates from dispatch planning through site offloading.',
    highlights: [
      'Coordinated loading, haulage scheduling, and dispatch tracking',
      'Alignment with customer receiving protocols and site windows',
      'Proactive status reporting across every delivery milestone',
    ],
    image: IMAGES.tankerLogistics,
    imageAlt: 'Modern petroleum road tanker trucks staged cleanly in an industrial logistics yard at sunrise',
    enquiryCategory: 'Product Supply',
  },
  {
    id: 'international-trading-export',
    number: '06',
    title: 'International Petroleum Products Trading & Export Supply Arrangements',
    shortTitle: 'International Trading & Export',
    summary:
      'Cross-border commercial engagement and export supply coordination connecting Nigerian petroleum supply opportunities with international buyers.',
    description:
      'Transpetro Energy Limited engages with international petroleum products buyers and trading counterparties seeking structured export supply arrangements. We focus on transparent commercial onboarding, clear transaction procedures, and disciplined coordination across sourcing, documentation, and maritime export logistics.',
    highlights: [
      'Structured enquiry and commercial onboarding for international buyers',
      'Export documentation and maritime logistics coordination',
      'Professional counterparty engagement aligned with international trade practice',
    ],
    image: IMAGES.maritimeTanker,
    imageAlt: 'International petroleum product tanker vessel sailing near a coastal maritime terminal at sunrise',
    enquiryCategory: 'Export Enquiry',
  },
];
