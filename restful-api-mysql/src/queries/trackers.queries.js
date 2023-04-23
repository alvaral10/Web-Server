exports.CREATE_TRACKER_TABLE = `CREATE TABLE IF NOT EXISTS tracker(
  tracker_id int NOT NULL AUTO_INCREMENT,
  user_id varchar(50) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  workout varchar(255) NOT NULL,
  PRIMARY KEY (tracker_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
)`;

exports.ALL_TRACKERS = (userId)=>`SELECT * FROM tracker WHERE user_id = ${userId}`;

exports.SINGLE_TRACKER = (userId, trackerId)=>`SELECT * FROM tracker WHERE user_id = ${userId} AND tracker_id = ${trackerId}`;

exports.INSERT_TRACKER = (userId, workoutName)=>`INSERT INTO tracker (user_id, workout) VALUES (${userId}, ${workoutName})`;

exports.UPDATE_TRACKER = (userId, trackerId, newValues)=>`UPDATE tracker SET ${newValues} WHERE user_id = ${userId} AND tracker_id = ${trackerId}`;

exports.DELETE_TRACKER = (userId, trackerId)=>`DELETE FROM tracker WHERE user_id = ${userId} AND tracker_id =${trackerId}`;
