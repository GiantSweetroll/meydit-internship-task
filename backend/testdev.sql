USE meyditDev;

SHOW TABLES;

SELECT * FROM User;
DROP TABLE User;
DESCRIBE User;

DESCRIBE Jobs;
DROP TABLE JobImages;
DROP TABLE Jobs;
DROP TABLE Quotes;
SELECT * FROM Jobs;
SELECT * FROM JobImages;
SELECT 
  j.id, j.clothingId, 
  j.descr, j.budget, 
  j.statusId, j.userId,
  i.id as jobImageId,
  i.imgStr
  FROM Jobs j
  LEFT JOIN JobImages i
  ON j.id = i.jobId
  GROUP BY j.id, j.clothingId, 
  j.descr, j.budget, 
  j.statusId, j.userId,
  i.id,
  i.imgStr;
SELECT 
  j.id, j.clothingId, 
  j.descr, j.budget, 
  j.statusId, j.userId,
  i.id as jobImageId,
  i.imgStr, COUNT(q.id) as quotesNum 
  FROM Jobs j
  LEFT JOIN JobImages i
  ON j.id = i.jobId
  LEFT JOIN Quotes q
  ON j.id = q.jobId
  GROUP BY j.id, j.clothingId, 
  j.descr, j.budget, 
  j.statusId, j.userId,
  jobImageId,
  i.imgStr;
  
SELECT * FROM Status;

SELECT 
  j.id, j.clothingId, 
  j.descr, j.budget, 
  j.statusId, j.userId,
  COUNT(q.id) as quotesNum 
  FROM Jobs j
  LEFT JOIN Quotes q
  ON j.id = q.jobId
  GROUP BY j.id, j.clothingId, 
  j.descr, j.budget, 
  j.statusId, j.userId;
  
SELECT * FROM JobImages;
SELECT * FROM JobImages;