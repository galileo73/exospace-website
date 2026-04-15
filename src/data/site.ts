export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  summary: string;
  scope: string[];
  helps: string;
};

export type Sector = {
  title: string;
  needs: string;
  support: string;
};

export type SeoEntry = {
  title: string;
  description: string;
  path: string;
};

export const company = {
  name: "ExoSpace Engineering & Consulting s.r.o.",
  shortName: "ExoSpace",
  location: "Prague, Czech Republic",
  email: "engineering@exospace.space",
  website: "https://www.exospace.space",
  tagline:
    "Senior engineering and consulting support for complex technical programmes.",
};

export const navigation: NavItem[] = [
  { label: "Services & Solutions", href: "/services" },
  { label: "Partners", href: "/sectors" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const services: Service[] = [
  {
    title: "Systems Engineering Support",
    summary:
      "Structured support for requirements, architecture, interfaces, verification logic and technical coordination across demanding programmes.",
    scope: [
      "Requirements engineering and traceability",
      "Architecture definition and interface coordination",
      "Support to design, qualification and readiness reviews",
      "Technical alignment between customer, prime and specialist teams",
    ],
    helps:
      "Useful when a programme needs senior engineering capacity, clearer technical ownership, or disciplined support across lifecycle stages.",
  },
  {
    title: "Technical Consulting and Reviews",
    summary:
      "Independent technical input for decisions, documentation, design maturity and project risk, delivered with a practical engineering mindset.",
    scope: [
      "Architecture and design reviews",
      "PDR, CDR, TRR, DRB and acceptance review support",
      "Procurement and subcontractor technical assessment",
      "Issue framing, options analysis and recommendation papers",
    ],
    helps:
      "Useful when technical stakeholders need a clear second opinion before a milestone, tender, review board or delivery commitment.",
  },
  {
    title: "Validation and Technical Assurance",
    summary:
      "Support for verification, validation, test planning, operational readiness and evidence-based technical assurance.",
    scope: [
      "Validation strategy and verification planning",
      "Test plan and test execution support",
      "Qualification and readiness evidence review",
      "Defect, non-conformance and risk follow-up",
    ],
    helps:
      "Useful when delivery teams need confidence that requirements, tests, evidence and acceptance logic remain aligned.",
  },
  {
    title: "Technical Studies and Expert Assessments",
    summary:
      "Focused studies and assessments that turn complex technical questions into decision-ready findings.",
    scope: [
      "Feasibility and trade-off studies",
      "Risk, threat and vulnerability assessment",
      "Operational concept and transition assessment",
      "Concise executive and technical reporting",
    ],
    helps:
      "Useful when an organization needs a short, rigorous study before investment, procurement, architecture selection or programme planning.",
  },
  {
    title: "Digital / IT / Web Support",
    summary:
      "Credible digital and IT support for technical organizations, with attention to secure environments, operational workflows and maintainability.",
    scope: [
      "Technical web and software support",
      "Secure hosting and operational environment coordination",
      "Networking and connectivity support",
      "Digital tools that support engineering activities",
    ],
    helps:
      "Useful when digital work must fit a technical context rather than behave like a generic marketing or software exercise.",
  },
  {
    title: "Training and Knowledge Transfer",
    summary:
      "Targeted knowledge transfer for engineering teams, technical stakeholders and project organizations.",
    scope: [
      "Navigation systems and space engineering training",
      "Ground segment and operational readiness sessions",
      "Security, risk and compliance briefings",
      "Embedded project training and continuous transfer",
    ],
    helps:
      "Useful when a team needs shared technical understanding, smoother handover, or practical training connected to real programme work.",
  },
];

export const sectors: Sector[] = [
  {
    title: "Space Systems",
    needs:
      "Space programmes often require disciplined requirements, interface control, qualification logic and evidence across many contributors.",
    support:
      "ExoSpace can support systems engineering, review preparation, validation planning and technical coordination for focused work packages or capacity-based support.",
  },
  {
    title: "Satellite and Ground Segment",
    needs:
      "Ground segment and operational environments need integration discipline, readiness evidence, migration planning and clear operational handover.",
    support:
      "ExoSpace supports ground segment engineering, system integration, operational readiness, verification, transition and performance follow-up.",
  },
  {
    title: "GNSS and Secure Infrastructure",
    needs:
      "Navigation and secure infrastructure activities need careful architecture thinking, risk awareness, compliance support and resilient operational design.",
    support:
      "ExoSpace can help with GNSS-related engineering, secure environment definition, defensive security design, risk assessment and technical documentation.",
  },
  {
    title: "Defence and Security-related Technical Activities",
    needs:
      "Security-related programmes require discreet, structured technical support, clear responsibilities and rigorous handling of risk and assurance evidence.",
    support:
      "ExoSpace provides technical review, validation, architecture and compliance-oriented support where security, resilience and operational reliability matter.",
  },
  {
    title: "Digital and Technical Organizations",
    needs:
      "Engineering-led organizations often need digital support that respects technical constraints, operational continuity and long-term maintainability.",
    support:
      "ExoSpace supports technical web, IT, secure hosting coordination and practical digital tools for organizations where credibility matters.",
  },
];

export const differentiators = [
  "Senior technical expertise with direct accountability",
  "Practical support across requirements, architecture, validation and reviews",
  "Boutique attention for high-value, selective work",
  "Flexible collaboration models for ongoing activities, tenders and future programmes",
  "Clear technical thinking without unnecessary management theatre",
];

export const seo: Record<string, SeoEntry> = {
  home: {
    title: "ExoSpace Engineering & Consulting | Senior Engineering Support",
    description:
      "Senior systems engineering, validation, technical consulting and digital support for complex technical programmes from Prague, Czech Republic.",
    path: "/",
  },
  services: {
    title: "Services | ExoSpace Engineering & Consulting",
    description:
      "Systems engineering support, technical reviews, validation, technical studies, digital support and training for complex technical programmes.",
    path: "/services",
  },
  sectors: {
    title: "Sectors | Space, Ground Segment, GNSS and Technical Programmes",
    description:
      "Engineering consulting support for space systems, satellite and ground segment, GNSS, secure infrastructure and technical organizations.",
    path: "/sectors",
  },
  about: {
    title: "About | ExoSpace Engineering & Consulting",
    description:
      "A Prague-based boutique engineering and consulting company focused on senior technical support for demanding programmes.",
    path: "/about",
  },
  contact: {
    title: "Contact | ExoSpace Engineering & Consulting",
    description:
      "Contact ExoSpace to discuss systems engineering, technical consulting, validation reviews, studies, digital support or training needs.",
    path: "/contact",
  },
};
