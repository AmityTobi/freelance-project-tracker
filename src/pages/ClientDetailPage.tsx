import { Navigate, useParams } from "react-router-dom";

import { useClients } from "../hooks/queries";
import { useAppContext } from "../store/AppContext";
import ProjectForm from "../components/Projects/ProjectForm";
import ProjectList from "../components/Projects/ProjectList";
import ProjectFilterBar from "../components/Projects/ProjectFilterBar";
import Button from "../components/UI/Button";

export default function ClientDetailPage() {
  const { clientId } = useParams();
  const { data: clients = [], isLoading } = useClients();
  const { isAddingProject, onOpenProjectForm } = useAppContext();

  const client = clients.find((c) => c.id === clientId);

  if (isLoading) {
    return <p className="empty-hint">Loading...</p>;
  }

  if (!client) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="client-header">
        <div>
          <div className="section-label">Selected client</div>
          <h2 className="client-heading">{client.fullName}</h2>
        </div>
        <Button onClick={onOpenProjectForm}>+ Add project</Button>
      </div>

      {isAddingProject && <ProjectForm clientId={client.id} />}

      {client.projects.length > 0 && <ProjectFilterBar />}

      <ProjectList clientId={client.id} projects={client.projects} />
    </>
  );
}
