{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww18260\viewh18540\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
\
# Sunset Events Pro \'96 Comprehensive Financial Model App Blueprint\
\
## 1. Goals and Objectives\
\
- **Centralized, Real-Time Platform:** Replace static Excel models with a modern, multi-user financial management hub for event management companies.\
- **Enhanced Data Accuracy:** Single source of truth, eliminate re-entry errors.\
- **Efficiency & Automation:** Automated calculations (cash flow, P&L), scenario modeling.\
- **Live Insights:** Real-time sync and updates for all users.\
- **Collaboration:** Teams can work simultaneously with user presence and record locking.\
- **Enterprise Security:** SaaS-grade compliance, RBAC, encryption, audit, privacy by design.\
\
---\
\
## 2. Technology Stack\
\
- **Frontend:** React (functional components, hooks), Tailwind CSS (utility-first styling)\
- **Backend/Database:** Firebase Firestore (NoSQL, real-time sync, offline support)\
- **Authentication:** Firebase Auth + SSO (Google, Microsoft, custom)\
- **Notifications:** In-app, email, Telegram/WhatsApp, browser, daily digest option (configurable per user, per event)\
- **DevOps:** Automated CI/CD, test-first workflow, static analysis, security scans\
- **Compliance/Security:** Field-level encryption, GDPR-ready, SOC2 alignment, multi-region backup, RBAC\
\
---\
\
## 3. Application Overview\
\
- **Single-page App (SPA)**: All navigation client-side, responsive across devices.\
- **Role-based UI:** Permissions matrix (edit/view/delete per role, per module).\
- **User Presence:** See who is active, lock records under concurrent edit.\
- **Offline Mode:** Project and cost entry work offline, hybrid sync/resolve on reconnect.\
- **Mobile/PWA Ready:** Application is designed to work seamlessly across devices, including mobile, with offline-first principles where possible.\
- All major advanced features (data quality, approval, customization, undo) are accessible via drag-and-drop or toggle controls in the Admin UI, wherever practical.\
\
---\
\
## 4. Component & Feature Architecture\
\
### 4.1 App Structure\
\
- **App.js:** Routing, auth context, layout shell.\
- **AppProvider.js:** Firebase init, auth, context/state, Firestore listeners.\
- **Header.js:** Navigation bar, user menu, notifications.\
- **Dashboard.js:** KPI, P&L summaries, red flags, filters, charts.\
- **ClientMaster.js:** Client CRUD, receivables, ageing, balance, search.\
- **VendorSheet.js:** Vendor CRUD, payables, priority queue, payment status.\
- **PnlMaster.js:** Project P&L, gross/net profit, margin analysis, drill-down.\
- **CashFlow.js:** 12-month rolling forecast, scenario planner embed.\
- **ScenarioPlanner.js:** Save/load multiple scenarios, what-if inputs.\
- **Settings.js:** Permissions matrix (checkbox table), user management.\
- **AuditTrail.js:** Log of edits (record, who, when, what); visible to Admin and Finance roles only by default.\
\
### 4.2 Notification Center\
\
- Per-event, per-user, per-channel settings (mimics ClickUp).\
- Select events for in-app, email, Telegram/WhatsApp, or browser.\
- Daily digest toggle per user.\
- Configurable in Settings.js.\
\
---\
\
## 5. Data Model (Firestore, Multi-user)\
\
### Data Model (Expanded, Self-Contained)\
\
All data is stored within Firestore, in collections as follows:\
\
#### 1. `client_registration`\
- **Purpose:** Stores all client master data.\
- **Key Fields:**  \
  - `clientId` (string, unique): Primary key for the client  \
  - `clientName` (string): Official client name  \
  - `contactPerson` (string): Main point of contact  \
  - `phone` (string)  \
  - `email` (string)  \
  - `billingAddress` (string)  \
  - `gstin` (string): GST number  \
  - `createdAt`, `updatedAt` (timestamps)\
- **Relationships:**  \
  - Referenced by `client_master` for all transactions and project links.\
  - *Whenever a client is assigned to a project, the `clientId` from this table is used.*\
\
#### 2. `vendor_registration`\
- **Purpose:** Stores all vendor master data.\
- **Key Fields:**  \
  - `vendorId` (string, unique)  \
  - `vendorName`, `category`, `contactPerson`, `phone`, `email`, `billingAddress`, `gstin`  \
  - `createdAt`, `updatedAt`\
- **Relationships:**  \
  - Used by `vendor_sheet` and `project_detailed_pnl` for cost allocation and payment management.\
\
#### 3. `operating_costs`\
- **Purpose:** Track fixed monthly company overheads.\
- **Fields:**  \
  - `costId` (string, unique), `date`, `rent`, `electricity`, `utilities`, `internet`, `adminCosts`, `totalOpEx`, `paymentDueDate`\
- **Relationships:**  \
  - Feeds into `cashflow` calculation.\
\
#### 4. `salary_sheet`\
- **Purpose:** Store all staff payroll info.\
- **Fields:**  \
  - `staffId`, `staffName`, `designation`, `department`, `monthlySalaries` (object: month\uc0\u8594 amount), `createdAt`, `updatedAt`\
- **Relationships:**  \
  - Used in `cashflow` calculations as a recurring outflow.\
\
#### 5. `project_pnl_master`\
- **Purpose:** Summary P&L data for each project.\
- **Fields:**  \
  - `projectId` (unique), `clientId` (references `client_registration`), `projectName`, `businessType`, `eventDate`,  \
    `billingAmount`, `totalInternalVendorCosts`, `grossProfit`, `operatingCosts`, `operatingProfit`,  \
    `taxRate`, `taxes`, `netProfit`, `netProfitPercent`, `amountReceived`, `balanceDue`, `amountPaid`,  \
    `balancePayable`, `projectCashflowBalance`, `status`\
- **Relationships:**  \
  - Aggregates data from `project_detailed_pnl` and references client via `clientId`.\
  - All calculations in P&L draw from this and its linked details.\
\
#### 6. `project_detailed_pnl`\
- **Purpose:** Line-item budget and actuals for every project.\
- **Fields:**  \
  - `lineItemId`, `projectId` (references `project_pnl_master`), `head`, `description`, `budgetExternalCost`, `internalCost`, `vendorId` (references `vendor_registration`)\
- **Relationships:**  \
  - Rollup to `project_pnl_master` for all cost aggregations.\
\
#### 7. `vendor_sheet`\
- **Purpose:** Manages vendor payments and outstanding balances.\
- **Fields:**  \
  - `vendorId` (references `vendor_registration`), `linkedProject` (projectId), `invoiceAmount`, `paymentsMade`, `outstanding`, `dueDate`, `ageingDays`, `status`\
- **Relationships:**  \
  - Used for cash flow planning and payment tracking per project and vendor.\
\
#### 8. `client_master`\
- **Purpose:** Tracks all client financial transactions at the project level.\
- **Fields:**  \
  - `clientId` (references `client_registration`), `projectId` (references `project_pnl_master`), `projectName`, `category`, `status`, `billingAmount`, `advanceReceived`, `balancePending`, `invoiceDueDate`, `receivablesAgeing`\
- **Relationships:**  \
  - Feeds into `cashflow` for receivables, is the main record for client-side project billing.\
\
#### 9. `scenario_planner`\
- **Purpose:** Stores scenario variables for forecasting.\
- **Fields:**  \
  - `scenarioId` (e.g., "Base", "BestCase", "WorstCase"), variables: `totalMonthlyVendorPaymentBudget`, `receivableCollectionsFactor`, `vendorPayoutFactor`, `fixedMonthlyOpEx`\
- **Relationships:**  \
  - Used by `cashflow` calculations to model different scenarios.\
\
#### 10. `audit_log`\
- **Purpose:** Audit trail for all changes.\
- **Fields:**  \
  - `recordType`, `recordId`, `action`, `userId`, `timestamp`, `details`\
- **Relationships:**  \
  - References all above collections for auditing changes.\
\
#### 11. `permissions_matrix`\
- **Purpose:** Defines per-role access rights for every app module/action.\
- **Fields:**  \
  - `role`, `module`, `canEdit`, `canView`, `canDelete` (booleans)\
- **Relationships:**  \
  - Queried by both backend and UI for permissions enforcement.\
\
#### 12. `notifications_settings`\
- **Purpose:** User-level notification preferences.\
- **Fields:**  \
  - `userId`, `eventType`, `channel`, `enabled`, `digest` (bool)\
- **Relationships:**  \
  - Controls the notification center for each user/event.\
\
### Workflow Example\
\
**Project Lifecycle Example:**\
1. A new client is created in `client_registration` and assigned a `clientId`.\
2. When a new project is created, a record is added to `project_pnl_master`, referencing the `clientId`.\
3. For every line item/cost, a record is created in `project_detailed_pnl`, referencing both the `projectId` and the relevant `vendorId`.\
4. `vendor_sheet` tracks all vendor payments made for each project/vendor.\
5. `client_master` records all client billing, advances, and ageing at the project level.\
6. The `scenario_planner` sets global factors for use in all cashflow and forecast calculations.\
7. All changes are logged in `audit_log`, and permissions are enforced as per `permissions_matrix`.\
8. User notification settings and delivery are managed via `notifications_settings`.\
\
---\
\
## 6. Core Business Logic & Formulas\
\
### 6.1 Client Master\
- **Balance Pending:** billingAmount - advanceReceived\
- **Receivables Ageing:** max(0, floor((today - invoiceDueDate)/days))\
- **Conditional Formatting:** Red if >90 days overdue\
\
### 6.2 Vendor Sheet\
- **Outstanding Payments:** invoiceAmount - paymentsMade\
- **Ageing:** max(0, floor((today - dueDate)/days))\
- **Status:** Overdue if ageing > 45 days\
\
### 6.3 Project P&L Master\
- **Total Costs:** sum(project_detailed_pnl.budget + internalCost)\
- **Gross Profit:** billingAmount - totalInternalVendorCosts\
- **Operating Profit:** Gross Profit - operatingCosts\
- **Taxes:** Gross Profit * taxRate\
- **Net Profit:** Gross Profit - Taxes\
- **Net Profit %:** Net Profit / billingAmount\
- **Balance Due/Payable:** billingAmount - amountReceived, costs - amountPaid\
- **Cashflow Balance:** amountReceived - amountPaid\
\
### 6.4 Cash Flow Forecast\
- **Monthly loop** (0..11):  \
  - Inflows: client advances, scheduled receivables * factor  \
  - Outflows: priority vendor pay, FIFO queue, salaries, OpEx  \
  - Ending Balance = Previous + (Inflows - Outflows)\
- **Scenario Planner:** Select scenario, auto-update all dependent KPIs and forecasts.\
\
### 6.5 Dashboard\
- **KPIs:** Total billing, profit, project counts (MTD/QTD/YTD)\
- **Red Flags:** Overdue receivables, vendor payables, low-margin projects\
\
### Example Calculation (JSON)\
\
For a sample project, the following calculation could be represented in JSON:\
\{\
  "projectId": "P123",\
  "billingAmount": 500000,\
  "totalInternalVendorCosts": 320000,\
  "grossProfit": 180000,\
  "operatingCosts": 40000,\
  "taxRate": 0.18,\
  "taxes": 32400,\
  "netProfit": 147600,\
  "netProfitPercent": 0.2952,\
  "amountReceived": 300000,\
  "balanceDue": 200000,\
  "amountPaid": 150000,\
  "balancePayable": 170000,\
  "projectCashflowBalance": 150000\
\}\
\
---\
\
## 6.1 Formula Editability & Versioning\
\
- All core business formulas (e.g., P&L, tax, cashflow logic) are accessible and viewable in the Settings or Admin panel by users with Admin or delegated permissions.\
- The frontend provides a "Formula Version History" modal, showing who changed a formula, what changed, and when.\
- Formula changes are versioned: previous versions can be restored or compared. All edits are logged in `audit_log`.\
- Only Admins or users with explicit delegation may edit formulas. All users can view the current formula logic and version history for transparency.\
\
## 6.2 Edge Case & Error Handling\
\
- Data Integrity: When a referenced client/vendor/project is deleted or archived:\
    - If referenced elsewhere, enforce archive/soft delete only. Prevent hard delete unless all references are removed or reassigned.\
    - On attempted edit of a locked/archived record, display an explicit error message and audit the attempt.\
    - For negative or nonsensical values (e.g., negative ageing), prompt user for review and block save.\
- Data Sync: In offline mode, prevent edits to records that were deleted/modified by others since last sync\'97summarize and ask user to resolve on reconnect.\
- Validation: All imports, exports, and calculations enforce strong type checking and value ranges; invalid data is rejected with user guidance.\
\
## 6.3 API Extensibility\
\
- The app exposes RESTful API endpoints for integration with external billing, payroll, or ERP systems (e.g., `/api/invoice`, `/api/payroll`, `/api/vendor`).\
- API authentication uses OAuth2/JWT with granular permission scopes.\
- All API access and changes are logged in `audit_log`.\
- API documentation is maintained and accessible from the Admin panel, with version history and deprecation notices.\
\
## 6.4 User Experience (UX) Standards\
\
- The app follows "gold standard" UX principles:\
    - Responsive, mobile-first design with PWA capabilities.\
    - Intuitive navigation with minimal clicks to any primary action.\
    - Real-time feedback (loading, error, success) for every user action.\
    - Accessibility: WCAG 2.2 AA compliance (contrast, keyboard, ARIA labels).\
    - Consistent and familiar UI elements (e.g., shadcn/ui, system font stacks).\
    - Undo/redo for all destructive or bulk actions.\
    - Autosave drafts for long forms or edits.\
    - Contextual tooltips/help on complex fields and formulas.\
- User onboarding checklist and contextual walkthroughs are included for new users.\
\
## 6.5 Permission Delegation\
\
- Admins (and designated delegates) may grant or revoke specific module/action permissions to other users at a granular level (down to field/action).\
- All delegation actions are tracked in the audit log.\
- Permission changes take effect immediately and are visible in the permissions matrix.\
\
## 6.6 Document Maintenance Policy\
\
- This blueprint is the single source of truth for all development, QA, and feature requests.\
- All major product/feature releases must update this document within 7 days.\
- All feature requests and bug reports must reference this blueprint.\
- A quarterly review (at minimum) is scheduled, with each change tracked in version control and summarized in an appendix or change log section.\
- Out-of-date documentation should trigger a notification to Admins.\
\
\
## 6.7 Advanced Platform Features\
\
### Automated Data Quality Rules\
- The system automatically validates all incoming data for:\
    - Outliers (e.g., negative or abnormally high values)\
    - Duplicates (e.g., invoice numbers, vendor records)\
    - Referential integrity (client/vendor references)\
    - Missing mandatory fields\
    - Valid value ranges (dates, amounts, status, etc.)\
- All detected issues prompt the user for review and correction.\
- Data quality alerts can be enabled as feature flags for different user roles.\
\
### Bulk Operations & Undo\
- Bulk edit, archive, or delete operations available on all major tables.\
- Every bulk operation includes an undo option and a confirmation step.\
- All bulk actions are logged in the audit log with before/after state.\
\
### Scheduled/Recurring Items\
- Users can create scheduled recurring costs (e.g., rent, salaries) or reminders.\
- Recurrence can be set to daily, weekly, monthly, or custom intervals.\
- Upcoming recurring items and tasks are shown in the dashboard.\
\
### Approval Workflows\
- Multi-step approvals are supported for sensitive actions (e.g., vendor payments, critical edits).\
- Approvals can be sequential or parallel, and are configurable by Admin.\
- All workflow steps, approvers, and outcomes are logged.\
- Approvals can be triggered by feature flags or threshold settings.\
\
### Drag-and-Drop Customisation\
- Admins can configure bulk table views, order of fields, and dashboards using drag-and-drop UI elements.\
- Approval workflow setup, field ordering, and report layout are all drag-and-drop enabled.\
- Custom dashboards can be saved and shared within the organization.\
\
### Custom Fields & Metadata\
- Admins can add new fields (text, number, dropdown, date, etc.) to any collection.\
- Custom fields are versioned and searchable.\
- All customizations are available via the drag-and-drop interface.\
\
### Data Provenance\
- Every key data field shows "last edited by," "edited on," and version history.\
- Users can view detailed change logs and restore previous versions.\
- Provenance metadata is displayed in the UI and accessible by audit and compliance teams.\
\
### In-app Tooltips & Learning\
- All complex fields and actions have contextual tooltips.\
- Interactive onboarding flows and step-by-step guides for new users.\
- Help icons link directly to relevant sections of the end-user documentation.\
\
### Feature Flags\
- All major new features (bulk operations, approval flows, new modules) can be enabled or disabled via Admin UI.\
- Feature flags can be role-specific, project-specific, or organization-wide.\
- Feature flag history is audit-logged for compliance.\
\
### Configurable Roles\
- Beyond default roles, Admin can define custom role templates with any set of permissions.\
- Roles can be copied, renamed, or sunset as business needs change.\
- Role changes propagate instantly and are logged.\
\
### Error Boundary UI\
- All frontend components have error boundary wrappers.\
- User-friendly error screens are shown with options to retry, undo, or report the error.\
- All errors (caught and uncaught) are logged and reported to Admin for review.\
\
### Prompt/Response Logging (AI Development)\
- All AI agent prompts, responses, and any human overrides or edits are logged.\
- Each log entry includes user, timestamp, prompt, response, and outcome.\
- This history is used for continuous improvement, error analysis, and compliance review.\
\
## 7. Security & Compliance\
\
- **Authentication:** Firebase Auth + SSO (Google, MS, etc.)\
- **Authorization:** Permissions matrix, granular edit/view/delete by role/module/action/field\
- **Data Segregation:** Users see only data for projects/clients/vendors per role and assignment\
- **Audit Logs:** Every edit/delete with who, when, what changed (simple log)\
- **Encryption:** All sensitive fields encrypted at rest and in transit\
- Note: Field-level encryption may impact some search/query capabilities due to Firestore technical constraints.\
- **Compliance:** GDPR, SOC2, field-level controls, right to erasure, multi-region backups, MFA\
- **API Rate Limiting & Security:** While high usage is not expected, all external and internal API endpoints include basic rate limiting, input validation, and abuse detection to prevent accidental or malicious overuse or brute force attacks. Rate limits and thresholds are configurable by Admin.\
- **Data Access Auditing:** All data access and download actions by any user, including Admins, are logged and can be reviewed by compliance teams.\
\
---\
\
## 8. Notifications System\
\
- **User-level configuration:** Select which events to be notified of, by which channel, daily digest option\
- **Event triggers:** Edits, assignments, overdue payments, approvals, errors, and more (all granular)\
- **Channels:** In-app, email, browser, Telegram/WhatsApp (per event, per user)\
- If notification delivery fails (e.g., unreachable email or Telegram), a summary of missed notifications will be sent as soon as possible, and an in-app warning will be displayed.\
\
---\
\
## 9. Development Workflow & Best Practices\
\
- **Test-first/TDD:** Write tests before code (unit, integration, e2e)\
- **CI/CD Pipeline:** Auto-run all tests, lint, security scans, coverage on every push/merge\
- **Gated Deploys:** Only deploy if all tests pass\
- **Static Analysis:** Enforce style and detect bugs early\
- All AI-generated code or agent contributions must undergo human review before acceptance into production.\
- Mandatory peer code review step before merge/deploy.\
- **Security/Compliance Checks:** Automated audits, dependency scanning\
\
---\
\
## 10. Future Enhancements\
\
- **Inline editing, deletion in all tables**\
- **Interactive charts (Recharts or similar)**\
- **Granular roles: custom roles, per-project permissions**\
- **Field-level encryption for especially sensitive fields**\
- **More scenario planner features**\
- **Scheduled report exports/auto-email**\
- **Localization, accessibility upgrades**\
- **API endpoints for external billing/payroll integration**\
\
---\
\
## 11. Example Permissions Matrix (Markdown Table)\
\
| Role      | ClientMaster | VendorSheet | PnlMaster | CashFlow | Settings | AuditTrail |\
|-----------|-------------|-------------|-----------|----------|----------|------------|\
| Admin     | E/V/D       | E/V/D       | E/V/D     | E/V      | E/V/D    | V          |\
| Finance   | V           | E/V         | V         | E/V      | V        | V          |\
| Ops       | V           | E/V         | V         | V        |          |            |\
| Viewer    | V           | V           | V         | V        |          |            |\
\
_E = Edit, V = View, D = Delete_\
\
- Custom roles may be defined in the future, allowing organizations to create new roles with tailored permissions as business needs evolve.\
\
---\
\
## 12. Reporting & Exports\
\
- **All reports filterable by date, project, client, vendor, business type**\
- **Red flag and conditional formatting in all tables**\
- **Export: Excel/PDF**\
- **Scheduled exports/digests (user configurable)**\
\
---\
\
## 13. Offline Mode\
\
- **Critical flows:** Project add, cost entry, editing\
- **On reconnect:** Summarize and resolve conflicts with user prompt\
\
---\
\
## 14. Edge Case & Error Handling (Summary Table)\
\
| Scenario                                     | Handling Logic                                                                    |\
|----------------------------------------------|-----------------------------------------------------------------------------------|\
| Deleting referenced client/vendor/project    | Only archive/soft delete allowed. Hard delete only if no references remain.        |\
| Editing locked/archived record               | Block edit; show message and log attempt in audit.                                |\
| Negative/invalid calculation (e.g., ageing)  | Block save; prompt user to review values.                                         |\
| Sync conflict (offline vs. live changes)     | Show summary on reconnect; user must resolve and confirm before data is committed. |\
| Data import with invalid values              | Prevent import; highlight errors, provide fixes.                                  |\
| Unauthorized permission delegation           | Block and audit attempt; only Admins/delegates may delegate.                      |\
| API misuse/failed auth                       | Block request, log event, notify admin if repeated.                               |\
\
\
## 15. Appendix: Compliance Controls Checklist\
\
- GDPR privacy notice and data subject rights\
- Data retention, right to delete/export\
- Audit logs (all changes)\
- Access review/audit schedule\
- Encryption keys rotation\
- Incident response plan\
- Backups (multi-region, encrypted)\
- Regular security assessments\
\
---\
\
## 16. Backup, Restore, and Disaster Recovery\
\
- **Admin-Initiated Data Backup:**\
    - Admins can download a full backup of all data in a standard export format (e.g., JSON or CSV) to local disk at any time.\
    - All backup downloads are logged in the audit log with timestamp and initiating user.\
    - Optionally, Admin can encrypt local backups before download.\
- **Cloud Backup and Restore:**\
    - Automated daily backups to secure, encrypted cloud storage (multi-region).\
    - Backups are retained per the data retention policy and may be restored by Admins via the Admin panel (with confirmation prompts and audit logging).\
- **Restore Functionality:**\
    - Admins may restore from a chosen backup (cloud or previously downloaded local file).\
    - All restores are logged, with notification to the compliance and security team.\
    - Partial (e.g., per project, per module) or full system restores supported.\
    - On restore, the system checks for schema mismatches and flags any incompatibilities before proceeding.\
- **Disaster Recovery Testing:**\
    - Disaster recovery and restore processes must be tested at least annually.\
    - Each DR test is logged, with outcomes and learnings recorded in an internal compliance report.\
    - A summary of the last DR test and schedule for the next test is visible in the Admin dashboard.\
\
---\
\
## 17. Change Log\
\
- [2025-08-06]: Added API security/rate limiting, backup and restore procedures (local/cloud), disaster recovery testing, and download/restore controls for Admins.\
- [2025-08-06]: Added explicit data model, formula versioning, error handling, API extensibility, gold standard UX requirements, permission delegation, and documentation maintenance policy.\
\
**This blueprint is implementation-ready for any experienced dev team or AI coding agent. All requirements are mapped for both MVP and enterprise SaaS roadmap.**\
\
---}