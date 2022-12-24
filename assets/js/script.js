// code that interacts with DOM is wrapped in a jQuery call to ensure that nothing is run until browser renders HTML elements

$(function () {

  // live updating clock in header
  function setClock() {
    const now = dayjs().format("dddd MMM, YYYY h:mm:ssA"); // either delete Seconds, or find a way to make them visibly much smaller
    const currentTime = $("#currentDay");
    currentTime.text(now);
    }
    setInterval(setClock);
  
  // counts with 12hr clock
  function setHourId(numberHour) {
    if (numberHour > 12) {
      return numberHour - 12; // better to return a value than to reassign by numberHour = something BECAUSE risk to variable definition
    }
    return numberHour;
  }

  // sets past, present, future by comparing hour block to present time
  function setAttribute(numberHour, hourBlockEl) {
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
    
  const workDayHours = 18; // 24-hr representation of 5pm +1
    
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
        id: "btn-" + setHourId(h),
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
        id: "txt-" + setHourId(h),
        rows: "3",
        name: "event-info",
        text: localStorage.getItem("btn-" + setHourId(h))
      });
      // create current hour DIV
      var postedHour = $("<div>", {
        class: "col-2 col-md-1 hour text-center py-3",
      });
  
      hourBlockEl.append(saveBtn, textArea, postedHour);
      postedHour.text(thisHour + " " + (h >= 12?"PM":"AM")); // ternary operator
      saveBtn.append(buttonI);
      setAttribute(h, hourBlockEl);
      colorize(hourBlockEl);
  
      saveBtn.click(function(event) {
        event.preventDefault();
        var whatIsId = this.id; // button ID
        var whereIsText = this.nextElementSibling; // text element
        localStorage.setItem(whatIsId, whereIsText.value);
      })
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

// adds footer
$("#day-container").after("<footer>Have a great day!</footer>");
var page = $(".description");
var clear = $(".reset");
clear.click(function(event) {
  var doubleCheck = confirm("Are you sure you'd like to erase your schedule?");
  if (doubleCheck === true) {
    localStorage.clear();
    page.text("");
  }
})
});