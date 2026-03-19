// Edit this file to update your portfolio content.
// Photo tip: put your image in /public and update `profile.photo`.
export const siteContent = {
  brand: 'Denise',
  profile: {
    name: 'Denise Tham',
    role: 'Full-Stack Developer',
    accentRole: 'Payments + Data Systems',
    summary:
      'I build reliable software for subscriptions, invoicing, and reporting workflows. I focus on backend correctness, database performance, and frontend experiences that stay fast under real-world load.',
    email: 'denisethamws@gmail.com',
    phone: '+44 73 4968 2535',
    linkedin: 'https://www.linkedin.com/in/denise-tham',
    github: 'https://github.com/thamdenise',
    photo: 'denise-photo.jpeg',
    photoAlt: 'Portrait of Denise Tham',
    resumeFile: 'resume-denise_fullstack_software_developer_5years_experience.pdf',
  },
  nav: ['About', 'Experience', 'Skills', 'Projects', 'Contact'],
  stackRail: [
    'WEB',
    'REACT',
    'LARAVEL',
    'JAVASCRIPT',
    'PHP',
    'SQL',
    'STRIPE',
    'MYSQL',
    'API DESIGN',
    'CLOUD',
  ],
  about: {
    lead: 'Full-stack developer with 5 years of experience across fintech-adjacent products, ecommerce systems, and internal operations tooling.',
    body: 'Most recent focus: building robust payment flows, improving reporting accuracy, and creating architecture that scales across multiple business units.',
    badges: ['Payments', 'Data Systems'],
    image: 'mohammad-rahmani-N5bT5RctFZ8-unsplash.jpg',
    stats: [
      { label: 'Years', value: '5' },
      { label: 'Stripe Flows', value: '10+' },
      { label: 'SaaS Orgs', value: '2' },
    ],
    points: [
      'Built subscription lifecycles from trial to refund with Stripe webhooks.',
      'Improved reporting performance using indexing and query refactoring.',
      'Designed reusable APIs for multi-tenant product architecture.',
    ],
  },
  experience: [
    {
      period: 'Jun 2023 - Present',
      company: 'Margin Wheeler + Swiftly',
      title: 'Lead Full-Stack Software Developer',
      text: 'Built multi-tenant SaaS products, Stripe subscription flows, and audit-heavy finance operations features. Improved reliability using idempotency, webhook verification, and better data models.',
    },
    {
      period: 'Jan 2023 - May 2023',
      company: 'Edelo',
      title: 'Software Consultant',
      text: 'Audited codebases and delivery pipelines, prioritized risks, and aligned product and engineering plans with measurable launch goals.',
    },
    {
      period: 'May 2021 - Jan 2023',
      company: 'Edelo',
      title: 'Full-Stack Developer',
      text: 'Delivered custom web and ecommerce builds across Shopify, WooCommerce, and WordPress with responsive UI implementation and integrations.',
    },
  ],
  skills: [
    { title: 'Frontend', detail: 'React, JavaScript, jQuery, HTML5, CSS3, Bootstrap' },
    { title: 'Backend', detail: 'PHP, Laravel, CodeIgniter, REST API design' },
    { title: 'Data', detail: 'MySQL schema design, indexing, optimization, reporting' },
    { title: 'Payments', detail: 'Stripe Billing, Checkout, Payment Intents, webhooks' },
  ],
  projects: [
    {
      name: 'Stripe Subscription Platform',
      impact: 'Automated trial-to-paid lifecycle, upgrades, downgrades, and refunds.',
    },
    {
      name: 'Finance Ops Reporting Layer',
      impact: 'Enabled month-end checks and reconciliation with clearer traceability.',
    },
    {
      name: 'Audit Logging Framework',
      impact: 'Added tamper-evident logs for critical user and financial events.',
    },
  ],
}
