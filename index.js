var buttonColors = ["red","blue","green","yellow"];
var colorSeq = [];
var gamestarted = false;
var level = 0;
var count = 0;
function nextSequence()
{
    var nxtNum = Math.round(((Math.random())*3));
    var curColor = buttonColors[nxtNum];

    colorSeq.push(curColor);

    for(let i = 0;i < colorSeq.length;i++)
        {
            setTimeout(function()
                {
                    btnpress(colorSeq[i]);
                    audioPlayer(colorSeq[i]);
                },500*i)                            
        }
}

$(document).keypress(function()
{
    if(gamestarted)
        {
            reStart();
        }
    else
        {
            gameStart();
            gamestarted = true;
        }
    
});

function gameStart()
{
    $("#level-title").text("Press any Key to Restart");
    playing();
}

function reStart()
{
    count = 0;
    level = 0;
    $("#level-title").text("Press any Key to Restart");
    colorSeq = [];
    gamestarted = false;
   
}

function playing()
{
    $("#level-title").text("level " + level);
    nextSequence()
}

$(".btn").click(function()
    {
        btnpress($(this).attr("id"));
        audioPlayer($(this).attr("id"));
        if($(this).attr("id") === colorSeq[count])
            {
                count++;
                if(count === colorSeq.length)
                {
                    setTimeout(nextSequence,500);
                    count = 0;
                    level += 1;
                    $("#level-title").text("level " + level);
                }
            }
        else
            {
                audioPlayer("shit");
                reStart();
            }
    })

function btnpress(identifier)
{
    var button = $("#" + identifier);
    $(button).addClass("pressed");
    setTimeout(function ()
    {
        $(button).removeClass("pressed");
    },100)
}

 


function audioPlayer(identifier)
{
    switch(identifier)
    {
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        default:
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
    }
}


