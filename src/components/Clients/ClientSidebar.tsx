import { useState } from "react";

import { useClients } from "../../hooks/queries";
import { useAppContext } from "../../store/AppContext";
import ClientItem from "./ClientItem";
import ClientForm from "./ClientForm";
import Button from "../UI/Button";

export default function ClientSidebar() {
  const { data: clients = [], isLoading, error } = useClients();
  const { searchTerm, onSetSearchTerm } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);

  function handleOpenForm() {
    setIsAdding(true);
  }

  function handleCloseForm() {
    setIsAdding(false);
  }

  const filteredClients = clients.filter((client) =>
    client.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <aside className="client-section">
      <div className="section-label">Clients</div>

      <input
        type="search"
        className="client-search"
        placeholder="Search clients..."
        value={searchTerm}
        onChange={(event) => onSetSearchTerm(event.target.value)}
      />

      {isLoading && <p className="empty-hint">Loading clients...</p>}
      {error instanceof Error && <p className="async-error">⚠️ {error.message}</p>}

      {!isLoading && filteredClients.length === 0 && (
        <p className="empty-hint">
          {searchTerm ? "No clients match your search." : "No clients yet."}
        </p>
      )}

      {filteredClients.length > 0 && (
        <ul className="client-list">
          {filteredClients.map((client) => (
            <ClientItem key={client.id} client={client} />
          ))}
        </ul>
      )}

      <Button variant="ghost" className="btn-full" onClick={handleOpenForm}>
        + Add client
      </Button>

      {isAdding && <ClientForm handleCloseForm={handleCloseForm} />}
    </aside>
  );
}
