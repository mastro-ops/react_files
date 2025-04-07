import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DegreeList() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/degree/')
      .then(response => setDegrees(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <h1 className="mb-4 display-5" style={{ color: '#083D77' }}>All Degrees</h1>
        <Link
          to="/degrees/create"
          className="btn mb-4"
          style={{ backgroundColor: '#083D77', color: '#EAF0CE', borderColor: '#083D77' }}
        >
          Create New Degree
        </Link>
        <table className="table" style={{ border: '1px solid #8896AB' }}>
          <thead style={{ backgroundColor: '#083D77', color: '#EAF0CE' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>Shortcode</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Full Name</th>
            </tr>
          </thead>
          <tbody>
            {degrees.map((degree, index) => (
              <tr
                key={degree.shortcode}
                style={{
                  backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3D7FF',
                  borderBottom: '1px solid #8896AB',
                }}
              >
                <td style={{ padding: '12px' }}>
                  <Link to={`/degrees/${degree.shortcode}`} style={{ color: '#7E6551' }}>
                    {degree.shortcode}
                  </Link>
                </td>
                <td style={{ padding: '12px', color: '#7E6551' }}>{degree.full_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DegreeList;