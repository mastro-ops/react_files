import { useState, useEffect } from "react";

export default function OrdersByStatus() {
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const statusOptions = [
    { value: "O", label: "Ordered" },
    { value: "P", label: "Processing" },
    { value: "S", label: "Shipped" },
    { value: "D", label: "Delivered" },
  ];

  useEffect(() => {
    if (status) {
      fetch(`http://127.0.0.1:8000/api/order/?status=${status}`)
        .then((res) => res.json())
        .then(async (data) => {
          // Fetch customer names for each order
          const ordersWithCustomerNames = await Promise.all(
            data.map(async (order) => {
              const customerRes = await fetch(order.customer);
              const customer = await customerRes.json();
              return { ...order, customerName: customer.name };
            })
          );
          setOrders(ordersWithCustomerNames);
        })
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [status]);

  return (
    <div>
      <h2>Orders by Status</h2>
      <label htmlFor="status-select">Select Status: </label>
      <select
        id="status-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">-- Choose a status --</option>
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Date Ordered</th>
              <th>Shipping Address</th>
              <th>Customer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.url}>
                <td>{order.url}</td>
                <td>{order.date_ordered}</td>
                <td>{order.shipping_addr}</td>
                <td>{order.customerName}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found for this status.</p>
      )}
    </div>
  );
}