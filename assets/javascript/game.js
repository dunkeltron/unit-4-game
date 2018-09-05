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


    obiWan = { name: "Obi-Wan Kenobi", hP: 120, iAp: 8, aP: 8, cAP: 12,inPlay:false, image: "obi-wan" };
    darthMaul = { name: "Darth Maul", hP: 180, iAp: 4, aP: 4, cAP: 25, inPlay:false,image: "maul" };
    darthSidious = { name: "Darth Sidious", hP: 150, iAp: 6, aP: 6, cAP: 20, inPlay:false,image: "sidious" };
    lukeSkywalker = { name: "Luke Skywalker", hP: 100, iAp: 100, aP: 100, cAP: 5, inPlay:false,image: "luke" };
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
            //newBox.innerHtml("<img src=../img/"+element.image+".jpg");
            newBox.attr('id',"selection-Zone");
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
        $("."+charClass).attr('id',"player-Zone");
        $("." + charClass).appendTo("#your-Character-Box");
    }
    if (phase === 1) {
        $("."+charClass).attr('id',"enemy-Zone");
        $("." + charClass).appendTo("#defender-Box-Area");
    }
}
function moveRemainder(){
    characterArray.forEach(function(element){
        if(!element.inPlay){
            var charClass = element.image;
            console.log(element.name + " is inPlay:" + element.inPlay);
            $("."+charClass).attr('id',"available-Zone");
            $("." + charClass).appendTo("#enemy-Character-Box-Area");
        }
    })
}
//sets yourChar to chosen char(c1)
function chooseChar(c1) {
    yourChar = c1;    
    c1.inPlay=true;
    moveChar(c1);
    phase = 1;
    numCharRemaining = numCharRemaining - 1;
    console.log("chooseChar " + c1.name);
    console.log(yourChar.name);
    moveRemainder();
}
// function chooseChar(){
//     console.log("chooseChar");
// }
//sets enemyChar to chosen character (c1)
function chooseEnemy(c1) {
    enemyChar = c1;    
    c1.inPlay=true; 
    moveChar(c1);
    phase = 2;
    numCharRemaining = numCharRemaining - 1;
    console.log("enemy = " + c1.name);
    console.log(enemyChar.name);
    //characterArray.remove(c1);
}

// fight function 
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
    
    $("#defender-Box-Area").empty();
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
