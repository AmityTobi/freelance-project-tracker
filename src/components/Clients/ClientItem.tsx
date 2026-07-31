import { useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import Modal, { ModalHandle } from "../UI/Modal";
import Button from "../UI/Button";
import { useDeleteClient } from "../../hooks/queries";
import { Client } from "../../types/client";

interface ClientItemProps {
  client: Client;
}

export default function ClientItem({ client }: ClientItemProps) {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { mutate: deleteClient } = useDeleteClient();

  const modalRef = useRef<ModalHandle | null>(null);

  function showModal() {
    modalRef.current?.show();
  }

  function handleConfirmDelete() {
    deleteClient(client.id);
    modalRef.current?.close();

    if (client.id === clientId) {
      navigate("/");
    }
  }

  return (
    <li className="client-item-wrapper">
      <Modal
        ref={modalRef}
        onConfirm={handleConfirmDelete}
        onCancel={() => modalRef.current?.close()}
        message="Are you sure you want to delete this Client?"
      />

      <NavLink
        to={`/clients/${client.id}`}
        className={({ isActive }) => `client-item ${isActive ? "active" : ""}`}
      >
        <span className="client-avatar">
          {client.fullName.charAt(0).toUpperCase()}
        </span>
        <span className="client-name">{client.fullName}</span>
      </NavLink>
      <Button
        variant="danger"
        className="btn-xs client-delete"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          showModal();
        }}
      >
        ✕
      </Button>
    </li>
  );
}
