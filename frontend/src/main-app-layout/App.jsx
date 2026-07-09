import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //loading task from the server when the app is up
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await apiService.getAllTasks();
        setTasks(data);
      } catch (err) {
        console.error('Error loading tasks:', err);
        setError('Could not connect to the backend server.');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🌱 Helfy Task Manager</h1>
      
      {loading && <p>Loading tasks from server...</p>}
      
      {error && <p style={{ color: '#ef4444', fontWeight: 'bold' }}>{error}</p>}
      
      {!loading && !error && (
        <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <p style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Successfully connected to Backend (Port 4000)!</p>
          <p>Current tasks in memory: <strong>{tasks.length}</strong></p>
        </div>
      )}

      
    </div>
  );
}

export default App;