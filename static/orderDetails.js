// const baseUrl = `http://flip3.engr.oregonstate.edu:8719`;
const baseUrl = `http://localhost:8719`;

// select element from handlebar
var deleteOrderDetailsButton = document.getElementById('delete-orderDetails-btn');

async function postDeleteOrderDetails(orderDetailId) {
    // func in app.js to tell database to remove
    try {
        const response = await fetch(`/OrderDetailsDeletePost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderDetailId: orderDetailId,
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
    // chosen orderDetailId to delete, relationship to remove
    let orderDetailId = document.getElementById("selectCustomer").value;

    // delete
    await postDeleteOrderDetails(orderDetailId)
})