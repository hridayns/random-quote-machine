$(function() {
  getQuote();
  $('#randomQuote').on("click",function() {
    getQuote();
    changeBackground();
  });
  $('#tweetThis').on("click",function() {
    tweetIt();
  });
});

//Function to set tweet text to generated quote
function tweetIt() {
  var tUrl = "https://twitter.com/intent/tweet?text=";
  var qText = document.getElementById("quote").innerHTML;
  var aText = document.getElementById("author").innerHTML;
  tUrl += qText + aText;
  //console.log(tUrl);
  window.open(tUrl);
}

//Function to change background of body on quote generation
function changeBackground() {

  var bgColors = ["rgba(176,23,31,0.8)","rgba(85,26,139,0.8)","rgba(99,184,255,0.8)","rgba(51,255,51,0.8)","rgba(255,236,139,0.8)"];
  var length = bgColors.length;
  var index = Math.floor(Math.random() * (length-1));

  $('body').animate({backgroundColor: bgColors[index]}, 'slow');
}

//Function to extract a random quote from the Random Famous Quotes API
function getQuote() {
var qurl = "https://andruxnet-random-famous-quotes.p.mashape.com/";
var MASHAPE_API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';//replace with actual API key obtained from Mashape

  $.ajax({
      url: qurl,
      type: 'POST',
      data: {
        //parameters passed -> category:famous
        cat:"famous"
      },
      dataType: 'json',
      success: function(result) {
        $('#quote').html(result[0].quote);
        $('#author').html(" ~ " + result[0].author);
      },
      error: function(err) { alert(err); },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", MASHAPE_API_KEY);
      }
  });
}
