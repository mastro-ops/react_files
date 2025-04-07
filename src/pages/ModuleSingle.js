import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ModuleSingle() {
  const { code } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/module/${code}/`)
      .then(response => {
        setModule(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [code]);

  if (loading) return <div>Loading module...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!module) return <div>Module not found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{module.full_name} ({module.code})</h1>
      <p>
        <strong>Cohorts:</strong>{' '}
        {module.delivered_to.map(url => {
          const cohortId = url.split('/').slice(-2)[0];
          return (
            <Link
              key={cohortId}
              to={`/cohorts/${cohortId}`}
              style={{ ...linkStyle, marginRight: '10px' }}
            >
              {cohortId}
            </Link>
          );
        })}
      </p>
      <p><strong>CA Split:</strong> {module.ca_split}</p>
      <Link to={`/students/by-module/${module.code}`} style={linkStyle}>
        View Students
      </Link>
    </div>
  );
}

const linkStyle = {
  color: '#007BFF',
  textDecoration: 'none'
};

export default ModuleSingle;