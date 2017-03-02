/* Blow out the database if it exists and create a user. */
DROP DATABASE IF EXISTS my_lacroix_rankings_app;
CREATE USER lacroixUser;
CREATE DATABASE my_lacroix_rankings_app;
GRANT ALL PRIVILEGES ON DATABASE my_lacroix_rankings_app TO lacroixUser;
