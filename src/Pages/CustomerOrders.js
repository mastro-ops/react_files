import { useState, useEffect } from "react";

export default function CustomerOrders() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/customer/")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Error fetching customers:", err));
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      const customerId = selectedCustomer.url.split('/').slice(-2)[0];
      fetch(`http://127.0.0.1:8000/api/order/?customer=${customerId}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [selectedCustomer]);

  return (
    <div>
      <h2>Customer Orders</h2>
      <label htmlFor="customer-select">Select Customer: </label>
      <select
        id="customer-select"
        onChange={(e) =>
          setSelectedCustomer(
            customers.find((c) => c.url === e.target.value)
          )
        }
      >
        <option value="">-- Choose a customer --</option>
        {customers.map((cust) => (
          <option key={cust.url} value={cust.url}>
            {cust.name}
          </option>
        ))}
      </select>
      {selectedCustomer && (
        <div>
          <h3>Customer Details</h3>
          <p>URL: {selectedCustomer.url}</p>
          <p>Name: {selectedCustomer.name}</p>
          <p>Email: {selectedCustomer.email}</p>
          <p>Address: {selectedCustomer.address}</p>
          <h3>Orders</h3>
          {orders.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Date Ordered</th>
                  <th>Shipping Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.url}>
                    <td>{order.url}</td>
                    <td>{order.date_ordered}</td>
                    <td>{order.shipping_addr}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders found for this customer.</p>
          )}
        </div>
      )}
    </div>
  );
}