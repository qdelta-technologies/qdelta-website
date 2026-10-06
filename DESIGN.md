# DESIGN.md — QDelta Digital Flagship Studio

> **Design System Specification for Google Stitch & AI Agents**  
> **Brand**: QDelta Technologies (`https://qdelta.digital`)  
> **Industry**: Ultra-High-Performance Web Engineering & Luxury Digital Agency  
> **Aesthetic Archetype**: Modern Minimalist Luxury / Dark Obsidian / High-Craft Editorial

---

## 1. Brand Identity & Vision

QDelta builds high-performance, conversion-engineered digital flagship websites for modern brands, venture-backed startups, and luxury enterprises. 

The visual identity embodies **restrained luxury, surgical engineering precision, and fluid kinetic depth**. It avoids generic tech cliches and over-saturated color, favoring deep obsidian charcoal surfaces, crisp typography, and disciplined golden amber accents.

* **Tone of Voice**: Confident, concise, authoritative, refined, practitioner-led.
* **Key Promise**: *"A website that actually grows your business. And that’s what we build at QDelta."*

---

## 2. Color Palette & Design Tokens

### 2.1 Dark Obsidian Foundations
* **Background Primary**: `#040406` (Deep Obsidian Base)
* **Background Secondary / Surface**: `#08080D` (Elevated Card Surface)
* **Background Glass / Card**: `#0E0E14` with `backdrop-blur-2xl` (Dual Monoliths & Modals)
* **Border Default**: `rgba(255, 255, 255, 0.08)`
* **Border Hover / Focus**: `rgba(255, 255, 255, 0.20)`

### 2.2 Text & Content Hierarchy
* **Text Primary (Headings)**: `#FFFFFF` / `#FBFBFE` (Moonlight Crisp White)
* **Text Secondary (Body)**: `#D4D4D8` / `#A1A1AA` (Zinc-300 / Light Slate)
* **Text Muted (Labels & Metadata)**: `#71717A` (Zinc-500)
* **Text Monospace Sub-headlines**: `#FAB406` (Amber Gold) & `#E5D5B8` (Champagne Pearl)

### 2.3 Brand Accents & State Colors
* **Primary Accent (Signature Gold)**: `#FAB406`
  * Hover / Focus: `#F6A803`
  * Soft Glow Aura: `rgba(250, 180, 6, 0.15)`
* **Secondary Accent (Champagne Pearl)**: `#E5D5B8` (Used for refined badges and headers)
* **Tertiary Accent (Cyan / Sky)**: `#38BDF8` (Used for QDelta Signature Tier 02 & Tech Badges)
* **Success / Online Status**: `#10B981` (Emerald pulse)

---

## 3. Typography System

The primary brand typeface across the entire digital ecosystem is **Epilogue** (Variable Font weights 300 to 800), configured with tight editorial letter-spacing.

* **Primary Font**: `Epilogue`, sans-serif
* **Monospace / System Tags**: `JetBrains Mono` / `ui-monospace`, monospace

### Typography Hierarchy
| Role | Size (Desktop) | Size (Mobile) | Weight | Tracking | Color |
|---|---|---|---|---|---|
| **Display / Hero H1** | `4.25rem - 5.5rem` | `2.5rem - 3.25rem` | Extrabold (800) | `-0.03em` | `#FFFFFF` with `#FAB406` italics |
| **Section Title H2** | `2.75rem - 3.75rem` | `2.0rem - 2.5rem` | Normal (400) / SemiBold (600) | `-0.025em` | `#FFFFFF` |
| **Card / Item Title H3** | `1.75rem - 2.25rem` | `1.35rem - 1.5rem` | Medium (500) | `-0.015em` | `#FFFFFF` |
| **Section Eyebrow / Badges** | `0.75rem (12px)` | `0.7rem (11px)` | Medium (500) Mono | `+0.25em` Uppercase | `#E5D5B8` / `#FAB406` |
| **Body Large (Intro)** | `1.125rem - 1.25rem` | `1.0rem` | Light (300) | Normal | `#D4D4D8` |
| **Body Standard** | `0.875rem - 0.9375rem` | `0.8125rem` | Light (300) | Normal | `#A1A1AA` |
| **Micro Labels / Metadata** | `0.6875rem (11px)` | `0.625rem (10px)` | Mono Regular | `+0.2em` Uppercase | `#71717A` |

---

## 4. Layout, Spacing & Grid Rules

1. **12-Column Responsive Grid**:
   * All multi-column cards and service rows utilize explicit 12-column CSS grids (`grid-cols-1 lg:grid-cols-12`) with `gap-6` to `gap-8` gutters to guarantee zero text collision at any viewport width.
2. **Generous Breathing Room**:
   * Sections use `py-24 sm:py-32 md:py-36` vertical padding.
   * Container max width: `max-w-7xl` (`1280px`) or `max-w-6xl` (`1152px`) centered with `px-5 sm:px-8 lg:px-12`.
