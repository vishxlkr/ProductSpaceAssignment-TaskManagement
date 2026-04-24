const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const requireAuth = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');

router.use(requireAuth); // Protect all task routes

router.get('/', getTasks);

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required')
  ],
  validateRequest,
  createTask
);

router.put(
  '/:id',
  [
    body('status').optional().isIn(['pending', 'completed']).withMessage('Status must be pending or completed')
  ],
  validateRequest,
  updateTask
);

router.delete('/:id', deleteTask);

module.exports = router;
