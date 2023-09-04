/* 01 - Sidebar Section */
$(document).ready(function () {
    $('#loading').fadeOut(1000);
    $('body').css('overflow', 'auto');
})
let sidebarFlag = 1;
function openSidebar() {
    $('.sidebar-sections').animate({ left: '0' }, 500);
    $('.sidebar-close').animate({ left: '260px' }, 500);
    $('.inner-sidebar-close-icon').removeClass('fa-align-justify');
    $('.inner-sidebar-close-icon').addClass('fa-x');
    $('.sidebar-sections-ul').addClass('wow bounceInUp');

    sidebarFlag = 0;
}
function closeSidebar() {
    $('.sidebar-sections').animate({ left: '-260px' }, 500);
    $('.sidebar-close').animate({ left: '0' }, 500);
    $('.inner-sidebar-close-icon').removeClass('fa-x');
    $('.inner-sidebar-close-icon').addClass('fa-align-justify');
    sidebarFlag = 1;
}
$('.sidebar-close-icon').click(function () {
    if (sidebarFlag) {
        openSidebar();
    }
    else {
        closeSidebar();
    }

})


/* 02 - Home Section */


let searchName = document.getElementById('searchName');
let searchLetter = document.getElementById('searchLetter');
let foodArray = [];
async function getFood(s) {
    let respon = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`);
    let data = await respon.json();
    foodArray = data.meals;
    displayFood()
}
getFood("");
function displayFood() {
    let car = ``;
    for (let i = 0; i < foodArray.length; i++) {
        car +=
            ` <div class="col-md-3 py-3">
        <div class="imgs" onclick="getDetails('${foodArray[i].idMeal}')">
        <img src="${foodArray[i].strMealThumb}" alt="meal" class="w-100 rounded-2">
        <div  class="img-layer d-flex text-black">
        <h3>${foodArray[i].strMeal}</h3>
        </div>
        </div>
        </div>`

    }
    $('#imgsOfFood').html(car);
    $('.details').addClass('d-none');

}
async function getDetails(index) {
    $('.details').removeClass('d-none');
    $('.contact').addClass('d-none');
    $('.search').addClass('d-none');
    searchName.value = "";
    searchLetter.value = "";
    let respon = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`);
    let data = await respon.json();
    foodArray = data.meals;
    let tagsArray = [];
    let tagsArray2 = [];
    $('.home').addClass('d-none');
    $('.details-img').attr('src', `${foodArray[0].strMealThumb}`);
    $('.details-name').html(`${foodArray[0].strMeal}`);
    $('.details-inst').html(`${foodArray[0].strInstructions}`);
    $('.area').html(`Area : ${foodArray[0].strArea}`);
    $('.category').html(`Category : ${foodArray[0].strCategory}`);
    let measure = [];
    let g = 1;
    for (let i in foodArray[0]) {
        measure.push(foodArray[0][i]);
        g++;
    }
    let recipesCartona = ``;
    for (let me = 29, inte = 9; me <= 48; me++, inte++) {
        if (measure[me] != "" && measure[inte] != "") {
            recipesCartona += `<div class="recipes alert alert-info m-2 p-1" max>${measure[me] + " " + measure[inte]}</div>`
        }
        $('.recipes').html(recipesCartona);
    }

    tagsArray = foodArray[0].strTags;
    let sum = ``;
    if (tagsArray != null) {
        for (let i = 0; i < tagsArray.length; i++) {
            sum = sum + tagsArray[i];
            if (tagsArray[i] == ',' || i == tagsArray.length - 1) {
                tagsArray2.push(sum.replace(',', ''));
                sum = ``;
            }
        }
        let tagCartona = ``;
        for (let i = 0; i < tagsArray2.length; i++) {
            tagCartona += `<span class="tag alert ms-2  alert-danger border-0 rounded-3 p-2">${tagsArray2[i]}</span>`
            // console.log(tagsArray2[i]);
            $('.tag').html(tagCartona);

        }
        $('.source').attr('href', `${foodArray[0].strSource}`);
        $('.youtube').attr('href', `${foodArray[0].strYoutube}`);
    }
}



/* 03 - Categories Section */


