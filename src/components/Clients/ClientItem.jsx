export default function ClientItem({ client, isSelected, onSelectClient }) {
  return (
    <li
      className={`client-item ${isSelected ? "active" : ""}`}
      onClick={() => onSelectClient(client.id)}
    >
      <span className="client-avatar">
        {client.fullName.charAt(0).toUpperCase()}
      </span>
      <span className="client-name">{client.fullName}</span>
    </li>
  );
}
