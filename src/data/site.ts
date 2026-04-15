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

export type DeliveryPrinciple = {
  title: string;
  body: string;
};

export type TrainingTopic = {
  title: string;
  body: string;
};

export type DigitalCapability = {
  title: string;
  body: string;
};

export const company = {
  name: "ExoSpace Engineering & Consulting s.r.o.",
  shortName: "ExoSpace",
  location: "Prague, Czech Republic",
  email: "engineering@exospace.space",
  website: "https://www.exospace.space",
  tagline:
    "Senior engineering and consulting support for space, mission-critical and digital technical programmes.",
};

export const navigation: NavItem[] = [
  { label: "Services & Solutions", href: "/services" },
  { label: "Sectors", href: "/sectors" },
  { label: "Delivery Model", href: "/delivery-model" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const services: Service[] = [
  {
    title: "System & Service Engineering",
    summary:
      "Structured support for requirements, architecture, interfaces, technical coordination and lifecycle engineering across demanding programmes.",
    scope: [
      "Requirements engineering and traceability",
      "Architecture definition and interface coordination",
      "Support to design, qualification and readiness reviews",
      "Technical alignment between customer, prime and specialist teams",
    ],
    helps:
      "Useful when a programme needs senior engineering capacity, clearer technical ownership and disciplined support across lifecycle stages.",
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
    title: "Space & Ground Segment Operations Support",
    summary:
      "Support for integration, operational readiness, transition, migration and performance follow-up across technical and operational environments.",
    scope: [
      "Ground segment and infrastructure engineering support",
      "System integration and operational readiness",
      "Lifecycle support and transition to operations",
      "Migration planning and performance follow-up",
    ],
    helps:
      "Useful when operational environments need structured engineering continuity between delivery, validation and operations.",
  },
  {
    title: "Security, Risk and Compliance",
    summary:
      "Support for defensive security design, risk assessment, secure environments and compliance-oriented engineering activities.",
    scope: [
      "Security architecture and defensive design",
      "Risk, threat and vulnerability assessment",
      "Secure networking and operational environments",
      "Compliance, accreditation and regulatory support",
    ],
    helps:
      "Useful when technical programmes require resilient engineering decisions, assurance evidence and secure operating logic.",
  },
  {
    title: "Hosting, Network and Operational Environments",
    summary:
      "Practical support for hosting environments, operational connectivity and technical infrastructure coordination.",
    scope: [
      "Secure hosting environment definition and support",
      "Networking architecture and connectivity support",
      "Operational infrastructure coordination",
      "Alignment with customer or partner environments",
    ],
    helps:
      "Useful when programme delivery depends on stable and compliant technical environments rather than isolated software work.",
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
      "Useful when a team needs shared technical understanding, smoother handover and practical training connected to real programme work.",
  },
  {
    title: "Digital Platforms and Web Engineering",
    summary:
      "Digital support for technical organizations, from modern web platforms to integration, automation and traceability-oriented solutions.",
    scope: [
      "Modern web platforms and business applications",
      "AI and ML support for intelligent automation",
      "API and enterprise integration support",
      "Blockchain-enabled traceability and trusted workflows",
    ],
    helps:
      "Useful when digital work must fit a serious technical context rather than behave like a generic marketing or software exercise.",
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
    title: "Mission-critical Technical Organizations",
    needs:
      "Organizations operating critical services need a practical mix of engineering judgement, operational continuity and accountable support.",
    support:
      "ExoSpace supports structured technical decision-making, operational readiness, architecture reviews, studies and capability reinforcement.",
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
  "Company-based delivery, not isolated staffing",
  "Senior multi-domain capability with direct accountability",
  "Continuity and internal redundancy across technical activities",
  "Scalable support model for ongoing work, procurements and future tenders",
  "Short-notice availability with a structured subcontractor mindset",
];

export const deliveryPrinciples: DeliveryPrinciple[] = [
  {
    title: "Company-based delivery",
    body: "ExoSpace is positioned as a single accountable company, not a loose collection of individual consultants.",
  },
  {
    title: "Capacity-based support",
    body: "Support can be shaped around capacity, continuity and progressive scalability when the work cannot be reduced to a narrow staffing request.",
  },
  {
    title: "Work package compatibility",
    body: "Defined work package delivery can also be supported when responsibilities, interfaces and acceptance logic are clear.",
  },
  {
    title: "Prime-friendly integration",
    body: "The operating model is suitable for ongoing activities, procurements and future tenders where a complementary engineering partner is needed.",
  },
];

export const trainingTopics: TrainingTopic[] = [
  {
    title: "Navigation systems and space engineering",
    body: "Training aligned with technical teams that need clearer understanding of system logic, engineering lifecycle and programme context.",
  },
  {
    title: "Ground segment and operational readiness",
    body: "Sessions focused on system integration, validation, operational transition and readiness evidence.",
  },
  {
    title: "Security, risk and compliance",
    body: "Practical briefings and working sessions for teams operating in secure, compliance-sensitive or mission-critical contexts.",
  },
  {
    title: "Programme lifecycle, validation and governance",
    body: "Training that connects technical delivery to reviews, milestones, evidence logic, governance and PMO support.",
  },
];

export const digitalCapabilities: DigitalCapability[] = [
  {
    title: "Modern web platforms and business applications",
    body: "Structured web and digital solutions for organizations that need credibility, maintainability and clear information architecture.",
  },
  {
    title: "AI and ML support",
    body: "Applied digital support for automation, analysis and performance-oriented workflows where technical data and operational context matter.",
  },
  {
    title: "Trusted digital workflows",
    body: "Traceability-oriented and integrity-oriented digital solutions, including blockchain-enabled approaches where justified.",
  },
  {
    title: "Integration and ongoing evolution",
    body: "Support for APIs, data services, enterprise integration and long-term evolution of digital platforms.",
  },
];

export const seo: Record<string, SeoEntry> = {
  home: {
    title: "ExoSpace Engineering & Consulting | Senior Engineering Support",
    description:
      "Senior engineering and consulting support for space, mission-critical and digital technical programmes from Prague, Czech Republic.",
    path: "/",
  },
  services: {
    title: "Services & Solutions | ExoSpace Engineering & Consulting",
    description:
      "System engineering, validation, reviews, studies, operational support, security, training and digital platforms for complex technical programmes.",
    path: "/services",
  },
  sectors: {
    title: "Sectors | Space, Ground Segment, GNSS and Technical Programmes",
    description:
      "Engineering consulting support for space systems, satellite and ground segment, GNSS, secure infrastructure and mission-critical organizations.",
    path: "/sectors",
  },
  deliveryModel: {
    title: "Delivery Model | ExoSpace Engineering & Consulting",
    description:
      "Discover ExoSpace's company-based delivery model, scalable engineering support and complementary partnership approach.",
    path: "/delivery-model",
  },
  training: {
    title: "Training | ExoSpace Engineering & Consulting",
    description:
      "Technical training and knowledge transfer for space engineering, operational readiness, security, compliance and programme delivery.",
    path: "/training",
  },
  digitalSolutions: {
    title: "Digital Solutions | ExoSpace Engineering & Consulting",
    description:
      "Modern web platforms, AI and ML support, integration and trusted digital workflows for serious technical organizations.",
    path: "/digital-solutions",
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
      "Contact ExoSpace to discuss engineering support, delivery models, validation, training, digital platforms or technical studies.",
    path: "/contact",
  },
};
