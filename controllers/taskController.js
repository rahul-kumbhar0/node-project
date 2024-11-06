const taskQueue = require('../queues/taskQueue');
const rateLimiter = require('../utils/rateLimiter');

exports.handleTaskRequest = async (req, res) => {
    const { user_id: userId } = req.body;

    try {
        await rateLimiter.consume(userId);
        
        taskQueue.addToQueue(userId);
        res.status(200).json({ message: 'Task added to queue.' });
        
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        taskQueue.addToQueue(userId, Number(process.env.TASK_DELAY_MS));
        res.status(429).json({ message: 'Rate limit exceeded. Task queued with delay.' });
    }
};
