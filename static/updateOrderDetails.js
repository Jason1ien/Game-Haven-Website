// Update Order Details
let updateOrderDetailsForm = document.getElementById("update-orderDetails-ajax");

updateOrderDetailsForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let inputOrderDetailsID = document.getElementById("mySelect");
    let inputQuantity = document.getElementById("input-quantity-update");

    let orderDetailsIdValue = inputOrderDetailsID.value;
    let quantityValue = inputQuantity.value;

    let data = {
        orderDetailsID: orderDetailsIdValue,
        quantity: quantityValue
    };

    try {
        const response = await fetch("/put-orderDetails-ajax", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        updateRow(responseData, orderDetailsIdValue);

        // Reload the page after the update is completed
        location.reload();
    } catch (error) {
        console.error("Error:", error);
    }
});

function updateRow(data, orderDetailsID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("orderDetailsTableBody");

    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].getAttribute("data-value") == orderDetailsID) {
            let updateRowIndex = table.rows[i];
            let quantityTd = updateRowIndex.getElementsByTagName("td")[5]; // Assuming 5 is the index of Quantity column
            quantityTd.innerText = parsedData.quantity;
            break;
        }
    }
}
