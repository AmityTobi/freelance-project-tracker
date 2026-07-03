import { useRef } from "react";

import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.js";
import { useAppContext } from "../../store/AppContext.js";

export default function ClientItem({ client, isSelected }) {
  const { onSelectClient, onDeleteClient } = useAppContext();

  const modalRef = useRef();

  function showModal() {
    modalRef.current.show();
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
          modalRef.current.close();
        }}
        onCancel={() => modalRef.current.close()}
        message="Are you sure you want to delete this Client?"
      />

      <span className="client-avatar">
        {client.fullName.charAt(0).toUpperCase()}
      </span>
      <span className="client-name">{client.fullName}</span>

      <Button
        variant="danger"
        className="btn-xs client-delete"
        onClick={(e) => {
          e.stopPropagation();
          showModal();
        }}
      >
        ✕
      </Button>
    </li>
  );
}
