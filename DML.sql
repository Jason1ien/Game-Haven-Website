-- These are some Database Manipulation queries for Game Haven using the DDL database.

-- Requirements:
-- Every table should be used in at least one SELECT query
-- You need to include one DELETE and one UPDATE function in your website
-- Note that it's not acceptable to require the user to enter IDs for foreign keys
-- In one relationship, you should be able to set the foreign key value to NULL using UPDATE, that removes the relationship
-- You should be able to DELETE a record from a M:M relationship without creating a data anomaly in the related tables

-- get statements----------------------------------------

-- get all data from Games
SELECT * FROM Games order by gameId asc;

-- get all data from Platforms
select * from Platforms order by platformId asc;

-- get all data from GamePlatforms
select * from GamePlatforms order by gamePlatformId asc;

-- get all data from Customers
select * from Customers order by customerId asc;

-- get all data from Orders
SELECT * FROM Orders order by orderId asc;

-- get all data from Genres
SELECT * FROM Genres order by genreId asc;

-- get all data from GameGenres
SELECT * FROM GameGenres order by gameGenreId asc;

-- get all data from OrderDetails
SELECT * FROM OrderDetails order by orderDetailId asc;

-- pretty print Orders Table
SELECT 
    orderId,
    C.customerFirstName,
    C.customerLastName,
    O.orderDate
FROM 
    Orders O
JOIN 
    Customers C ON O.customerId = C.customerId;

-- pretty print OrderDetails Table
SELECT 
    orderDetailId,
    C.customerFirstName,
    C.customerLastName,
    O.orderDate,
    G.gameTitle,
    OD.quantity
FROM 
    OrderDetails OD
LEFT JOIN 
    Orders O ON OD.orderId = O.orderId
LEFT JOIN 
    Customers C ON O.customerId = C.customerId
LEFT JOIN 
    Games G ON OD.gameId = G.gameId;

-- pretty print GamePlatforms Table
SELECT 
    gamePlatformId, 
    G.gameTitle,
    P.platformName
FROM 
    GamePlatforms GP
LEFT JOIN 
    Games G ON GP.gameId = G.gameId
LEFT JOIN 
    Platforms P ON GP.platformId = P.platformId;

-- pretty print GameGenres Table
SELECT 
    gameGenreId, 
    G.gameTitle,
    Ge.genreName
FROM 
    GameGenres GG
LEFT JOIN 
    Games G ON GG.gameId = G.gameId
LEFT JOIN 
    Genres Ge ON GG.genreId = Ge.genreId;

-----------------------------------------------------------

-- dropdown get statements --------------------------------

-- select orderId & customers
SELECT
    C.customerId,
    C.customerFirstName,
    C.customerLastName,
    O.orderId,
    O.orderDate
FROM
    Customers C
INNER JOIN
    Orders O ON C.customerId = O.customerId;

-- select customerId dropdown 
select * from Customers

-- select orderId dropdown 
select * from Orders

-- select gameId dropdown 
select * from Games

-- select genreId dropdown
select * from Genres

-- select platformId dropdown
select * from Platforms

-----------------------------------------------------------

-- insert statements --------------------------------------

-- add a new Game
INSERT INTO Games (gameTitle, gameDescription, gamePrice, gameQuantity) 
    VALUES (:gameTitle, :gameDescription, :gamePrice, :gameQuantity);

-- add a new Platform
INSERT INTO Platforms (platformName) 
    VALUES (:platformName);

-- add a new GamePlatform 
INSERT INTO GamePlatforms (gameId, platformId) 
    VALUES (:gameId, :platformId);

-- add a new Customer
INSERT INTO Customers (customerEmail, customerPassword, customerFirstName, customerLastName, customerAddress) 
    VALUES (:customerEmail, :customerPassword, :customerFirstName, :customerLastName, :customerAddress);

-- add a new Order
INSERT INTO Orders (customerId, orderDate) 
    VALUES (:customerId, :orderDate);

-- add a new Genre
INSERT INTO Genres (genreName) 
    VALUES (:genreName);

-- add a new GameGenre
INSERT INTO GameGenres (gameId, genreId) 
    VALUES (:gameId, :genreId);

-- add a new OrderDetail (M-to-M relationship addition)
INSERT INTO OrderDetails (orderId, gameId, quantity) 
    VALUES (:orderId_from_dropdown, :gameId_from_dropdown, :quantity);

------------------------------------------------------------

-- update orders (nullable relationship)
UPDATE Orders SET customerId = NULL WHERE orderId = :orderId;

-- update an order to exchange a game for another game (M-to-M relationship update)
UPDATE OrderDetails SET gameId = :gameId_from_dropdown, quantity = :quantity WHERE orderId = :orderId_from_dropdown;

-- dis-associate a game from an order (M-to-M relationship deletion)
DELETE FROM OrderDetails WHERE orderDetailId;