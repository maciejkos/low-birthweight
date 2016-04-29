// you need to give divWidth - it should be the width of the SVG where you want to draw this;
//
//var w = d3.select('#plot').node().clientWidth,
//    h = d3.select('#plot').node().clientHeight;
//var margin = {t: 20, r: 20, b: 20, l: 20};
//var chartW = w - margin.l - margin.r,
//    chartH = h - margin.t - margin.b;


//divWidth = chartW;

var canvas = d3.select('#plot')
    .append('canvas')
    .attr('width',divWidth)
    .attr('height',divWidth) // this makes it a square
    .node(),
    ctx = canvas.getContext('2d');

ctx.strokeStyle = "black";
ctx.font = divWidth/50 +"px serif";

xMoveUp = divWidth/52;
yMoveUp = divWidth/13;

function one() {
    ctx.fillText("LOW", divWidth/2, divWidth/3.3 - yMoveUp);
    ctx.fillText("INCOME", divWidth/2 - divWidth/80, divWidth/3.1 - yMoveUp);
}
function two() {
    // draw arch
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(x = divWidth/2 + divWidth*0.1 + xMoveUp, y = divWidth/2 - yMoveUp, radius = divWidth/5 , startAngle = 1.5 * Math.PI, endAngle = 0 * Math.PI); // 1
    ctx.stroke();
    ctx.closePath();

    // draw arrow
    ctx.beginPath();
    archEndX = divWidth/2 + divWidth*0.1 + divWidth/5 + xMoveUp;
    archEndY = divWidth/2 - yMoveUp;

    ctx.moveTo(archEndX-divWidth/100,archEndY);
    ctx.lineTo(archEndX+divWidth/100,archEndY);
    ctx.lineTo(archEndX,archEndY+divWidth/50);
    ctx.fill();
}
//console.log(divWidth);
function three() {
    ctx.fillText("LOW", divWidth/2 + divWidth/3.6 + xMoveUp, divWidth/2 + divWidth*0.05 - yMoveUp/2);
    ctx.fillText("BIRTH WEIGHT", divWidth/2 + divWidth/4.3 + xMoveUp, divWidth/2 + divWidth*0.07 - yMoveUp/2);
    textBottom = divWidth/2 + divWidth*0.07;
}
function four() {
    ctx.beginPath();
    //ctx.moveTo(archEndX-divWidth/100,archEndY);
    ctx.lineWidth = 5;
    ctx.arc(x = divWidth/2 + divWidth*0.1 + xMoveUp, y = divWidth/2 + divWidth/2*0.17, radius = divWidth/5, startAngle = 2 * Math.PI, endAngle = 1/2 * Math.PI); // 2
    ctx.stroke();
    ctx.closePath();

    // draw arrow
    ctx.beginPath();
    archEndX = divWidth/2 + divWidth*0.1 + xMoveUp;
    archEndY = divWidth/2 + divWidth/5 + divWidth/2*0.17;

    ctx.moveTo(archEndX,archEndY - divWidth/100);
    //ctx.moveTo(archEndX-divWidth/100,archEndY);
    ctx.lineTo(archEndX,archEndY + divWidth/100);
    ctx.lineTo(archEndX-divWidth/50,archEndY);
    ctx.fill();
}
function five() {
    ctx.fillText("POOR", divWidth/2, divWidth/5 + divWidth/5 + divWidth/3.3 + divWidth*0.08);
    ctx.fillText("HEALTH", divWidth/2 - divWidth/100, divWidth/5 + divWidth/5 + divWidth/3.1 + divWidth*0.08);
}
function six() {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(x = divWidth/2 - divWidth*0.05 - xMoveUp, y = divWidth/2 + divWidth/2*0.17, radius = divWidth/5, startAngle = 2.5 * Math.PI, endAngle = 1 * Math.PI); // 3
    ctx.stroke();
    ctx.closePath();

    // draw arrow
    ctx.beginPath();
    archEndX = divWidth/2 - divWidth*0.05 - divWidth/5 - xMoveUp;
    archEndY = divWidth/2+ divWidth*0.1;

    ctx.moveTo(archEndX-divWidth/100,archEndY);
    ctx.lineTo(archEndX+divWidth/100,archEndY);
    ctx.lineTo(archEndX,archEndY-divWidth/50);
    ctx.fill();
}
function seven() {
    ctx.fillText("LOW", divWidth/2 - divWidth/5 - divWidth/14 - xMoveUp, divWidth/2 + divWidth*0.05 - yMoveUp/2);
    ctx.fillText("EDUCATION", divWidth/2 - divWidth/5 - divWidth/10 - xMoveUp, divWidth/2 + divWidth*0.07 - yMoveUp/2);
}
function eight() {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(x = divWidth/2 - divWidth*0.05 - xMoveUp, y = divWidth/2 - yMoveUp, radius = divWidth/5, startAngle = 3 * Math.PI, endAngle = 1.5 * Math.PI); // 4
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    archEndX = divWidth/2 - divWidth*0.05 - xMoveUp;
    archEndY = divWidth/2 - divWidth/5 + divWidth/2*0.002 - yMoveUp;
    //archEndY = divWidth/2 - divWidth/5 + divWidth/2*0.01;

    ctx.moveTo(archEndX,archEndY + divWidth/100);
    //ctx.moveTo(archEndX-divWidth/100,archEndY);
    ctx.lineTo(archEndX,archEndY - divWidth/100);
    ctx.lineTo(archEndX+divWidth/50,archEndY);
    ctx.fill();
}


//one();
//two();
//three();
//four();
//five();
//six();
//seven();
//eight();
