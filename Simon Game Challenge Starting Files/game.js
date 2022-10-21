var buttonColors = ['red', 'green', 'blue', 'yellow'];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}
$('.btn').click(function handler() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    $('body').addClass("game-over");
    playSound('wrong');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);

    $('h1').text("Game Over, click anywhere on the screen to restart");
    setTimeout(function () {
      startOver()
    }, 1000);
  }

}
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
