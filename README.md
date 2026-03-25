# JobDate

Job dating web app for students seeking apprenticeships, internships, and first CDI.

## Stack

- **Frontend**: Angular 17+ (standalone components, lazy routing, Tailwind CSS)
- **Backend**: Express / Node.js (TypeScript, MongoDB/Mongoose, JWT auth)
- **Database**: MongoDB
- **Infrastructure**: Docker + Docker Compose

## Project structure

```
JobDate/
├── frontend/          # Angular 17+ app
├── backend/           # Express API
├── docker-compose.yml         # Dev environment
├── docker-compose.prod.yml    # Production
└── .env.example
```

## Quick start

```bash
# 1. Copy and fill env vars
cp .env.example .env

# 2. Start everything
docker compose up --build

# Or run locally:
cd backend && npm install && npm run dev
cd frontend && npm install && npm start
```

- Frontend: http://localhost:4200
- Backend API: http://localhost:3000/api
- Health check: http://localhost:3000/api/health

## Key features

| Feature | Description |
|---|---|
| Student profile | CV upload, domains, interests, bio, LinkedIn |
| QR Code | Unique scannable code per student → opens public profile |
| Public profile | No auth required — works from any camera scan |
| Company events | Create/manage job dating events with contract types |
| QR Scanner | Camera-based scanner for companies at live events |

## API routes

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Register student or company |
| POST | `/api/auth/login` | — | Login |
| GET | `/api/students/me` | JWT | Get own profile |
| PATCH | `/api/students/me` | JWT | Update profile |
| POST | `/api/students/me/cv` | JWT | Upload CV |
| GET | `/api/students/public/:token` | — | Public profile (QR scan) |
| GET | `/api/qr/me` | JWT | Get QR code PNG |
| GET | `/api/events` | — | List events |
| POST | `/api/events` | JWT (company) | Create event |
| GET | `/api/companies/me` | JWT | Get company profile |

## QR Code flow

```
Student registers → UUID token generated
    → GET /api/qr/me returns PNG
        → Student displays/downloads QR
            → Recruiter scans at event
                → Browser opens /profile/:token (no login)
                    → Full profile + CV download shown instantly
```
