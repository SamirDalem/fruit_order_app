import React, { useState } from "react";

function ClientList({ clients, addOrder, deleteClient, deleteOrder, onClientSelect }) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleAddOrder = (clientId) => {
    if (!item || !quantity || !price) {
      alert("Please fill in all fields");
      return;
    }
    addOrder(clientId, item, Number(quantity), Number(price));
    setItem("");
    setQuantity("");
    setPrice("");
  };

  const toggleClient = (clientId) => {
    const newSelection = selectedClient === clientId ? null : clientId;
    setSelectedClient(newSelection);
    if (onClientSelect) {
      onClientSelect(newSelection ? clients.find(c => c.id === clientId) : null);
    }
  };

  const calculateClientTotal = (client) => {
    return client.orders.reduce((total, order) => total + (order.quantity * order.price), 0);
  };

  if (clients.length === 0) {
    return (
      <div className="client-list">
        <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
          <h3>📝 No clients yet</h3>
          <p>Add your first client to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="client-list">
      <h2>👥 Clients ({clients.length})</h2>
      {clients.map(client => (
        <div key={client.id} className={`client-card ${selectedClient === client.id ? 'selected' : ''}`}>
          <div 
            className="client-header"
            onClick={() => toggleClient(client.id)}
          >
            <div className="client-info">
              <h3 className="client-name">
                {client.name} {selectedClient === client.id ? "▲" : "▼"}
              </h3>
              <div className="client-stats">
                <span className="order-count">
                  {client.orders.length} order{client.orders.length !== 1 ? 's' : ''}
                </span>
                <span className="total-amount">
                  Total: ${calculateClientTotal(client).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="client-actions">
              <button
                onClick={() => deleteClient(client.id)}
                className="delete-btn"
              >
                ❌ Delete
              </button>
            </div>
          </div>

          {selectedClient === client.id && (
            <div className="client-content">
              <div className="selection-notice">
                <p>✅ <strong>{client.name}</strong> is now selected for adding items from the gallery</p>
              </div>

              <div className="order-form">
                <h4>🛒 Manual Order Entry</h4>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    className="form-input"
                  />

                  <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-number"
                    min="1"
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-number"
                    min="0"
                    step="0.01"
                  />

                  <button 
                    onClick={() => handleAddOrder(client.id)}
                    className="btn-primary"
                  >
                    ➕ Add Order
                  </button>
                </div>
              </div>

              <div className="orders-list">
                <h4>📋 Current Orders ({client.orders.length})</h4>
                {client.orders.length === 0 ? (
                  <p className="no-orders">No orders yet for this client.</p>
                ) : (
                  <div className="orders-grid">
                    {client.orders.map((order) => (
                      <div key={order.id} className="order-item">
                        <div className="order-main">
                          <span className="order-item-name">{order.item}</span>
                          <span className="order-quantity">{order.quantity} units</span>
                          <span className="order-date">📅 {order.date || 'No date'}</span>
                        </div>
                        <div className="order-pricing">
                          <span className="unit-price">${order.price}/unit</span>
                          <span className="total-price">${(order.quantity * order.price).toFixed(2)}</span>
                          <button 
                            className="delete-order-btn"
                            onClick={() => {
                              if (window.confirm(`Delete order: ${order.item}?`)) {
                                deleteOrder(client.id, order.id);
                              }
                            }}
                            title="Delete this order"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ClientList;