'use strict';

// Problems:
// 1. Repeat clicks on page 1 adds another round of keywords shown in dropdown menu
// 2. Clicking on page 2 does not change the pulldown menu options to keywords for page 2.
// 3. There is no sorting available yet for title or number of horns.

let allAnimals = [];
let allAnimalsTwo = [];

let uniqueKeywordsForAllAnimals = [];


let picDropdown = $('#pic-selector'); 

const Animal = function (description, horns, image_url, keyword, title) {
  this.description = description;
  this.horns = horns;
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
};

// === Prototype Function ===

// Renders renders the pictures into main via Handlebars
Animal.prototype.renderWithHandlebars = function(){
  const myTemplateHtml = $('#entry-template').html();
  const renderAnimalsWithHandlebars = Handlebars.compile(myTemplateHtml);
  const animalHtml = renderAnimalsWithHandlebars(this);
  $('main').append(animalHtml);
}

// === Functions ===

function uniqueKeywords(){
  for(let i = 0; i < allAnimals.length; i++){
    if(!uniqueKeywordsForAllAnimals.includes(allAnimals[i].keyword)){
      uniqueKeywordsForAllAnimals.push(allAnimals[i].keyword);
    }
  }
  return uniqueKeywordsForAllAnimals;
}

// Renders keywords and puts keywords in array
function renderDropDown(){
  uniqueKeywords();

  for(let i = 0; i < uniqueKeywordsForAllAnimals.length; i ++){
    picDropdown.append($('<option>', {
      // value: uniqueKeywordsArr[i],
      text: uniqueKeywordsForAllAnimals[i]
    }));
  }
}


// Ajax for page 1
const getAllAnimalsFromFile = () => {
  // keep the images from page 1 from duplicating each time page 1 is rendered
  allAnimals = [];

  $.get('data/page-1.json').then(animals => {
    //console.log('animals from the .then', animals);

    animals.forEach(eachAnimal => {
      allAnimals.push(new Animal(eachAnimal.description, eachAnimal.horns, eachAnimal.image_url, eachAnimal.keyword, eachAnimal.title));
    })
    allAnimals.forEach(animal => {
      animal.renderWithHandlebars();
    })

    renderDropDown();
  })
}

// Ajax for data page 2//
const getAllAnimalsFromFileTwo = () => {

  // keep the images from duplicating each time page 2 is rendered.
  allAnimalsTwo = [];

  $.get('data/page-2.json').then(animals => {
    console.log('animals from the .then', animals);
    animals.forEach(eachAnimal => {
      allAnimalsTwo.push(new Animal(eachAnimal.description, eachAnimal.horns, eachAnimal.image_url, eachAnimal.keyword, eachAnimal.title));
    })
    allAnimalsTwo.forEach(animal => {
      animal.renderWithHandlebars();
    })

    //renderDropDown();
  })
}

// === Event Handlers ===


$(function(){
  let optionItems = $('select');
  optionItems.on('change', function(){   
    //console.log('you clicked ' + this.value)
    let clicked = this.value;
    //console.log('let clicked is', clicked) 
    $('section').hide();

    //console.log('parent is', $(`p:contains(${clicked})`).parent());
    $(`p:contains(${clicked})`).parent().show();
  })
})

// identifying page being clicked on
$(function(){
  let pageChoice = $('#pagination');
  pageChoice.on('click', function(event){   
    
    let clicked = event.target.text;
    //console.log('let clicked div is', clicked)

    if (clicked === '2'){
      $('section').hide(); 

      getAllAnimalsFromFileTwo();

    } else if (clicked === '1'){
      $('section').hide(); 
      getAllAnimalsFromFile();
    }
  })
})


// === Executable Code ===
getAllAnimalsFromFile(); // loads page one when user refreshes app
