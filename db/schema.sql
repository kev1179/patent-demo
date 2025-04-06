CREATE TABLE IF NOT EXISTS `users` (
    `userid` BIGINT NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `date_created` BIGINT NOT NULL,
    `hashed_password` BLOB NOT NULL,
    `salt` BLOB NOT NULL,
    PRIMARY KEY (`userid`)
);

CREATE TABLE IF NOT EXISTS `user_types` (
    `type_id` BIGINT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`type_id`),
    UNIQUE (`name`)
);

CREATE TABLE IF NOT EXISTS `user_info` (
    `userid` BIGINT NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `type_id` BIGINT NOT NULL,
    PRIMARY KEY (`userid`),
    FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
    FOREIGN KEY (`type_id`) REFERENCES `user_types` (`type_id`)
);

CREATE TABLE IF NOT EXISTS `searches` (
    `userid` BIGINT NOT NULL,
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

CREATE TABLE IF NOT EXISTS `user_preferences` (
    `userid` BIGINT NOT NULL,
    `darkmode` TINYINT NOT NULL,
    PRIMARY KEY (`userid`),
    FOREIGN KEY (`userid`) REFERENCES `users` (`userid`)
);

INSERT INTO user_types (name)
VALUES 
    ('admin'),
    ('regular'),
    ('unpaid'),
    ('free_trial');