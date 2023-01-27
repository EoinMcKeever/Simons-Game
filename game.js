var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var startGame = false;
var level = 0


$(".btn").on("click", function(event) {

    var userChosenColour = event.target.id

    playSound(userChosenColour)

    userClickedPattern.push(userChosenColour)

    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1)

});

$(document).on("keydown", function(event) {
    if(!startGame) {

        $("#level-title").text("Level " + level);

        nextSequence();

        startGame = true;
    }

})

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
    animatePress(randomChosenColour)

}

function playSound(name) {
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed")
    }, 100)

}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
    }

}

function startOver() {
    startGame = false;
    level=0;
    gamePattern = []
}







