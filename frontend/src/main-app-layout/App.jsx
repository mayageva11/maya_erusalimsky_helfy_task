import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskCarousel from '../components/TaskCarousel';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

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

  const filteredTasks = tasks
  .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'priority') {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

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
             <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
            <input 
              placeholder="Search tasks..." 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ padding: '8px', borderRadius: '4px' }}
            />
            <select onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px' }}>
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
            <TaskCarousel 
              tasks={filteredTasks} 
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