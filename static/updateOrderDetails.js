/** @format */

// Update Order Details
let updateOrderDetailsForm = document.getElementById(
  "update-orderDetails-ajax"
);

updateOrderDetailsForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let inputOrderDetailsID = document.getElementById("mySelect");
  let inputOrder = document.getElementById("updateOrderId")
  let inputGame = document.getElementById("updateGameId")
  let inputQuantity = document.getElementById("input-quantity-update");

  let orderDetailsIdValue = inputOrderDetailsID.value;
  let inputOrderValue = inputOrder.value;
  let inputGameValue = inputGame.value;
  let quantityValue = inputQuantity.value;

  let data = {
    orderDetailsID: orderDetailsIdValue,
    orderId: inputOrderValue,
    gameId: inputGameValue,
    quantity: quantityValue,
  };

  try {
    const response = await fetch("/put-orderDetails-ajax", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    // Reload the page after the update is completed
    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
});
