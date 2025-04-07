import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ModuleDelivered() {
  const { cohortId } = useParams();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortId}`)
      .then(response => setModules(response.data))
      .catch(error => console.error(error));
  }, [cohortId]);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <h1 className="mb-4 display-5" style={{ color: '#083D77' }}>
          Modules Delivered to {cohortId}
        </h1>
        <table className="table" style={{ border: '1px solid #8896AB' }}>
          <thead style={{ backgroundColor: '#083D77', color: '#EAF0CE' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>Code</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Full Name</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module, index) => (
              <tr
                key={module.code}
                style={{
                  backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3D7FF',
                  borderBottom: '1px solid #8896AB',
                }}
              >
                <td style={{ padding: '12px' }}>
                  <Link to={`/modules/${module.code}`} style={{ color: '#7E6551' }}>
                    {module.code}
                  </Link>
                </td>
                <td style={{ padding: '12px', color: '#7E6551' }}>{module.full_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModuleDelivered;