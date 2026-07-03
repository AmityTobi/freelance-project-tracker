import { useRef } from "react";

import Modal, { ModalHandle } from "../UI/Modal";
import Button from "../UI/Button";
import { useAppContext } from "../../store/AppContext";
import { Client } from "../../types/client";

interface ClientItemProps {
  client: Client;
  isSelected: boolean;
}

export default function ClientItem({ client, isSelected }: ClientItemProps) {
  const { onSelectClient, onDeleteClient } = useAppContext();

  const modalRef = useRef<ModalHandle | null>(null);

  function showModal() {
    modalRef.current?.show();
  }
  return (
    <li
      className={`client-item ${isSelected ? "active" : ""}`}
      onClick={() => onSelectClient(client.id)}
    >
      <Modal
        ref={modalRef}
        onConfirm={() => {
          onDeleteClient(client.id);
          modalRef.current?.close();
        }}
        onCancel={() => modalRef.current?.close()}
        message="Are you sure you want to delete this Client?"
      />

      <span className="client-avatar">
        {client.fullName.charAt(0).toUpperCase()}
      </span>
      <span className="client-name">{client.fullName}</span>
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
