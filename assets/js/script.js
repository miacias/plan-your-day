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
      // setAttribute(h, hourBlockEl);
  
      saveBtn.click(function(event) {
        event.preventDefault();
        var whatIsId = this.id; // button ID
        var whereIsText = this.nextElementSibling; // text element
        localStorage.setItem(whatIsId, whereIsText.value);
      })
    }
  }
  makeDay();

  function match(string) {
    // console.log("match")
    // pageText is set of <textarea> elements (good). dot match is undefined (bad).
    // var string = pageText.attr("id"); // .match becomes undefined
    // var stringId = $("#txt-9").attr("id"); // extracts 9 correctly!
    var numberMatch = string.match(/(\d+)/); // extracts numbers
    if (numberMatch) {
      // console.log(numberMatch[0])
      return numberMatch;
    }
  }
  // match();

  /*
  - set match to be called within setAttribute while passing match some parameters/arguments to search and extract numbers from a specific ID
  - 
  */

  // NEW ATTEMPT AT SETTING ATTRIBUTE AS ASYNCHRONOUS FUNCTION

  function setAttribute2() {
    var textBlock = $(".time-block");
    const time1 = dayjs().hour(dayjs().hour()); // military time
    const time2 = dayjs().hour(); // live time
    for (c = 0; c < textBlock.length; c++) {
      var timeOfBlock = match(textBlock[c].id);
      if (timeOfBlock < 9) {
        timeOfBlock + 12; // ugly fix for converting back to military time
      }
    }
      if (time2.isBefore(time1)) {
        pageText.removeClass("past present future");
        pageText.addClass("past");
      } else if (time2.isAfter(time1)) {
        pageText.removeClass("past present future");
        pageText.addClass("future");
      } else {
        pageText.removeClass("past present future");
        pageText.addClass("present");
      }
  }
  setAttribute2(); // attributes added on page open
  setInterval(setAttribute2, 600000); // updated each minute

  /*
  change setAttribute function to asynchronous
  - delete call to setAttribute from makeDay
  - use getId to get each block's id via a for loop to compare with dayJS current time in hour format
      - document query selector All $(".description") with [i].id
      - if (Number(hourTextBlock[i].id) < currentTime) {past}
      - if (Number(hourTextBlock[i].id) > currentTime) {future}
  */

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