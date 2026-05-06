import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get('/jobs').then(res => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Mes Offres</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>{job.title} - {job.company}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
