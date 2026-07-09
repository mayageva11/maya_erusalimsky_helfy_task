const API_BASE_URL = 'http://localhost:4000/api/tasks';

export const apiService = {
  async getAllTasks() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },


  async createTask(taskData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  
  async updateTask(id, taskData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

 
  async deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return true;
  },


  async toggleTaskStatus(id) {
    const response = await fetch(`${API_BASE_URL}/${id}/toggle`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to toggle task');
    return response.json();
  }
};