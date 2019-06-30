'use strict'
// get all divs with column class name
const columns = document.querySelectorAll('.column');
// create an array to hold column ids
const columnIds = [];

// create function to get all column positions
// return object with top, middle, and bottom data
function getColumnPositions(element) {
  const top = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
  const middle = top + element.getBoundingClientRect().height / 2;
  const bottom = top + element.clientHeight;

  return { top, middle, bottom }
}

// create function to display message when conditions are met
function displayMessage(position, id) {
  switch (position) {
    case 'top':
      return `Column with id:${id} started to become visible on the page.`;
    case 'middle':
      return `Column with id:${id} is now more than 50% visible on the page.`
    case 'bottom':
      return `Column with id:${id} is now fully visible on the page.`
  }
}

// add listener to listen for scrolling events
window.addEventListener('scroll', function () {
  // create const to hold bottom of the viewport value
  // use pageYOffset for better compatibility (just in case)
  const viewportPosition = this.pageYOffset + this.window.innerHeight;

  for (let i = 0; i < columns.length; i++) {
    const columnPositions = getColumnPositions(columns[i]);
    const columnId = columns[i].id;

    // use for in loop for best compatibility && indexOf when comparing
    for (let position in columnPositions) {
      if (columnPositions[position] <= viewportPosition && columnIds.indexOf(`${columnId}, ${position}`) < 0) {
        columnIds.push(`${columnId}, ${position}`)
        console.log(displayMessage(position, columnId))
      }
    }
  }
})