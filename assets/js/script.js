// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.

$(function () {
    // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?

    saveBtn = $(".saveBtn");
    saveBtn.click()

    //
    // TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour. HINTS: How can the id attribute of each time-block be used to conditionally add or remove the past, present, and future classes? How can Day.js be used to get the current hour in 24-hour time?

    //
    // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?


  // live updating clock in header
  function setClock() {
    const now = dayjs().format("dddd MMM, YYYY h:mm:ssA"); // either delete Seconds, or find a way to make them much smaller
    const currentTime = $("#currentDay");
    currentTime.text(now);
    }
    setInterval(setClock);

});

function setHourId(numberHour) {
  if (numberHour > 12) {
    return numberHour - 12; // counting with 12-hr clock. better to return a value than to reassign by numberHour = something BECAUSE risk to variable definition
  }
  return numberHour;
}

function setDataAttribute(numberHour, hourBlockEl) { // calculate past, present, future with dayjs
  const time1 = dayjs().hour(numberHour);
  const time2 = dayjs().hour();
  if (time2.isBefore(time1)) {
    console.log("PAST")
    // hourBlockEl.data("timeframe", "past")
  } else if (time2.isAfter(time1)) {
    console.log("FUTURE")
    // hourBlockEl.data("timeframe", "future")
  } else {
    console.log("PRESENT")
    // hourBlockEl.data("timeframe", "present")
  }
}
setDataAttribute() // delete this call once makeDay is working

const workDayHours = 18; // 12-hr representation of 5pm

function makeDay() {
  var dayContainerEl = $("#day-container"); // contains entire day
  for (h = 9; h < workDayHours; h++) {
    // create container DIV with Object-attributes
    var thisHour = setHourId(h);
    var hourBlockEl = $("<div>", {
      id: "hour-" + setHourId(h),
      class: "row time-block",
      timeframe: setDataAttribute(thisHour, hourBlockEl)
    });
    dayContainerEl.append(hourBlockEl);
    // create save button
    var saveBtn = $("<button>", {
      class: "btn saveBtn col-2 col-md-1",
      ariaLabel: "save",
    });
    // create hidden <i>
    var buttonI = $("<i>", {
      class: "fas fa-save",
      ariaHidden: "true"
    });
    // create textarea
    var txtarea = $("<textarea>", {
      class: "col-8 col-md-10 description",
      rows: "3"
    });
    // create current hour DIV
    var postedHour = $("<div>", {
      class: "col-2 col-md-1 hour text-center py-3",
    });
    hourBlockEl.append(saveBtn, txtarea, postedHour);
    postedHour.text = setHourId + " " + dayjs("setHourId").format("A"); // incorrect: HTML text content missing
    saveBtn.append(buttonI);
  }
  return hourBlockEl;
}
makeDay();

function colorize(hourBlockEl) {
  const dataAttribute = hourBlockEl.data("timeframe");
  if (dataAttribute === "past") {
    hourBlockEl.addClass("past")
  } else if (dataAttribute === "future") {
    hourBlockEl.addClass("future")
  } else if (dataAttribute === "present") {
    hourBlockEl.addClass("present")
  }
}



/*
  
2. matchTime function
  - define DAYJS variables as past, present, and future
  - define DAYJS variable for currentHour?
  - set data-attribute based on past, present, and future
    - if (var past === dayjs("#hour-#).text) { 
        set data-attribute to past 
      } else if (var present === dayjs("#hour-#").text) {
        set data-attribute to present
      } else {
        set data-attribute to future
      }

3. BOOTSTRAP or jQuery UI
  - IF data-attribute is past/present/future, then apply BOOTSTRAP colors?
  - find how to use custom colors
  - on hover, apply shadow

4. localStorage
  - store textarea input by hour-# ID in array of objects
      - var userDay = [];
      - var userHour = {
        hourId: hour-#,
        text: description,
      }
  - stringify to store, parse to put in HTML/JS
  - add button that says "Clear Your Day" with alert that says you can't take back this action (accept/cancel) to clear localStorage
*/