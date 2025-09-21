import React, { useState } from "react";

const defaultProducts = [
  { id: 1, name: "Apple", emoji: "🍎", price: 2.50, category: "fruit", image: null },
  { id: 2, name: "Banana", emoji: "🍌", price: 1.20, category: "fruit", image: null },
  { id: 3, name: "Orange", emoji: "🍊", price: 3.00, category: "fruit", image: null },
  { id: 4, name: "Grapes", emoji: "🍇", price: 4.50, category: "fruit", image: null },
  { id: 5, name: "Strawberry", emoji: "🍓", price: 5.00, category: "fruit", image: null },
  { id: 6, name: "Tomato", emoji: "🍅", price: 2.80, category: "vegetable", image: null },
  { id: 7, name: "Potato", emoji: "🥔", price: 1.50, category: "vegetable", image: null },
  { id: 8, name: "Carrot", emoji: "🥕", price: 2.00, category: "vegetable", image: null },
  { id: 9, name: "Lettuce", emoji: "🥬", price: 1.80, category: "vegetable", image: null },
  { id: 10, name: "Onion", emoji: "🧅", price: 1.60, category: "vegetable", image: null },
  { id: 11, name: "Broccoli", emoji: "🥦", price: 3.20, category: "vegetable", image: null },
  { id: 12, name: "Bell Pepper", emoji: "🫑", price: 2.90, category: "vegetable", image: null }
];

