ALTER TABLE users
DROP COLUMN hashed_password,
DROP COLUMN salt;

ALTER TABLE searches DROP FOREIGN KEY searches_ibfk_1;
ALTER TABLE searches
MODIFY COLUMN userid VARCHAR(255) NOT NULL;

DROP TABLE user_preferences;
DROP TABLE user_info;

ALTER TABLE users
MODIFY COLUMN userid VARCHAR(255) NOT NULL;

ALTER TABLE searches ADD FOREIGN KEY (userid) REFERENCES users(userid);

ALTER TABLE users
DROP COLUMN date_created,
DROP COLUMN username;