// Express
var db = require('./db-connector')
var express = require('express');
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');
app.use(express.static("static"));

PORT = 8719;

/*
    ROUTES
*/

// retrieve home page
app.get('/', function (req, res) {
    res.render('index');
});

// retrieve home page
app.get('/index', function (req, res) {
    res.render('index');
});

// retrieve Customers page with table
app.get('/customers', function (req, res) {
    // print Customers table
    var query1 = 'select * from Customers order by customerId asc;'

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        res.render('customers', { data: results });
    });
});

// retrieve Orders page with table
app.get('/orders', function (req, res) {
    // pretty print Orders Table without FK
    var query1 = 'SELECT \
orderId, \
C.customerFirstName, \
C.customerLastName, \
O.orderDate \
FROM \
Orders O \
JOIN \
Customers C ON O.customerId = C.customerId;'

    // dropdown menu
    var query2 = 'select * from Customers'

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        db.pool.query(query2, (error, rows, fields) => {
            let customers = rows;
            return res.render('orders', {data: results, customers: customers});
        })
    });
});

// retrieve OrderDetails page with table
app.get('/orderdetails', function (req, res) {
    // pretty print OrderDetails Table without FK
    var query1 = 'SELECT \
orderDetailId, \
C.customerFirstName, \
C.customerLastName, \
O.orderDate, \
G.gameTitle, \
OD.quantity \
FROM \
OrderDetails OD \
LEFT JOIN \
Orders O ON OD.orderId = O.orderId \
LEFT JOIN \
Customers C ON O.customerId = C.customerId \
LEFT JOIN \
Games G ON OD.gameId = G.gameId;'

    // pretty print dropdown menu for orderId fk
    var query2 = 'SELECT \
C.customerId, \
C.customerFirstName, \
C.customerLastName, \
O.orderId, \
O.orderDate \
FROM \
Customers C \
INNER JOIN \
Orders O ON C.customerId = O.customerId;'

    // dropdown menu for gameId fk
    var query3 = 'select * from Games'

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        db.pool.query(query2, (error, rows, fields) => {
            
            let orders = rows;
            db.pool.query(query3, (error, rows, fields) => {
                
                let games = rows;
                return res.render('orderdetails', {data: results, orders: orders, games: games});
            })
        })
    });
});

// retrieve Games page with table
app.get('/games', function (req, res) {
    // print Games table
    var query1 = 'SELECT * FROM Games order by gameId asc;'

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        res.render('games', { data: results });
    });
});

// retrieve Platforms page with table
app.get('/platforms', function (req, res) {
    // print Platforms table
    var query1 = 'select * from Platforms order by platformId asc;'

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        res.render('platforms', { data: results });
    });
});

// retrieve Genres page with table
app.get('/genres', function (req, res) {
    // print Genres table
    var query1 = 'SELECT * FROM Genres order by genreId asc;'

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        res.render('genres', { data: results });
    });
});

// retrieve GamePlatforms page with table
app.get('/gameplatforms', function (req, res) {
    // pretty print GamePlatforms table w/o FK
    var query1 = 'SELECT \
gamePlatformId, \
G.gameTitle, \
P.platformName \
FROM \
GamePlatforms GP \
LEFT JOIN \
Games G ON GP.gameId = G.gameId \
LEFT JOIN \
Platforms P ON GP.platformId = P.platformId;'

    // dropdown for gameId / platformId
    var query2 = "select * FROM Games;"
    var query3 = "select * FROM Platforms;"

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }
        db.pool.query(query2, function(error, rows, fields){

            let games = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let platforms = rows;

                return res.render('gameplatforms', {data: results, games: games, platforms: platforms});
            })
        })
    });
});

// retrieve GameGenres page with table
app.get('/gamegenres', function (req, res) {
    // pretty print GameGenres table w/o FK
    var query1 = 'SELECT \
gameGenreId, \
G.gameTitle, \
Ge.genreName \
FROM \
GameGenres GG \
LEFT JOIN \
Games G ON GG.gameId = G.gameId \
LEFT JOIN \
Genres Ge ON GG.genreId = Ge.genreId;'

    // dropdown for gameId / genreId
    var query2 = "select * from Games;"
    var query3 = "select * from Genres;"

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }
        db.pool.query(query2, function(error, rows, fields){
        
            let games = rows;
            
            db.pool.query(query3, (error, rows, fields) => {
                
                let genres = rows;

                return res.render('gamegenres', {data: results, games: games, genres: genres});
            })
        })
    });
});

// error page for redundant inserts
app.get("/error", function (req, res) {
    res.status(404).render("error");
});

// bad link
app.get("*", function (req, res) {
    res.status(404).render("404");
});

// Create Functions for Tables

