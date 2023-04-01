exports.CREATE_USER_TABLE = `CREATE TABLE IF NOT EXISTS tasks(
    id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
  )`;

  exports.INSERT_NEW_USER = 'INSERT INTO user (username, email, password) VALUES (?. ?. ?)';

  exports.UPDATE_USER = 'UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?';