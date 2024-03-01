// Express
var db = require('./db-connector')
var express = require('express');          
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
var app     = express();   
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');
app.use(express.static("static"));

PORT        = 8719;

/*
    ROUTES
*/
app.get('/', function(req, res) {
    res.render('index');                    
});    

app.get('/index', function(req, res) {
    res.render('index');                    
}); 

app.get('/orderdetails', function(req, res) {
    var query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {
        if (err) {
            console.error('Error retrieving order details:', err);
            res.status(500).send('Error retrieving order details');
            return;
        }
        
        res.render('orderdetails', {data: results}); 
    });
});

app.get('/orders', function(req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {
        
        res.render('orders', {data: results}); 
    });
});

app.get('/gamegenres', function(req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {
        
        res.render('gamegenres', {data: results}); 
    });
});

app.get('/platforms', function(req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {
        
        res.render('platforms', {data: results}); 
    });
});

app.get('/games', function(req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {
        
        res.render('games', {data: results}); 
    });
});


app.get('/genres', function(req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {
        
        res.render('genres', {data: results}); 
    });
});

app.get('/gameplatforms', function(req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {
        
        res.render('gameplatforms', {data: results}); 
    });
});

app.get('/customers', function(req, res) {
    query1 = 'SELECT * FROM OrderDetails order by orderDetailId asc;';

    db.pool.query(query1, function (err, results, fields) {
        
        res.render('customers', {data: results}); 
    });
});
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});