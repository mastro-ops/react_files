import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function StudentsByModule() {
  const { moduleCode } = useParams();
  const [students, setStudents] = useState([]);
  const [module, setModule] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/student/?module=${moduleCode}`)
      .then(response => setStudents(response.data))
      .catch(error => console.error(error));
    axios.get(`http://127.0.0.1:8000/api/module/${moduleCode}/`)
      .then(response => setModule(response.data))
      .catch(error => console.error(error));
  }, [moduleCode]);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container py-5">
        <h1 className="mb-4 display-5" style={{ color: '#083D77' }}>
          Students in {module ? module.full_name : moduleCode}
        </h1>
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
      </div>
    </div>
  );
}

export default StudentsByModule;