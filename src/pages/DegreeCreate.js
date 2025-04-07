import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DegreeCreate() {
  const [formData, setFormData] = useState({
    shortcode: '',
    full_name: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.shortcode || !formData.full_name) {
      setError('All fields are required.');
      return;
    }

    axios.post('http://127.0.0.1:8000/api/degree/', formData)
      .then(() => navigate('/degrees'))
      .catch(error => {
        console.error('API Error:', error.response?.data);
        setError(JSON.stringify(error.response?.data) || 'Failed to create degree.');
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <h1 className="mb-4 display-5" style={{ color: '#083D77' }}>Create New Degree</h1>
        {error && <div className="alert alert-danger" style={{ color: '#7E6551' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Shortcode</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., BSC"
              value={formData.shortcode}
              onChange={e => setFormData({ ...formData, shortcode: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Bachelor of Science"
              value={formData.full_name}
              onChange={e => setFormData({ ...formData, full_name: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#083D77', color: '#EAF0CE', borderColor: '#083D77' }}
          >
            Create Degree
          </button>
        </form>
      </div>
    </div>
  );
}

export default DegreeCreate;