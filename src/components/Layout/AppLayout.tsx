import { Outlet } from "react-router-dom";

import ClientSidebar from "../Clients/ClientSidebar";

export default function AppLayout() {
  return (
    <main className="app-layout">
      <header className="app-header">
        <span className="app-logo">FPT</span>
        <h1 className="app-title">Freelance Project Tracker</h1>
      </header>

      <div className="layout-container">
        <ClientSidebar />

        <section className="main-section">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
