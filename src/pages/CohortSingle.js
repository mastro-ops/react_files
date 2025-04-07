import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CohortSingle() {
  const { id } = useParams();
  const [cohort, setCohort] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/cohort/${id}/`)
      .then(response => setCohort(response.data))
      .catch(err => setError(err.message));
    axios.get(`http://127.0.0.1:8000/api/student/?cohort=${id}`)
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(err => setError(err.message));
  }, [id]);

  if (loading) return <div className="container mt-5" style={{ color: '#7E6551' }}>Loading cohort...</div>;
  if (error) return <div className="container mt-5" style={{ color: '#7E6551' }}>Error: {error}</div>;
  if (!cohort) return <div className="container mt-5" style={{ color: '#7E6551' }}>Cohort not found</div>;

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <div className="card shadow-sm mb-4" style={{ borderColor: '#8896AB' }}>
          <div className="card-body">
            <h1 className="card-title display-5" style={{ color: '#083D77' }}>
              {cohort.name} ({cohort.id})
            </h1>
            <p className="card-text" style={{ color: '#7E6551' }}>
              <strong>Year:</strong> {cohort.year}
            </p>
            <p className="card-text" style={{ color: '#7E6551' }}>
              <strong>Degree:</strong> {cohort.degree.split('/').slice(-2)[0]}
            </p>
          </div>
        </div>
        <h2 className="mb-3" style={{ color: '#083D77' }}>Students in this Cohort</h2>
        {students.length === 0 ? (
          <p style={{ color: '#7E6551' }}>No students in this cohort.</p>
        ) : (
          <table className="table" style={{ border: '1px solid #8896AB' }}>
            <thead style={{ backgroundColor: '#083D77', color: '#EAF0CE' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.student_id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3D7FF',
                    borderBottom: '1px solid #8896AB',
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    <Link to={`/students/${student.student_id}`} style={{ color: '#7E6551' }}>
                      {student.student_id}
                    </Link>
                  </td>
                  <td style={{ padding: '12px', color: '#7E6551' }}>
                    {student.first_name} {student.last_name}
                  </td>
                  <td style={{ padding: '12px', color: '#7E6551' }}>{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-3">
          <Link
            to={`/modules/delivered/${id}`}
            className="btn"
            style={{ backgroundColor: '#083D77', color: '#EAF0CE', borderColor: '#083D77' }}
          >
            View Modules Delivered to this Cohort
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CohortSingle;