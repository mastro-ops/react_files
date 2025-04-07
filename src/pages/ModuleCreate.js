import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ModuleCreate() {
  const [formData, setFormData] = useState({
    code: '',
    full_name: '',
    delivered_to: [],
    ca_split: ''
  });
  const [cohorts, setCohorts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cohort/')
      .then(response => {
        console.log('Cohorts fetched:', response.data);
        setCohorts(response.data);
      })
      .catch(err => console.error('Failed to fetch cohorts:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.full_name || !formData.delivered_to.length || !formData.ca_split) {
      setError('All fields are required.');
      return;
    }

    const payload = {
      code: formData.code,
      full_name: formData.full_name,
      delivered_to: formData.delivered_to.map(cohortId => `http://127.0.0.1:8000/api/cohort/${cohortId}/`),
      ca_split: parseInt(formData.ca_split, 10)
    };

    axios.post('http://127.0.0.1:8000/api/module/', payload)
      .then(() => navigate('/modules'))
      .catch(error => {
        console.error('API Error:', error.response?.data);
        setError(JSON.stringify(error.response?.data) || 'Failed to create module.');
      });
  };

  const handleDeliveredToChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData({ ...formData, delivered_to: selected });
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <h1 className="mb-4 display-5" style={{ color: '#083D77' }}>Create New Module</h1>
        {error && <div className="alert alert-danger" style={{ color: '#7E6551' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>
              Module Code (e.g., CA172)
            </label>
            <input
              type="text"
              className="form-control"
              value={formData.code}
              onChange={e => setFormData({ ...formData, code: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.full_name}
              onChange={e => setFormData({ ...formData, full_name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>
              Delivered To (hold Ctrl/Cmd for multiple)
            </label>
            <select
              multiple
              className="form-control"
              value={formData.delivered_to}
              onChange={handleDeliveredToChange}
              style={{ height: '100px' }}
            >
              <option value="">Select Cohorts</option>
              {cohorts.map(cohort => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.name} ({cohort.id})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>CA Split (0-100)</label>
            <input
              type="number"
              className="form-control"
              value={formData.ca_split}
              onChange={e => setFormData({ ...formData, ca_split: e.target.value })}
              min="0"
              max="100"
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#083D77', color: '#EAF0CE', borderColor: '#083D77' }}
          >
            Create Module
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModuleCreate;