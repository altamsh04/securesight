# SecureSight

SecureSight is a modern CCTV monitoring dashboard built with Next.js, Prisma, and Supabase. It provides real-time incident tracking, camera management, and a visually rich activity timeline for security operations.

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
     ```

4. **Prisma setup:**
   - Generate the Prisma client:
     ```bash
     npx prisma generate
     ```
   - Run migrations (after editing `prisma/schema.prisma`):
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

## 🛠️ Tech Decisions

- **Next.js (App Router):** For modern, file-based routing and server components.
- **Prisma ORM:** Type-safe database access and migrations.
- **Supabase (Postgres):** Managed Postgres database with easy cloud setup.
- **Tailwind CSS:** Utility-first styling for rapid UI development.
- **RESTful API routes:** For clear separation of backend logic and frontend consumption.
- **Polling (Activity Timeline):** The timeline auto-refreshes every 30 seconds for near real-time updates.
- **Robust error handling:** Fallbacks and clear error messages for API/database issues.

---

## 💡 Future Improvements
- Add authentication and role-based access control (e.g., admin vs. viewer).
- Implement WebSocket or Supabase Realtime for instant updates (no polling).
- Add camera health/status monitoring and alerts.
- Support for video playback and event review.
- Advanced filtering and search for incidents.
- Responsive mobile UI and accessibility improvements.
- Integration with external alerting/notification systems (email, SMS, etc.).
- More granular permissions and audit logging.
- Unit and integration tests for critical components and APIs.
- Dockerize for easy deployment.

---

## 📋 Project Overview

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

## 📝 License

MIT
