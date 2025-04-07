import { Outlet, Link } from "react-router-dom";

export default function Container() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/products">Products by Category</Link> | 
        <Link to="/orders/status">Orders by Status</Link> | 
        <Link to="/customer">Customer Orders</Link> | 
        <Link to="/order">Order Details</Link>
      </nav>
      <div id="container">
        <Outlet />
      </div>
    </div>
  );
}