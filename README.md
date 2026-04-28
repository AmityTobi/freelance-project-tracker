# Freelance Project Tracker

A client and project management dashboard built from scratch while learning React.

This is a **practice project** built alongside _React – The Complete Guide by Maximilian Schwarzmüller_, but with my own features, architecture decisions, and problem-solving — not a course follow-along.

---

## 🚀 What It Does

Freelancers can use this app to:

- Add and manage clients
- Assign projects to specific clients
- Break projects down into tasks
- Mark tasks as complete (with strikethrough)
- Delete tasks, projects, or entire clients — all with confirmation modals
- See changes reflected instantly in the UI (optimistic updates)

---

## 🧠 React Concepts Applied

- `useState` — managing clients, projects, tasks, and UI state
- `useEffect` — persisting data to localStorage on every state change
- `useRef` + `useImperativeHandle` — controlling native `<dialog>` modals from parent components
- `useOptimistic` — instant UI feedback before server confirms, with automatic rollback on failure
- Nested immutable state updates — updating `clients → projects → tasks` without mutation
- Derived state — computing selected client from `selectedClientId`
- Prop drilling — intentional data flow before introducing Context
- Lifting state up — shared state lives at the right level
- Conditional rendering — empty states, loading, error messages
- Blur-based form validation — custom `util/validation.js` with reusable validators
- Async/loading states — fake API simulation with random failures and error handling
- Component splitting — `ClientList`, `ClientItem`, `ProjectList`, `ProjectItem`, `TaskList`, `TaskItem`

---

## 💡 Hardest Part

Managing **three levels of nested state** (`clients → projects → tasks`) immutably was the biggest challenge. Every update required chaining `.map()` calls to find the right client, then the right project, then the right task — without mutating anything.

Deleting an active client or project also required cleanup — resetting `selectedClientId` or `selectedProjectId` back to `null` to avoid stale references in the UI.

---

## 🛠️ Tech Stack

- React 19
- JavaScript (ES6+)
- CSS (global stylesheet with custom design tokens)
- LocalStorage for persistence

---

## 🌟 Planned Improvements

- Search and filter clients
- Progress bar per project (% tasks completed)
- Project status (active / completed)
- CSS Modules for scoped styles
- Context API to replace prop drilling
- Redux for larger scale state management practice

---

## 📌 Status

Feature-complete MVP. Currently refactoring and cleaning up the codebase.

---

> Built as part of my journey to become job-ready in frontend development.
> Every feature was reasoned through from scratch — not copied from tutorials.
