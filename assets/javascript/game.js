var obiWan;
var darthMaul;
var darthSidious;
var lukeSkywalker;
var characterArray;
var yourChar;
var enemyChar;
var numCharRemaining;
var phase = 0;

$(document).ready(function () {


    obiWan = { name: "Obi-Wan Kenobi", hP: 120, iAp: 8, aP: 8, cAP: 12, image: "obi-wan" };
    darthMaul = { name: "Darth Maul", hP: 180, iAp: 4, aP: 4, cAP: 25, image: "maul" };
    darthSidious = { name: "Darth Sidious", hP: 150, iAp: 6, aP: 6, cAP: 20, image: "sidious" };
    lukeSkywalker = { name: "Luke Skywalker", hP: 100, iAp: 100, aP: 100, cAP: 5, image: "luke" };
    characterArray = [obiWan, darthMaul, darthSidious, lukeSkywalker];
    numCharRemaining = characterArray.length;
    imgSrc = '<img src=assets/img/' + lukeSkywalker.image + '.jpg>';
    // function addImages(){
    //     characterArray.forEach(function(element){
    //         imgSrc="/assets/img/"+element.image+".jpg";
    //        // element.setAttribute("src","../img/"+element.image+".jpg");
    //         $("#enemy-Character-Box-Area").prepend('<img>',{id:element.image,src:imgSrc});
    //         var elementToAdd= document.createElement(element.image);
    //         elementToAdd.setAttribute
    //         $("#enemy-Character-Box-Area").append(elementToAdd);
    //         console.log(element.image);
    //         console.log(imgSrc);
    //     });

    // }
    //addImages();
    function availableChoices() {

        characterArray.forEach(function (element) {
            var newBox = $("<div>");
            newBox.addClass(element.image);
            $("#placeholder-Zone").append(newBox);
        });
    }

    availableChoices();
    $(".luke").click(function () {
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
    // var lukeBox = $("<div>");
    // lukeBox.addClass("luke");

    // $("#enemy-Character-Box-Area").append(lukeBox);
});
function reset() {
    obiWan = { name: "Obi-Wan Kenobi", hP: 120, iAp: 8, aP: 8, cAP: 12, image: "obi-wan" };
    darthMaul = { name: "Darth Maul", hP: 180, iAp: 4, aP: 4, cAP: 25, image: "maul" };
    darthSidious = { name: "Darth Sidious", hP: 150, iAp: 6, aP: 6, cAP: 20, image: "sidious" };
    lukeSkywalker = { name: "Luke Skywalker", hP: 100, iAp: 32, aP: 32, cAP: 5, image: "luke" };
    characterArray = [obiWan, darthMaul, darthSidious, lukeSkywalker];
    yourChar;
    // enemyArray[];
    enemyChar;
    imgSrc = '<img src=assets/img/' + lukeSkywalker.image + '.jpg>';
}
function moveChar(c1) {
    var charClass = c1.image;
    if (phase === 0) {
        $("." + charClass).appendTo("#your-Character-Box");
    }
    if (phase === 1) {
        $("." + charClass).appendTo("#defender-Box-Area");
    }
}
//sets yourChar to chosen char(c1)
function chooseChar(c1) {
    yourChar = c1;
    moveChar(c1);
    phase = 1;
    numCharRemaining = numCharRemaining - 1;
    console.log("chooseChar " + c1.name);
    console.log(yourChar.name);
}
// function chooseChar(){
//     console.log("chooseChar");
// }
//sets enemyChar to chosen character (c1)
function chooseEnemy(c1) {
    enemyChar = c1;    
    moveChar(c1);
    phase = 2;
    numCharRemaining = numCharRemaining - 1;
    console.log("enemy = " + c1.name);
    console.log(enemyChar.name);
    //characterArray.remove(c1);
}

// character 1 (c1) attacks character 2 (c2) 
//performs the fight calculations and updates health and cAP for c1 and c2 
function fight(c1, c2) {
    c2.hP = c2.hP - c1.aP;
    c1.hP = c1.hP - c2.cAP;
    console.log("You did " + c1.aP + " damage to " + c2.name);
    console.log(c2.name + " did " + c2.cAP + " damage to you.");

    c1.aP = c1.aP + c1.iAp;
    if (c1.hP <= 0) {
        //gameOver();
    }
    else if (c2.hP <= 0) {
        //victory();
    }
}
//alternate fight function 
function fight() {
    yourChar.hP = yourChar.hP - enemyChar.cAP;
    enemyChar.hP = enemyChar.hP - yourChar.aP;
    console.log("You did " + yourChar.aP + " damage to " + enemyChar.name);
    console.log(enemyChar.name + " did " + enemyChar.cAP + " damage to you.");
    yourChar.aP = yourChar.aP + yourChar.iAp;
    console.log(yourChar.hP);
    console.log(enemyChar.hP);
    if (yourChar.hP <= 0) {
        gameOver();
    }
    else if (enemyChar.hP <= 0) {
        victory();

    }
}
function gameOver() {
    //display lossText
    //add restart button
    console.log("you lose");
    reset();
}
function victory() {
    if (numCharRemaining <= 0) {
        //display game win text
        console.log("you win!");
        //add restart button
    }
    else {
        //display round win text
        //chooseChar();
        console.log("you defeated " + enemyChar.name + "! Choose new Opponent.")
        phase = 1;
    }
}
