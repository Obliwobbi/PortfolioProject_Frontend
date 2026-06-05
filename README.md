# MemberSystem Frontend

React frontend for the MemberSystem project.

This application provides the user interface for logging in, viewing users and companies, editing data, and showing role-based navigation based on the logged-in user.

The backend API is maintained in a separate repository.

---

## Vision

The goal of this frontend is to provide a clean and user-friendly interface for a company-based member management system.

The application connects to a REST API and displays different data depending on the logged-in user's role:

* `SYSTEM_ADMIN`
* `COMPANY_ADMIN`
* `MEMBER`

---

## Tech Stack

* React
* Vite
* React Router
* JavaScript
* CSS
* JWT authentication
* Docker
* Caddy deployment

---

## Features

* Landing page
* Login page
* Register page
* User overview
* User details page
* User edit page
* Company overview
* Company details page
* Company edit page
* Role-based navigation
* Protected routes
* JWT token handling
* Mobile responsive header with burger menu
* API integration through a shared `apiClient`

---

## Project Structure

```text
src/
├── api/
│   └── apiClient.js
│
├── components/
│   ├── FeatureCard/
│   ├── Header/
│   ├── ProtectedRoute/
│   ├── RoleBadge/
│   ├── UserCard/
│   └── UserMenu/
│
├── pages/
│   ├── CompaniesPage/
│   ├── CompanyDetailsPage/
│   ├── CompanyEditPage/
│   ├── FeaturesPage/
│   ├── FrontPage/
│   ├── HowItWorksPage/
│   ├── LoginPage/
│   ├── RegisterPage/
│   ├── UserDetailsPage/
│   ├── UserEditPage/
│   └── UsersPage/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## API Connection

All API requests are handled through:

```text
src/api/apiClient.js
```

The frontend uses a shared API client to avoid repeating fetch logic in every page.

Example usage:

```js
const users = await apiGet('/users')
```

The API client handles:

* base URL
* JSON headers
* JWT Authorization header
* response parsing
* error handling
* 204 No Content responses

---

## Environment Variables

The API base URL is configured through Vite environment files.

### Local development

```env
VITE_API_BASE_URL=http://localhost:7070/api/v1
```

### Production

```env
VITE_API_BASE_URL=/api/v1
```

In production, the frontend and backend are served behind the same domain, so the frontend can call the API using `/api/v1`.

---

## Authentication

Login is handled using JWT.

The flow is:

```text
User logs in
→ frontend sends email/password to backend
→ backend returns JWT token
→ frontend stores token in localStorage
→ protected requests include Authorization header
```

Example header:

```http
Authorization: Bearer <token>
```

The logged-in user is fetched through:

```text
GET /me
```

This is used to update the header and show role-based navigation.

---

## Role-Based UI

The frontend changes navigation depending on the logged-in user.

### Logged out

```text
Home | Features | How it works | Login
```

### SYSTEM_ADMIN

```text
Users | Companies | User menu
```

### COMPANY_ADMIN

```text
My Users | My Company | User menu
```

### MEMBER

```text
My Profile | My Company | User menu
```

The frontend role checks are used for user experience only.
The backend is still responsible for real authorization and data protection.

---

## Routing

The application uses React Router.

Main routes:

```text
/
 /login
 /register
 /features
 /how-it-works
 /users
 /users/:id
 /users/:id/edit
 /companies
 /companies/:id
 /companies/:id/edit
```

Protected pages are wrapped in a `ProtectedRoute` component.

---

## Running Locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

The app will normally run on:

```text
http://localhost:5173
```

---

## Build

Create production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## Deployment

The frontend is built with Vite and deployed as a Docker container.

The production build creates static files in:

```text
dist/
```

These files are served by a web server inside the frontend container.

The deployed setup is:

```text
https://membersystem.obli.dk
    → React frontend

https://membersystem.obli.dk/api/v1
    → backend API
```

Caddy is used as reverse proxy and handles HTTPS.

---

## Docker

The frontend can be built as a Docker image.

Example:

```bash
docker build -t membersystem-frontend .
```

Run container:

```bash
docker run -p 8080:80 membersystem-frontend
```

---

## Important Notes

This repository only contains the React frontend.

The backend API, database, authentication logic and authorization checks are handled in a separate backend repository.

The frontend depends on the backend API being available and correctly configured.
