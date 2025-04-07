import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentCreate() {
  const [formData, setFormData] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    email: '',
    cohort: ''
  });
  const [cohorts, setCohorts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cohort/')
      .then(response => setCohorts(response.data))
      .catch(err => console.error('Failed to fetch cohorts:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.student_id || !formData.first_name || !formData.last_name || !formData.email || !formData.cohort) {
      setError('All fields are required.');
      return;
    }

    const payload = {
      student_id: formData.student_id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      cohort: `http://127.0.0.1:8000/api/cohort/${formData.cohort}/`
    };

    axios.post('http://127.0.0.1:8000/api/student/', payload)
      .then(() => navigate(`/students/${formData.student_id}`))
      .catch(error => {
        console.error('API Error:', error.response?.data);
        setError(JSON.stringify(error.response?.data) || 'Failed to create student.');
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <h1 className="mb-4 display-5" style={{ color: '#083D77' }}>Create New Student</h1>
        {error && <div className="alert alert-danger" style={{ color: '#7E6551' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Student ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., 24936812"
              value={formData.student_id}
              onChange={e => setFormData({ ...formData, student_id: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>First Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.first_name}
              onChange={e => setFormData({ ...formData, first_name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.last_name}
              onChange={e => setFormData({ ...formData, last_name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Cohort</label>
            <select
              className="form-select"
              value={formData.cohort}
              onChange={e => setFormData({ ...formData, cohort: e.target.value })}
            >
              <option value="">Select Cohort</option>
              {cohorts.map(cohort => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.name} ({cohort.id})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#083D77', color: '#EAF0CE', borderColor: '#083D77' }}
          >
            Create Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentCreate;