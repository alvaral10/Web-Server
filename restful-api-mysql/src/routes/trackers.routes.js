const express = require('express');
const {
  getAllTrackers,
  createTracker,
  getTracker,
  updateTracker,
  deleteTracker,
} = require('../controllers/trackers.controller');
const canAccess = require('../middleware/auth.middleware');

const trackerRoutes = express.Router();
/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/tasks/`.
 */
trackerRoutes.get('/', canAccess, getAllTrackers).post('/', canAccess, createTracker);

/**
 * Routes for a task by id. Evalutes to `/tasks/:taskId`.
 */
trackerRoutes
  .get('/:trackerId', canAccess, getTracker) // GET http://locahost:3000/tracker
  .put('/:trackerId', canAccess, updateTracker)
  .delete('/:trackerId', canAccess, deleteTracker);

module.exports = trackerRoutes;







