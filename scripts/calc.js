console.log(
  "Javascript Calculator Made by Harsh Trivedi\nhttps://harsh98trivedi.github.io"
);

let flag = 0;

function isNumber(char) {
  return /^\d$/.test(char);
}

document.getElementById("answer").readOnly = true;
let screen = document.getElementById("answer");
buttons = document.querySelectorAll("button");
let screenValue = "";
let lastScreenValue = "";
let maxItems = 6;
let isSign = true;

for (item of buttons) {
  item.addEventListener("click", (e) => {
    buttonText = e.target.innerText;
    if (buttonText == "X" && !isSign) {
      if (flag == 1) {
        flag = 0;
      }
      buttonText = "*";
      isSign = true;
      screenValue += buttonText;
      screen.value = screenValue;
    } else if (buttonText == "C") {
      if (flag == 1) {
        flag = 0;
      }
      screenValue = "";
      screen.value = screenValue;
      screen.classList.remove("negative"); // Remove negative class
      isSign = true;
    } else if (buttonText == "=") {
      checkForBracketMulti();
      if (parseFloat(screen.value) < 0) {
        screen.classList.add("negative");
      } else {
        screen.classList.remove("negative");
      }
    } else if(buttonText=="(" || buttonText==")") {
      if(flag==1){
        flag =0;
      }
      screenValue+=buttonText;
      screen.value=screenValue;
    } 
    else if (isNumber(buttonText)) {
      if (flag == 1) {
        screenValue = buttonText;
        flag = 0;
      } else {
        screenValue += buttonText;
      }
      screen.value = screenValue;
      isSign = false;
      screen.classList.remove("negative"); // Remove negative class
    } else {
      if (flag == 1) {
        flag = 0;
      }
      if (!isSign) {
        screenValue = screen.value + buttonText;
        screen.value = screenValue;
        isSign = true;
      }
      screen.classList.remove("negative"); // Remove negative class
    }
  });
}

document.addEventListener("keydown", function (event) {
  // ... (same code as before)
});

window.onerror = function () {
  alert("PLEASE INPUT VALID EXPRESSION");
  screenValue = "";
  screen.value = screenValue;
  screen.classList.remove("negative"); // Remove negative class
  console.clear();
};

// ... (same code as before)

function checkForBracketMulti() {
  // ... (same code as before)

  if (eval(screenValue) !== undefined) {
    screen.value = eval(screenValue);
    lastScreenValue = screenValue;
    screenValue = screen.value;
    if (parseFloat(screen.value) < 0) {
      screen.classList.add("negative");
    } else {
      screen.classList.remove("negative");
    }
    // ... (same code as before)
  }
  flag = 1;
}

$(document).ready(function() {
  var currentDate = new Date();
  function generateCalendar(d) {
    function monthDays(month, year) {
      var result = [];
      var days = new Date(year, month, 0).getDate();
      for (var i = 1; i <= days; i++) {
        result.push(i);
      }
      return result;
    }
    Date.prototype.monthDays = function() {
      var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
      return d.getDate();
    };
    var details = {
      // totalDays: monthDays(d.getMonth(), d.getFullYear()),
      totalDays: d.monthDays(),
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    };
    var start = new Date(d.getFullYear(), d.getMonth()).getDay();
    var cal = [];
    var day = 1;
    for (var i = 0; i <= 6; i++) {
      cal.push(['<tr>']);
      for (var j = 0; j < 7; j++) {
        if (i === 0) {
          cal[i].push('<td>' + details.weekDays[j] + '</td>');
        } else if (day > details.totalDays) {
          cal[i].push('<td>&nbsp;</td>');
        } else {
          if (i === 1 && j < start) {
            cal[i].push('<td>&nbsp;</td>');
          } else {
            cal[i].push('<td class="day">' + day++ + '</td>');
          }
        }
      }
      cal[i].push('</tr>');
    }
    cal = cal.reduce(function(a, b) {
      return a.concat(b);
    }, []).join('');
    $('table').append(cal);
    $('#month').text(details.months[d.getMonth()]);
    $('#year').text(d.getFullYear());
    $('td.day').mouseover(function() {
      $(this).addClass('hover');
    }).mouseout(function() {
      $(this).removeClass('hover');
    });
  }
  $('#left').click(function() {
    $('table').text('');
    if (currentDate.getMonth() === 0) {
      currentDate = new Date(currentDate.getFullYear() - 1, 11);
      generateCalendar(currentDate);
    } else {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
      generateCalendar(currentDate);
    }
  });
  $('#right').click(function() {
    $('table').html('<tr></tr>');
    if (currentDate.getMonth() === 11) {
      currentDate = new Date(currentDate.getFullYear() + 1, 0);
      generateCalendar(currentDate);
    } else {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
      generateCalendar(currentDate);
    }
  });
  generateCalendar(currentDate);
});