// // To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

// function run() {
//  // Add code you want to run on page load here
// }

// // This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// // So that testing can work as expected for now
// // A non-hacky solution is being researched

// setTimeout(run, 1000);




document.addEventListener("DOMContentLoaded", () => {
    const API_BASE = "https://resource-ghibli-api.onrender.com/films";
    const titlesSelect = document.getElementById("titles");
    const displayInfo = document.getElementById("display-info");
    const reviewForm = document.querySelector("form");
    const reviewInput = document.getElementById("review");
    const reviewList = document.getElementById("review-list");
    const resetReviewsButton = document.getElementById("reset-reviews");
    const showPeopleButton = document.getElementById("show-people");
    const peopleList = document.getElementById("people-list");
  
    // Fetch movie data from the API and populate the select menu
    fetch(API_BASE)
      .then((response) => response.json())
      .then((movies) => {
        movies.forEach((movie) => {
          const option = document.createElement("option");
          option.value = movie.id;
          option.textContent = movie.title;
          titlesSelect.appendChild(option);
        });
      });
  
    // Display movie details when a movie is selected
    titlesSelect.addEventListener("change", (e) => {
      const selectedMovieId = e.target.value;
  
      if (selectedMovieId) {
        fetch(`${API_BASE}/${selectedMovieId}`)
          .then((response) => response.json())
          .then((movie) => {
            displayInfo.innerHTML = `
              <h3>${movie.title}</h3>
              <p>Release Year: ${movie.release_date}</p>
              <p>${movie.description}</p>
            `;
          });
      } else {
        displayInfo.innerHTML = "";
      }
    });
  
    // Add a review for the selected movie
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const selectedMovie = titlesSelect.options[titlesSelect.selectedIndex].text;
  
      if (!selectedMovie) {
        alert("Please select a movie first");
        return;
      }
  
      const reviewText = reviewInput.value.trim();
      if (reviewText) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${selectedMovie}:</strong> ${reviewText}`;
        reviewList.appendChild(li);
        reviewInput.value = "";
      }
    });
  
    // Reset the review list
    resetReviewsButton.addEventListener("click", () => {
      reviewList.innerHTML = "";
    });
  
    // Show people associated with the selected movie
    showPeopleButton.addEventListener("click", () => {
      const selectedMovieId = titlesSelect.value;
  
      if (!selectedMovieId) {
        alert("Please select a movie first");
        return;
      }
  
      fetch("https://resource-ghibli-api.onrender.com/people")
        .then((response) => response.json())
        .then((people) => {
          peopleList.innerHTML = "";
  
          people.forEach((person) => {
            const personMovieIds = person.films.map((filmUrl) => {
              return filmUrl.split('/').pop(); // Extract the movie ID from the film URL
            });
  
            if (personMovieIds.includes(selectedMovieId)) {
              const listItem = document.createElement("li");
              listItem.textContent = person.name;
              peopleList.appendChild(listItem);
            }
          });
        });
    });
  
    // Add the responsive design code snippet here
    function handleResponsiveDesign() {
      const reviewsSection = document.getElementById("reviews");
  
      if (window.innerWidth <= 500) {
        reviewsSection.style.display = "none";
      } else {
        reviewsSection.style.display = "block";
      }
    }
  
    // Call the handleResponsiveDesign function on page load and when the window is resized
    handleResponsiveDesign();
    window.addEventListener("resize", handleResponsiveDesign);
  });
  








