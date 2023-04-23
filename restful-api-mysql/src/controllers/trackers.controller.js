const escape = require('mysql').escape;
const connection = require('../db-config');
const {
  ALL_TRACKERS,
  SINGLE_TRACKER,
  INSERT_TRACKER,
  UPDATE_TRACKER,
  DELETE_TRACKER,
} = require('../queries/trackers.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

exports.getAllTrackers = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

   // query all tasks
   const tracker = await query(con, ALL_TRACKERS(req.user.id), []).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!tracker.length) {
    res.status(200).json({ msg: 'No workouts available for this user.' });
  }
  res.json(tracker);

}

exports.getTracker = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all task
  const tracker = await query(
    con,
    SINGLE_TRACKER(req.user.id, req.params.trackerId)
  ).catch(serverError(res));

  if (!tracker.length) {
    res.status(400).json({ msg: 'No workouts available for this user.' });
  }
  res.json(tracker);
};

exports.createTracker = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add task
    const workoutName = escape(req.body.workout);
    const result = await query(con, INSERT_TRACKER(user.id, workoutName)).catch(
      serverError(res)
    );

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add task: ${req.body.workout}` });
    }
    res.json({ msg: 'Added task successfully!' });
  }
};

const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [task_name, status].map()
    (key) => `${key} = ${escape(body[key])}` // 'New 1 task name'
  );

  values.push(`created_date = NOW()`); // update current date and time
  values.join(', '); // make into a string
  return values;
};

exports.updateTracker = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesString(req);

  // query update task
  const result = await query(
    con,
    UPDATE_TRACKER(req.user.id, req.params.trackerId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update : '${req.body.workout}'` });
  }
  res.json(result);
};

exports.deleteTracker = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete task
  const result = await query(
    con,
    DELETE_TRACKER(req.user.id, req.params.trackerId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete task at: ${req.params.trackerId}` });
  }
  res.json({ msg: 'Deleted successfully.' });
};