3. **Layered Surface Elevation**:
   * Shadows are deep and dark: `shadow-[0_25px_60px_rgba(0,0,0,0.85)]`.
   * Surface borders are fine and semi-transparent: `border border-white/[0.08]`.

---

## 5. UI Component Specifications

### 5.1 Floating Navbar
* **Structure**: Centered floating pill dock with `backdrop-blur-xl`, `bg-[#0e0e14]/80`, and fine border.
* **Elements**: Brand logomark, anchor navigation links with smooth hover states, and glowing Primary CTA button (`Start Project`).

### 5.2 Glowing Status Badges
* **Structure**: Compact pill with a pulsing colored dot (`h-1.5 w-1.5 rounded-full`) and uppercase monospace label.
* **Example**: `[ • OUR SERVICES ]` with champagne gold dot and border `border-[#E5D5B8]/20 bg-[#E5D5B8]/[0.06]`.

### 5.3 Interactive Cards & Monoliths
* **Structure**: Rounded corners (`rounded-3xl`), `bg-[#0e0e14]/95`, fine `border-white/10`.
* **Hover State**: Smooth `-translate-y-1` elevation, subtle border highlight (`hover:border-[#FAB406]/40`), and radial ambient shadow glow.

### 5.4 Architectural Services Row List
* **Structure**: Pure typographic list divided by `divide-y divide-white/[0.08]`.
* **Row Composition**:
  * **Left (5 Cols)**: Number in gold (`/01`), Title in white serif/sans, Sub-headline in gold mono.
  * **Center (4 Cols)**: Concise description text in light zinc.
  * **Right (3 Cols)**: Right-aligned "Best For" target audience pill.
* **Hover State**: `hover:bg-[#FAB406]/[0.06] hover:shadow-[0_0_35px_rgba(250,180,6,0.12)]`.

### 5.5 Buttons & CTAs
* **Primary Gold Button**: `bg-[#FAB406] text-black font-semibold rounded-full shadow-[0_0_20px_rgba(250,180,6,0.35)] hover:bg-white`.
* **Secondary Glass Button**: `border border-white/20 bg-white/[0.04] text-white rounded-full hover:bg-white/10`.

---

## 6. Website Structure & Content Architecture

1. **Navbar**: Brand navigation & instant project inquiry trigger.
2. **Hero Section**: 
   * Main Headline: High-converting luxury agency value proposition.
   * Subtitle: Punchy summary of capabilities.
   * Dual CTAs: *"Explore Work"* & *"Book Discovery Call"*.
3. **Trust & Proof Bar**: Infinite-scroll marquee with client logos, tech stacks, and performance badges.
4. **Manifesto / Promise Section**:
   * Headline: *"A website that actually grows your business."*
   * Subheading: *"And that’s what we build at QDelta."*
5. **Services Section (What We Do)**:
   * `01`: Brand & Business Websites (Establish market presence)
   * `02`: High-Converting Landing Pages (Turn attention into action)
   * `03`: 3D & Animated Experiences (Standout visual immersion)
   * `04`: E-commerce Platform (Seamless online selling)
6. **Packages Section (Dual Monoliths & Matrix)**:
   * **Tier 01: QDelta Digital** (Conversion-focused landing pages & funnels)
   * **Tier 02: QDelta Signature** (Bespoke flagships & 3D WebGL experiences)
   * **Inclusions Matrix**: Strategy, Design, Engineering (Next.js, AEO, SEO), Deployment & 30-Day Warranty.
7. **Process Section (How We Build)**:
   * Phase 1: Strategic Discovery & Architecture
   * Phase 2: Bespoke UI/UX & Art Direction
   * Phase 3: Ultra-Fast Next.js Engineering
   * Phase 4: Quality Assurance, Launch & Warranty
8. **Portfolio Section**: Interactive case studies with live URLs, key metrics (+240% conversions), and sector filters.
9. **Testimonials Section**: Verified founder quotes, company names, and measurable ROI results.
10. **Team Section**: Core practitioners, portraits, bios, and LinkedIn profiles.
11. **Contact Section**: Interactive form with budget selectors, project timeline, and direct calendar booking.
12. **Footer**: Quick links, legal policies (Privacy Policy & Terms of Service), and brand copyright.

---

## 7. Motion & Interaction Principles

* **Restrained & Seamless**: Avoid jarring or intrusive motion. Transitions are subtle (`cubic-bezier(0.16, 1, 0.3, 1)`).
* **Hover Micro-Interactions**: Smooth scale (`scale-[1.02]`), gentle translations (`translate-x-1.5`), and border luminescence.
* **No Scroll Hijacking**: Pure native, fluid scrolling without pinning or artificial delays.

---
*Created for QDelta Technologies • Ready for Stitch with Google & Design Agents*
