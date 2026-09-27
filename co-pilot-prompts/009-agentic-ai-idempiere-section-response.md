# Implementation: Agentic AI for iDempiere

Added a dedicated #agentic-ai section immediately before contact, after the existing ERP service hierarchy and Connected Business Capabilities. Existing sections and their content are unchanged.

## Files and reused patterns
- index.html: new semantic section, six cards with native details/summary use-case lists, approval journey, architecture, governance, platform options and contact CTA. Asset query versions refreshed.
- styles.css: scoped agentic section styles using existing brand variables, card, service-list, disclosure, tags and button patterns.
- entrance.js: reused IntersectionObserver/Web Animations entrance logic for individual AI cards and subsection groups; avoids fading the entire tall section. Reduced-motion preference respected. Existing hover and focus styles reused.
- dist/index.html, dist/styles.css, dist/entrance.js: matching static deployment copies for Sites. Production GitHub Pages serves root assets.
- co-pilot-prompts/009-agentic-ai-idempiere-section-prompt.md: supplied prompt, with transport escaping normalized.
- This response document. Sequence 009 follows the production repository's existing 008 record; no prior records overwritten.

## Structure
1. Heading, supporting message and integration introduction.
2. Ask ERP; Finance Agent; Sales & Procurement Agents; Inventory & Operations Agent; Support & ERP Health Agent; Controlled ERP Actions. All 47 requested use cases are present in native expandable lists.
3. Explicit controlled-action policy.
4. Ask → Analyze → Recommend → Prepare → Approve → Execute.
5. AI That Works With Your ERP: User → AI Assistant / Agent → Controlled Business Services → iDempiere REST APIs / Processes → iDempiere ERP.
6. Eight enterprise safeguards, including human approval and no unrestricted database access.
7. AWS Bedrock, OpenAI, Azure OpenAI, Google Gemini, and private/self-hosted options; selection depends on customer architecture.
8. Discuss Your ERP AI Use Case links to existing #contact.

## SEO and accessibility
Content, headings and use cases are delivered as static HTML, including the collapsed details content, without a JavaScript rendering dependency. Requested AI/ERP terms are incorporated in context. Existing canonical, metadata and structured data are preserved. Semantic heading order, native keyboard-operable disclosure controls, unique section identifiers, existing visible focus treatment and reduced-motion support are retained. No new packages or icon library introduced.

## Responsive design
Cards: three columns above 1100px, two from 768–1100px, one below 768px. Journey: six columns on wide desktop, a vertical ordered flow on narrower screens to preserve sequence. Architecture stays vertical; architecture/governance stack below 768px. CTA wraps into a column at 1100px. Minmax grid tracks, wrapping card text and bounded CTA width address narrow viewports.

## Validation
- JavaScript syntax checks passed for entrance.js and navigation.js.
- HTML checks passed: six cards/disclosures, 47 use cases, unique IDs, valid in-page link targets, contact CTA.
- Pre-existing page HTML compared unchanged except updated asset query versions and the inserted section.
- CSS brace balance and matching root/dist assets checked.
- No production compiler, lint script or test suite is configured; this is a buildless static HTML site. The Sites workflow packages the static dist directory.
- Desktop/tablet/mobile breakpoint logic reviewed in source. Actual browser rendering, horizontal-overflow measurement, expanded-card visual checks and runtime console checks were not completed: this static project has no compatible managed preview server. These are limitations, not passing browser-test claims.
