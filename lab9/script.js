function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}

const apiKey = "2daebaae3dfd436eac535c6312c3a838";
const apiUrl =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + apiKey;

fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Check if data.articles exists and is an array
    if (data.articles && Array.isArray(data.articles)) {
      const foodItemsContainer = document.getElementById("food");
      foodItemsContainer.innerHTML = ""; // Clear existing content

      data.articles.forEach((article) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("w3-quarter");

        const img = document.createElement("img");
        img.src = article.urlToImage; // Assuming 'urlToImage' is the property containing the image URL
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
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
