const baseUrl = `http://flip3.engr.oregonstate.edu:8719`;

var addButton = document.getElementById('add-orderDetails-btn');
var editButton = document.getElementById('edit-orderDetails-btn');
var deleteOrderDetailsButton = document.getElementById('delete-orderDetails-btn');

async function postDeleteOrderDetails(orderId) {
    try {
        const response = await fetch(`/OrderDetailsDeletePost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId: orderId,
            }),
        }).then(
            async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const textResponse = await response.text();
            },
            (networkError) => console.log(networkError.message)
        );

        window.location.href = baseUrl + "/orderdetails";
    } catch (error) {
        console.error("Error:", error);
    }
}


deleteOrderDetailsButton.addEventListener('click', async function () {

    let orderId = document.getElementById("selectCustomer").value;

    await postDeleteOrderDetails(orderId)

})

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