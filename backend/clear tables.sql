SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;')
FROM information_schema.tables
WHERE table_schema = 'meyditDev';

DROP DATABASE meyditDev;

use meyditDev;

DROP TABLE IF EXISTS `Clothing`;
DROP TABLE IF EXISTS `JobImages`;
DROP TABLE IF EXISTS `Jobs`;
DROP TABLE IF EXISTS `Quotes`;
DROP TABLE IF EXISTS `Status`;
DROP TABLE IF EXISTS `User`;

DESCRIBE JobImages;