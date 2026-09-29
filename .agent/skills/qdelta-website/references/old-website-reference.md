# QDelta Technologies — Old Website Audit & Reference Archive
> **Source Website:** [https://www.qdelta.in](https://www.qdelta.in)  
> **Archived Date:** September 2026  
> **Status:** Analyzed, assets downloaded, and cross-referenced with the new authoritative brand guidelines in [.agent/skills/qdelta-website/SKILL.md](file:///c:/Users/mdq29/Desktop/qdelta-website-new/.agent/skills/qdelta-website/SKILL.md).

---

## 1. Executive Summary & Tech Stack

The previous `qdelta.in` website was built as an editorial dark-mode digital agency experience.

### Technical Foundations Discovered
- **Framework:** Next.js (App Router, Turbopack, Server Components)
- **Styling:** Tailwind CSS with custom cosmic theme palette and glassmorphism
- **Typography:**
  - `Playfair Display` (Serif display headlines with italic luxury emphasis)
  - `Inter` (Neutral, clean sans-serif for UI, paragraphs, and microcopy)
  - `JetBrains Mono` (Monospaced uppercase badges, phases, and tags)
- **Motion & Scroll Behavior:**
  - Marquee horizontal ticker
  - Scroll-pinned manifesto section (`#manifesto` pinned across `480vh` scroll distance with staggered word reveals)
  - Smooth-scrolling layout with blur-in and transform entrance animations

---

## 2. Color Palette & Design Tokens in Old Site

| Element | Old Site Color / Value | Note for New Build |
| :--- | :--- | :--- |
| **Main Background** | `#040406` / `#030305` | Deep obsidian / near black; excellent backdrop for the golden signal |
| **Card Surfaces** | `#0b0b10`/95, `#0a0a10`/95 | Deep charcoal with `backdrop-blur-2xl` and subtle `border-white/10` |
| **Old Gold Accent** | `#D4AF37` / `#E5B869` | Old warm gold. **New build uses `#FAB406`** (exact gold from new official logo) |
| **Secondary Accent** | `#2563eb` (Royal Blue) | Used on the Signature card badge in old site |
| **Primary Text** | `#ffffff` / `#f4f4f5` | Clean white / soft off-white |
| **Muted Text** | `text-zinc-300`, `text-zinc-400` | High-contrast secondary text |
| **Glow Effects** | `radial-gradient(ellipse at center, rgba(212,175,55,0.03))` | Controlled ambient glows |

---

## 3. Real Company Assets & Legal Credentials Discovered

These are authentic business credentials and verified assets extracted and preserved:

### Government Registration & Legal Identity
- **Enterprise Status:** MSME Registered Enterprise (Ministry of Micro, Small & Medium Enterprises, Government of India)
- **UDYAM Registration No:** `UDYAM-TS-07-0114276`
- **Legal Entity / Proprietor:** `MOHAMMED QAISUDDIN`
- **Official Public Contact Email:** `hello@qdelta.in`
- **Service Commitments:** Under 24-hour turnaround on inquiries; Agency NDA & confidentiality protected

### Official User-Provided Brand Assets
- **Main Transparent Logo:** [`public/images/qdelta-logo.png`](file:///c:/Users/mdq29/Desktop/qdelta-website-new/public/images/qdelta-logo.png)
- **Official Favicon / Icon:** [`public/images/qdelta-icon.png`](file:///c:/Users/mdq29/Desktop/qdelta-website-new/public/images/qdelta-icon.png) & [`public/favicon.ico`](file:///c:/Users/mdq29/Desktop/qdelta-website-new/public/favicon.ico)

---

## 4. Section-by-Section Content & Copy Breakdown

### 4.1 Header & Navigation
- **Logo:** `QDelta.`
- **Nav Links:** Services, Packages, Process, Projects, Team, Contact
- **CTA Button:** `Start a Project ↗` (White pill button with gold hover glow)

---

### 4.2 Hero (`#home`)
- **Old Headline:** *"Built to Impress. Designed to Perform."*
- **Old Subheading:** *"Bespoke digital design, high-performance engineering, and conversion-focused experiences crafted to elevate your brand."*
- **CTAs:** `Start a Project` and `Explore Services`
- **Marquee Ticker:** `Next.js ✦ Conversion ✦ Landing Pages ✦ Web Design ✦ Development ✦ Brand Systems ✦ UX Strategy ✦ Design Systems ✦ Webflow & Next.js`

> **Guideline Alignment for New Build:**  
> The new authoritative headline in `SKILL.md` is:  
> **"Built to speak. Designed to work."**  
> Supporting copy: *"We build websites that speak for your brand and work for your business."*

---

### 4.3 Manifesto / Story Beat (`#manifesto`)
- **Old Beat:**  
  *"People don't just see your website. They see your brand!"* (Scroll-pinned animation across 480vh)

> **Guideline Alignment for New Build:**  
> Expanded into the 3 cinematic beats from `SKILL.md`:  
> 1. *People don't just see your website. They see what your business is worth.*  
> 2. *Great design gets attention. The right experience builds belief.*  
> 3. *And belief turns into action. That's what we build at QDelta.*

---

### 4.4 What We Do (`#services`)
The old site presented four disciplines:

1. **Brand & Business Websites**
   - Sub-hook: *Establish market presence.*
   - Description: *High-performance websites built to articulate value and convert visitors into clients.*
   - Best for: *Businesses, modern brands & founders*
2. **High-Converting Landing Pages**
   - Sub-hook: *Turn attention into action.*
   - Description: *Laser-focused, fast pages designed to maximize signups and sales.*
   - Best for: *Campaigns, SaaS & product launches*
3. **3D & Animated Experiences**
   - Sub-hook: *Standout visual immersion.*
   - Description: *Interactive WebGL physics, fluid motion, and dynamic storytelling.*
   - Best for: *Luxury labels & creative studios*
4. **E-commerce Platform**
   - Sub-hook: *Seamless online selling.*
   - Description: *Intuitive shopping flows optimized for rapid discovery and frictionless checkout.*
   - Best for: *D2C brands & retail stores*

---

### 4.5 Packages (`#packages`)
Two distinct packages:

#### 1. QDelta Digital
- **Positioning:** *Built to convert.*
- **Audience:** *For digital products, services, personal brands & offers.*
- **Core Pillars:** Landing Pages, Sales Experiences, Funnels, Integrations

#### 2. QDelta Signature
- **Positioning:** *Built to stand out.*
- **Audience:** *For brands that want a premium, memorable digital presence.*
- **Core Pillars:** Premium Websites, Storytelling, Motion & Animation, Interactive Experiences

---

### 4.6 Inclusions / Standard Quality Commitments (`#inclusions`)
The old site listed 13 non-negotiable commitments:
1. Strategic Page/Website Structure
2. Custom UI/UX Design
3. Conversion-Focused Copywriting Assistance
4. Animations & Micro-interactions
5. Two Design Revision Rounds
6. Responsive Development
7. SEO Foundations
8. AEO / AI Search Readiness Foundations
9. Performance Optimization (Lighthouse focus)
10. Basic Analytics
11. Domain & Hosting Assistance
12. 30-Day Post-launch Technical Support
13. Locked milestone sign-offs

---

### 4.7 Process (`#process`)
The old site used an 8-stage breakdown:
1. **01 Plan:** Strategy, Architecture & Scope
2. **02 Design:** Visual Identity & Bespoke UI/UX
3. **03 Prototype:** Interactive Motion & Tactile Physics
4. **04 Client Approval:** Collaborative Review & Milestone Sign-Off
5. **05 Development:** Next.js & High-Performance Engineering
6. **06 Testing:** QA, Cross-Device & Core Web Vitals
7. **07 Production Deployment:** Global Edge CDN & Instant DNS Launch
8. **08 Support:** Continuous Telemetry & Scaling

> **Guideline Alignment for New Build:**  
> The new authoritative process in `SKILL.md` simplifies this into 4 public client-facing stages:  
> **01 Understand → 02 Strategize → 03 Design & Build → 04 Launch & Improve**. (The 8 internal steps can be shown as sub-details).

---

### 4.8 Featured Projects (`#projects`)
The old site showcased 4 concept flagships:
1. **Aetheria Neural Canvas** (Neural data streaming / creative tooling)
2. **Vespera Haute Horlogerie** (Genève 2025 Luxury 3D timepiece configurator)
3. **Solstice Liquidity Terminal** (Fintech asset management terminal)
4. **Kroma Studio Generative** (Generative asset synthesis studio)

> **Guideline Alignment for New Build (Critical Integrity Rule):**  
> The old site included fictional metrics (e.g. "$2.8B volume handled", "+44% conversion").  
> **Rule 4 & Rule 20 strictly prohibit fabricated metrics.** The new site will present concept projects honestly labeled as **Concept Project** or **In Development** (such as *Signal Horizon*, *The Metaverse of Form*, and *Conversion Path*).

---

### 4.9 Testimonials (`#testimonials`)
- Old site used generated avatar cards and placeholder names (*Gabrielle Williams, Samantha Johnson, Isabella Rodriguez, David Chen, Arthur Vance*).

> **Guideline Alignment for New Build:**  
> Strictly replaced with the honest placeholder defined in `SKILL.md`:  
> *"Proof over promises. Client stories will appear here only after the work is live and the words are approved."*

---

### 4.10 Team (`#team`)
- **MD Qais** — Founder (Strategy & Direction / Creative Direction)
- **Nagireddy Sai Prabhath** — Co-Founder
- **MD Fazeel** — Co-Founder

---

### 4.11 Contact (`#contact`)
- Headline: *"Let's Talk. Have a project in mind?"*
- Supporting line: *"Have an ambitious idea? Let's engineer it."*
- Features: 24h guaranteed response, Agency NDA protection, fixed scope milestones.
- Form inputs: Name, Email, Project Category, Goal / Description.

---

### 4.12 Footer
- Brand copyright: `© 2026 QDelta Technologies (Prop. Mohammed Qaisuddin)`
- MSME Badge & Registration details: `UDYAM-TS-07-0114276`
- Navigation groups: Services, Process, Team, Contact
- Social links: Instagram, LinkedIn, Twitter/X, GitHub
- Direct Email: `hello@qdelta.in`

---

## 5. Summary of Improvements for the New Website

1. **Brand Identity & Color Unification:** Replace disparate gold tones with the exact `#FAB406` from the official transparent logo.
2. **Honest Copy & Zero Fake Data:** Remove exaggerated metrics and fake customer testimonials; adopt authentic concept showcases and honest proof placeholders.
3. **Refined Copywriting:** Switch to the business-first slogan *"Built to speak. Designed to work."*
4. **Streamlined Narrative:** Streamline the 8-stage technical process into the 4 clear, outcome-focused phases defined in `SKILL.md`.
5. **Authentic Representation:** Communicate the small focused founding team with transparent identities, official MSME credentials, and honest proof.
