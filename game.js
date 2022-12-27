var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0 ;
var started = false ;
function nextPlay(soundName){
    var audio = new Audio("sounds/" +soundName+ ".mp3");
    audio.play();
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    $("#" + randomChosenColours).fadeIn(100).fadeOut(100).fadeIn(100);
    nextPlay(randomChosenColours);
    level++;
    $("h1").text("LEVEL "+level);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(currentLevel+1==gamePattern.length){
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            },1000);
        }
    }else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        startOver();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200)
    }
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    started = false;
    level = 0 ;
    gamePattern = [];
    userClickedPattern = [];
}
$(".btn").click(function (event) {
    var userChosenColour = event.target.id;
    nextPlay(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    var currentLevel = userClickedPattern.length-1;
    checkAnswer(currentLevel);
})

$(document).keypress(function () {
    if (!started){
        nextSequence();
        started = true;
    }
})
