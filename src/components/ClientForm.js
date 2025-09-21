import React, { useState } from "react";

function ClientForm({ addClient }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addClient(name);
    setName("");
  };

  return (
    <div className="client-form">
      <h3>👤 Add New Client</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter client name"
            className="form-input"
            required
          />
          <button type="submit" className="btn-primary">
            ➕ Add Client
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientForm;