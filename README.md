# TaskFlow Manager

A professional, full-stack Task Management application built as a coding challenge. This project demonstrates a clean separation of concerns, robust API handling, and a modular frontend architecture.

## Overview

TaskFlow Manager provides a smooth interface for creating, tracking, and managing daily tasks. The application is designed with a focus on maintainability, featuring a custom Express middleware validation layer, a centralized API service pattern, and a dynamic carousel UI for task visualization.

## Tech Stack

**Frontend:**
* React (Vite)
* CSS (Component-based architecture)

**Backend:**
* Node.js
* Express.js

## Project Structure

```text
/
├── backend/            # Express REST API
│   ├── middleware/     # Custom payload validation
│   └── routes/         # Task management endpoints
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI logic
│   │   └── services/   # Centralized API layer
```

## Getting Started

### Prerequisites

* Node.js (v16+) installed on your machine.
* npm (Node Package Manager).

### Installation & Running

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/taskflow-manager.git
cd taskflow-manager
```

2. **Setup Backend:**
```bash
cd backend
npm install
npm start
```
*The server runs on http://localhost:4000*

3. **Setup Frontend:**
```bash
cd ../frontend
npm install
npm run dev
```
*The application will be available at http://localhost:3000*

## Engineering Decisions

* **Middleware Validation:** Implemented custom middleware to ensure payload integrity (data validation) before reaching the business logic, following clean architecture principles.
* **API Service Layer:** Abstracted all HTTP requests into a dedicated service file. This ensures that component logic remains focused on UI, while data fetching is handled consistently in one place.
* **Component Architecture:** UI is broken down into small, reusable components (`TaskForm`, `TaskCard`, `TaskCarousel`). Each component manages its own props and state efficiently.
* **Dynamic UI:** Integrated a carousel navigation system for task visualization to optimize screen space and provide a modern user experience.

## API Reference

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/tasks` | Retrieve all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update task details |
| PATCH | `/tasks/:id/toggle` | Toggle task completion status |
| DELETE | `/tasks/:id` | Remove a task |

---
