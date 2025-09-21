import React, { useState, useEffect } from "react";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";
import ProductGallery from "./components/ProductGallery";
import OrderSummary from "./components/OrderSummary";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState("clients"); // "clients" or "gallery"

  useEffect(() => {
    const saved = localStorage.getItem("clients");
    if (saved) {
      try {
        setClients(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing saved clients:", error);
        localStorage.removeItem("clients");
      }
    }
  }, []);

  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem("clients", JSON.stringify(clients));
    }
  }, [clients]);

  const addClient = (name) => {
    if (!name.trim()) return;
    setClients([
      ...clients,
      { id: Date.now(), name: name.trim(), orders: [] }
    ]);
  };

  const addOrder = (clientId, item, quantity, price) => {
    if (!item || !quantity || !price) return;
    const newOrder = { 
      id: Date.now(), 
      item, 
      quantity: Number(quantity), 
      price: Number(price),
      date: new Date().toISOString().split('T')[0] // Add current date
    };
    setClients(clients.map(client =>
      client.id === clientId
        ? { ...client, orders: [...client.orders, newOrder] }
        : client
    ));
  };

  const addOrderFromGallery = (client, item, quantity, price) => {
    if (!client || !item || !quantity || !price) return;
    const newOrder = { 
      id: Date.now(), 
      item, 
      quantity: Number(quantity), 
      price: Number(price),
      date: new Date().toISOString().split('T')[0] // Add current date
    };
    setClients(clients.map(c =>
      c.id === client.id
        ? { ...c, orders: [...c.orders, newOrder] }
        : c
    ));
  };

  const deleteOrder = (clientId, orderId) => {
    setClients(clients.map(client =>
      client.id === clientId
        ? { ...client, orders: client.orders.filter(order => order.id !== orderId) }
        : client
    ));
  };

  const deleteClient = (clientId) => {
    if (window.confirm("Delete this client and all their orders?")) {
      setClients(clients.filter(client => client.id !== clientId));
      if (selectedClient && selectedClient.id === clientId) {
        setSelectedClient(null);
      }
    }
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to delete all data?")) {
      setClients([]);
      setSelectedClient(null);
      localStorage.removeItem("clients");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍎 Fruit & Vegetable Orders</h1>
        <p>Manage your fruit and vegetable orders with ease!</p>
      </header>

      <main className="app-main">
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            👥 Clients
          </button>
          <button 
            className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            🛍️ Product Gallery
          </button>
        </div>

        <div className="controls">
          <button
            onClick={clearAll}
            className="clear-all-btn"
          >
            🗑️ Clear All Data
          </button>
        </div>

        {activeTab === 'clients' && (
          <div className="clients-section">
            <ClientForm addClient={addClient} />
            <ClientList 
              clients={clients} 
              addOrder={addOrder} 
              deleteClient={deleteClient}
              deleteOrder={deleteOrder}
              onClientSelect={setSelectedClient}
            />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="gallery-section">
            <ProductGallery 
              onAddToCart={addOrderFromGallery}
              selectedClient={selectedClient}
              clients={clients}
            />
          </div>
        )}

        <OrderSummary clients={clients} />
      </main>
    </div>
  );
}

export default App;