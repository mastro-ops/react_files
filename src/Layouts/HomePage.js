import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Clothes Shop App</h1>
      <p>Navigate to:</p>
      <ul>
        <li><Link to="/products">View Products by Category</Link></li>
        <li><Link to="/orders/status">View Orders by Status</Link></li>
        <li><Link to="/customer">View Customer Orders</Link></li>
        <li><Link to="/order">View Order Details</Link></li>
      </ul>
    </div>
  );
}