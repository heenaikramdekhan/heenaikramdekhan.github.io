function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}

const apiKey = "2daebaae3dfd436eac535c6312c3a838";
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

function fetchNews() {
  document.getElementById("food").innerHTML = "<p>Loading news...</p>"; // Show loading message

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const foodItemsContainer = document.getElementById("food");
      foodItemsContainer.innerHTML = ""; // Clear loading message or existing content

      if (data.articles && Array.isArray(data.articles)) {
        data.articles.forEach((article) => {
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("w3-quarter");

          const img = document.createElement("img");
          img.src = article.urlToImage || "default-image.jpg"; // Use default image if none
          img.alt = article.title;
          img.style.width = "100%";

          const h3 = document.createElement("h3");
          h3.textContent = article.title;

          const p = document.createElement("p");
          p.textContent = article.description;

          itemDiv.appendChild(img);
          itemDiv.appendChild(h3);
          itemDiv.appendChild(p);
          foodItemsContainer.appendChild(itemDiv);
        });
      } else {
        console.error("Invalid data structure:", data);
        foodItemsContainer.innerHTML =
          "<p>No news found or error loading news.</p>";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      document.getElementById("food").innerHTML =
        "<p>Error loading news. Please try again later.</p>";
    });
}

// Call fetchNews on initial load
fetchNews();

// Refresh News Button
document.getElementById("refreshNews").addEventListener("click", fetchNews);
