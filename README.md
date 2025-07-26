# SecureSight

![SecureSight Dashboard](https://github.com/user-attachments/assets/39b30809-109b-4152-aa31-f522ee36d5b5)

SecureSight is a modern, full-stack CCTV monitoring dashboard for security operations. Built with Next.js, Prisma, Supabase, and Tailwind CSS, it provides real-time incident tracking, camera management, and a visually rich activity timeline. The platform is designed for security teams to monitor, resolve, and analyze incidents efficiently.

---

## 🚀 Deployment Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd securesight
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your Supabase/Postgres credentials:
     ```env
     DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. **Prisma setup:**
   - Generate the Prisma client:
     ```bash
     npx prisma generate
     ```
   - Run migrations:
     ```bash
     npx prisma migrate dev --name init
     ```
   - (Optional) Seed the database:
     ```bash
     npx prisma db seed
     ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🛡️ Authentication

- **Admin login** is required to access the dashboard and all APIs.
- Uses [Supabase Auth](https://supabase.com/docs/guides/auth) (email/password).
- Only authenticated users can access the dashboard and protected API endpoints.

---

## 📋 API Overview

### Cameras
- `GET /api/cameras` — List all cameras with:
  - `id`, `name`, `location`, `videoStream`

### Incidents
- `GET /api/incidents?resolved=false` — List all unresolved incidents (newest first)
- `PATCH /api/incidents/:id/resolve` — Flip the resolved status of an incident and return the updated row

#### Example Incident Object
```json
{
  "id": 1,
  "cameraId": 2,
  "type": "Gun Threat",
  "tsStart": "2025-07-24T01:21:15.354Z",
  "tsEnd": "2025-07-24T01:39:15.354Z",
  "thumbnailUrl": "https://...",
  "resolved": false,
  "camera": {
    "id": 2,
    "name": "Vault",
    "location": "Basement",
    "videoStream": "https://..."
  }
}
```

---

## 🛠️ Tech Decisions
- **Next.js (App Router):** Modern, file-based routing and server components.
- **Prisma ORM:** Type-safe database access and migrations.
- **Supabase (Postgres & Auth):** Managed Postgres and secure authentication.
- **Tailwind CSS:** Utility-first styling for rapid UI development.
- **RESTful API routes:** Clear separation of backend logic and frontend consumption.
- **Polling (Activity Timeline):** Timeline auto-refreshes every 30 seconds for near real-time updates.

---

## 💡 If I Had More Time…
- Add role-based access control (e.g., admin vs. viewer).
- Implement WebSocket or Supabase Realtime for instant updates (no polling).
- Camera health/status monitoring and alerts.
- Video playback and event review.
- Advanced filtering and search for incidents.
- Responsive mobile UI and accessibility improvements.
- Integration with external alerting/notification systems (email, SMS, etc.).
- More granular permissions and audit logging.
- Unit and integration tests for critical components and APIs.
- Dockerize for easy deployment.

---

## 📊 Project Features
- **Cameras:**
  - Each camera has an `id`, `name`, `location`, and `videoStream` (URL).
- **Incidents:**
  - Each incident is linked to a camera and includes type, timestamps, thumbnail, and resolved status.
- **Features:**
  - View all cameras and their live streams.
  - See all unresolved incidents and resolve them with one click.
  - Activity timeline visualizes incidents per camera, with type icons and proportional bars.
  - Modern, responsive UI with clear status indicators.

---

## 🤝 Contributing

PRs and suggestions are welcome! Please open an issue or submit a pull request.

---

## 📝 License

MIT
