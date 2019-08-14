'use strict';

const allAnimals = [];
let uniqueKeywordsArr = [];

const Animal = function (description, horns, image_url, keyword, title) {
  this.description = description;
  this.horns = horns;
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
  allAnimals.push(this);
};

Animal.prototype.renderWithJquery = function(){
  const $myTemplate = $('#animal-template');
  const myTemplateHtml = $myTemplate.html();

  const $newSection = $('<section></section>');
  $newSection.html(myTemplateHtml);

  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('#pic-title').text(this.title);
  $newSection.find('#descriptor').text(this.description);
  $newSection.find('#keyword').text(this.keyword);
  $newSection.find('#horns').text(this.horns);
  
  $('main').append($newSection);
}

Animal.prototype.renderDropDown = function(){
  let dropdown = $('select');

  uniqueKeywords();
  // creating the options in thedropdown
  for(let i = 0; i < uniqueKeywordsArr.length; i ++){
    dropdown.append($('<option>', {
      value: uniqueKeywordsArr[i],
      text: uniqueKeywordsArr[i]
    }));
  }
}

// dropdown.append($('<option></option>').attr('value', value.keyword).text(value.keyword));

// dropdown.append('<option value=' + uniqueKeywordsArr[i] + 'selected = "selected">' + uniqueKeywordsArr[i].keyword + '</option>');

function uniqueKeywords(){
  for(let i=0; i < allAnimals.length; i++){
    if(!uniqueKeywordsArr.includes(allAnimals[i].keyword)){
      uniqueKeywordsArr.push(allAnimals[i].keyword);
    }
  }
  return uniqueKeywordsArr;
}


// Ajax
const getAllAnimalsFromFile = () => {
  $.get('data/page-1.json').then(animals => {
    console.log('animals from the .then', animals);

    animals.forEach(eachAnimal => {
      new Animal(eachAnimal.description, eachAnimal.horns, eachAnimal.image_url, eachAnimal.keyword, eachAnimal.title);
    })
    allAnimals.forEach(animal => {
      animal.renderWithJquery();
      animal.renderDropDown();
    })
  })

}
getAllAnimalsFromFile();