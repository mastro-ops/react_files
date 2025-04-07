import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function DegreeSingle() {
  const { shortcode } = useParams();
  const [degree, setDegree] = useState(null);
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/degree/${shortcode}/`)
      .then(response => setDegree(response.data));
    axios.get(`http://127.0.0.1:8000/api/cohort/?degree=${shortcode}`)
      .then(response => setCohorts(response.data));
  }, [shortcode]);

  if (!degree) return <div>Loading...</div>;

  return (
    <div>
      <h1>{degree.full_name} ({degree.shortcode})</h1>
      <h2>Cohorts</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {cohorts.map(cohort => (
            <tr key={cohort.id}>
              <td><Link to={`/cohorts/${cohort.id}`}>{cohort.id}</Link></td>
              <td>{cohort.name}</td>
              <td>{cohort.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DegreeSingle;