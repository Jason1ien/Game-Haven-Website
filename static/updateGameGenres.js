/** @format */

// Update Orders
let updateGameGenresForm = document.getElementById(
    "update-game-genres-ajax"
  );
  
  updateGameGenresForm.addEventListener("submit", async function (e) {
    e.preventDefault();
  
    // select elements in handlebar file
    let gameGenreId = document.getElementById("mySelect");
  
      // take value of element
    let gameGenreIdValue = gameGenreId.value;
  
      // set data = values of elements
    let data = {
      gameGenreId: gameGenreIdValue,
      genreId: null,
    };
  
    // function in app.js to put data into table
    try {
      const response = await fetch("/put-game-genres-ajax", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // response data from app.js
      const responseData = await response.json();
  
      // Reload the page after the update is completed
      location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  });

  