app.post('/createCustomerInfoForm', function(req, res) {
    let data = req.body;

    let customerEmail = data['customerEmail'];
    let customerPassword = data['customerPassword'];
    let customerFirstName = data['customerFirstName'];
    let customerLastName = data['customerLastName'];
    let customerAddress = data['customerAddress'];
    
    query1 = `INSERT INTO Customers (customerEmail, customerPassword, customerFirstName, customerLastName, customerAddress) VALUES ('${customerEmail}', '${customerPassword}', '${customerFirstName}', '${customerLastName}', '${customerAddress}')`

    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/customers');
        }
    })
})

app.post('/createOrderForm', function(req, res) {
    let data = req.body;

    let customerId = data['customerId'];
    let orderDate = data['orderDate'];
    
    query1 = `INSERT INTO Orders (customerId, orderDate) VALUES ('${customerId}', '${orderDate}');`

    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/orders');
        }
    })
})

app.post('/createOrderDetailsForm', function(req, res) {
    let data = req.body;

    let orderId = parseInt(data['addOrderId']);
    let gameId = parseInt(data['addGameId']);
    let quantity = parseInt(data['addQuantity']);
    
    query1 = `INSERT INTO OrderDetails (orderId, gameId, quantity) VALUES (${orderId}, ${gameId}, ${quantity})`;
    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/orderdetails');
        }
    })
})

app.post('/createGameForm', function(req, res) {
    let data = req.body;

    let gameTitle = (data['gameTitle']);
    let gameDescription = (data['gameDescription']);
    let gamePrice = (data['gamePrice']);
    let gameQuantity = (data['gameQuantity']);
    
    query1 = `INSERT INTO Games (gameTitle, gameDescription, gamePrice, gameQuantity) VALUES ('${gameTitle}', '${gameDescription}', '${gamePrice}', '${gameQuantity}')`

    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/games');
        }
    })
})

app.post('/createPlatformsForm', function(req, res) {
    let data = req.body;

    let platformName = data['platformName'];

    query1 = `INSERT INTO Platforms (platformName) VALUES ('${platformName}')`

    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.redirect('/error');
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/platforms');
        }
    })
})

app.post('/createGameGenresForm', function(req, res) {
    let data = req.body;

    let gameId = (data['addGameId']);
    let genreId = (data['addGenreId']);
    
    query1 = `INSERT INTO GameGenres (gameId, genreId) VALUES ('${gameId}', '${genreId}');`

    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/gamegenres');
        }
    })
})


app.post('/createGamePlatforms', function(req, res) {
    let data = req.body;

    let gameId = (data['addGameId2']);
    let platformId = (data['addPlatformId2']);

    query1 = `INSERT INTO GamePlatforms (gameId, platformId) VALUES ('${gameId}', '${platformId}');`

    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/gameplatforms');
        }
    })
})

app.post('/createNewGenre', function(req, res) {
    let data = req.body;

    let genreName = data['genreName'];

    query1 = `INSERT INTO Genres (genreName) VALUES ('${genreName}');`

    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.redirect('/error');
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/genres');
        }
    })
})

// Update Functions for Tables

// Handle PUT request for updating game genres (nullable fk)
app.put('/put-game-genres-ajax', function(req, res) {
    let data = req.body;

    let gameGenreId = data.gameGenreId;
    let genreId = data.genreId;

    let query = `UPDATE GameGenres SET genreId = ${genreId} WHERE gameGenreId = ${gameGenreId};`;

    db.pool.query(query, function(error, result) {
        if (error) {
            console.error('Error updating order:', error);
            res.status(500).send('Error updating order');
            return;
        }
        // Send the updated data back to the client
        res.json({ genreId: genreId });
    });
});

// Handle PUT request for updating order details
app.put('/put-orderDetails-ajax', function(req, res) {
    let data = req.body;

    let orderDetailsID = data.orderDetailsID;
    let orderId = data.orderId;
    let gameId = data.gameId;
    let quantity = data.quantity;

    let query = `UPDATE OrderDetails SET orderId = ${orderId}, gameId = ${gameId}, quantity = ${quantity} WHERE orderDetailId = ${orderDetailsID}`;

    db.pool.query(query, function(error, result) {
        if (error) {
            console.error('Error updating order details:', error);
            res.status(500).send('Error updating order details');
            return;
        }
        // Send the updated data back to the client
        res.json({ orderId: orderId, gameId: gameId, quantity: quantity });
    });
});

// Delete Functions for Tables

app.post("/OrderDetailsDeletePost", function (req, res) {
    let orderDetailId = req.body.orderDetailId;
    let query = "DELETE FROM OrderDetails WHERE orderDetailId = ?;";
    let values = [orderDetailId];
    db.pool.query(query, values, function (error, result) {
        if (error) {
            res.status(500).send("Server error");
            console.log(error);
            return;
        }
        res.redirect("/orderdetails");
    });
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});