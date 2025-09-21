import React from "react";

function OrderSummary({ clients }) {
  const totals = {};
  let totalRevenue = 0;

  clients.forEach(client => {
    client.orders.forEach(order => {
      const item = order.item;
      const quantity = order.quantity;
      const price = order.price;
      const total = quantity * price;
      
      if (totals[item]) {
        totals[item].quantity += quantity;
        totals[item].revenue += total;
      } else {
        totals[item] = { quantity, revenue: total };
      }
      totalRevenue += total;
    });
  });

  const sortedItems = Object.entries(totals).sort((a, b) => b[1].quantity - a[1].quantity);

  return (
    <div className="order-summary">
      <h2>📊 Order Summary</h2>
      {sortedItems.length === 0 ? (
        <p className="no-orders">No orders yet. Start adding clients and orders!</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.3rem' }}>
              💰 Total Revenue: ${totalRevenue.toFixed(2)}
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>
              From {clients.length} client{clients.length !== 1 ? 's' : ''} and {sortedItems.length} item type{sortedItems.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <ul className="summary-list">
            {sortedItems.map(([item, data], index) => (
              <li key={index} className="summary-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600' }}>{item}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div>{data.quantity} total units</div>
                    <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                      ${data.revenue.toFixed(2)} revenue
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default OrderSummary;