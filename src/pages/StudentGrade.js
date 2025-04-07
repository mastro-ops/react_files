import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentGrade() {
  const { studentId } = useParams();
  const [formData, setFormData] = useState({
    module: '',
    ca_mark: '',
    exam_mark: '',
    cohort: ''
  });
  const [modules, setModules] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/module/').then(res => setModules(res.data));
    axios.get('http://127.0.0.1:8000/api/cohort/').then(res => setCohorts(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.module || !formData.ca_mark || !formData.exam_mark || !formData.cohort) {
      setError('All fields are required.');
      return;
    }

    const payload = {
      module: `http://127.0.0.1:8000/api/module/${formData.module}/`,
      ca_mark: parseInt(formData.ca_mark, 10),
      exam_mark: parseInt(formData.exam_mark, 10),
      cohort: `http://127.0.0.1:8000/api/cohort/${formData.cohort}/`,
      student: `http://127.0.0.1:8000/api/student/${studentId}/`
    };

    axios.post('http://127.0.0.1:8000/api/grade/', payload)
      .then(() => navigate(`/students/${studentId}`))
      .catch(error => {
        console.error('Error:', error.response?.data);
        setError(JSON.stringify(error.response?.data) || 'Failed to set grade.');
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <h1 className="mb-4 display-5" style={{ color: '#083D77' }}>
          Set Grade for Student {studentId}
        </h1>
        {error && <div className="alert alert-danger" style={{ color: '#7E6551' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Module</label>
            <select
              className="form-select"
              value={formData.module}
              onChange={e => setFormData({ ...formData, module: e.target.value })}
            >
              <option value="">Select Module</option>
              {modules.map(mod => (
                <option key={mod.code} value={mod.code}>
                  {mod.full_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>CA Mark</label>
            <input
              type="number"
              className="form-control"
              value={formData.ca_mark}
              onChange={e => setFormData({ ...formData, ca_mark: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#7E6551' }}>Exam Mark</label>
            <input
              type="number"
              className="form-control"
              value={formData.exam_mark}
              onChange={e => setFormData({ ...formData, exam_mark: e.target.value })}
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
            Set Grade
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentGrade;