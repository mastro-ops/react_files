import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Degrees from './pages/Degrees';
import Cohorts from './pages/Cohorts';
import Modules from './pages/Modules';
import Students from './pages/Students';
import Home from './pages/Home';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/degrees" element={<Degrees />} />
      <Route path="/cohorts" element={<Cohorts />} />
      <Route path="/modules" element={<Modules />} />
      <Route path="/students/:id" element={<Students />} />
    </Routes>
  </Router>
);

export default AppRoutes;
