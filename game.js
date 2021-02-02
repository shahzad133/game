var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



function nextSequence() {
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

var noOfClicks = 0;

$(".btn").click( function(){
    if(started) {
        noOfClicks++;
        var userChosenColor = this.id;
        playSound(userChosenColor);
        animatePress(userChosenColor);
        userClickedPattern.push(userChosenColor);

        if (noOfClicks < level) {
            if (userChosenColor === gamePattern[noOfClicks-1]) {
                console.log("success");
            } else {
                $("body").addClass("game-over")
                setTimeout(function(){$("body").removeClass("game-over")}, 200)
                console.log("wrong");
                noOfClicks = 0;
                userClickedPattern = [];
                gamePattern = [];
                started = false;
                level = 0;
                playSound("wrong");
                $("#level-title").text("Wrong Answer");
                setTimeout(function(){$("#level-title").text("Press A Key to Start")}, 1000);
            }
        } else if (noOfClicks === level) {
            if (userChosenColor === gamePattern[noOfClicks-1]) {
                console.log("success");
                noOfClicks = 0;
                userClickedPattern = [];
                setTimeout(function(){nextSequence()}, 1000);
            } else {
                console.log("wrong");
                $("body").addClass("game-over")
                setTimeout(function(){$("body").removeClass("game-over")}, 200)
                noOfClicks = 0;
                luserClickedPattern = [];
                gamePattern = [];
                started = false;
                level = 0;
                playSound("wrong");
                $("#level-title").text("Wrong Answer");
                setTimeout(function(){$("#level-title").text("Press A Key to Start")}, 1000);
            }

        }

        // if (userClickedPattern.length === gamePattern.length) {
        //     checkAnswer(userClickedPattern);
        // }
}})

$(document).keypress(function(){
    if(!started) {
        nextSequence();
        $("#level-title").text("Level "+level);
        started = true;
    }
})

$(document).touchstart(function(){
    if(!started) {
        nextSequence();
        $("#level-title").text("Level "+level);
        started = true;
    }
})


function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100)
}

function playSound(sound) {
    var audio = new Audio("sounds/"+sound+".mp3");
    audio.play();
}