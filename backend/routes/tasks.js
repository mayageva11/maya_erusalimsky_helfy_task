const express = require('express');
const router = express.Router();
const validateTask = require('../middleware/validateTask');

if (typeof validateTask !== 'function') {
    console.error('🚨 CRITICAL ERROR: validateTask middleware was not imported correctly! Check your file path.');
}

let tasks = [];

router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

router.post('/', validateTask, (req, res) => { 
    const { title, description, priority } = req.body;

    const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description || '',
        completed: false,
        createdAt: new Date(),
        priority
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});


router.put('/:id', validateTask, (req, res) => { 
    const taskId = parseInt(req.params.id);
    const { title, description, priority, completed } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title.trim(),
        description: description !== undefined ? description : tasks[taskIndex].description,
        priority,
        completed: completed !== undefined ? completed : tasks[taskIndex].completed
    };

    res.status(200).json(tasks[taskIndex]);
});

router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send(); // 204 No Content
});

router.patch('/:id/toggle', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = !task.completed;
    res.status(200).json(task);
});

module.exports = router;