import { useState, useEffect } from "react";

export default function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/order/")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      const orderId = selectedOrder.url.split('/').slice(-2)[0];
      fetch(`http://127.0.0.1:8000/api/orderitem/?order=${orderId}`)
        .then((res) => res.json())
        .then(async (items) => {
          const detailedItems = await Promise.all(
            items.map(async (item) => {
              const productRes = await fetch(item.product);
              const product = await productRes.json();
              return { ...item, product };
            })
          );
          setOrderItems(detailedItems);
          const total = detailedItems.reduce(
            (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
            0
          );
          setTotalPrice(total);
        })
        .catch((err) => console.error("Error fetching order items:", err));
    }
  }, [selectedOrder]);

  return (
    <div>
      <h2>Order Details</h2>
      <label htmlFor="order-select">Select Order: </label>
      <select
        id="order-select"
        onChange={(e) =>
          setSelectedOrder(orders.find((o) => o.url === e.target.value))
        }
      >
        <option value="">-- Choose an order --</option>
        {orders.map((order) => (
          <option key={order.url} value={order.url}>
            Order {order.url.split('/').slice(-2)[0]}
          </option>
        ))}
      </select>
      {selectedOrder && (
        <div>
          <h3>Order Information</h3>
          <p>URL: {selectedOrder.url}</p>
          <p>Date Ordered: {selectedOrder.date_ordered}</p>
          <p>Shipping Address: {selectedOrder.shipping_addr}</p>
          <p>Customer: {selectedOrder.customer}</p>
          <p>Status: {selectedOrder.status}</p>
          <h3>Order Items</h3>
          {orderItems.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item.url}>
                    <td>{item.url}</td>
                    <td>{item.product.name}</td>
                    <td>${item.product.price}</td>
                    <td>{item.quantity}</td>
                    <td>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items in this order.</p>
          )}
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}