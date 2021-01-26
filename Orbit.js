// on page load the initial objects 
var ref = 0;
let constTime = 10;
let pArr = [];
let tracker = 0;


$( document).ready(() => {

/// create html templates
let CreateHTML = function(name, Period, color) {
    let htmlP = '<div class="Planet"><h1>' + name + '</h1><h2> Color: ' +  color +  '</h2><h3> Period: ' + Period + '</h3></div>';
    return htmlP;
}

/// check for on clikc to create a new planet

    
/// get cnavas context
var c = document.querySelector("canvas");
var ctx = c.getContext("2d");
var spaceImg = new Image();

ctx.drawImage(spaceImg, 750, 750)

/// create a planet array.
var planets = [];

/// draw the mass we are orbiting around, in this case the sun
let sunX = 375;
let sunY = 375;
let BaseDivision = 3500000
ctx.beginPath();
ctx.arc(sunX, sunY, 15, 0, 2 * Math.PI);
ctx.fillStyle = 'Yellow';
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = 'Yellow';
ctx.stroke();

/// Calculate the Angle
let AngleCalc = function(angle, x, y) {
    x1 = (Math.cos(angle) * (x - sunX)) - (Math.sin(angle) * (y - sunY)) + sunX
    y1 = (Math.sin(angle) * (x - sunX)) - (Math.cos(angle) * (y - sunY)) + sunY
   // console.log(x1, y1);
   // console.log(angle)
    let arr = [x1, y1];
    return arr
}

/// function to draw initial planet and add it to planet array.
let CreatePlanet = function(name, Size, Dis, Color, angle) {
    Dis = (Dis/BaseDivision) + 375;
   /// console.log("x: " + Dis + " Y: " + sunY);
    let arr = AngleCalc(angle, Dis, sunY);
    let x = arr[0];
    let y = arr[1];
    ctx.beginPath();
    ctx.arc(x, y, Size, 0, 2 * Math.PI)
    ctx.fillStyle = Color;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = Color;
    ctx.stroke(); 

}


/// NEED TO START IMPLEMENTING ORBIT PERIODS AND ECCENTRICITY ///

let PeriodCalc = function(dis) {
    // convert distance from km to miles
    // not needed
    // then convert new distance into AU
    let au = dis/92000000;
    // once the distance have been converted put it into the oribital period formula
     au = (au * au * au)
    let period = Math.sqrt(au)
    /// take away the small amount to help error correction
    period = period;
    return period;
}


/// BE ABLE TO START ADDING CUSTOM PLANETS AND CALCUALTE ORBIT PERIODS USING KEPLERS THIRD LAW ///

/// NEED TO FIND A WAY TO START IMPLEMENTNG ECCENTRICITY ////


let createPlanetOrbit = function(Name, size, dis, color) {
    /// find the period of the planet in accordance to earths orbit, in units AU
    period = PeriodCalc(dis);
    /// load it into html
    let html = CreateHTML(Name, period, color)
    $('.PlanetList').append(html)
    //// create initial Planet angle
    let ang = 0;
    let angIncrease = Math.PI/365;
    let time = period;
    /// add the created planet to the list of planets in orbit
    
    window.setInterval(() => {
        CreatePlanet(Name, size, dis, "black", ang - angIncrease)
        CreatePlanet(Name, size, dis, "black", ang - angIncrease)
        CreatePlanet(Name, size, dis, color, ang)
        ang = ang + angIncrease
    }, (time * constTime))
}


//// START IMPLEMENTING ADDING PLANNETS ON THE GO ////

document.getElementById('add').addEventListener("click", function(){
    let name = prompt("Planet Name?");
    let color = prompt("Color?");
    let size= prompt("Size?")
    let dis = prompt("Distance in miles?")
    createPlanetOrbit(name, size, dis, color)
    
})




createPlanetOrbit("Earth", 2, 93000000, "Green");
createPlanetOrbit("Jupiter", 6, 473450000, "Blue");
createPlanetOrbit("Mars", 2, 143300624, "Red");


/*
let eAng = 0;
let eTime = 1 * constTime;
window.setInterval(function(){
    CreatePlanet("Earth", 5, 147000000, "black", eAng - 0.0174533);
    CreatePlanet("Earth", 5, 147000000, "black", eAng - 0.0174533);
    CreatePlanet("Earth", 5, 147000000, "Green", eAng);
    eAng += 0.0174533;
}, eTime);

let mAng = 0;
let mTime = 1.90833333333 * constTime;
window.setInterval(function(){
    CreatePlanet("Earth2", 2, 247000000, "Black", mAng - 0.0174533);
    CreatePlanet("Earth2", 2, 247000000, "Black", mAng - 0.0174533);
    CreatePlanet("Earth2", 2, 247000000, "Purple", mAng);
    mAng += 0.0174533;
}, mTime)
*/

//// ADD OPTION TO ADD PLANETS AT THE START /////


//// ONCE THE PLANETS HAVE BEEN CREATED START TO DISPLAY DATA ON THE LEFT HALF SIDE OF THE PAGE IN REAL TIME ////




})
