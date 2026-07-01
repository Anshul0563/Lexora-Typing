# SAS Academy

A production-oriented SSC typing practice platform built with React, Express and MongoDB. It provides a focused exam simulation for learners and a no-code administration area for exams, paragraphs, users and site settings.

## Features

- JWT authentication with bcrypt password hashing and password-reset tokens
- User profile and password management
- Active exam dashboard with randomized passages
- Exam-style typing screen with a single visible timer
- Character comparison, active-word and cursor highlighting, paste protection, restart and auto-submit
- Server-authoritative WPM, accuracy and error calculations
- Admin overview, exam CRUD, searchable paragraph CRUD, user access control and website settings
- Validation, rate limiting, secure HTTP headers, compression and centralized errors

Administrators are stored in the `users` collection with `role: "admin"`. This avoids duplicating credentials and authentication logic in a separate collection while preserving a distinct, role-gated admin experience.

## Local setup

Requirements: Node.js 20+ and MongoDB 7+.

```bash
npm install
npm run install:all
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run seed --prefix server
npm run dev
```

The web app runs at `http://localhost:5173`; the API runs at `http://localhost:5000`. Change the seeded admin credentials in `server/.env` before running the seed command.

## Scripts

```bash
npm run dev          # frontend and API together
npm run build        # production frontend bundle
npm test             # backend unit tests
npm run seed --prefix server
```

## Production checklist

- Set a random `JWT_SECRET` of at least 32 characters.
- Use MongoDB Atlas or a secured replica set and restrict network access.
- Set `CLIENT_URL` to the deployed frontend origin (comma-separated origins are supported).
- Configure the SMTP environment variables to deliver password-reset links; tokens are never returned when `NODE_ENV=production`.
- Serve the built frontend through a CDN and run the API behind TLS and a reverse proxy.
- Add persistent request logging, health monitoring and database backups for the target environment.

## REST API

All endpoints are prefixed by `/api`.

- `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- `POST /auth/forgot-password`, `POST /auth/reset-password`
- `PATCH /auth/profile`, `PATCH /auth/change-password`
- `GET /exams`, `GET /exams/:id/random-paragraph`
- Admin: `POST|PUT|DELETE /exams`, CRUD `/paragraphs`
- `POST /results`, `GET /results/:id`
- Admin: `/admin/stats`, `/admin/users`, `/admin/settings`

Result records intentionally have no learner-facing history endpoint because the product brief excludes typing history.
# Typing
