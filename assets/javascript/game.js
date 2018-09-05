$(document).ready(function () {
    startGame();

});
//starts the game and intiailizes all the variables to start game conditions
function startGame() {
    obiWan = { name: "Obi-Wan Kenobi", hP: 120, iAp: 8, aP: 8, cAP: 12, inPlay: false, image: "obi-wan" };
    darthMaul = { name: "Darth Maul", hP: 180, iAp: 4, aP: 4, cAP: 25, inPlay: false, image: "maul" };
    darthSidious = { name: "Darth Sidious", hP: 150, iAp: 6, aP: 6, cAP: 20, inPlay: false, image: "sidious" };
    lukeSkywalker = { name: "Luke Skywalker", hP: 100, iAp: 25, aP: 25, cAP: 5, inPlay: false, image: "luke" };
    characterArray = [obiWan, darthMaul, darthSidious, lukeSkywalker];
    numCharRemaining = characterArray.length;
    //phase 0 = player character selection 
    //phase 1 = enemy character selection
    //phase 2 = fight phase
    //phase 3 = game over phase
    phase = 0;

    
    availableChoices();
    $(".luke").click(function () {
        console.log("luke");
        if (phase === 0) {
            chooseChar(lukeSkywalker);
        }
        else if (phase === 1) {
            chooseEnemy(lukeSkywalker);
        }
    });
    $(".maul").click(function () {
        if (phase === 0) {
            chooseChar(darthMaul);
        }
        else if (phase === 1) {
            chooseEnemy(darthMaul);
        }
    });
    $(".sidious").click(function () {
        if (phase === 0) {
            chooseChar(darthSidious);
        }
        else if (phase === 1) {
            chooseEnemy(darthSidious);
        }
    });
    $(".obi-wan").click(function () {
        if (phase === 0) {
            chooseChar(obiWan);
        }
        else if (phase === 1) {
            chooseEnemy(obiWan);
        }

    });
    $("#fight-Button").click(function () {
        console.log(phase);
        if (phase === 2) {
            fight();
        }
    })
    

}
//displays the characters to select at the start of the game
function availableChoices() {

    characterArray.forEach(function (element) {
        //new box is the box object that gets moved from zone to zone
        var newBox = $("<div>");
        //name box is a banner that holds the name of the character
        var nameBox = $("<div>");
        //picbox holds the characer picture
        var picBox = $("<div>");
        //picSrc is the picture itself
        var picSrc=$("<img/>").attr('src',"assets/img/"+element.image+".jpg");
        picSrc.attr("title",element.name);
        picSrc.attr("alt","picture of "+element.name);
        picSrc.width('80px');
        picSrc.height('50px');
        //hp box displays the character's current hit points
        var hpBox = $("<div>");
        nameBox.text(element.name);
        nameBox.addClass("name-box");

        picBox.append(picSrc);
        picBox.addClass("picture-box");

        hpBox.text("HP = " + element.hP);
        hpBox.addClass("hp-box");
        newBox.addClass(element.image);
        newBox.attr('id', "selection-Zone");
        newBox.append(nameBox);
        newBox.append(picBox);
        newBox.append(hpBox);
        $("#placeholder-Zone").append(newBox);
    });
}
//unbinds click listeners for buttons
//empties out all divs manipulated in the course of the game
function reset() {
    $("#your-Character-Box").empty();
    
    $("#fight-Button").unbind("click");
    $("#enemy-Character-Box").empty();
    $(".restart-button").unbind("click");
    $("#restart-Button-Zone").empty();
    $("#combat-Text-One").empty();
    $("#combat-Text-Two").empty();
    startGame();
}
//selects character for player or enemy depending on phase 
function moveChar(c1) {
    var charClass = c1.image;
    if (phase === 0) {
        $("." + charClass).attr('id', "player-Zone");
        $("." + charClass).appendTo("#your-Character-Box");
    }
    if (phase === 1) {
        $("." + charClass).attr('id', "enemy-Zone");
        $("." + charClass).appendTo("#defender-Box-Area");
    }
}
//moves all of the unselected heroes from the placeholder to the enemy-character-box
function moveRemainder() {
    characterArray.forEach(function (element) {
        if (!element.inPlay) {
            var charClass = element.image;
            console.log(element.name + " is inPlay:" + element.inPlay);
            $("." + charClass).attr('id', "available-Zone");
            $("." + charClass).appendTo("#enemy-Character-Box");
        }
    })
}
//sets yourChar to chosen char(c1)
function chooseChar(c1) {
    yourChar = c1;
    c1.inPlay = true;
    moveChar(c1);
    phase = 1;
    numCharRemaining = numCharRemaining - 1;
    console.log("chooseChar " + c1.name);
    console.log(yourChar.name);
    moveRemainder();
}

//sets enemyChar to chosen character (c1)
function chooseEnemy(c1) {
    $("#combat-Text-One").empty();
    $("#combat-Text-Two").empty();
    enemyChar = c1;
    c1.inPlay = true;
    moveChar(c1);
    phase = 2;
    numCharRemaining = numCharRemaining - 1;
    console.log("enemy = " + c1.name);
    console.log(enemyChar.name);
}

// fight function 
function fight() {
    if(phase===2){
        enemyChar.hP = enemyChar.hP - yourChar.aP;
        if (enemyChar.hP <= 0) {
            victory();
            yourChar.aP = yourChar.aP + yourChar.iAp;
        }
        else {
            yourChar.hP = yourChar.hP - enemyChar.cAP;
            console.log("You did " + yourChar.aP + " damage to " + enemyChar.name);
            console.log(enemyChar.name + " did " + enemyChar.cAP + " damage to you.");
            $("#combat-Text-One").text("You did " + yourChar.aP + " damage to " + enemyChar.name);
            $("#combat-Text-Two").text(enemyChar.name + " did " + enemyChar.cAP + " damage to you.");
            yourChar.aP = yourChar.aP + yourChar.iAp;
            //update defender zone text
            // $("#defender-zone")
            console.log(yourChar.hP);
            console.log(enemyChar.hP);
            
            $("." + enemyChar.image).find(".hp-box").text("HP = " + enemyChar.hP);
        }
        $("." + yourChar.image).find(".hp-box").text("HP = " + yourChar.hP)

        if (yourChar.hP <= 0) {
            gameOver();
        }
    
}

}
function gameOver() {
    //display lossText
    //add restart button
    console.log("you lose");
    $("#combat-Text-One").text("You lose. Press restart to try again!");    
    phase = 3;
    addRestart();
}
function victory() {


    console.log("numCharRemaining = " + numCharRemaining);
    
    if (numCharRemaining > 0) {
        
        //display round win text
        $("#defender-Box-Area").empty();
        console.log("you defeated " + enemyChar.name + "! Choose new Opponent.")
        $("#combat-Text-One").text("you defeated " + enemyChar.name + "! Choose new Opponent.");
        $("#combat-Text-Two").empty();
        //back to enemy selection phase
        phase = 1;
        
        //add restart button
    }
    else {
        //display game win text
        $("#combat-Text-One").text("You Win! Hit Restart to start over.");
        $("#combat-Text-Two").empty();
        $("#defender-Box-Area").empty();
        //reset();
        phase=3;
        addRestart();
    }
}
function addRestart(){
    var restartButton = $("<button>");
    restartButton.addClass("restart-button");
    restartButton.text("Restart");
    $("#restart-Button-Zone").append(restartButton);
    $(".restart-button").click(function(){
        console.log("reset");
        reset();
    })

}