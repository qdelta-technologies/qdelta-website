<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# QDelta Technologies — Agent Guidelines & Source of Truth

> **Primary Skill Reference:** See [.agent/skills/qdelta-website/SKILL.md](file:///c:/Users/mdq29/Desktop/qdelta-website-new/.agent/skills/qdelta-website/SKILL.md) for full detailed context.  
> **Old Website Reference:** See [.agent/skills/qdelta-website/references/old-website-reference.md](file:///c:/Users/mdq29/Desktop/qdelta-website-new/.agent/skills/qdelta-website/references/old-website-reference.md) for previous site audit, copy, and extracted assets.

## Priority & Source of Truth Rules
1. **Finalized Brand Identity** in `SKILL.md` is strictly authoritative.
2. **Current Offerings**: Two main offerings ONLY — **QDelta Digital** & **QDelta Signature**. Do not create unapproved packages.
3. **Business-First Principle**: "Understand the business. Design with purpose. Build for results." Focus on client outcomes, not AI tool buzzwords (do not lead with "AI-powered", "cutting-edge technology", etc.).
4. **Honest Content**: Zero fake testimonials, fake client logos, or fabricated metrics. Use clearly labeled concept projects or honest placeholders.
5. **Aesthetics & Technology**:
   - Modern Next.js App Router, TypeScript, responsive CSS/Tailwind.
   - Cinematic Golden Yellow accent (`#FAB406`) & deep charcoal palette ("QDelta Signal Horizon").
   - Balanced motion (60fps, respect `prefers-reduced-motion`), accessible, fast (Core Web Vitals LCP ≤ 2.5s).

