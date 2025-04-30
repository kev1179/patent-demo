CREATE TABLE IF NOT EXISTS `users` (
    `userid` VARCHAR(255) NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `date_created` BIGINT NOT NULL,
    -- `hashed_password` BLOB NOT NULL,
    -- `salt` BLOB NOT NULL,
    PRIMARY KEY (`userid`)
);

CREATE TABLE IF NOT EXISTS `user_types` (
    `type_id` BIGINT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`type_id`),
    UNIQUE (`name`)
);

CREATE TABLE IF NOT EXISTS `searches` (
    `userid` VARCHAR(255) NOT NULL,
    `timestamp` BIGINT NOT NULL,
    `response` TEXT NULL,
    `patentid` VARCHAR(45) NULL DEFAULT NULL,
    PRIMARY KEY (`userid`, `timestamp`),
    FOREIGN KEY (`userid`) REFERENCES `users` (`userid`)
);

CREATE TABLE IF NOT EXISTS `demo_waitlist` (
    `email` VARCHAR(320) NOT NULL,
    PRIMARY KEY (`email`)
);

INSERT INTO user_types (name)
VALUES 
    ('admin'),
    ('regular'),
    ('unpaid'),
    ('free_trial');