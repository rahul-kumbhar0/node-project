# User Task Queue with Rate Limiting

## 📜 Overview
This project is a user task queuing system with rate limiting, built with **Node.js**, **Express**, **Redis**, and **Bull**. It allows users to submit tasks, while automatically enforcing a submission limit per user. When the limit is exceeded, tasks are queued for later processing to prevent any requests from being dropped.

## ✨ Features
- **Rate Limiting**: Controls the number of tasks each user can submit per minute.
- **Task Queueing**: Queues tasks that exceed the rate limit, processing them with a delay.
- **Redis & Bull**: Uses Redis for fast data access and Bull for task queuing.
- **Logging**: Keeps logs for all tasks, helping you track queued and processed tasks.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** and **Redis** installed on your system.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pruthvi070/NodeTask.git
   cd NodeTask
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add the following settings:
   ```plaintext
   REDIS_HOST=localhost
   REDIS_PORT=6379
   PORT=3000
   RATE_LIMIT_POINTS=20         # Max tasks per minute per user
   RATE_LIMIT_DURATION=60       # Rate limit duration (seconds)
   TASK_DELAY_MS=1000           # Delay for tasks exceeding rate limit (ms)
   ```

4. **Start the Redis server**
   ```bash
   redis-server
   ```

---

## 🏃 Running the Application

1. **Start the Node server**
   ```bash
   npm start
   ```
   The server should now be running at `http://localhost:3000`.

2. **Submit a task request**
   Use **Postman**, **curl**, or a similar tool to send a POST request:

   - **URL**: `http://localhost:3000/task`
   - **JSON Body**:
     ```json
     {
       "user_id": "unique_user_id"
     }
     ```
     
---

## 🔍 Testing

1. **Submit multiple tasks** for the same `user_id` using Postman or curl.
2. Observe server responses:
   - **200 OK** if the task is within the rate limit.
   - **429 Too Many Requests** if the task exceeds the rate limit and is queued.
3. Check `logs/task_logs.txt` for task entries to verify queued and processed tasks.

---

## ⚙️ Configuration & Customization
You can adjust rate limiting and delay parameters in the `.env` file:

- **`RATE_LIMIT_POINTS`**: Max number of tasks a user can submit per minute.
- **`RATE_LIMIT_DURATION`**: Time window for rate limiting (in seconds).
- **`TASK_DELAY_MS`**: Delay time for queued tasks (in milliseconds).

---
