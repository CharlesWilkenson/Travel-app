## Overview
This project ams to allow users to add their travel information such as the city and the departing date so that the app will hit 3 apis:
1) Geoname API: to get the longitude and the latitude
2) Weatherbit API to get the weather info related to the city, long and lat
3) Pixabay API to get the image of the place that the user will be visiting.

This information will be stored in MySQL database so that the user can fetch and delete it later.

## Dependencies
- Node.js
- Express,
- EJS (template engine)
- Mysql2
- HTML, CSS, Webpack plugin
- jest for testing

### Database script

1) CREATE DATABASE <YOUR-DB>;
2) USE  <YOUR-DB>;
3) CREATE TABLE `trip` ( `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
`city` VARCHAR(50) NOT NULL ,
`country` VARCHAR(50) NOT NULL ,
`highTemp` DECIMAL NOT NULL ,
`lowTemp` DECIMAL NOT NULL ,
`description` VARCHAR(50) NOT NULL ,
`departing` DATE NOT NULL,
`image_url` VARCHAR(500) NOT NULL ) ENGINE = InnoDB;

## Functionality
1) The user must on the Add trip button on the page, a popup window will appear with a form containing two fields.
2) The user must provide the city and departing date. If the user choose a date in the past the app displays an error message says that "You cannot add an earlier date".
if the info is correct (city, departing) those three APIs should be call to get data from them then inserted it into the database.
3) The user can see all his travels info by 
4) the user can choose to delete any of his trip by clicking on the delete button below his trip info.


## How to run the project
Command to build and run the project
- npm install --legacy-peer-deps
- npm run build-dev
- npm run start

- http://locahost:8000/ is the url to access the app.

