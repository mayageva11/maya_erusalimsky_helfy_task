const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks'); 

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running smoothly' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server!' });
});

app.listen(PORT, () => {
    console.log(`Server is on http://localhost:${PORT}`);
});