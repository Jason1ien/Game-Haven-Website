/** @format */

// Update Orders
let updateGameGenresForm = document.getElementById(
    "update-game-genres-ajax"
  );
  
  updateGameGenresForm.addEventListener("submit", async function (e) {
    e.preventDefault();
  
    let gameGenreId = document.getElementById("mySelect");
  
    let gameGenreIdValue = gameGenreId.value;
  
    let data = {
      gameGenreId: gameGenreIdValue,
      genreId: null,
    };
  
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
      const responseData = await response.json();
  
      // Reload the page after the update is completed
      location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  });

  