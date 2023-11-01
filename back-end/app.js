const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./routes/users.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Server is running..");
});
app.use('/users', userRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
