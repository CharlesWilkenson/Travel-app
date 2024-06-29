CREATE DATABASE <YOUR-DB>;

CREATE TABLE `trip` ( `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
                      `city` VARCHAR(50) NOT NULL ,
                      `country` VARCHAR(50) NOT NULL ,
                      `highTemp` DECIMAL NOT NULL ,
                      `lowTemp` DECIMAL NOT NULL ,
                      `description` VARCHAR(50) NOT NULL ,
                      `departing` DATE NOT NULL,
                      `image_url` VARCHAR(500) NOT NULL ) ENGINE = InnoDB;
