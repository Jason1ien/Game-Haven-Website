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

