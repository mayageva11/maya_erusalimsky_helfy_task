function TaskCard({ task, onToggleStatus, onDelete }) {
    return (
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={badgeStyle}>{task.priority}</span>
          <span style={dateStyle}>{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
  
        <h4 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </h4>
        <p style={descStyle}>{task.description}</p>
  
        <div style={actionsStyle}>
          <button 
            onClick={() => onToggleStatus(task.id)} 
            style={{ ...btnStyle, background: task.completed ? '#9ca3af' : '#10b981' }}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button 
            onClick={() => onDelete(task.id)} 
            style={{ ...btnStyle, background: '#ef4444' }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  const cardStyle = { background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '16px', width: '250px', display: 'flex', flexDirection: 'column', gap: '8px' };
  const badgeStyle = { fontSize: '10px', background: '#e5e7eb', padding: '2px 6px', borderRadius: '10px' };
  const dateStyle = { fontSize: '10px', color: '#888' };
  const descStyle = { fontSize: '14px', color: '#555', margin: '0' };
  const actionsStyle = { display: 'flex', gap: '5px', marginTop: '10px' };
  const btnStyle = { border: 'none', color: '#fff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', flex: 1 };
  
  export default TaskCard;