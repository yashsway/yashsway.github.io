// TODO: Kerning fixes for weird screen sizes
function responsiveFixes() {}

// Splash animation
//Usually caps around twice the interval
var allCircles = [];
var circleCount = 0;
var colorArray = [];
var colorCount = 0;
var generatedColors = randomColor({ luminosity: 'light', count: 10 });
var colorArray = colorArray.concat(generatedColors);
colorArray = shuffle(colorArray);
var s = Snap("#circleLoader");
var window_focus = true;

//Simple ID gen appends an inc count on every call
function generateID() {
    circleCount += 1;
    return 'circle' + circleCount;
}
//Utility function to print the ID's of all SVG circles in storage
function printCircleIds() {
    var list = [];
    for (let i = 0; i < allCircles.length; i++) {
        list.push(allCircles[i].attr('id'));
    }
    return list.toString();
}
//Find and destroy
function clean(svgID) {
    for (let i = 0; i < allCircles.length; i++) {
        //Temporarily store the current SVG selected
        var val = allCircles[i];
        //If the id of the SVG is not undefined
        if (typeof allCircles[i].attr('id') != undefined) {
            if (allCircles[i].attr('id') == svgID) {
                //Remove SVG from DOM
                $('#' + val.attr('id')).remove();
                //Remove SVG from array
                allCircles.splice(i, 1);
            }
        }
    }
}
//Binds animation to SVG circle of a certain ID
function animateCircle(obj, svgID) {
    obj.animate({
        //scale
        r: 800
    }, 20000, mina.easeInOut, function() {
        //Fade to 0 opacity after scale is complete
        this.animate({
            opacity: 0
        }, 15000, mina.easeInOut, function() {
            //Remove SVG circle from DOM
            $('#' + this.attr('id'))[0].remove();
            //Remove SVG circle from storage
            allCircles.splice(allCircles.indexOf(this), 1);
        });
    });
}
//Store SVG object and bind animation
function storeCircle(obj, svgID) {
    allCircles.push(obj);
    animateCircle(obj, svgID);
}
//Array Shuffler based on Knuth algorithm
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//Random color sequence
function sequentialRandomColor(interval = 7) {
    switch (true) {
        case (colorCount <= interval):
            colorCount += 1;
            return colorArray[0];
        case (colorCount <= interval * 2):
            colorCount += 1;
            return colorArray[1];
        case (colorCount <= interval * 3):
            colorCount += 1;
            if (colorCount > interval * 3) {
                var temp = colorArray[2];
                //Shuffle colors when max (interval*3) is reached
                colorArray = shuffle(colorArray);
                //Restart
                colorCount = 0;
                //Return color stored from earlier
                return temp;
            }
            return colorArray[2];
        default:
            return '#000';
            break;
    }

    function increment() {
        if (colorCount < interval * 3) {
            colorCount += 1;
        } else {
            //Shuffle colors when max (interval*3) is reached
            colorArray = shuffle(colorArray);
            //Restart
            colorCount = 0;
        }
    }
}

function generateRandomCircles(count = 3) {
    if (window_focus == true) {
        for (let i = 0; i < count; i++) {
            //Extract viewport dimensions
            var screenHeight = $(window).height();
            var screenWidth = $(window).width();
            //Assign random location
            let x = Math.floor(Math.random() * ((screenWidth - 0) + 1) + (1));
            let y = Math.floor((Math.random() * screenHeight) + 1) + 1;
            //Generate unique ID for every circle
            let unique = generateID();
            storeCircle(
                (s.circle(x, y, 1)).attr({
                    fill: sequentialRandomColor(6),
                    id: unique
                }),
                unique
            );
        }
    }
}
//Start generating circles every 3 seconds.
var begin = setInterval(() => generateRandomCircles(1), 3000);
//Keep track of whether the browser tab or window is in focus. If not, pause animations and other background js processes for performance
$(window).focus(function() {
    window_focus = true;
}).blur(function() {
    window_focus = false;
});