let catArray = [];
$('.categories-link').click(async function () {
    if (sidebarFlag == 0)
        closeSidebar();
    searchName.value = "";
    searchLetter.value = "";
    let respon = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php?s=`);
    let data = await respon.json();
    catArray = data.categories;
    displayCategories();

})

function displayCategories() {
    $('.contact').addClass('d-none');
    $('.home').removeClass('d-none');
    $('.search').addClass('d-none');
    let car = ``;
    for (let i = 0; i < catArray.length; i++) {
        car += ` <div class="col-md-3 py-3">
        <div class="imgs" onclick="getDetailsCat('${catArray[i].strCategory}')">
          <img src="${catArray[i].strCategoryThumb}" alt="meal" class="w-100 rounded-2">
          <div  class="img-layer h3-cat text-black">
          <h3 class="d-inline-block">${catArray[i].strCategory}</h3>
          <p class="text-center flex-nowrap">${catArray[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
        </div>
      </div>`
    }
    $('#imgsOfFood').html(car);
}
async function getDetailsCat(name) {
    let respon = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    let data = await respon.json();
    foodArray = data.meals;
    displayFood();
}



/* 04 - Area Section */


let areaArray = [];
$('.area-link').click(async function () {
    if (sidebarFlag == 0)
        closeSidebar();
    $('.details').addClass('d-none');
    $('.contact').addClass('d-none');
    $('.home').removeClass('d-none');
    $('.search').addClass('d-none');
    searchName.value = "";
    searchLetter.value = "";
    let respon = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await respon.json();
    areaArray = data.meals;
    displayArea();
})
function displayArea() {
    let car = ``;
    for (let i = 0; i < areaArray.length; i++) {
        car +=
            ` <div class="col-md-3 py-3">
       <div class="areas text-white text-center" onclick="getDetailsArea('${areaArray[i].strArea}')" >
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${areaArray[i].strArea}</h3>
        </div>
      </div>`
    }
    $('#imgsOfFood').html(car);
}
async function getDetailsArea(name) {
    let respon = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    let data = await respon.json();
    foodArray = data.meals;
    displayFood();
}


/* 05 - Ingredients Section */


let ingredientsArray = [];
$('.Ingredients-link').click(async function () {
    if (sidebarFlag == 0)
        closeSidebar();
    $('.contact').addClass('d-none');
    $('.home').removeClass('d-none');
    $('.search').addClass('d-none');
    $('.details').addClass('d-none');
    searchName.value = "";
    searchLetter.value = "";
    let respon = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await respon.json();
    ingredientsArray = data.meals.slice(0, 20);
    displayIngredients();
})
function displayIngredients() {
    let car = ``;
    for (let i = 0; i < ingredientsArray.length; i++) {

        car +=
            ` <div class="col-md-3 py-3">
       <div class="areas text-white text-center" onclick="getDetailsIngredients('${ingredientsArray[i].strIngredient}')" >
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${ingredientsArray[i].strIngredient}</h3>
        <p class="text-center">${ingredientsArray[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
      </div>`
    }
    $('#imgsOfFood').html(car);
}
async function getDetailsIngredients(name) {
    let respon = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    let data = await respon.json();
    foodArray = data.meals;
    displayFood();
}


/* 06 - Contact Us Section */


$('.cotntact-link').click(function () {
    $('.home').addClass('d-none');
    $('.contact').removeClass('d-none');
    $('.details').addClass('d-none');
    if (sidebarFlag == 0)
        closeSidebar();
    $('.search').addClass('d-none');
    searchName.value = "";
    searchLetter.value = "";
})

function checkName(inputName) {

    let x = /^([a-zA-z0-9]{3,})$/
    if (x.test(inputName) == true)
        return true;
    else
        return false;
}
function isValidName(str) {
    if (checkName(str)) {
        $('#inputName').addClass('is-valid');
        $('#inputName').removeClass('is-invalid');

    }
    else {
        $('#inputName').addClass('is-invalid');
        $('#inputName').removeClass('is-valid');
    }
}

function checkEmail(inputEmail) {

    let x = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (x.test(inputEmail) == true)
        return true;
    else
        return false;
}
function isValidEmail(str) {
    if (checkEmail(str)) {
        $('#inputEmail').addClass('is-valid');
        $('#inputEmail').removeClass('is-invalid');

    }
    else {
        $('#inputEmail').addClass('is-invalid');
        $('#inputEmail').removeClass('is-valid');
    }
}

function checkPhone(inputPhone) {
    let x = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (x.test(inputPhone) == true)
        return true;
    else
        return false;
}
function isValidPhone(str) {
    if (checkPhone(str)) {
        $('#inputPhone').addClass('is-valid');
        $('#inputPhone').removeClass('is-invalid');

    }
    else {
        $('#inputPhone').addClass('is-invalid');
        $('#inputPhone').removeClass('is-valid');
    }
}


function isValidPassword(str) {
    if (checkPassword(str)) {
        $('#inputPassword').addClass('is-valid');
        $('#inputPassword').removeClass('is-invalid');

    }
    else {
        $('#inputPassword').addClass('is-invalid');
        $('#inputPassword').removeClass('is-valid');
    }
}
function checkPassword(inputPassword) {
    let x = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (x.test(inputPassword) == true)
        return true;
    else
        return false;
}

let inputPass = document.getElementById('inputPassword');
function isValidRepassword(str) {
    if (checkRepassword(str)) {
        $('#inputRepassword').addClass('is-valid');
        $('#inputRepassword').removeClass('is-invalid');

    }
    else {
        $('#inputRepassword').addClass('is-invalid');
        $('#inputRepassword').removeClass('is-valid');
    }
}
let inputRepass = document.getElementById('inputRepassword');

function checkRepassword(inputRepassword) {
    let x = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (x.test(inputRepassword) && inputPass.value == inputRepass.value)
        return true;
    else
        return false;
}


/* 07 - Search Section */


$('.search-link').click(function () {
    if (sidebarFlag == 0)
        closeSidebar();
    $('.home').addClass('d-none');
    $('.contact').addClass('d-none');
    $('.search').removeClass('d-none');
    $('.details').addClass('d-none');

})
function searchByName(str) {
    getFood(str);
    $('.home').removeClass('d-none');
}
function searchByLetter(str) {
    $('.home').removeClass('d-none');
    getFoodByLetter(str);
}
async function getFoodByLetter(s) {
    let respon = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${s}`);
    let data = await respon.json();
    foodArray = data.meals;
    displayFood()
}