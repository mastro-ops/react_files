import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container text-center py-5 flex-grow-1 d-flex flex-column justify-content-center">
        <h1 className="mb-4 display-4" style={{ color: '#083D77' }}>
          Welcome to the University Management System
        </h1>
        <p className="lead mb-5" style={{ color: '#7E6551' }}>
          Manage degrees, cohorts, modules, and students with ease.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link
            to="/degrees"
            className="btn btn-lg"
            style={{
              backgroundColor: '#083D77',
              color: '#EAF0CE',
              borderColor: '#083D77',
            }}
          >
            View Degrees
          </Link>
          <Link
            to="/cohorts"
            className="btn btn-lg"
            style={{
              backgroundColor: '#083D77',
              color: '#EAF0CE',
              borderColor: '#083D77',
            }}
          >
            View Cohorts
          </Link>
          <Link
            to="/modules"
            className="btn btn-lg"
            style={{
              backgroundColor: '#083D77',
              color: '#EAF0CE',
              borderColor: '#083D77',
            }}
          >
            View Modules
          </Link>
          <Link
            to="/students/create"
            className="btn btn-lg"
            style={{
              backgroundColor: '#083D77',
              color: '#EAF0CE',
              borderColor: '#083D77',
            }}
          >
            Create Student
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;