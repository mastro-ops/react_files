import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function StudentSingle() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [modules, setModules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/student/${studentId}/`)
      .then(response => setStudent(response.data))
      .catch(error => setError(error.message));
    axios.get(`http://127.0.0.1:8000/api/grade/?student=${studentId}`)
      .then(response => {
        const gradesData = response.data;
        setGrades(gradesData);
        const modulePromises = gradesData.map(grade =>
          axios.get(grade.module)
            .then(res => ({ [grade.module.split('/').slice(-2)[0]]: res.data.full_name }))
        );
        Promise.all(modulePromises)
          .then(moduleData => {
            setModules(Object.assign({}, ...moduleData));
            setLoading(false);
          })
          .catch(err => setError(err.message));
      })
      .catch(error => setError(error.message));
  }, [studentId]);

  if (loading) return <div className="container mt-5" style={{ color: '#7E6551' }}>Loading student...</div>;
  if (error) return <div className="container mt-5" style={{ color: '#7E6551' }}>Error: {error}</div>;
  if (!student) return <div className="container mt-5" style={{ color: '#7E6551' }}>Student not found</div>;

  const cohortShortName = student.cohort.split('/').slice(-2)[0];

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <div className="card shadow-sm mb-4" style={{ borderColor: '#8896AB' }}>
          <div className="card-body">
            <h1
              className="card-title display-5 fw-bold" // Added fw-bold for thicker text
              style={{ color: '#083D77' }}
            >
              {student.first_name} {student.last_name} ({student.student_id})
            </h1>
            <p className="card-text" style={{ color: '#7E6551' }}>
              <strong>Email:</strong> {student.email}
            </p>
            <p className="card-text" style={{ color: '#7E6551' }}>
              <strong>Cohort:</strong> {cohortShortName}
            </p>
          </div>
        </div>
        <h2 className="mb-3" style={{ color: '#083D77' }}>Modules and Grades</h2>
        <table className="table" style={{ border: '1px solid #8896AB' }}>
          <thead style={{ backgroundColor: '#083D77', color: '#EAF0CE' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>Module</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>CA Mark</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Exam Mark</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Total Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => {
              const moduleCode = grade.module.split('/').slice(-2)[0];
              const moduleName = modules[moduleCode] || moduleCode;
              const totalGrade = grade.total_grade ? Number(grade.total_grade).toFixed(2) : 'N/A';

              return (
                <tr
                  key={grade.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3D7FF',
                    borderBottom: '1px solid #8896AB',
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    <Link to={`/modules/${moduleCode}`} style={{ color: '#7E6551' }}>
                      {moduleName}
                    </Link>
                  </td>
                  <td style={{ padding: '12px', color: '#7E6551' }}>{grade.ca_mark}</td>
                  <td style={{ padding: '12px', color: '#7E6551' }}>{grade.exam_mark}</td>
                  <td style={{ padding: '12px', color: '#7E6551' }}>{totalGrade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link
          to={`/students/${studentId}/grade`}
          className="btn mt-3"
          style={{ backgroundColor: '#083D77', color: '#EAF0CE', borderColor: '#083D77' }}
        >
          Set Grade
        </Link>
      </div>
    </div>
  );
}

export default StudentSingle;