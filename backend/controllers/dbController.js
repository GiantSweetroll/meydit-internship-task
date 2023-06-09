require('dotenv').config();
const mysql = require('mysql2/promise');

var db = null

async function init() {
  const dbHost = process.env.DB_HOST ?? "localhost"
  const dbUsed = process.env.DB_USE ?? 'meyditDev'
  db = mysql.createPool({
    host: process.env.DB_HOST ?? "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: dbUsed
    // socketPath: `/cloudsql/white-notch-384000:australia-southeast1:meydit-assignment-sql`
  });
  
  console.log("Connected to MySQL Database!");

  // create database if not exist
  await db.query(`CREATE DATABASE IF NOT EXISTS ${dbUsed}`)
    .catch((err) => {throw err})


  // use db
  await db.query(`USE ${dbUsed}`).catch((err) => {throw err})
  console.log(`${dbUsed} used`)

  // init tables
  await initTables().catch((err) => {throw err})

  // init default data
  await initData().catch((err) => {throw err}) 
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
    descr TEXT   NOT NULL,
    budget     DOUBLE NULL    ,
    statusId   INT    NOT NULL,
    userId     INT    NOT NULL,
    datePosted TEXT NOT NULL,
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
    imgStr TEXT NOT NULL,
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
    makerId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (jobId) REFERENCES Jobs(id) ON UPDATE CASCADE,
    FOREIGN KEY (makerId) REFERENCES User(id) ON UPDATE CASCADE
  )`
  await db.query(query)
}

async function initData() {
  // Insert clothings
  var query = `INSERT INTO Clothing (id, type) VALUES 
  (1, "Dress"),
  (2, "Ethnic Wear - Sari"),
  (3, "Blouse"),
  (4, "Tuxedo"),
  (5, "Ethnic Wear - Kebaya"),
  (6, "Wedding Dress"),
  (7, "Suit")
  ON DUPLICATE KEY UPDATE id=id`
  await db.query(query)

  query = `INSERT INTO Status (id, name) VALUES 
  (1, "Open"),
  (2, "Closed"),
  (3, "Completed") 
  ON DUPLICATE KEY UPDATE id=id`
  await db.query(query)
}

async function getUser(user) {
  const query = `SELECT * FROM User WHERE
	  firstname="${user.firstname}" AND
    lastname="${user.lastname}" AND
    phone="${user.phone}" AND
    email="${user.email}" AND
    address="${user.address}" AND
    postal="${user.postal}" AND
    state="${user.state}"`

    const res = await db.execute(query)

    return res[0][0]
}

async function getUserByEmail(email) {
  const query = `SELECT * FROM User WHERE email="${email}"`

  const res = await db.execute(query)

  return res[0][0]
}

async function getUserById(id) {
  const query = `SELECT * FROM User WHERE id="${id}"`

  const res = await db.execute(query)

  return res[0][0]
}

async function registerUser(user) {
  if (user.lastname === undefined) {
    user.lastname = null
  }
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

async function postJob(job) {

  // if budget is undefined, make it null
  if (job.budget === undefined) {
    job.budget = null
  }

  // insert to job to job table
  var query = `INSERT INTO Jobs (
    clothingId, descr, 
    budget, 
    statusId,
    userId,
    datePosted
  ) VALUES (
    ${job.clothingId}, "${job.description}",
    ${job.budget === ''? null : job.budget}, 
    ${job.statusId}, 
    ${job.userId},
    "${job.datePosted}"
  )`
  await db.query(query)

  // insert images to JobImages table if there are
  if (job.images === undefined || job.images === null || job.images.length == 0) return

  // get the inserted job to get its id
  query = `SELECT * FROM Jobs WHERE
  clothingId=${job.clothingId} AND
  descr="${job.description}" AND
  ${job.budget === null || job.budget === ''? "budget IS NULL" : `budget=${job.budget}`} AND
  statusId=${job.statusId} AND
  userId=${job.userId} AND
  datePosted="${job.datePosted}"`
  const queryResult = await db.query(query)
  const newJob = queryResult[0][0]

  // create batch insert query
  query = `INSERT INTO JobImages (
    jobId, imgStr
  ) VALUES `

  for (var i=0; i < job.images.length; i++) {
    query += `(${newJob.id}, "${job.images[i]}"),`
  }

  await db.query(query.substring(0, query.length-1))
}

async function getAllJobs() {
  // get all jobs
  var query = `SELECT 
  j.id, j.clothingId, 
  j.descr, j.budget, 
  j.statusId, j.userId,
  j.datePosted,
  COUNT(q.id) as quotesNum 
  FROM Jobs j
  LEFT JOIN Quotes q
  ON j.id = q.jobId
  GROUP BY j.id, j.clothingId, 
  j.descr, j.budget, 
  j.statusId, j.userId, j.datePosted ORDER BY j.datePosted DESC`
  var queryRes = await db.query(query)
  return queryRes[0]
}

async function getAllClothingTypes() {
  const query = `SELECT * FROM Clothing ORDER BY type`
  const queryRes = await db.query(query)
  return queryRes[0]
}

async function getAllStatus() {
  const query = `SELECT * FROM Status`
  const queryRes = await db.query(query)
  return queryRes[0]
}

async function createQuotes(
  makerId, 
  jobId, 
  price, 
  comments
) {
  const query = `INSERT INTO Quotes (
    makerId, jobId,
    price, comments
  ) VALUES (
    ${makerId}, ${jobId},
    ${price}, "${comments}"
  )`

  return await db.query(query)
}

async function getJobImages(jobId) {
  const query = `SELECT * FROM JobImages WHERE jobId=${jobId}`

  const queryRes = await db.query(query)
  return queryRes[0]
}

async function getJobDetail(jobId) {
  const query = `SELECT * FROM Jobs WHERE id=${jobId}`

  const queryRes = await db.query(query)
  return queryRes[0][0]
}

module.exports = {
  init,
  getUserByEmail,
  getUser,
  registerUser,
  postJob,
  getAllJobs,
  createQuotes,
  getAllClothingTypes,
  getUserById,
  getAllStatus,
  getJobImages,
  getJobDetail
}