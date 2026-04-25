import { useRef } from "react";

import Modal from "../UI/Modal.jsx";

export default function ClientItem({
  client,
  isSelected,
  onSelectClient,
  onDeleteClient,
}) {
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
      <button
        className="btn btn-danger btn-xs client-delete"
        onClick={(e) => {
          e.stopPropagation();
          showModal();
        }}
      >
        ✕
      </button>
    </li>
  );
}
