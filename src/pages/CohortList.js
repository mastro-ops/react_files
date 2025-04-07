import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CohortList() {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cohort/')
      .then(response => setCohorts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <h1 className="mb-4 display-5" style={{ color: '#083D77' }}>All Cohorts</h1>
        <Link
          to="/cohorts/create"
          className="btn mb-4"
          style={{ backgroundColor: '#083D77', color: '#EAF0CE', borderColor: '#083D77' }}
        >
          Create New Cohort
        </Link>
        <table className="table" style={{ border: '1px solid #8896AB' }}>
          <thead style={{ backgroundColor: '#083D77', color: '#EAF0CE' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Degree</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Year</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort, index) => (
              <tr
                key={cohort.id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3D7FF',
                  borderBottom: '1px solid #8896AB',
                }}
              >
                <td style={{ padding: '12px' }}>
                  <Link to={`/cohorts/${cohort.id}`} style={{ color: '#7E6551' }}>
                    {cohort.id}
                  </Link>
                </td>
                <td style={{ padding: '12px', color: '#7E6551' }}>{cohort.name}</td>
                <td style={{ padding: '12px', color: '#7E6551' }}>
                  {cohort.degree.split('/').slice(-2)[0]} {/* Extracts shortcode, e.g., "BSC" */}
                </td>
                <td style={{ padding: '12px', color: '#7E6551' }}>{cohort.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CohortList;