import { useState } from 'react';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      // sending prop to the backend
      await onTaskCreated({ title, description, priority });
      
      // reset form after success
      setTitle('');
      setDescription('');
      setPriority('medium');
    } catch (err) {
      console.error('Failed to create task', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3>➕ New Task</h3>
      <input 
        type="text" 
        placeholder="Task title..." 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={inputStyle}
      />
      <textarea 
        placeholder="Description..." 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={inputStyle}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} style={inputStyle}>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button type="submit" disabled={isSubmitting} style={buttonStyle}>
        {isSubmitting ? 'Saving...' : 'Add Task'}
      </button>
    </form>
  );
}

const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', background: '#fff', borderRadius: '8px', border: '1px solid #ddd' };
const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const buttonStyle = { padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default TaskForm;