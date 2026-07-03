# Freelance Project Tracker

A client and project management dashboard built with **React 19** and **TypeScript**.

This project was built independently as a way to apply and reinforce React concepts learned through React – The Complete Guide by Maximilian Schwarzmüller. Rather than following a tutorial step by step, I designed and implemented the application myself, making my own architectural decisions and later migrating the entire codebase from JavaScript to TypeScript for stronger type safety and maintainability.

🔗 **Live Demo:** https://freelance-project-tracker.netlify.app/

---

## 🚀 Features

- Add and manage clients
- Create multiple projects for each client
- Add tasks to projects
- Mark tasks as complete
- Delete tasks, projects, and clients with confirmation modals
- Optimistic UI updates when adding clients
- Client data persists using LocalStorage
- Reusable form validation across multiple forms

---

## 🛠 Tech Stack

- React 19
- TypeScript
- Vite
- CSS
- LocalStorage

---

## 🧠 React Concepts Used

### State Management

- `useState`
- `useEffect`
- `useContext`
- Custom `useAppContext`

### Forms

- Custom `useForm` hook
- Reusable validation functions
- Blur validation

### Performance & UX

- `useOptimistic`
- Optimistic UI updates
- Loading states
- Error handling

### Refs & Portals

- `useRef`
- `useImperativeHandle`
- `createPortal`
- Native `<dialog>` element

### Component Architecture

- Reusable Button component
- Reusable Input component
- Reusable Modal component
- Strongly typed reusable interfaces
- Shared domain models (`Client`, `Project`, `Task`)

### TypeScript

- Interfaces
- Type aliases
- Utility types (`Omit`, `Record`)
- Generic custom hooks
- React event typing
- Strongly typed Context API
- Typed API utilities

---

## 💡 Challenges

Some of the more interesting engineering challenges included:

- Building a reusable `useForm` hook that works with multiple forms using TypeScript generics.
- Migrating an existing JavaScript React project to TypeScript.
- Designing reusable domain models (`Client`, `Project`, `Task`) that could be shared across the application.
- Managing deeply nested immutable state updates.
- Building a reusable modal API using `useImperativeHandle`.
- Implementing optimistic UI updates while handling asynchronous failures gracefully.

---

## 🌱 Future Improvements

- Search clients
- Filter projects
- Project progress indicator
- Due dates
- Drag-and-drop task ordering
- Backend integration
- Mobile responsiveness

---

## 📌 Status

- ✅ Feature complete
- ✅ Fully migrated from JavaScript to TypeScript
- ✅ Production build passing

---

Built as part of my frontend engineering journey, with a focus on writing reusable, maintainable, and type-safe React applications.
