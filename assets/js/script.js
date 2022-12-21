// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    var saveBtn = $(".saveBtn");
    saveBtn.click()
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.

  

  });


// JS and DayJS to create live updating clock
function setClock() {
  const now = dayjs().format("dddd MMM, YYYY h:mm:ssA"); // either delete Seconds, or find a way to make them much smaller
  const currentTime = $("#currentDay");
  currentTime.text(now);
  }
  setInterval(setClock);

/*
1. FOR loop 
  - creates hourly sections with save button, textarea, class, data-attribute
  - data-attributes: data-past, data-present, data-future
  - class: hour
  - id: hour-# (example: hour-9, hour-10, etc.)
      - can the for loop increment the hour number by ++ when assigning them?
      - if the for loop can increment the hour number, can it use DAYJS to count hour numbers correctly? (example: 9, 10, 11, 12, 1, 2, 3, 4, 5)
  
2. timeOfDay function
  - define DAYJS variables as past, present, and future
  - set data-attribute based on past, present, and future
    - if (var past === dayjs("#hour-#).text) { 
        set data-attribute to past 
      } else if (var present === dayjs("#hour-#").text) {
        set data-attribute to present
      } else {
        set data-attribute to future
      }

3. BOOTSTRAP or jQuery UI
  - IF data-attribute is XYZ, then apply BOOTSTRAP colors?
  - find how to use custom colors

*/