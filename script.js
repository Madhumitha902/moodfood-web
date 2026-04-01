function getCurrentPage() {
  return window.location.pathname.split("/").pop().toLowerCase();
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function requireLogin() {
  const protectedPages = ["profile.html", "recommendations.html"];
  const currentPage = getCurrentPage();
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (protectedPages.includes(currentPage) && !loggedInUser) {
    window.location.href = "login.html";
  }
}

function loadProfileData() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const emailElement = document.getElementById("userEmail");
  const preferencesElement = document.getElementById("userPreferences");

  if (loggedInUser) {
    if (emailElement) emailElement.textContent = loggedInUser;
    if (preferencesElement) preferencesElement.textContent = "Mood-based meals";
  }
}

function updateNavigation() {
  const navLinks = document.getElementById("navLinks");
  if (!navLinks) return;

  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
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
  updateNavigation();
  

  const navLogout = document.getElementById("navLogout");
  if (navLogout) {
    navLogout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      alert("Logged out successfully!");
      window.location.href = "login.html";
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("Logged out successfully!");
      window.location.href = "login.html";
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("signupEmail")?.value.trim().toLowerCase();
      const password = document.getElementById("signupPassword")?.value.trim();

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      const users = getUsers();
      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        alert("Account already exists. Please log in.");
        window.location.href = "login.html";
        return;
      }

      users.push({ email, password });
      saveUsers(users);

      alert("Sign up successful! Please log in.");
      window.location.href = "login.html";
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email")?.value.trim().toLowerCase();
      const password = document.getElementById("password")?.value.trim();

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      const users = getUsers();
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        localStorage.setItem("loggedInUser", matchedUser.email);
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  }
});

function selectMood(mood) {
  const mealSuggestions = document.getElementById("mealSuggestions");
  if (!mealSuggestions) return;

  const recommendations = {
    happy: [
      {
        name: "Chocolate Cake",
        description: "A sweet dessert for celebrating good moods.",
        calories: 350,
        type: "Dessert",
        url: "https://www.allrecipes.com/recipe/8372/black-magic-cake/"
      },
      {
        name: "Pizza",
        description: "A fun comfort meal to enjoy when you're feeling great.",
        calories: 800,
        type: "Fast Food",
        url: "https://www.dominos.com/"
      }
    ],
    sad: [
      {
        name: "Ice Cream",
        description: "A classic comfort treat for low-energy days.",
        calories: 300,
        type: "Dessert",
        url: "https://www.benjerry.com/flavors"
      },
      {
        name: "Hot Soup",
        description: "A warm and soothing option when you want something comforting.",
        calories: 150,
        type: "Comfort Food",
        url: "https://www.panerabread.com/"
      }
    ],
    tired: [
      {
        name: "Coffee",
        description: "A quick energy boost to help you feel refreshed.",
        calories: 5,
        type: "Drink",
        url: "https://www.starbucks.com/menu/drinks/hot-coffees"
      },
      {
        name: "Energy Smoothie",
        description: "A light but energizing option packed with nutrients.",
        calories: 200,
        type: "Healthy Drink",
        url: "https://www.bbcgoodfood.com/recipes/breakfast-super-shake"
      }
    ],
    angry: [
      {
        name: "Spicy Tacos",
        description: "Bold flavors for intense moods.",
        calories: 450,
        type: "Spicy Food",
        url: "https://www.tacobell.com/"
      },
      {
        name: "Chili Chicken",
        description: "A flavorful, spicy dish for when you want something strong.",
        calories: 600,
        type: "Main Course",
        url: "https://thehillfoodco.com/"
      }
    ],
    excited: [
      {
        name: "Sushi",
        description: "A fresh and fun meal for energetic moments.",
        calories: 300,
        type: "Japanese",
        url: "https://www.sushisamba.com/menu"
      },
      {
        name: "Celebration Cake",
        description: "Perfect for exciting and joyful moods.",
        calories: 400,
        type: "Dessert",
        url: "https://www.sarahscakeshopstl.com/"
      }
    ],
    stressed: [
      {
        name: "Herbal Tea",
        description: "A calming drink to help you relax.",
        calories: 0,
        type: "Drink",
        url: "https://www.stashtea.com/collections/herbal-tea"
      },
      {
        name: "Mac and Cheese",
        description: "A creamy comfort dish for stressful days.",
        calories: 500,
        type: "Comfort Food",
        url: "https://www.kraftmacandcheese.com/recipes"
      }
    ]
  };

  const selectedMeals = recommendations[mood];

  mealSuggestions.innerHTML = `
    <h2>Recommended Meals</h2>
    <p>Here are some suggestions based on your mood:</p>
  `;

  if (!selectedMeals || selectedMeals.length === 0) {
    mealSuggestions.innerHTML += `<p>No recommendations available for this mood.</p>`;
    return;
  }

  selectedMeals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.className = "meal-card";

    mealCard.innerHTML = `
      <h3>${meal.name}</h3>
      <p><strong>Type:</strong> ${meal.type}</p>
      <p><strong>Description:</strong> ${meal.description}</p>
      <p><strong>Calories:</strong> ${meal.calories}</p>
      <a href="${meal.url}" target="_blank" rel="noopener noreferrer">View Option</a>
      <br><br>
      <label>Rate this suggestion:</label>
      <select onchange="submitFeedback('${meal.name}', this.value)">
        <option value="">--Select--</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
    `;

    mealSuggestions.appendChild(mealCard);
  });
}

function submitFeedback(mealName, rating) {
  if (rating) {
    alert(`Thanks! You rated ${mealName} ${rating} out of 5.`);
  }
}

window.selectMood = selectMood;
window.submitFeedback = submitFeedback;
