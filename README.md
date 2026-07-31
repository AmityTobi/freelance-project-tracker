# Freelance Project Tracker

A client and project management dashboard built with **React 19**, **TypeScript**, **TanStack Query**, and a lightweight **Express** backend.

This project was built independently as a way to apply and reinforce React concepts learned through React – The Complete Guide by Maximilian Schwarzmüller. Rather than following a tutorial step by step, I designed and implemented the application myself, making my own architectural decisions — first migrating the entire codebase from JavaScript to TypeScript, then later moving from local-only state to a real backend with React Router and TanStack Query for server state.

🔗 **Live Demo:** https://freelance-project-tracker.netlify.app/

---

## 🚀 Features

- Add and manage clients
- Search clients by name
- Create multiple projects for each client, with optional due dates
- Filter projects by all / active / completed / overdue
- Visual progress indicator per project based on completed tasks
- Add tasks to projects
- Mark tasks as complete
- Reorder tasks within a project via drag-and-drop
- Delete tasks, projects, and clients with confirmation modals
- Optimistic UI updates across all client, project, and task actions
- Client data persisted through a REST API backed by Express
- Reusable form validation across multiple forms
- Responsive layout for mobile and tablet screens

---

## 🛠 Tech Stack

**Frontend**

- React 19
- TypeScript
- React Router
- TanStack Query
- dnd-kit (drag-and-drop)
- Vite
- CSS

**Backend**

- Node.js
- Express
- Deployed on Render

---

## 🧠 React Concepts Used

### State Management

- TanStack Query for server state (fetching, caching, optimistic mutations)
- `useContext` for UI-only state (form visibility, filters, search)
- Custom `useAppContext`
- `useState`

### Routing

- React Router
- Route params for client selection
- Nested routes with a shared layout (`<Outlet />`)

### Forms

- Custom `useForm` hook
- Reusable validation functions
- Blur validation

### Performance & UX

- Optimistic UI updates via TanStack Query mutations
- Loading and error states
- Drag-and-drop with `@dnd-kit`

### Refs & Portals

- `useRef`
- `useImperativeHandle`
- `createPortal`
- Native `<dialog>` element

### Component Architecture

- Reusable Button, Input, Modal, and ProgressBar components
- Strongly typed reusable interfaces
- Shared domain models (`Client`, `Project`, `Task`)

### TypeScript

- Interfaces
- Type aliases
- Utility types (`Omit`, `Record`)
- Generic custom hooks
- React event typing
- Strongly typed Context API and API layer

---

## 💡 Challenges

Some of the more interesting engineering challenges included:

- Migrating from local component state + LocalStorage to a real backend, without breaking the app's existing optimistic-UI feel.
- Splitting state cleanly between server state (TanStack Query) and UI-only state (Context).
- Building drag-and-drop task reordering with an optimistic update that reverts cleanly on failure.
- Introducing routing so a client's URL is shareable, while keeping the existing sidebar/detail layout.
- Debugging an Express route-ordering bug where a wildcard route (`/tasks/:taskId`) silently swallowed requests meant for a more specific route (`/tasks/reorder`).
- Building a reusable `useForm` hook that works with multiple forms using TypeScript generics.
- Designing reusable domain models (`Client`, `Project`, `Task`) shared across the frontend and backend.

---

## 🌱 Future Improvements

- Drag-and-drop task movement _between_ projects (currently supports reordering within a project only)
- Move from a JSON file to a proper database for persistent storage
- User authentication per freelancer account
- Task priority levels
- Export project summaries as PDF/CSV

---

## 📌 Status

- ✅ Feature complete
- ✅ Fully migrated from JavaScript to TypeScript
- ✅ Backend integration complete
- ✅ Production build passing

---

Built as part of my frontend engineering journey, with a focus on writing reusable, maintainable, and type-safe React applications.
