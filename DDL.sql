-- disable commits and foreign key checks
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Table 1
CREATE OR REPLACE TABLE Games (
    gameId int(11) NOT NULL AUTO_INCREMENT,
    gameTitle varchar(255) NOT NULL,
    gameDescription varchar(255) NOT NULL,
    gamePrice decimal(10,2) NOT NULL,
    gameQuantity int(11) NOT NULL,
    PRIMARY KEY (gameId),
    CONSTRAINT UNIQUE gameId (gameId)
);

-- Table 2
CREATE OR REPLACE TABLE Platforms (
    platformId int(11) NOT NULL AUTO_INCREMENT,
    platformName varchar(255) NOT NULL,
    PRIMARY KEY (platformId),
    CONSTRAINT UNIQUE platformId (platformId)
);

-- Table 3
CREATE OR REPLACE TABLE GamePlatforms (
    gamePlatformId int(11) NOT NULL AUTO_INCREMENT,
    gameId int(11) NOT NULL,
    platformId int(11) NOT NULL,
    PRIMARY KEY (gamePlatformId),
    FOREIGN KEY (gameId) REFERENCES Games (gameId) ON DELETE CASCADE,
    FOREIGN KEY (platformId) REFERENCES Platforms (platformId) ON DELETE CASCADE,
    CONSTRAINT UNIQUE gamePlatformId (gamePlatformId)
);

-- Table 4
CREATE OR REPLACE TABLE Customers (
    customerId int(11) NOT NULL AUTO_INCREMENT,
    customerEmail varchar(255) DEFAULT NULL,
    customerPassword varchar(255) DEFAULT NULL,
    customerFirstName varchar(255) NOT NULL,
    customerLastName varchar(255) NOT NULL,
    customerAddress varchar(255) NOT NULL,
    PRIMARY KEY (customerId),
    CONSTRAINT UNIQUE customerId (customerId)
);

-- Table 5
CREATE OR REPLACE TABLE Orders (
    orderId INT(11) NOT NULL AUTO_INCREMENT,
    customerId INT(11) DEFAULT NULL, -- nulllable FK relationship
    orderDate DATETIME NOT NULL,
    PRIMARY KEY (orderId),
    FOREIGN KEY (customerId) REFERENCES Customers (customerId) ON DELETE CASCADE,
    CONSTRAINT UNIQUE orderId (orderId)
);

-- Table 6
CREATE OR REPLACE TABLE Genres (
    genreId INT(11) NOT NULL AUTO_INCREMENT,
    genreName VARCHAR(255) NOT NULL,
    PRIMARY KEY (genreId),
    CONSTRAINT UNIQUE genreId (genreId)
);

-- Table 7
CREATE OR REPLACE TABLE GameGenres (
    gameGenreId INT(11) NOT NULL AUTO_INCREMENT,
    gameId INT(11) NOT NULL,
    genreId INT(11) NOT NULL,
    PRIMARY KEY (gameGenreId),
    FOREIGN KEY (gameId) REFERENCES Games (gameId) ON DELETE CASCADE,
    FOREIGN KEY (genreId) REFERENCES Genres (genreId) ON DELETE CASCADE,
    CONSTRAINT UNIQUE gameGenreId (gameGenreId)
);

-- Table 8
CREATE OR REPLACE TABLE OrderDetails (
    orderDetailId INT(11) NOT NULL AUTO_INCREMENT,
    orderId INT(11) NOT NULL,
    gameId INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    PRIMARY KEY (orderDetailId),
    FOREIGN KEY (orderId) REFERENCES Orders (orderId) ON DELETE CASCADE,
    FOREIGN KEY (gameId) REFERENCES Games (gameId) ON DELETE CASCADE,
    CONSTRAINT UNIQUE orderDetailId (orderDetailId)
);


-- example data
-- Sample data for Games table
INSERT INTO Games (gameTitle, gameDescription, gamePrice, gameQuantity) 
    VALUES ('Cars 3', 'Cars from disney', 60, 12), 
    ('Palworld', 'Pokemon with pals', 40, 100), 
    ('Minecraft', '3d block survival adventure', 30, 250);

-- Sample data for Platforms table
INSERT INTO Platforms (platformName) 
    VALUES ('Xbox'), 
    ('Playstation'), 
    ('PC');

-- Sample data for GamePlatforms table
INSERT INTO GamePlatforms (gameId, platformId) 
    VALUES (1, 1), 
    (2, 2), 
    (3, 3);

-- Sample data for Customers table
INSERT INTO Customers (customerEmail, customerPassword, customerFirstName, customerLastName, customerAddress) 
    VALUES ('bob@gmail.com', 'password@', 'bob', 'schafer', '1234 address street, city, state, zip'), 
    ('alex@gmail.com', 'strongpassword', 'alex', 'tran', '4321 house street, chicago, illinois, 11111'), 
    ('kevin@gmail.com', 'extrastrong', 'kevin', 'bui', '1111 street street, portland, oregon, 97220');

-- Sample data for Orders table
INSERT INTO Orders (customerId, orderDate)
    VALUES (1, '2024-02-01 08:00:00'),
    (2, '2024-02-02 10:30:00'),
    (3, '2024-02-03 15:45:00');

-- Sample data for Genres table
INSERT INTO Genres (genreName)
    VALUES ('Action'),
    ('Adventure'),
    ('Strategy');

-- Sample data for GameGenres table
INSERT INTO GameGenres (gameId, genreId)
    VALUES (1, 1), 
    (2, 2), 
    (3, 3); 

-- Sample data for OrderDetails table
INSERT INTO OrderDetails (orderId, gameId, quantity)
    VALUES (1, 1, 2), 
    (2, 3, 1), 
    (3, 2, 3); 

-- print tables
select * from Games;
select * from Platforms;
select * from GamePlatforms;
select * from Customers;
SELECT * FROM Orders;
SELECT * FROM Genres;
SELECT * FROM GameGenres;
SELECT * FROM OrderDetails;

-- re-enable foreign key checks and commit
SET FOREIGN_KEY_CHECKS=1;
COMMIT;