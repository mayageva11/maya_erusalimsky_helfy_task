import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

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

  const handleDelete = async (id) => {
    try {
      await apiService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };
  
  const handleToggle = async (id) => {
    try {
      const updatedTask = await apiService.toggleTaskStatus(id);
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      console.error('Failed to toggle task', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>
      <TaskForm onTaskCreated={handleCreateTask} />

      {/* כאן בהמשך תהייה הקרוסלה */}
      <div style={{ marginTop: '20px' }}>
        <h3>My Tasks ({tasks.length})</h3>
      
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
        {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onToggleStatus={handleToggle} 
              onDelete={handleDelete}      
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;