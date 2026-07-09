import { useState } from 'react';
import TaskCard from './TaskCard';

function TaskCarousel({ tasks, onToggleStatus, onDelete }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (tasks.length === 0) return <p>No tasks yet!</p>;

  //navigation 
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % tasks.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + tasks.length) % tasks.length);

  return (
    <div style={carouselStyle}>
      <button onClick={handlePrev} style={arrowStyle}>◀</button>
      
      <div style={displayStyle}>
        <TaskCard 
          task={tasks[currentIndex]} 
          onToggleStatus={onToggleStatus} 
          onDelete={onDelete} 
        />
      </div>
      
      <button onClick={handleNext} style={arrowStyle}>▶</button>
    </div>
  );
}

const carouselStyle = { display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', marginTop: '20px' };
const displayStyle = { minWidth: '250px' };
const arrowStyle = { background: '#2563eb', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '50%', cursor: 'pointer' };

export default TaskCarousel;