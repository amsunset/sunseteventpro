

# Sunset Events Pro

_Award-winning financial and operations platform for event management companies.  
Centralizes projects, P&amp;L, cashflow, billing, and analytics—built with React, Firebase, and a gold-standard, accessible design._

---

## Table of Contents

1. Project Overview
2. Quick Start
3. Repository Structure
4. Core Documents
5. Design &amp; UI
6. Testing
7. API Usage
8. Contributing
9. Support &amp; Maintenance
10. Further Reading

---

## Project Overview

**Sunset Events Pro** replaces static spreadsheets and generic apps with a real-time, multi-user, SaaS-grade management hub tailored for event management.  
Key features:

- Centralized P&amp;L, billing, and cashflow by project
- Automated insights, dashboards, and scenario planning
- Granular permissions, role-based UI, and notifications
- Offline mode, audit trail, enterprise-grade security
- No-code configuration, drag-and-drop dashboards, and future-proof API

Built for both in-house teams and AI development agents.

---

## Quick Start

1. Clone the repo:
   ```sh
   git clone [repo-url]
   cd [project-folder]
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment:
   - Copy `.env.example` → `.env`
   - Fill out credentials (Firebase, API keys, etc.)

4. Run the app:
   ```sh
   npm run dev
   ```
   App will be available at http://localhost:3000

---

## Repository Structure

Refer to "App Scaffolding : Onboarding.md" for complete details.

```
├── public/             # Static assets
├── src/                # Source code (components, pages, api, utils, hooks, store)
├── tests/              # Unit/integration/E2E tests
├── styles/             # CSS/Tailwind and custom theme tokens
├── README.md           # This document
├── ...                 # Other configs, CI/CD, scripts, etc.
```

---

## Core Documents

Each of these is a single source of truth for the referenced domain.

| Document (file)                    | Purpose/Usage                                    |
| ----------------------------------- | ------------------------------------------------ |
| Sunset Events Pro-Blueprint.md      | Functional/technical requirements. App logic, workflows, data model, error handling, UX, security.  |
| css.md / tailwind v4 css.rtf        | Brand palette, variables, and component styles for both modes.  |
| UI:Ux style guide.md                | Design tokens, spacing, typographic and layout standards.  |
| App Scaffolding : Onboarding.md     | Project setup, structure, and onboarding steps for new devs/AI.  |
| Testing Strategy.md                 | TDD philosophy, test types, coverage, automation, error states.  |
| API Reference.md                    | Human-readable API endpoints, schemas, example requests/responses.  |

All are version-controlled; keep in sync with app code and update after all significant changes.

---

## Design &amp; UI

- Colors, spacing, typography: See css.md and UI:Ux style guide.md
- Shadows/depth: Only for cards, panels, and modals (see style guide for brand-glow in dark mode)
- Component usage: Assign class names per style guide (`card`, `button-primary`, etc.)
- Accessibility: All palettes, fonts, and layouts meet or exceed WCAG AA for contrast and focus.

Visuals and layouts are extensible for award-winning, modern UIs. For component tokens or a Figma reference, see UI:Ux style guide.md.

---

## Testing

- TDD required for all new code.
- Automated tests: Run `npm run test` or use CI pipeline (see Testing Strategy.md)
- Coverage: Critical paths must be 100%; all PRs blocked if coverage falls below thresholds.
- Visual/a11y regression: Use tools specified in the strategy for Percy/Chromatic and Axe.

---

## API Usage

- All API endpoints and schemas are documented in API Reference.md
- Follows RESTful conventions, uses OAuth2/JWT, and granular permissions
- Example requests and sample payloads included
- Integrate safely: Use the latest endpoints and refer to API doc for auth and error responses

---

## Contributing

- Read this README and all referenced docs before starting.
- Branching/commits: See App Scaffolding : Onboarding.md for conventions.
- Design: Adhere to style guide and accessibility rules.
- Testing: Follow TDD—write/expand tests for any new feature.
- Code Review: All code (including AI-generated) must pass peer review before merging.

---

## Support &amp; Maintenance

- Troubleshooting: See “Troubleshooting” in onboarding doc.
- Admin/Security: Only Admins may access backup/restore, audit logs, or permission matrix.
- Documentation: Update relevant docs with every feature or architectural change—this is enforced as a policy.
- Backups: Admins may download or restore data; refer to blueprint for full disaster recovery workflow.

---

## Further Reading

- Sunset Events Pro-Blueprint.md – Full feature and data model documentation
- css.md, tailwind v4 css.rtf – Brand palette and theming
- UI:Ux style guide.md – Complete design tokens and layout guidance
- Testing Strategy.md – Full testing requirements and automation approach
- API Reference.md – REST API docs, schemas, samples

---

All contributors (human or AI):  
Refer to this README and linked documents before any implementation, review, or deployment.  
This is the canonical, always-up-to-date overview for the platform.

---

For support or onboarding help, contact the project admin, or review the Onboarding guide for common troubleshooting tips and process.
