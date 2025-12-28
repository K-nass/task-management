const { Task } = require('../models');

const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Please provide a title' });
        }

        const task = await Task.create({
            title,
            description,
            status: status || 'pending',
            userId: req.user.id
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { userId: req.user.id },
            order: [['created_at', 'DESC']]
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedTask = await task.update(req.body);

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await task.destroy();

        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};

