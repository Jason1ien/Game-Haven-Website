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
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/index', function (req, res) {
    res.render('index');
});

app.get('/customers', function (req, res) {
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

app.get('/orders', function (req, res) {
    var query1 = 'SELECT \
orderId, \
C.customerFirstName, \
C.customerLastName, \
O.orderDate \
FROM \
Orders O \
JOIN \
Customers C ON O.customerId = C.customerId;'

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        res.render('orders', { data: results });
    });
});

app.get('/orderdetails', function (req, res) {
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

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        res.render('orderdetails', { data: results });
    });
});

app.get('/games', function (req, res) {
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

app.get('/platforms', function (req, res) {
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

app.get('/genres', function (req, res) {
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

app.get('/gameplatforms', function (req, res) {
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

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        res.render('gameplatforms', { data: results });
    });
});

app.get('/gamegenres', function (req, res) {
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

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        res.render('gamegenres', { data: results });
    });
});

// Create Function
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

// Delete function
app.post("/OrderDetailsDeletePost", function (req, res) {
    let orderId = req.body.orderId;
    let query = "DELETE FROM OrderDetails WHERE orderID = ?;";
    let values = [orderId];
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