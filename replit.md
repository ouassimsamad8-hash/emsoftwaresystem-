# E&M Software System

A modern, bilingual (English/French) software development company website built with React, TypeScript, Express, and Tailwind CSS.

## Overview

This is a full-stack web application showcasing a software development company's services, projects, and blog. The site features:
- Bilingual support (English and French)
- Contact form and appointment booking system
- Services showcase with detailed pages
- Project portfolio
- Blog with categories
- FAQ section
- Responsive design with modern UI components

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Radix UI components for accessible UI primitives
- React Query for data fetching
- Wouter for routing
- Framer Motion for animations

### Backend
- Express.js server
- TypeScript
- In-memory storage (MemStorage) for development
- PostgreSQL schema defined with Drizzle ORM (ready for database integration)

## Project Structure

```
.
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities and context
│   │   ├── hooks/       # Custom React hooks
│   │   └── data/        # Static content data
│   └── public/          # Static assets
├── server/              # Backend Express server
│   ├── index.ts        # Server entry point
│   ├── routes.ts       # API routes
│   ├── storage.ts      # In-memory storage implementation
│   └── vite.ts         # Vite middleware setup
├── shared/              # Shared types and schemas
│   └── schema.ts       # Database schemas and types
└── attached_assets/     # Additional project assets

```

## Development

The project runs on a single server on port 5000 that serves both the API and the frontend.

### Running the Application
```bash
npm run dev
```

The server will start on port 5000 with:
- Frontend served via Vite with HMR
- Backend API endpoints at `/api/*`
- Hot module reloading enabled

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema (requires DATABASE_URL)

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact submissions (admin)

### Appointments
- `POST /api/appointments` - Book an appointment
- `GET /api/appointments` - Get all appointments (admin)

## Database

The project is configured to use PostgreSQL with Drizzle ORM. Currently, it uses an in-memory storage system for development. To use a real database:

1. Set up a PostgreSQL database
2. Add `DATABASE_URL` environment variable
3. Run `npm run db:push` to create tables
4. Update `server/storage.ts` to use the database storage implementation

## Configuration

- **Port**: 5000 (configured in server/index.ts)
- **Host**: 0.0.0.0 for Replit compatibility
- **Allowed Hosts**: True (configured for Replit proxy)
- **HMR**: Enabled for development

## Recent Changes

- November 15, 2025: Initial Replit setup
  - Moved project to workspace root
  - Created .gitignore file
  - Installed dependencies
  - Configured workflow for port 5000
  - Verified frontend and backend working correctly
