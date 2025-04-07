import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CohortCreate() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    degree: '',
    year: ''
  });
  const [degrees, setDegrees] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/degree/')
      .then(response => setDegrees(response.data))
      .catch(err => console.error('Failed to fetch degrees:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.degree || !formData.year) {
      setError('All fields are required.');
      return;
    }

    const payload = {
      id: formData.id,
      name: formData.name,
      degree: `http://127.0.0.1:8000/api/degree/${formData.degree}/`,
      year: parseInt(formData.year, 10)
    };

    axios.post('http://127.0.0.1:8000/api/cohort/', payload)
      .then(() => navigate('/cohorts'))
      .catch(error => {
        console.error('API Error:', error.response?.data);
        setError(JSON.stringify(error.response?.data) || 'Failed to create cohort.');
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <h1 className="mb-4 display-5" style={{ color: '#083D77' }}>Create New Cohort</h1>
        {error && <div className="alert alert-danger" style={{ color: '#7E6551' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Cohort ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., COMSCI2023"
              value={formData.id}
              onChange={e => setFormData({ ...formData, id: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Computer Science 2023"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Degree</label>
            <select
              className="form-select"
              value={formData.degree}
              onChange={e => setFormData({ ...formData, degree: e.target.value })}
            >
              <option value="">Select Degree</option>
              {degrees.map(degree => (
                <option key={degree.shortcode} value={degree.shortcode}>
                  {degree.full_name} ({degree.shortcode})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Year</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g., 1"
              value={formData.year}
              onChange={e => setFormData({ ...formData, year: e.target.value })}
              min="1"
              max="4"
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#083D77', color: '#EAF0CE', borderColor: '#083D77' }}
          >
            Create Cohort
          </button>
        </form>
      </div>
    </div>
  );
}

export default CohortCreate;