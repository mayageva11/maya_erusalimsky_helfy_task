import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskCarousel from '../components/TaskCarousel';
import './App.css';

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
    
      const newTask = await apiService.createTask(taskData);
    
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
    <div style={{ padding: '20px' }} className="main-container">
      <h1>Task Manager</h1>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading tasks...</div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <>
          <TaskForm onTaskCreated={handleCreateTask} />
          <div style={{ marginTop: '20px' }}>
            <h3>My Tasks ({tasks.length})</h3>
            <TaskCarousel 
              tasks={tasks} 
              onToggleStatus={handleToggle} 
              onDelete={handleDelete} 
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;