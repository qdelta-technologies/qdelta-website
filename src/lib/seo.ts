export const SITE_URL = "https://www.qdelta.in";
export const SITE_NAME = "QDelta Technologies";

export interface FaqItem {
  q: string;
  a: string;
}

export interface ServicePage {
  slug: string;
  /** Short label used in nav, footer and related-links */
  label: string;
  /** <title> */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  keywords: string[];
  serviceType: string;
  benefits: { title: string; text: string }[];
  forWho: string[];
  approach: { title: string; text: string }[];
  faqs: FaqItem[];
  related: string[];
}

export const HOME_FAQS: FaqItem[] = [
  {
    q: "What does QDelta do?",
    a: "QDelta Technologies is an AI solutions company that combines artificial intelligence, design and technology to help businesses grow online. We build high-converting landing pages, premium websites, e-commerce stores, web apps, AI chatbots and business automations — all designed to turn visitors into enquiries, bookings or sales.",
  },
  {
    q: "What is a high-converting landing page?",
    a: "A high-converting landing page is a focused page built around one offer and one action. It states the offer clearly, removes distractions, builds trust and makes the next step (call, enquiry, booking or purchase) obvious, so more of the people who visit actually act.",
  },
  {
    q: "What are the add-on services?",
    a: "We offer various add-on services including SEO, AEO/GEO, CMS integration, WhatsApp agents, email automation, AI chatbots, and more.",
  },
  {
    q: "Will my website show up on Google?",
    a: "Every site we build includes technical SEO foundations: clean page structure, titles and descriptions, structured data, fast loading and mobile-first layout. No one can honestly promise a #1 ranking, because rankings also depend on competition, content and time, but we make sure the foundations are right.",
  },
  {
    q: "How do I start a project with QDelta?",
    a: "Send us a short brief using the contact form on this page, or message us on WhatsApp. We will reply, ask a few questions about your business and goals, and recommend the right approach.",
  },
];

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "high-converting-landing-pages",
    label: "High-Converting Landing Pages",
    metaTitle: "High-Converting Landing Page Design - QDelta",
    metaDescription:
      "QDelta designs and builds high-converting landing pages: one clear offer, fast loading, mobile-first, built to turn visitors into enquiries, bookings and sales.",
    h1: "High-Converting Landing Page Design",
    lead: "A landing page has one job: get the right visitor to take one action. We design and build landing pages around your offer so more of your traffic turns into enquiries, bookings or sales.",
    keywords: [
      "high converting landing pages",
      "landing page design agency",
      "landing page designer",
      "conversion focused landing page",
      "sales page design",
    ],
    serviceType: "Landing page design and development",
    benefits: [
      {
        title: "One offer, one action",
        text: "Every section earns its place. We structure the page around a single clear call to action so visitors are never unsure what to do next.",
      },
      {
        title: "Message first, design second",
        text: "We work out who the page speaks to and what makes your offer worth choosing, then write and design around that, with conversion-focused copywriting assistance.",
      },
      {
        title: "Fast and mobile-first",
        text: "Most visitors arrive on a phone. Pages are built in Next.js with optimised images and lean code so they load quickly and read well on small screens.",
      },
      {
        title: "Trust built in",
        text: "Proof, process, answers to common objections and an easy way to get in touch, placed where visitors need them.",
      },
      {
        title: "Ready to measure",
        text: "Analytics and event tracking foundations so you can see which pages and buttons bring enquiries and improve from real data.",
      },
    ],
    forWho: [
      "Businesses running ads or social campaigns that need a page to send traffic to",
      "Founders launching a product, course, event or service",
      "Local and service businesses that want more calls and bookings",
      "Anyone whose current page gets visitors but few enquiries",
    ],
    approach: [
      { title: "Discover", text: "We learn your business, audience and the single action the page should drive." },
      { title: "Structure", text: "We map the page so each section answers a question your visitor has, in the right order." },
      { title: "Design and build", text: "Original design, written and built for speed, with two revision rounds." },
      { title: "Launch and improve", text: "Search-ready launch, tracking in place, and a clear base to test and refine." },
    ],
    faqs: [
      {
        q: "What makes a landing page high-converting?",
        a: "A clear offer, a single call to action, fast loading, a layout that reads well on mobile, and enough trust (proof, answers to objections, easy contact) to make acting feel safe. Conversion rates also depend on your traffic and offer, which is why we start by understanding your business.",
      },
      {
        q: "How is a landing page different from a website?",
        a: "A website has many pages for many visitors. A landing page is a single focused page for one audience and one goal, usually reached from an ad, a social post, a search or a link you share.",
      },
      {
        q: "Can you build a landing page that also ranks on Google?",
        a: "Yes. We build in clean, crawlable code with proper titles, descriptions, headings and structured data, so the page can be found through search as well as through your campaigns.",
      },
      {
        q: "Do you handle checkout or booking on the page?",
        a: "Yes. We can connect enquiry forms, booking flows, payment or checkout links and CRM tools, depending on what your business uses.",
      },
    ],
    related: ["business-website-design", "ecommerce-website-design", "ai-chatbot-for-business"],
  },
  {
    slug: "business-website-design",
    label: "Business Website Design",
    metaTitle: "Business Website Design & Development - QDelta",
    metaDescription:
      "Custom business website design and development by QDelta: premium, fast, mobile-first websites built to explain what you do and bring in enquiries.",
    h1: "Business Website Design and Development",
    lead: "Your website is often the first thing a customer sees. We design and build business websites that explain what you do clearly, look credible, load fast and make it easy to get in touch.",
    keywords: [
      "business website design",
      "website design agency",
      "web design company",
      "custom website development",
      "premium website design",
    ],
    serviceType: "Business website design and development",
    benefits: [
      {
        title: "Custom design, not a template",
        text: "Original UI and UX shaped around your brand, so you do not look like everyone else using the same theme.",
      },
      {
        title: "Clear structure",
        text: "Pages organised around how customers decide: who you are, what you offer, proof, and how to reach you.",
      },
      {
        title: "Motion with purpose",
        text: "Smooth, restrained animation and interaction that adds polish without slowing the site or distracting from the message.",
      },
      {
        title: "Built for search",
        text: "Technical SEO foundations in every build: page structure, metadata, structured data, sitemap and fast loading.",
      },
      {
        title: "Yours to grow",
        text: "Modern Next.js code that can add pages, a blog, bookings or an online store later without a rebuild.",
      },
    ],
    forWho: [
      "Service businesses, consultants and professional firms",
      "Restaurants, cafes and local businesses",
      "Startups and growing companies that have outgrown a basic site",
      "Brands that want a premium, memorable online presence",
    ],
    approach: [
      { title: "Understand the business", text: "Goals, audience, competitors and what makes you worth choosing." },
      { title: "Plan the site", text: "A page structure and message hierarchy before any visual design." },
      { title: "Design and develop", text: "Custom design built as a responsive, accessible, fast website." },
      { title: "Launch with SEO basics", text: "Search-ready launch, analytics, and a handover so you know how it works." },
    ],
    faqs: [
      {
        q: "How long does a business website take?",
        a: "It depends on size and complexity. A focused site is faster than a large custom one. After a short brief we give you a realistic timeline for your project.",
      },
      {
        q: "Will my website work well on mobile?",
        a: "Yes. We design and test mobile-first, since most visitors arrive on phones.",
      },
      {
        q: "Do you include SEO?",
        a: "Every build includes technical SEO foundations. Ranking also depends on content, competition and time, and we can advise on what to publish next.",
      },
      {
        q: "Which package should I choose?",
        a: "QDelta Digital suits focused, conversion-led sites. QDelta Signature is for flagship, fully custom experiences with premium design and motion. We will recommend one after understanding your goals.",
      },
    ],
    related: ["high-converting-landing-pages", "portfolio-and-author-websites", "web-app-development"],
  },
  {
    slug: "portfolio-and-author-websites",
    label: "Portfolio & Author Websites",
    metaTitle: "Portfolio & Author Website Design - QDelta",
    metaDescription:
      "Portfolio and author website design by QDelta: elegant, fast websites for writers, artists, creators and professionals to showcase work and get discovered.",
    h1: "Portfolio and Author Website Design",
    lead: "Your work deserves a home that shows it properly. We design portfolio and author websites for writers, artists, designers and professionals who want to be found, remembered and contacted.",
    keywords: [
      "portfolio website design",
      "author website design",
      "writer website",
      "creative portfolio website",
      "personal brand website",
    ],
    serviceType: "Portfolio and author website design",
    benefits: [
      {
        title: "Shows your work first",
        text: "Layouts that put your books, projects or case studies front and centre, with the care they deserve.",
      },
      {
        title: "A voice that is yours",
        text: "Typography, colour and tone chosen to reflect your style, so the site feels like you and not a generic template.",
      },
      {
        title: "Built to be discovered",
        text: "Clean structure, metadata and structured data (for example for authors and books) so search engines understand who you are and what you make.",
      },
      {
        title: "Easy ways to connect",
        text: "Mailing list sign-up, contact, enquiry and links to where to buy or book, placed where readers and clients look.",
      },
      {
        title: "Fast on every device",
        text: "Image-heavy pages are optimised so galleries and covers look sharp without making visitors wait.",
      },
    ],
    forWho: [
      "Authors and ebook writers who want a home for their books",
      "Designers, photographers, artists and other creatives",
      "Freelancers, coaches and professionals building a personal brand",
      "Students and early-career professionals who need a strong portfolio",
    ],
    approach: [
      { title: "Brief", text: "A short questionnaire about you, your work, your readers or clients, and the look you like and dislike." },
      { title: "Mockups", text: "Design directions to react to before we build, so the result feels right." },
      { title: "Build", text: "Responsive development with optimised images and clean code." },
      { title: "Launch", text: "Search-ready launch with analytics and links to your profiles." },
    ],
    faqs: [
      {
        q: "Do you build websites for authors and ebook writers?",
        a: "Yes. We design author websites that present your books, about page, news and a way for readers to join your list or buy.",
      },
      {
        q: "Can I update the portfolio myself later?",
        a: "We can discuss how you want to manage content during the brief, and set up the site so adding new work stays simple.",
      },
      {
        q: "Will it help people find me on Google?",
        a: "A well-structured site with proper metadata and structured data helps search engines understand you. Rankings also depend on your content and how many people link to you.",
      },
      {
        q: "Can the website be in more than one language?",
        a: "Yes, we ask about languages in the brief and plan the site structure around them.",
      },
    ],
    related: ["business-website-design", "high-converting-landing-pages", "ecommerce-website-design"],
  },
  {
    slug: "ecommerce-website-design",
    label: "E-commerce Website Design",
    metaTitle: "E-commerce Website Design & Online Stores - QDelta",
    metaDescription:
      "QDelta builds premium e-commerce websites and online stores: beautiful product pages, smooth checkout and a fast, mobile-first shopping experience.",
    h1: "E-commerce Website and Online Store Design",
    lead: "An online store should make products look good and buying feel easy. We design and build e-commerce websites that guide shoppers smoothly from discovery to checkout.",
    keywords: [
      "ecommerce website design",
      "online store design",
      "shopify store design",
      "ecommerce developer",
      "product page design",
    ],
    serviceType: "E-commerce website and online store design",
    benefits: [
      {
        title: "Products presented well",
        text: "Premium storefronts and product pages with clear imagery, details and calls to action.",
      },
      {
        title: "Smooth path to purchase",
        text: "Simple navigation, clear product pages and a checkout that does not get in the way.",
      },
      {
        title: "Platform that fits you",
        text: "We build on tools such as Shopify or custom checkout integrations, depending on your catalogue and plans.",
      },
      {
        title: "Fast on mobile",
        text: "Most shopping happens on phones, so we optimise images and code for quick, comfortable browsing.",
      },
      {
        title: "Visible in search",
        text: "Product and category structure, metadata and structured data so products can appear properly in search results.",
      },
    ],
    forWho: [
      "Brands launching their first online store",
      "Small businesses moving from social media selling to their own store",
      "Stores whose current design does not match the quality of their products",
      "Makers and creators selling products, books or digital goods",
    ],
    approach: [
      { title: "Plan the catalogue", text: "How products, categories and collections should be organised for shoppers." },
      { title: "Design the experience", text: "Storefront, product pages and checkout flow designed together." },
      { title: "Build and connect", text: "Store, payments and tools connected and tested." },
      { title: "Launch", text: "Search-ready launch with analytics so you can see what sells." },
    ],
    faqs: [
      {
        q: "Do you build Shopify stores?",
        a: "Yes, Shopify is one of the options we work with, alongside custom builds with checkout integration, depending on what suits your products.",
      },
      {
        q: "Can you migrate my existing store?",
        a: "We can discuss moving products and content to a new design. Share your current store in the brief and we will advise.",
      },
      {
        q: "How do online stores get found on Google?",
        a: "Clean product and category pages, good metadata, structured data and fast loading all help. Ongoing content and links also matter, so we advise beyond the build.",
      },
      {
        q: "Which payment methods can the store accept?",
        a: "We integrate payment and checkout tools that fit your customers and the countries you sell in. Share where you sell and we will recommend options.",
      },
    ],
    related: ["high-converting-landing-pages", "business-website-design", "web-app-development"],
  },
  {
    slug: "web-app-development",
    label: "Web & App Development",
    metaTitle: "Full Stack Web App & MVP Development - QDelta",
    metaDescription:
      "QDelta builds custom web applications, dashboards and MVPs: full stack development with Next.js, shaped around your business requirements and users.",
    h1: "Full Stack Web App and MVP Development",
    lead: "When a website is not enough, we build the product behind it. QDelta develops custom web applications, dashboards and MVPs around your business requirements and your users' needs.",
    keywords: [
      "web app development",
      "full stack development agency",
      "MVP development",
      "custom web application",
      "dashboard development",
    ],
    serviceType: "Custom web application and MVP development",
    benefits: [
      {
        title: "From idea to working product",
        text: "We help turn a concept into a scoped, buildable first version that real users can try.",
      },
      {
        title: "Modern, maintainable stack",
        text: "Next.js, React and TypeScript with clean architecture that is ready to grow past the first release.",
      },
      {
        title: "Dashboards and internal tools",
        text: "Custom systems for managing data, orders, bookings, clients or teams in one place.",
      },
      {
        title: "Integrations",
        text: "Connection to payments, email, spreadsheets, CRMs and other tools your business already uses.",
      },
      {
        title: "Designed, not just coded",
        text: "Interfaces designed to be clear and pleasant to use, not only functional.",
      },
    ],
    forWho: [
      "Founders validating an idea with an MVP",
      "Businesses replacing spreadsheets and manual work with a custom system",
      "Teams that need a client portal, booking system or dashboard",
      "Products that need a marketing site and an app built to match",
    ],
    approach: [
      { title: "Scope", text: "Define the problem, users and the smallest version worth building first." },
      { title: "Design", text: "Flows and interface designed and agreed before development." },
      { title: "Build", text: "Iterative full stack development with regular check-ins." },
      { title: "Launch and iterate", text: "Release, gather feedback and plan next steps." },
    ],
    faqs: [
      {
        q: "What is an MVP?",
        a: "A minimum viable product is the smallest version of your product that real users can try. It lets you test the idea and learn before investing in everything.",
      },
      {
        q: "What technologies do you use?",
        a: "Mainly Next.js, React and TypeScript, with databases and services chosen to fit the project.",
      },
      {
        q: "Can you add features to an existing application?",
        a: "Share what you have in the brief and we will say honestly whether we can extend it or whether a fresh build makes more sense.",
      },
      {
        q: "Do you build mobile apps?",
        a: "Our focus is web applications that work well on phones and desktops. Tell us what you need and we will advise on the right approach.",
      },
    ],
    related: ["ai-chatbot-for-business", "business-website-design", "ecommerce-website-design"],
  },
  {
    slug: "ai-chatbot-for-business",
    label: "AI Chatbots & Automation",
    metaTitle: "AI Chatbots & Business Automation - QDelta",
    metaDescription:
      "QDelta builds practical AI chatbots and workflow automations for businesses: answer customer questions, capture leads and cut repetitive work.",
    h1: "AI Chatbots and Business Automation",
    lead: "We build practical AI tools that save your team time and help customers get answers faster: chatbots for your website and automations for the repetitive work.",
    keywords: [
      "AI chatbot for business",
      "website chatbot",
      "business automation",
      "WhatsApp automation",
      "AI assistant development",
    ],
    serviceType: "AI chatbot and workflow automation development",
    benefits: [
      {
        title: "Answers customers around the clock",
        text: "A chatbot trained on your services and questions, so visitors get help even when you are offline.",
      },
      {
        title: "Captures leads",
        text: "Conversations that collect contact details and pass real enquiries to you.",
      },
      {
        title: "Less repetitive work",
        text: "Automations for follow-ups, notifications, data entry and routine messages.",
      },
      {
        title: "Fits your tools",
        text: "Connections to your website, forms, spreadsheets, email and messaging channels.",
      },
      {
        title: "Practical, not hype",
        text: "We focus on tasks that save you time and money. If automation is not worth it for a job, we will say so.",
      },
    ],
    forWho: [
      "Businesses that answer the same customer questions every day",
      "Teams losing time to manual follow-ups and data entry",
      "Websites that want a helpful assistant instead of a basic contact form",
      "Founders who want to capture more leads from existing traffic",
    ],
    approach: [
      { title: "Find the repetitive work", text: "Where does your time or your customers' time get lost?" },
      { title: "Design the assistant", text: "Decide what it should answer, do and hand over to a person." },
      { title: "Build and connect", text: "Develop it and connect it to your site and tools." },
      { title: "Test and refine", text: "Check real conversations and improve the answers." },
    ],
    faqs: [
      {
        q: "What can an AI chatbot do for my business?",
        a: "It can answer common questions, explain your services, collect enquiries and point visitors to the right next step. Anything sensitive can be handed to a person.",
      },
      {
        q: "Will a chatbot replace my team?",
        a: "No. It handles routine questions so your team can focus on conversations that need a human.",
      },
      {
        q: "Can the chatbot work on WhatsApp?",
        a: "Messaging channels are possible depending on your setup and the platform rules. Tell us your use case in the brief.",
      },
      {
        q: "Is customer data safe?",
        a: "We design with privacy in mind and keep keys and secrets on the server, never in the browser. We will explain exactly what data is collected for your project.",
      },
    ],
    related: ["web-app-development", "high-converting-landing-pages", "business-website-design"],
  },
];

export const getServicePage = (slug: string) =>
  SERVICE_PAGES.find((p) => p.slug === slug);
