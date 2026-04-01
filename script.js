function requireLogin() {
  const userEmail = localStorage.getItem("userEmail");
  const currentPage = window.location.pathname.split("/").pop();

  const publicPages = ["login.html", "signup.html"];

  if (!userEmail && !publicPages.includes(currentPage)) {
    window.location.href = "login.html";
  }
}

function loadProfileData() {
  const userEmail = localStorage.getItem("userEmail");

  const emailElement = document.getElementById("userEmail");
  const preferencesElement = document.getElementById("userPreferences");

  if (userEmail) {
    if (emailElement) emailElement.textContent = userEmail;
    if (preferencesElement) preferencesElement.textContent = "Mood-based meals";
  }
}
function updateNavigation() {
  const navLinks = document.getElementById("navLinks");
  if (!navLinks) return;

  const userEmail = localStorage.getItem("userEmail");

  if (userEmail) {
    navLinks.innerHTML = `
      <li><a href="index.html">Home</a></li>
      <li><a href="recommendations.html">Recommendations</a></li>
      <li><a href="profile.html">Profile</a></li>
      <li><a href="#" id="navLogout">Logout</a></li>
    `;
  } else {
    navLinks.innerHTML = `
      <li><a href="index.html">Home</a></li>
      <li><a href="recommendations.html">Recommendations</a></li>
      <li><a href="login.html">Login</a></li>
      <li><a href="signup.html">Sign Up</a></li>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  requireLogin();
  loadProfileData();

    const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userEmail");
      alert("Logged out successfully!");
      window.location.href = "login.html";
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email")?.value.trim();
      const password = document.getElementById("password")?.value.trim();

      if (email && password) {
        localStorage.setItem("userEmail", email);
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Please enter both email and password.");
      }
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("signupEmail")?.value.trim();
      const password = document.getElementById("signupPassword")?.value.trim();

      if (email && password) {
        localStorage.setItem("userEmail", email);
        alert("Sign up successful! Please log in.");
        window.location.href = "login.html";
      } else {
        alert("Please enter both email and password.");
      }
    });
  }
});

function selectMood(mood) {
  const mealSuggestions = document.getElementById("mealSuggestions");
  if (!mealSuggestions) return;

  mealSuggestions.innerHTML = `<h2>Recommended Meals</h2><p>Here are some suggestions based on your mood:</p>`;

  const recommendations = {
    happy: [
      { name: "Chocolate Cake", url: "https://www.allrecipes.com/recipe/8372/black-magic-cake/", calories: 350 },
      { name: "Pizza", url: "https://www.dominos.com/", calories: 800 }
    ],
    sad: [
      { name: "Ice Cream", url: "https://www.benjerry.com/flavors", calories: 300 },
      { name: "Soup", url: "https://www.panerabread.com/content/panerabread_com/en-us/menu/categories/soups-and-mac.html/", calories: 150 }
    ],
    tired: [
      { name: "Coffee", url: "https://www.starbucks.com/menu/drinks/coffee", calories: 5 },
      { name: "Energy Smoothie", url: "https://www.bbcgoodfood.com/recipes/breakfast-super-shake", calories: 200 }
    ],
    angry: [
      { name: "Spicy Tacos", url: "https://www.tacobell.com/food/cravings-value-menu/spicy-potato-soft-taco", calories: 450 },
      { name: "Chili Chicken", url: "https://thehillfoodco.com/s/stl-indian-kitchen/2360-hampton-ave-st.-louis/14a96c44-4e44-46fd-b767-952dfabf18e1/Chicken%2065/6c9614fb-e503-4034-ae07-eb65b0c574b7", calories: 600 }
    ],
    excited: [
      { name: "Sushi", url: "https://www.sushisamba.com/menu", calories: 300 },
      { name: "Celebration Cake", url: "https://www.sarahscakeshopstl.com/", calories: 400 }
    ],
    stressed: [
      { name: "Herbal Tea", url: "https://www.stashtea.com/collections/herbal-tea", calories: 0 },
      { name: "Mac and Cheese", url: "https://www.kraftmacandcheese.com/recipes", calories: 500 }
    ]
  };

  if (recommendations[mood]) {
    recommendations[mood].forEach((meal) => {
      const mealCard = document.createElement("div");
      mealCard.className = "meal-card";

      mealCard.innerHTML = `
        <h3>${meal.name}</h3>
        <p>Calories: ${meal.calories}</p>
        <a href="${meal.url}" target="_blank">Get it here</a>
        <br><br>
        <label>Rate this suggestion:</label>
        <select onchange="submitFeedback('${meal.name}', this.value)">
          <option value="">--Select--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      `;

      mealSuggestions.appendChild(mealCard);
    });
  } else {
    mealSuggestions.innerHTML += `<p>No recommendations available for this mood.</p>`;
  }
}

function submitFeedback(mealName, rating) {
  if (rating) {
    alert(`Thank you for rating ${mealName} with ${rating} stars!`);
  }
}
