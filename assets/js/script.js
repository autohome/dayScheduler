// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var saveButtons = $('.saveBtn');
var textAreas = $('textarea');
var timeRowEl = $('.time-block');  
var today = dayjs();
var hour = dayjs('H');


var scheduledItems

var inputEl 

// add todays date
var date = today.format('dddd, MMMM D')
$('#currentDay').text(date)

  saveButtons.on('click', function(event) {
  event.stopPropagation();
  var text = $(this).siblings('textarea').val();
  var timeCode = $(this).parent().attr('id');
  console.log(text);
  console.log(timeCode)
  // need to store in local storage (JSON)
  localStorage.setItem(timeCode, JSON.stringify(text));
});


function checkTime() {
  var currentHour = dayjs().hour();
  
  $('#container').children().each(function() {
    var hour = parseInt($(this).attr('id').split('-')[1]);

    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour > currentHour) {
      $(this).addClass('future');
    } else {
      $(this).addClass('present');
    }
  });
}

  function init() {
    checkTime()
    for (var i = 9; i <=17; i++) {
      var timeCode = "hour-" + i;
      var storedText = JSON.parse(localStorage.getItem(timeCode));
      // console.log(timeCode)
      
      if (storedText !== null) {

        for (var x = 0; x < $("#container").children().length; x++)

        // console.log(timeCode)
        // console.log($("#container").children().eq(x).attr("id"))
        if (timeCode === $("#container").children().eq(x).attr("id")) {
          // console.log(timeCode + x + storedText + $("#container").children().eq(x).children("textarea"))
          var insertText = $("#container").children().eq(x).children("textarea");
          // console.log(insertText + storedText);
          insertText.val(storedText);
          
        }
      } 
    }
  }


init ();
