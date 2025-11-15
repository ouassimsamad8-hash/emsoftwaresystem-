# Design Guidelines: E&M Software System

## Design Approach
**Reference-Based: Creative Agency Aesthetic**
Drawing inspiration from Osty theme and modern agency portfolios (Awwwards-style creative studios), combined with professional IT services credibility. This approach balances creative visual appeal with enterprise trustworthiness.

## Core Design Principles
- **Professional Creativity**: Modern agency aesthetics with corporate credibility
- **Visual Storytelling**: Image-driven narrative showcasing software solutions
- **Bilingual Elegance**: Seamless language switching without layout breaks
- **Trust Signals**: Strategic placement of credentials, client logos, certifications

---

## Typography

**Font Stack:**
- **Headings**: Inter (700, 600) - Modern, tech-forward, excellent bilingual support
- **Body**: Inter (400, 500) - Consistent family, optimal readability
- **Accents**: Space Grotesk (500) - For special callouts, numbers, stats

**Hierarchy:**
- **H1**: 3.5rem (desktop) / 2.5rem (mobile), font-weight 700, tight line-height (1.1)
- **H2**: 2.5rem (desktop) / 2rem (mobile), font-weight 600
- **H3**: 1.5rem, font-weight 600
- **Body**: 1.125rem, font-weight 400, line-height 1.7
- **Captions**: 0.875rem, font-weight 500

---

## Layout System

**Spacing Units**: Use Tailwind units of **4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Component gaps: gap-6 or gap-8
- Section padding: py-16 (mobile), py-24 (desktop)
- Container max-width: max-w-7xl
- Content max-width: max-w-4xl (for text-heavy sections)

**Grid Systems:**
- **Projects/Portfolio**: 3-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- **Services**: 3-column cards (responsive to 1 column mobile)
- **Blog**: 2-column layout (md:grid-cols-2)
- **Stats/Numbers**: 4-column horizontal (lg:grid-cols-4)

---

## Component Library

### Navigation
- **Desktop**: Horizontal menu with language toggle (EN/FR flag icons), "Book Appointment" CTA button (prominent)
- **Mobile**: Hamburger menu, full-screen overlay navigation
- Logo: E&M Software System wordmark (left-aligned)
- Menu items: Home, Services, Projects, About, Blog, Contact, FAQ
- Sticky header with subtle shadow on scroll

### Hero Sections
**Homepage Hero:**
- Full-width (100vh), split layout: Left 50% (content), Right 50% (large diagonal image)
- Diagonal image treatment creates dynamic feel
- H1 headline + subtitle + dual CTAs ("Book Appointment" + "View Services")
- Animated gradient overlay on image

**Interior Page Heroes:**
- 60vh height, centered content with background image (subtle overlay)
- Breadcrumb navigation below H1
- Clean, focused messaging

### Service Cards
- Hover-lift effect (transform translateY)
- Icon at top (80x80px, using Font Awesome icons)
- Title (H3), short description (2-3 lines)
- "Learn More" link with arrow
- Border with subtle shadow

### Project/Portfolio Grid
- Masonry-style grid or uniform cards with aspect ratio 4:3
- Overlay on hover: Project title, category tag, "View Project" CTA
- Filter buttons above grid: All, Web Development, Mobile Apps, Custom Software, Digital Transformation
- "Load More" pagination button

### Call-to-Action Sections
**Appointment CTA** (recurring throughout site):
- Full-width section with gradient background
- Centered content: Bold headline + supporting text + "Book Your Free Consultation" button
- Include trust element: "No commitment required" or "30-minute strategy session"

**Contact CTA:**
- Two-column: Form (left) + Contact info with map (right)
- Form fields: Name, Email, Phone, Service Interest (dropdown), Message
- Submit button: "Send Message"

### Blog Cards
- Featured image (16:9 ratio)
- Category tag, date, read time
- Title (H3), excerpt (2 lines max)
- Author avatar + name
- "Read More" link

