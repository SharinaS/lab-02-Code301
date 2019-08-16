'use strict';

const allAnimals = [];
const allAnimalsTwo = [];
let uniqueKeywordsArr = [];
let picDropdown = $('#pic-selector');
let selectByDropdown = $('#select-by');

const Animal = function (description, horns, image_url, keyword, title) {
  this.description = description;
  this.horns = horns;
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
};

Animal.prototype.renderWithHandlebars = function(){
  const myTemplateHtml = $('#entry-template').html();
  const renderAnimalsWithHandlebars = Handlebars.compile(myTemplateHtml);
  const animalHtml = renderAnimalsWithHandlebars(this);
  $('main').append(animalHtml);
}

function renderSelectByDropdown(){
  selectByDropdown.append($('<option>', 'hello'))
}

function renderDropDown(){
  uniqueKeywords();
  renderSelectByDropdown();
  // creating the options in thedropdown
  for(let i = 0; i < uniqueKeywordsArr.length; i ++){
    picDropdown.append($('<option>', {
      value: uniqueKeywordsArr[i],
      text: uniqueKeywordsArr[i]
    }));
  }
}



function uniqueKeywords(){
  for(let i=0; i < allAnimals.length; i++){
    if(!uniqueKeywordsArr.includes(allAnimals[i].keyword)){
      uniqueKeywordsArr.push(allAnimals[i].keyword);
    }
  }
  return uniqueKeywordsArr;
}
// Ajax //
const getAllAnimalsFromFile = () => {
  $('option').hide();
  $.get('data/page-1.json').then(animals => {
    console.log('animals from the .then', animals);
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
  $('option').hide();
  $.get('data/page-2.json').then(animals => {
    console.log('animals from the .then', animals);
    animals.forEach(eachAnimal => {
      allAnimalsTwo.push(new Animal(eachAnimal.description, eachAnimal.horns, eachAnimal.image_url, eachAnimal.keyword, eachAnimal.title));
    })
    allAnimalsTwo.forEach(animal => {
      animal.renderWithHandlebars();
    })
    renderDropDown();
  })
}

getAllAnimalsFromFile();


$(function(){
  let optionItems = $('select');
  optionItems.on('change', function(){   
    console.log('you clicked ' + this.value)
    let clicked = this.value;
    console.log('let clicked is', clicked) 
    $('section').hide();

    console.log('parent is', $(`p:contains(${clicked})`).parent());
    $(`p:contains(${clicked})`).parent().show();
  })
})


$(function(){
  let pageItems = $('div');
  pageItems.on('click', function(event){   
    console.log('you clicked the div')
    let clicked = event.target.text;
    console.log('let clicked div is', clicked) 
    $('section').hide();  

    if (clicked == '2'){
      $('section').hide();  
      getAllAnimalsFromFileTwo();
    } else if (clicked == '1'){
      $('section').hide();  
      getAllAnimalsFromFile();
    }
  })
})