function ProductGallery({ onAddToCart, selectedClient, clients }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : defaultProducts;
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", emoji: "", price: "", category: "fruit", image: null });
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderPrice, setOrderPrice] = useState("");

  // Save products to localStorage whenever products change
  React.useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // const categories = ["all", "fruit", "vegetable"];
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleImageUpload = (file, setter) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setter(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    
    const product = {
      id: Date.now(),
      name: newProduct.name.trim(),
      emoji: newProduct.emoji.trim() || "📦",
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: newProduct.image
    };
    
    setProducts([...products, product]);
    setNewProduct({ name: "", emoji: "", price: "", category: "fruit", image: null });
    setShowAddForm(false);
  };

  const handleEditProduct = () => {
    if (!editingProduct.name || !editingProduct.price) return;
    
    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { 
            ...editingProduct, 
            price: parseFloat(editingProduct.price),
            emoji: editingProduct.emoji || "📦"
          }
        : p
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleProductClick = (product) => {
    if (!selectedClient) {
      alert("Please select a client first!");
      return;
    }
    setSelectedProduct(product);
    setOrderQuantity(1);
    setOrderPrice(product.price.toString());
    setShowOrderModal(true);
  };

  const handleConfirmOrder = () => {
    if (!orderQuantity || !orderPrice) {
      alert("Please fill in quantity and price");
      return;
    }
    onAddToCart(selectedClient, selectedProduct.name, Number(orderQuantity), Number(orderPrice));
    setShowOrderModal(false);
    setSelectedProduct(null);
  };

  const handleCancelOrder = () => {
    setShowOrderModal(false);
    setSelectedProduct(null);
    setOrderQuantity(1);
    setOrderPrice("");
  };

  return (
    <div className="product-gallery">
      <div className="gallery-header">
        <h2>🛍️ Product Gallery</h2>
        <p>Click on any item to add it to the selected client's order</p>
        
        <div className="gallery-controls">
          <div className="category-filter">
            <label>Filter by category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="all">All Items</option>
              <option value="fruit">🍎 Fruits</option>
              <option value="vegetable">🥕 Vegetables</option>
            </select>
          </div>
          
          <button 
            onClick={() => setShowAddForm(true)}
            className="add-product-btn"
          >
            ➕ Add New Product
          </button>
        </div>
      </div>

      {selectedClient && (
        <div className="selected-client-info">
          <span>Adding to: <strong>{selectedClient.name}</strong></span>
        </div>
      )}

      {!selectedClient && (
        <div className="no-client-warning">
          ⚠️ Please select a client from the client list to add items
        </div>
      )}

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className={`product-card ${!selectedClient ? 'disabled' : ''}`}
            onClick={() => handleProductClick(product)}
          >
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} className="product-img" />
              ) : (
                <span className="product-emoji">{product.emoji}</span>
              )}
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <span className="product-category">{product.category}</span>
            </div>
            <div className="product-actions">
              <button 
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingProduct({...product});
                }}
                title="Edit Product"
              >
                ✏️
              </button>
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProduct(product.id);
                }}
                title="Delete Product"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

        {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No products found in this category.</p>
          <button onClick={() => setShowAddForm(true)} className="add-product-btn">
            Add First Product
          </button>
        </div>
      )}

      {/* Live Order Preview */}
      {selectedClient && (
        <div className="live-order-preview">
          <h3>🛒 Current Orders for {selectedClient.name}</h3>
          {(() => {
            const clientData = clients.find(c => c.id === selectedClient.id);
            if (!clientData || clientData.orders.length === 0) {
              return (
                <div className="no-orders-preview">
                  <p>No orders yet. Start adding items from the gallery above!</p>
                </div>
              );
            }
            
            const totalAmount = clientData.orders.reduce((sum, order) => sum + (order.quantity * order.price), 0);
            
            return (
              <div className="orders-preview-content">
                <div className="orders-preview-list">
                  {clientData.orders.map((order) => (
                    <div key={order.id} className="preview-order-item">
                      <div className="preview-order-main">
                        <span className="preview-item-name">{order.item}</span>
                        <span className="preview-quantity">{order.quantity} units</span>
                      </div>
                      <div className="preview-order-price">
                        <span>${(order.quantity * order.price).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="preview-total">
                  <strong>Total: ${totalAmount.toFixed(2)}</strong>
                  <span>{clientData.orders.length} order{clientData.orders.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>➕ Add New Product</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Emoji (e.g., 🍎)"
                value={newProduct.emoji}
                onChange={(e) => setNewProduct({...newProduct, emoji: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Price"
                step="0.01"
                min="0"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="form-select"
              >
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
              </select>
            </div>
            <div className="form-group">
              <label>Product Image (optional):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0], (image) => setNewProduct({...newProduct, image}))}
                className="form-input"
              />
              {newProduct.image && (
                <div className="image-preview">
                  <img src={newProduct.image} alt="Preview" className="preview-img" />
                  <button 
                    type="button"
                    onClick={() => setNewProduct({...newProduct, image: null})}
                    className="remove-image-btn"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button onClick={handleAddProduct} className="btn-primary">Add Product</button>
              <button onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>✏️ Edit Product</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Product Name"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Emoji (e.g., 🍎)"
                value={editingProduct.emoji}
                onChange={(e) => setEditingProduct({...editingProduct, emoji: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Price"
                step="0.01"
                min="0"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <select
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                className="form-select"
              >
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
              </select>
            </div>
            <div className="form-group">
              <label>Product Image (optional):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0], (image) => setEditingProduct({...editingProduct, image}))}
                className="form-input"
              />
              {editingProduct.image && (
                <div className="image-preview">
                  <img src={editingProduct.image} alt="Preview" className="preview-img" />
                  <button 
                    type="button"
                    onClick={() => setEditingProduct({...editingProduct, image: null})}
                    className="remove-image-btn"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button onClick={handleEditProduct} className="btn-primary">Save Changes</button>
              <button onClick={() => setEditingProduct(null)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal order-modal">
            <div className="order-modal-header">
              <div className="product-preview">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="product-img-large" />
                ) : (
                  <span className="product-emoji-large">{selectedProduct.emoji}</span>
                )}
                <h3>{selectedProduct.name}</h3>
                <p className="default-price">Default price: ${selectedProduct.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="order-form-fields">
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  id="quantity"
                  type="number"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  className="form-input"
                  min="1"
                  step="1"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="price">Price per unit:</label>
                <input
                  id="price"
                  type="number"
                  value={orderPrice}
                  onChange={(e) => setOrderPrice(e.target.value)}
                  className="form-input"
                  min="0"
                  step="0.01"
                />
              </div>
              
              {orderQuantity && orderPrice && (
                <div className="order-total-preview">
                  <strong>Total: ${(Number(orderQuantity) * Number(orderPrice)).toFixed(2)}</strong>
                  <p>{orderQuantity} units × ${Number(orderPrice).toFixed(2)} = ${(Number(orderQuantity) * Number(orderPrice)).toFixed(2)}</p>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button onClick={handleConfirmOrder} className="btn-primary">
                ✅ Add to Order
              </button>
              <button onClick={handleCancelOrder} className="btn-secondary">
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
