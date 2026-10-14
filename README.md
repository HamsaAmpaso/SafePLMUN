# SafePLMUN — Campus Emergency & Safety Response System

**One Campus, One Community, One Priority: Safety.**

SafePLMUN is a campus safety and emergency response system designed to help students report emergencies, communicate their safety status, and request medical assistance within Pamantasan ng Lungsod ng Muntinlupa (PLMUN).

The system provides real-time incident alerts, emergency status tracking, safety information, and medical request management to support faster communication between students and campus administrators.

## Features

- **Emergency Reporting** — Report incidents involving fires, earthquakes, and armed violence.
- **Real-Time Notifications** — Receive incident alerts and best course of actions during an emergency through Socket.IO.
- **Safety Status Tracking** — Let users mark themselves as safe or indicate that they need help during an emergency which.
- **Buddy System** — Connect with other users and support safety coordination, every time there is a reported emergency the user can see their buddy's status allowing them to be more connected when it matters most.
- **Medical Assistance Requests** — Allow students to request medical assistance from PLMUN's clinic, because SafePLMUN has a dedicated clinic side operator than can handle medical requests from SafePLMUN users.
- **Administrative Dashboard** — Monitor emergency reports, user safety statuses, and allows the admin to ban a user's emergency reporting and medical assistance request from the clinic side operator of SafePLMUN priviledges. Instead of banning their account entirely, the SafePLMUN strip away their reporting and requesting priviledges.
- **False Alarm Management** — Allow administrators to identify and flag false emergency reports.
- **Authentication and Authorization** — Protect accounts and restrict features based on user roles.
- **Dashboard Analytics** — Both the admin and clinic side operator ahs their own dashboard to help them manage their respective role in the SafePLMUN platform.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL |
| Real-Time Communication | Socket.IO |
| Authentication | JSON Web Tokens (JWT), bcrypt, Google OAuth |
| Data Visualization | Chart.js |
| Frontend Hosting | Cloudflare Workers |
| Backend Hosting | Render |

## Architecture

SafePLMUN uses a client-server architecture. The frontend communicates with the Express.js backend through HTTP APIs, while Socket.IO handles real-time communication.

```text
                 Users
                   |
                   v
          Frontend Application
          HTML / CSS / JavaScript
                   |
          +--------+--------+
          |                 |
          v                 v
      REST APIs        Socket.IO
          |                 |
          v                 v
       Express.js Backend
       Node.js / TypeScript
                   |
                   v
              PostgreSQL
```

The backend separates application responsibilities into routes, controllers, and repositories to help keep request handling and database operations organized.

## Live Deployment

- **Frontend:** https://safeplmun.hamsaampaso1.workers.dev


## Security

SafePLMUN incorporates several security-related practices:

- Password hashing with bcrypt.
- JWT-based authentication using HTTP-only cookies.
- Role-based authorization for protected operations.
- Cross-origin configuration for authorized frontend origins.
- Parameterized PostgreSQL queries for database operations.

Security measures should be reviewed and tested before production use, particularly for emergency reporting, account permissions, and sensitive user information.

## Disclaimer

SafePLMUN is a campus safety support system intended to improve emergency communication and coordination. It should not be considered a replacement for official emergency services or established campus emergency procedures.

---

**Built for a safer campus community at Pamantasan ng Lungsod ng Muntinlupa.**
