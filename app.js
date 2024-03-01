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

app.get('/orderdetails', function (req, res) {
    var query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }

        res.render('orderdetails', { data: results });
    });
});

/*
app.post('/OrderDetailsAddPost', function (req, res) {
    let orderId = req.body.orderId;
    let gameId = req.body.gameId;
    let quantity = req.body.quantity;

    let query = "INSERT INTO OrderDetails (orderId, gameId, quantity) VALUES (?, ?, ?);";
    let values = [orderId, gameId, quantity];

    db.pool.query(query, values, function (error, result) {
        if (error) {
            res.status(500).send('Error adding OrderDetails');
            console.log(error)
            return;
        }
        res.redirect('/orderdetails');
    });
})
*/

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

/*
app.post('/add-orderDetails-form', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    query1 = 'UPDATE OrderDetails SET gameId = :gameId_from_dropdown WHERE orderId = :orderId_from_dropdown;';
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/security-codes-securities');
        }
    })
})

app.put('/put-orderdetails', function(req, res) {
    let data = req.body

    let quantity = parseInt(data['input-quantity'])

    let queryUpdateOrderDetails = 'UPDATE OrderDetails SET gameId = :gameId_from_dropdown WHERE orderId = :orderId_from_dropdown;'

    // Run the query
    db.pool.query(queryUpdateOrderDetails, [quantity], function(error, result) {
        if (error) {
            console.error('Error updating orderDetails:', error);
            res.sendStatus(500);
        } else {
            // Send HTTP response indicating success
            res.sendStatus(200);
        }
    });
})
*/

app.get('/orders', function (req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {

        res.render('orders', { data: results });
    });
});

app.get('/gamegenres', function (req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {

        res.render('gamegenres', { data: results });
    });
});

app.get('/platforms', function (req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {

        res.render('platforms', { data: results });
    });
});

app.get('/games', function (req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {

        res.render('games', { data: results });
    });
});


app.get('/genres', function (req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {

        res.render('genres', { data: results });
    });
});

app.get('/gameplatforms', function (req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {

        res.render('gameplatforms', { data: results });
    });
});

app.get('/customers', function (req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {

        res.render('customers', { data: results });
    });
});
/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});