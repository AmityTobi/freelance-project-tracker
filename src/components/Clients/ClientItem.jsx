export default function ClientItem({
  client,
  isSelected,
  onSelectClient,
  onDeleteClient,
}) {
  return (
    <li
      className={`client-item ${isSelected ? "active" : ""}`}
      onClick={() => onSelectClient(client.id)}
    >
      <span className="client-avatar">
        {client.fullName.charAt(0).toUpperCase()}
      </span>
      <span className="client-name">{client.fullName}</span>
      <button
        className="btn btn-danger btn-xs client-delete"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClient(client.id);
        }}
      >
        ✕
      </button>
    </li>
  );
}
