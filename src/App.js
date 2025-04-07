import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from './Layouts/Container';
import HomePage from './Layouts/HomePage';
import FourOhFour from './Layouts/FourOhFour';
import ProductsByCategory from './Pages/ProductsByCategory';
import OrdersByStatus from './Pages/OrdersByStatus';
import CustomerOrders from './Pages/CustomerOrders';
import OrderDetails from './Pages/OrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsByCategory />} />
          <Route path="orders/status" element={<OrdersByStatus />} />
          <Route path="customer" element={<CustomerOrders />} />
          <Route path="order" element={<OrderDetails />} />
          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;