### FAQ Accordion
- Clean accordion with chevron indicators
- Open/close animation
- Group by category: General, Services, Pricing, Process

### Footer
**Multi-column layout (4 columns desktop, stack mobile):**
- Column 1: Logo, tagline, social icons (LinkedIn, GitHub, Twitter)
- Column 2: Quick Links (Services, Projects, About, Blog)
- Column 3: Services list (with internal links)
- Column 4: Contact info, newsletter signup
- Bottom bar: Copyright, Privacy Policy, Cookie Policy, Language selector

---

## Images

### Image Strategy
**Homepage:**
1. **Hero Image**: Large diagonal image showing collaborative team working on laptops/monitors with code visible (right side, 50% width, full height) - conveys software development energy
2. **Services Section**: Icon-based (no images), focus on clarity
3. **Portfolio Preview**: 6 project thumbnail images (software interfaces, dashboards, mobile apps)
4. **Client Logos**: Row of 6-8 grayscale client/partner logos
5. **Team Section**: 3-4 team member photos (professional headshots)

**About Page:**
1. Hero: Team collaboration photo (60vh background)
2. Mission section: Office environment or technology workspace
3. Team grid: Individual headshots with names, roles

**Service Detail Pages:**
1. Hero: Relevant technology/workspace image per service
2. Process diagram: Icon-based illustrations (no photos)
3. Case study preview: 1-2 project screenshots

**Projects/Portfolio:**
1. Grid: 9-12 project screenshots (desktop/mobile interfaces, dashboards, applications)
2. Project detail pages: 4-6 screenshots per project showcasing solution

**Blog:**
1. Featured images for each post (technology, coding, business themes)
2. Author photos in bylines

**Contact:**
1. Hero: Modern office or cityscape
2. Embedded map for office location

### Image Treatment
- Subtle overlay (rgba(0,0,0,0.3)) on hero images for text readability
- Rounded corners on cards: rounded-lg (8px)
- Hover zoom effect on portfolio items (scale 1.05)
- Lazy loading for performance

---

## Interactive Elements

### Buttons
**Primary CTA** ("Book Appointment", "Get Started"):
- Large, rounded-lg, with blur backdrop when over images
- Hover: subtle scale (1.02) + shadow enhancement

**Secondary CTA** ("Learn More", "View Projects"):
- Outlined style or ghost button
- Hover: fill transition

### Animations (Minimal)
- **Scroll reveal**: Fade-up on sections (stagger by 100ms for lists)
- **Hover states**: Lift effect on cards (4px transform)
- **Page transitions**: Smooth fade between pages
- **Number counters**: Animated count-up for stats (e.g., "500+ Projects Delivered")

### Language Toggle
- Flag icons (EN/FR) in header
- Instant switch without page reload
- Persist preference in localStorage

---

## Bilingual Considerations
- **Layout flexibility**: Avoid fixed widths that break with longer French text
- **Navigation**: Accommodate longer French menu labels
- **Buttons**: Test CTAs in both languages for equal visual weight
- **Forms**: Placeholder text and labels translated
- **SEO**: Separate meta tags per language

---

## Accessibility
- WCAG AA contrast ratios
- Focus states on all interactive elements (2px outline)
- Semantic HTML throughout (nav, main, article, aside)
- Alt text for all images
- ARIA labels for icon buttons
- Keyboard navigation support

---

## Professional Polish
- Consistent 8px spacing grid
- Micro-interactions on hover/focus
- Loading states for forms
- Success/error messaging with icons
- Breadcrumb navigation on interior pages
- "Back to top" button on long pages
- Cookie consent banner (GDPR-compliant)
- Trust badges (if applicable): "Certified Partner", security seals

This design creates a sophisticated, modern software agency presence that balances creative portfolio aesthetics with enterprise credibility, optimized for bilingual audiences and conversion-focused appointment booking.