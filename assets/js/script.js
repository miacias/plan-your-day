// code that interacts with DOM is wrapped in a jQuery call to ensure that nothing is run until browser renders HTML elements

$(function () {
  const workDayHours = 18; // 24-hr representation of 5pm +1
  var pageText = $(".description");
  var clear = $(".reset");

  // live updating clock in header
  function setClock() {
    const now = dayjs().format("dddd, MMM D, YYYY h:mm"); // either delete Seconds, or find a way to make them visibly much smaller
    const seconds = dayjs().format(":ss");
    // seconds.css("fontSize", "small");
    const amPm = dayjs().format(" A");
    $("#main-time").text(now);
    $("#seconds-time").text(seconds);
    $("#am-pm-time").text(amPm);
    // mobile view reduced text
    const mobileNow = dayjs().format("h:mmA M/D/YY")
    $("#mobile-time").text(mobileNow);
    }
  setInterval(setClock);
  
  // extracts numeric digits from a string
  function match(string) {
    var numberMatch = string.match(/(\d+)/); // extracts numbers
    if (numberMatch) { // if string has numbers, return the number
      return numberMatch;
    }
  }

  // updates color as time progresses
  function colorize() {
    var textBlock = $(".time-block");
    var rightNow = (dayjs().hour()); // live time in military
    for (c = 0; c < textBlock.length; c++) {
      var timeOfBlock = match(textBlock[c].id);
      if (timeOfBlock < 9) {
        timeOfBlock + 12; // ugly fix for converting back to military time
      }
      if (timeOfBlock < rightNow) {
        pageText.removeClass("past present future");
        pageText.addClass("past");
      } else if (timeOfBlock > rightNow) {
        pageText.removeClass("past present future");
        pageText.addClass("future");
      } else {
        pageText.removeClass("past present future");
        pageText.addClass("present");
      }
    }
  }
  colorize(); // attributes added on page open
  setInterval(colorize, 300000); // updated each minute


  // counts with 12hr clock
  function setHourId(numberHour) {
    if (numberHour > 12) {
      return numberHour - 12; // better to return a value than to reassign by numberHour = something BECAUSE risk to variable definition
    }
    return numberHour;
  }

  // WORKING WHEN CALLED IN MAKEDAY AFTER BUTTON APPEND AS setAttribute(h, hourBlockEl);
  // sets past, present, future by comparing hour block to present time
  function setAttribute(numberHour, hourBlockEl) {
    const time1 = dayjs().hour(dayjs().hour()); // military time
    const time2 = dayjs().hour(numberHour);
    if (time2.isBefore(time1)) {
      hourBlockEl.removeClass("past present future");
      hourBlockEl.addClass("past");
    } else if (time2.isAfter(time1)) {
      hourBlockEl.removeClass("past present future");
      hourBlockEl.addClass("future");
    } else {
      hourBlockEl.removeClass("past present future");
      hourBlockEl.addClass("present");
    }
  }
    
  function makeDay() {
    var dayContainerEl = $("#day-container"); // contains entire day HTML
    for (h = 9; h < workDayHours; h++) {
      // create container DIV with Object-attributes
      var thisHour = setHourId(h);
      var hourBlockEl = $("<div>", {
        id: "hour-" + thisHour,
        class: "row time-block",
      });
      dayContainerEl.append(hourBlockEl);
      // create save button
      var saveBtn = $("<button>", {
        class: "btn saveBtn col-2 col-md-1",
        id: "btn-" + thisHour,
        ariaLabel: "save",
      });
      // create hidden <i>
      var buttonI = $("<i>", {
        class: "fas fa-save",
        ariaHidden: "true"
      });
      // create textarea
      var textArea = $("<textarea>", {
        class: "col-8 col-md-10 description",
        id: "txt-" + thisHour,
        rows: "3",
        name: "event-info",
        text: localStorage.getItem("btn-" + thisHour)
      });
      // create current hour DIV
      var postedHour = $("<div>", {
        class: "col-2 col-md-1 hour text-center py-3",
      });
  
      hourBlockEl.append(saveBtn, textArea, postedHour);
      postedHour.text(thisHour + " " + (h >= 12?"PM":"AM")); // ternary operator
      saveBtn.append(buttonI);
      setAttribute(h, hourBlockEl);
  
      saveBtn.click(function(event) {
        event.preventDefault();
        var whatIsId = this.id; // button ID
        var whereIsText = this.nextElementSibling; // text element
        localStorage.setItem(whatIsId, whereIsText.value);
      })
    }
  }
  makeDay();

  // adds clear button
  $("#day-container").after("<button class=\"reset\">Clear Your Day</button>");
  // adds footer
  $(".reset").after("<footer class=\"vh-20\">Have a great day!</footer>");

  // clear button functionality
  clear.click(function(event) {
    var doubleCheck = confirm("Are you sure you'd like to erase your schedule?");
    if (doubleCheck === true) {
      localStorage.clear();
      pageText.text("");
    }
  })
});