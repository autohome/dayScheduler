var saveButtons = $('.saveBtn');
var textAreas = $('textarea');
var timeRowEl = $('.time-block');  
var today = dayjs();
var hour = dayjs('H');


var scheduledItems

var inputEl 

// add todays date to page
var date = today.format('dddd, MMMM D')
$('#currentDay').text(date)

// Pull text and save to local storage
saveButtons.on('click', function(event) {
  event.stopPropagation();
  var text = $(this).siblings('textarea').val();
  var timeCode = $(this).parent().attr('id');
  // need to store in local storage (JSON)
  localStorage.setItem(timeCode, JSON.stringify(text));
});

// change color of timeblock by current hour
function checkTime() {
  // what is current hour
  var currentHour = dayjs().hour();
  // run function for each time-block
  $('#container').children().each(function() {
    // makes current hour match time block id (eg. hour-9)
    var hour = parseInt($(this).attr('id').split('-')[1]);
    // if then statement to add correct class to timeblock
    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour > currentHour) {
      $(this).addClass('future');
    } else {
      $(this).addClass('present');
    }
  });
}

// initialise function to pull storage data and display on screen
function init() {
  // run checktime to fill in colors
  checkTime()
    // for loop to have each time block id
    for (var i = 9; i <=17; i++) {
      var timeCode = "hour-" + i;
      // pulls each timeblocl text out of storage
      var storedText = JSON.parse(localStorage.getItem(timeCode));
        // if text is not blank, add to correct time block
        if (storedText !== null) {
          for (var x = 0; x < $("#container").children().length; x++)
            // make sure time block matches storage ID
            if (timeCode === $("#container").children().eq(x).attr("id")) {
              var insertText = $("#container").children().eq(x).children("textarea");
              insertText.val(storedText);
            }
        } 
    }
}

// run initial function on startup
init ();
