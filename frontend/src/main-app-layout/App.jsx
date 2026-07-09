import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import TaskForm from '../components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleCreateTask = async (taskData) => {
    try {
      // שליחה לשרת
      const newTask = await apiService.createTask(taskData);
      
      // עדכון הסטייט המקומי כדי שהרשימה תתעדכן מיד (בלי לרענן דף)
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      console.error('Failed to add task', err);
      alert('Could not add task. Check the server!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>
      <TaskForm onTaskCreated={handleCreateTask} />

      {/* כאן בהמשך תהייה הקרוסלה */}
      <div style={{ marginTop: '20px' }}>
        <h3>My Tasks ({tasks.length})</h3>
        {/* זמנית נציג פשוט רשימה כדי לראות שזה עובד */}
        <ul>
          {tasks.map(t => <li key={t.id}>{t.title}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;