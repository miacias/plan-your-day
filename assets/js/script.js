// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.

$(function () {
    // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?
    const userDay = [];

    saveBtn = $(".saveBtn");
    saveBtn.click(function(event) {
      event.preventDefault();
      var textArea = $("description").children("textarea").value;
      var userHour = {
        hourId: textArea.attr("id"), // not defined correctly
        text: textArea
      }
      userDay.push(userHour.this.text);
      localStorage.setItem("day-notes", JSON.stringify(userDay));
      var savedText = JSON.parse(localStorage.getItem("day-notes"));
    })

    //
    // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?


  // live updating clock in header
  function setClock() {
    const now = dayjs().format("dddd MMM, YYYY h:mm:ssA"); // either delete Seconds, or find a way to make them visibly much smaller
    const currentTime = $("#currentDay");
    currentTime.text(now);
    }
    setInterval(setClock);

});

function setHourId(numberHour) {
  if (numberHour > 12) {
    return numberHour - 12; // better to return a value than to reassign by numberHour = something BECAUSE risk to variable definition
  }
  return numberHour;
}

function setAttribute(numberHour, hourBlockEl) { // past, present, future
  const time1 = dayjs().hour(dayjs().hour()); // military time
  const time2 = dayjs().hour(numberHour);
  if (time2.isBefore(time1)) {
    hourBlockEl.addClass("past");
  } else if (time2.isAfter(time1)) {
    hourBlockEl.addClass("future");
  } else {
    hourBlockEl.addClass("present");
  }
}

const workDayHours = 18; // 12-hr representation of 5pm

function makeDay() {
  var dayContainerEl = $("#day-container"); // contains entire day HTML
  for (h = 9; h < workDayHours; h++) {
    // create container DIV with Object-attributes
    var thisHour = setHourId(h);
    var hourBlockEl = $("<div>", {
      id: "hour-" + setHourId(h),
      class: "row time-block",
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
    postedHour.text(thisHour + " " + (h >= 12?"PM":"AM")); // ternary operator
    saveBtn.append(buttonI);
    setAttribute(h, hourBlockEl);
    colorize(hourBlockEl);
  }
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

3. BOOTSTRAP or jQuery UI
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