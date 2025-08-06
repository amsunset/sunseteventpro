{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
\
\
# API Reference \'96 Sunset Events Pro\
\
---\
\
## Authentication\
\
All endpoints require authentication.\
\
- **Auth:** JWT Bearer token (from Firebase Auth/SSO)\
\
**Header:**\
```\
Authorization: Bearer &lt;token&gt;\
```\
\
---\
\
## Core Resources\
\
- Clients\
- Vendors\
- Projects\
- Project P&amp;L\
- Payments &amp; Billing\
- Cashflow &amp; Scenario Planning\
- Users &amp; Roles\
\
---\
\
## Endpoints\
\
### 1. Clients\
\
#### GET /api/clients\
- **List all clients**\
- **Query params:** `?search=`, `?page=`, `?limit=`\
- **Response:**  \
```json\
[\
  \{\
    "id": "cl_001",\
    "clientName": "Acme Events",\
    "contactPerson": "Jane Doe",\
    "email": "jane@acme.com",\
    "phone": "+91...",\
    "gstin": "22AAAAA0000A1Z5",\
    "billingAddress": "...",\
    "createdAt": "...",\
    "updatedAt": "..."\
  \},\
  ...\
]\
```\
\
#### POST /api/clients\
- **Create new client**\
- **Body:**  \
```json\
\{\
  "clientName": "Acme Events",\
  "contactPerson": "Jane Doe",\
  "email": "jane@acme.com",\
  "phone": "+91...",\
  "gstin": "...",\
  "billingAddress": "..."\
\}\
```\
- **Returns:** 201 + created client object\
\
#### GET /api/clients/:id\
- Get single client by ID\
\
#### PUT /api/clients/:id\
- Update client fields\
\
#### DELETE /api/clients/:id\
- Archive or (admin only) hard delete\
\
---\
\
### 2. Vendors\
\
#### GET /api/vendors\
- List/search vendors (same schema as clients, plus `category`, `vendorCode`)\
\
#### POST /api/vendors\
- Create vendor\
\
#### GET /api/vendors/:id, PUT, DELETE\
- Standard REST actions\
\
---\
\
### 3. Projects\
\
#### GET /api/projects\
- List/search/filter projects  \
- Filter by: status, date, client, businessType\
\
#### POST /api/projects\
- Create project (fields: `projectName`, `clientId`, `eventDate`, `businessType`, etc.)\
\
#### GET /api/projects/:id\
- Fetch project, including P&amp;L summary\
\
#### PUT /api/projects/:id\
- Update project fields\
\
#### DELETE /api/projects/:id\
- Archive or hard delete (admin only)\
\
---\
\
### 4. Project P&amp;L\
\
#### GET /api/projects/:id/pnl\
- Get P&amp;L summary for a project\
\
#### GET /api/projects/:id/pnl-details\
- Get line-item P&amp;L detail (from `project_detailed_pnl`)\
\
#### POST /api/projects/:id/pnl-details\
- Add new cost/revenue line item\
\
#### PUT /api/projects/:id/pnl-details/:itemId\
- Edit P&amp;L line item\
\
#### DELETE /api/projects/:id/pnl-details/:itemId\
- Remove cost/revenue line (archive/hard delete)\
\
---\
\
### 5. Payments &amp; Billing\
\
#### GET /api/projects/:id/payments\
- Get all payments in/out for a project\
\
#### POST /api/projects/:id/payments\
- Record new payment (from client or to vendor)\
\
#### GET /api/clients/:id/payments\
- All payments from this client\
\
#### GET /api/vendors/:id/payments\
- All payments to this vendor\
\
---\
\
### 6. Cashflow &amp; Scenario Planning\
\
#### GET /api/cashflow\
- Get overall cashflow forecast (12 month projection)\
\
#### GET /api/cashflow/scenarios\
- List all scenario planner variables\
\
#### POST /api/cashflow/scenarios\
- Add or update a scenario\
\
---\
\
### 7. Users &amp; Roles\
\
#### GET /api/users\
- List all users (admin only)\
\
#### GET /api/users/:id\
- Get user profile &amp; role\
\
#### POST /api/users\
- Create user (admin only, or invite workflow)\
\
#### PUT /api/users/:id\
- Update user profile, assign/revoke roles\
\
#### DELETE /api/users/:id\
- Archive user or hard delete (admin only)\
\
---\
\
## Common Responses\
\
- **200 OK**: Success, data returned\
- **201 Created**: New resource created\
- **204 No Content**: Resource deleted\
- **400 Bad Request**: Invalid input/validation error\
- **401 Unauthorized**: Missing/invalid auth\
- **403 Forbidden**: Insufficient permissions\
- **404 Not Found**: Resource not found\
\
---\
\
## Example Error Response\
\
```json\
\{\
  "error": "Validation failed",\
  "details": \{\
    "field": "clientName",\
    "message": "Client name is required."\
  \}\
\}\
```\
\
---\
\
## Notes\
\
- All endpoints are versioned (e.g., `/api/v1/clients`) in production.\
- Bulk endpoints (upload, export, import) use `/api/[resource]/bulk` with file or batch payloads.\
- API is RESTful; future GraphQL or streaming endpoints will be separately documented.\
- Webhooks and notification endpoints (for automation, integrations) can be enabled for admin users.\
\
---\
\
*Last updated: [Today\'92s Date]*}