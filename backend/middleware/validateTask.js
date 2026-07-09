const validateTask = (req, res, next) => {
    const { title, priority } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ 
            error: 'Validation failed: Title is required and cannot be empty.' 
        });
    }
    
    const allowedPriorities = ['low', 'medium', 'high'];
    if (!priority || !allowedPriorities.includes(priority)) {
        return res.status(400).json({ 
            error: `Validation failed: Priority must be one of the following: ${allowedPriorities.join(', ')}.` 
        });
    }
    
    next(); 
};

module.exports = validateTask;