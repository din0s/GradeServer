const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const app = express();

const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const listRoutes = require('./routes/list');
const authRoutes = require('./routes/auth');

// Database
mongoose
  .connect('mongodb://127.0.0.1:27017/grade_plus_plus', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to database...'))
  .catch(err => console.error(err));

mongoose.set('useCreateIndex', true);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// Routes

app.use('/user', userRoutes);
app.use('/course', courseRoutes);
app.use('/list', listRoutes);
app.use('/auth', authRoutes);

/* Can't find the requested resourse */
app.use((req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
});

/* Any other error */
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Start server
app.listen(3000, () => console.log('Server has started on port 3000...'));
