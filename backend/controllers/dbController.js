require('dotenv').config();
const mysql = require('mysql2/promise');

var db = null

async function init() {
  db = await mysql.createConnection({
    host: process.env.DB_HOST ?? "localhost",
    user: "root",
    password: "password",
    port: 3306
  });
  
  console.log("Connected to MySQL Database!");

  // create database if not exist
  const dbUsed = process.env.DB_USE ?? 'meyditDev'
  await db.query(`CREATE DATABASE IF NOT EXISTS ${dbUsed}`)
    .catch((err) => {throw err})


  // use db
  await db.query(`USE ${dbUsed}`).catch((err) => {throw err})
  console.log(`${dbUsed} used`)

  // init tables
  await initTables().catch((err) => {throw err})
}

async function initTables() {
  // create user table
  var query = `CREATE TABLE IF NOT EXISTS User
  (
    id             INT     NOT NULL AUTO_INCREMENT,
    firstname      TEXT NOT NULL,
    lastname       TEXT NULL    ,
    phone          TEXT NOT NULL,
    email          TEXT NOT NULL,
    address        MEDIUMTEXT NOT NULL,
    postal         INT NOT NULL,
    state          TEXT NOT NULL,
    hashedPassword TEXT NOT NULL,
    PRIMARY KEY (id)
  )`
  await db.query(query)

  query = `CREATE TABLE IF NOT EXISTS Status
  (
    id   INT NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
  )`
  await db.query(query)

  query = `CREATE TABLE IF NOT EXISTS Clothing
  (
    id   INT  NOT NULL AUTO_INCREMENT,
    type TEXT NOT NULL,
    PRIMARY KEY (id)
  )`
  await db.query(query)

  query = `CREATE TABLE IF NOT EXISTS Jobs
  (
    id         INT    NOT NULL AUTO_INCREMENT,
    clothingId INT    NOT NULL,
    description TEXT   NOT NULL,
    budget     DOUBLE NULL    ,
    statusId   INT    NOT NULL,
    userId     INT    NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (statusId) REFERENCES Status(id) ON UPDATE CASCADE,
    FOREIGN KEY (clothingId) REFERENCES Clothing(id) ON UPDATE CASCADE,
    FOREIGN KEY (userId) REFERENCES User(id) ON UPDATE CASCADE
  )`
  await db.query(query)

  query = `CREATE TABLE IF NOT EXISTS JobImages
  (
    id     INT      NOT NULL AUTO_INCREMENT,
    jobId  INT      NOT NULL,
    imgStr LONGTEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (jobId) REFERENCES Jobs(id) ON UPDATE CASCADE
  )`
  await db.query(query)

  query = `CREATE TABLE IF NOT EXISTS Quotes
  (
    id       INT        NOT NULL AUTO_INCREMENT,
    price    DOUBLE     NOT NULL DEFAULT 0,
    comments MEDIUMTEXT NULL    ,
    jobId    INT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (jobId) REFERENCES Jobs(id) ON UPDATE CASCADE
  )`
  await db.query(query)
}

async function getUser(email) {
  const query = `SELECT * FROM User WHERE email="${email}"`

  const res = await db.execute(query)

  return res[0][0]
}

async function registerUser(user) {
  const query = `INSERT INTO User (
    firstname, lastname, 
    phone, email, 
    address, postal, 
    state, hashedPassword
  ) VALUES (
    "${user.firstname}", "${user.lastname}",
    "${user.phone}", "${user.email}", 
    "${user.address}", "${user.postal}", 
    "${user.state}", "${user.hashedPassword}"
  )`

  return await db.query(query)
}

module.exports = {
  init,
  getUser,
  registerUser
}