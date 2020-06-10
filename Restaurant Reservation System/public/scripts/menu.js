$(document).ready(function() {
  fetch("../menu_categories.json")
    .then((response) => response.json())
    .then((categories) => {
      for (let category of categories) {
        addCategory(category);
      }
    })
});

/*
 * Is fed json data and generates a 3-column grid from it
 */
function addCategory(category) {
  var imageHTML = `
  <div class="card-image">
    <figure class="image">
      <img src="${category.imageURL}" alt="${category.imageAlt}" height="42" width="42">
    </figure>
  </div>
  `;
  
  var categoryImg = $(imageHTML);
  var cardContent = $('<table height="40%"></table>');
  var description = $(`<tr><td class="contentCell"><div class="content">${category.description}</div></td><tr>`);
  var categoryBtn = $(`<tr><td class="buttonCell"><div class="categoryLabel is-fullwidth">${category.categoryName}</div></td><tr>`);
  cardContent.append(description, categoryBtn);

  var grid = $('#categories');
  var column = $('<div class="column is-one-third"></div>');
  var cell = $('<div class="card large"></div>');
  cell.append(categoryImg, cardContent);
  column.append(cell);
  grid.append(column);
}