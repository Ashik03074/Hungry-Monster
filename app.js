const search = document.getElementById("search"),
      submit = document.getElementById("submit"),
      mealsEl = document.getElementById("meals"),
      resultHeading = document.getElementById("result-heading"),
      single_mealEl = document.getElementById("single-meal");

function searchMeal(e){
    e.preventDefault();
    const term = search.value;
    single_mealEl.innerHTML = "";
    console.log(term);
    if(term.trim()){
      
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        
        resultHeading.innerHTML = `<h2>your search result for '${term}'</h2>`;
        console.log(data)
        if( data.meals === null){
            resultHeading.innerHTML = `<p>there is no search result for '${term}'</p>`;
            
        }
        else{
            mealsEl.innerHTML = data.meals
            .map(meal =>`
             <div id="pointer" class="meal"  data-mealID="${meal.idMeal}">
             <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
             <div>
             <h3>${meal.strMeal}</h3>
             </div>
             </div>`,
            )
            .join("");
             
        }
      });
      search.value="";
    }
    else{
        alert("plz enter a search term");
    }
}

getMealById = (mealID)=>{
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
    const meal = data.meals[0];
    addMealDOM(meal);
    console.log(meal);
  })
}

 addMealDOM = (meal) =>{
    const ingredients =[];
    for(let i =1 ; i<=20;i++){
      if(meal[`strIngredient${i}`]){
        ingredients.push(
          `${meal[`strIngredient${i}`]}`
        );
      }else{
        break;
      }
    }
    console.log(ingredients)
    single_mealEl.innerHTML = `
     <div class="single-meal">
       <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
       <h1>${meal.strMeal}</h1>
       <div class="main">
       <h3>The ingredients of ${meal.strMeal} are:</h3>
        <ul>
          ${ingredients.map((ing)=>`<li>${ing}</li>`).join("")}
        </ul>
       </div>
     </div>`;
 }

submit.addEventListener("submit",searchMeal);
const pointer = document.getElementById("pointer");
mealsEl.addEventListener("click",(e)=>{
  const mealInfo = e.path.find((item)=>{
    if(item.classList){
      return item.classList.contains("meal");
    }
    else{
      return false;
    }
  });
  if(mealInfo){
    const mealID = mealInfo.getAttribute("data-mealid");
    //console.log(mealID);
    getMealById(mealID);
  }
});