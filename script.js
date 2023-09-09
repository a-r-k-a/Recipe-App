//Accessing the search button
const searchbBtn = document.getElementById("search-btn");
//accessing the list of meal in meal-result
const mealList = document.getElementById("meal");
//displaying the meal details
const mealDetailsContent = document.querySelector(".meal-details-content");
//accessing button for closing the recipe
const recipeCloseBtn = document.getElementById("recipe-close-btn");



//EVENT LISTENERS
searchbBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe')
})



//getting meal list that matches withh the ingredient
async function getMealList() {
  //getting the value from the search box
  let searchInputTxt = document.getElementById("search-input").value.trim();

  //fetching the data through the API url an displaying it
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`;
  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data);
  let html = "";
  if (data.meals) {
    data.meals.forEach((meal) => {
      html += ` <div class = "meal-item" data-id = "${meal.idMeal}">
        <div class = "meal-img">
          <img src = "${meal.strMealThumb}" alt = "food">
        </div>
        <div class = "meal-name">
          <h3>${meal.strMeal}</h3>
          <a href = "#" class = "recipe-btn">Get Recipe</a>
        </div>
      </div>`;
    });
  } else {
    html = "Sorry, We did not find any meal";
  }
  mealList.innerHTML = html;
}

//getting the recipe for each meal under thhat ingredient
//event bubbling usage
async function getMealRecipe(e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    // console.log(mealItem);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    mealRecipeModal(data.meals);
  }
}

//creating a modal
function mealRecipeModal(meal) {
  meal = meal[0];
  console.log(meal);
  let html = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
    <p class = "recipe-category">${meal.strCategory}</p>
    <div class = "recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class = "recipe-meal-img">
      <img src = "${meal.strMealThumb}" alt = "">
    </div>
    <div class = "recipe-link">
      <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe')
}
