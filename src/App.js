import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import DegreeList from './pages/DegreeList';
import DegreeSingle from './pages/DegreeSingle';
import DegreeCreate from './pages/DegreeCreate';
import CohortList from './pages/CohortList';
import CohortSingle from './pages/CohortSingle';
import CohortCreate from './pages/CohortCreate';
import ModuleList from './pages/ModuleList';
import ModuleSingle from './pages/ModuleSingle';
import ModuleDelivered from './pages/ModuleDelivered';
import ModuleCreate from './pages/ModuleCreate';
import StudentSingle from './pages/StudentSingle';
import StudentCreate from './pages/StudentCreate';
import StudentGrade from './pages/StudentGrade';
import StudentsByModule from './pages/StudentsByModule';

function App() {
  return (
    <div className="App">
      {/* Styled Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#083D77' }}>
        <div className="container">
          <Link className="navbar-brand" to="/" style={{ color: '#EAF0CE', fontWeight: 'bold' }}>
            University Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/degrees" style={{ color: '#EAF0CE', marginRight: '15px' }}>
                Degrees
              </Link>
              <Link className="nav-link" to="/cohorts" style={{ color: '#EAF0CE', marginRight: '15px' }}>
                Cohorts
              </Link>
              <Link className="nav-link" to="/modules" style={{ color: '#EAF0CE', marginRight: '15px' }}>
                Modules
              </Link>
              <Link className="nav-link" to="/students/create" style={{ color: '#EAF0CE' }}>
                Create Student
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to the top of the content to avoid overlap with fixed navbar */}
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/degrees" element={<DegreeList />} />
          <Route path="/degrees/:shortcode" element={<DegreeSingle />} />
          <Route path="/degrees/create" element={<DegreeCreate />} />
          <Route path="/cohorts" element={<CohortList />} />
          <Route path="/cohorts/:id" element={<CohortSingle />} />
          <Route path="/cohorts/create" element={<CohortCreate />} />
          <Route path="/modules" element={<ModuleList />} />
          <Route path="/modules/:code" element={<ModuleSingle />} />
          <Route path="/modules/delivered/:cohortId" element={<ModuleDelivered />} />
          <Route path="/modules/create" element={<ModuleCreate />} />
          <Route path="/students/:studentId" element={<StudentSingle />} />
          <Route path="/students/create" element={<StudentCreate />} />
          <Route path="/students/:studentId/grade" element={<StudentGrade />} />
          <Route path="/students/by-module/:moduleCode" element={<StudentsByModule />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;