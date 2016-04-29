var w = d3.select('.canvas').node().clientWidth,
    h = d3.select('.canvas').node().clientHeight;

var margin = {t: 20, r: 20, b: 20, l: 20};
var width = document.getElementById('scene-2').clientWidth - margin.l - margin.r,
    height = document.getElementById('scene-2').clientHeight - margin.t - margin.b;


//marital dots
//var drawDots_1 = d3.dotsDraw().target(62).race("BLACK");
//var drawDots_2 = d3.dotsDraw().target(20).race("WHITE");
//d3.select('#plot2').append('g').call(drawDots_1);
//d3.select('#plot2').append("g").call(drawDots_2);
var plot1 = d3.select('#chart1')
    .append('svg')
    //.attr('class', 'chart2')
    .attr('width', width/2)
    .attr('height', height/2)
    .append('g')
    .attr('class', 'densityBlack')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');


var plot2 = d3.select('#chart2')
    .append('svg')
    //.attr('class', 'chart2')
    .attr('width', width/2)
    .attr('height', height/2)
    .append('g')
    .attr('class', 'densityMarital')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

var plot3 = d3.select('#chart3')
    .append('svg')
    //.attr('class', 'svg')
    .attr('width', width/2)
    .attr('height', height/2)
    .append('g')
    .attr('class', 'densityTeen')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

var plot4 = d3.select('#chart4')
    .append('svg')
    //.attr('class', 'svg')
    .attr('width', width/2)
    .attr('height', height/2)
    .append('g')
    .attr('class', 'densityEducation')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

var plot5 = d3.select('#chart5')
    .append('svg')
    //.attr('class', 'svg')
    .attr('width', width/2)
    .attr('height', height/2)
    .append('g')
    .attr('class', 'densityMedicaid')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');
//
var plot6 = d3.select('#chart6')
    .append('svg')
    //.attr('class', 'svg')
    .attr('width', width/2)
    .attr('height', height/2)
    .append('g')
    .attr('class', 'densityWic')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');
//
var plot7 = d3.select('#chart7')
    .append('svg')
    //.attr('class', 'svg')
    .attr('width', width/2)
    .attr('height', height/2)
    .append('g')
    .attr('class', 'densityPrenatal')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');



queue()
    .defer(d3.csv, 'densityBlack.csv', parse, plotBlack)
    .defer(d3.csv, 'densitySingle.csv', parse, plotMarital)
    .defer(d3.csv, 'densityNoCollege.csv', parse, plotEducation)
    .defer(d3.csv, 'densityMedicaid.csv', parse, plotMedicaid)
    .defer(d3.csv, 'densityNoPrecare.csv', parse, plotPrecare)
    .defer(d3.csv, 'densityTeen.csv', parse, plotTeen)
    .defer(d3.csv, 'densityWic.csv', parse, plotWic);


//scroll
function plotBlack(err, data) {
    //marital
    //var drawDots_1 = d3.dotsDraw().target(69).race("BLACK");
    //var drawDots_2 = d3.dotsDraw().target(31).race("WHITE");
    //d3.select('#plot1').append('g').call(drawDots_1);
    //d3.select('#plot1').append("g").call(drawDots_2);

    var densityPlotModule = d3.densityPlot()
        .variable0("White")
        .variable1("Black")
        .width(width/2 ).height(height/2 );

    plotReady1 = d3.select('.densityBlack')
        .datum(data)
        .call(densityPlotModule);

}



function plotMarital(err, data) {
    //marital
    var drawDots_1 = d3.dotsDraw().target(69).race("BLACK");
    var drawDots_2 = d3.dotsDraw().target(31).race("WHITE");
    d3.select('#plot2').append('g').call(drawDots_1);
    d3.select('#plot2').append("g").call(drawDots_2);

    var densityPlotModule = d3.densityPlot()
        .variable0("married")
        .variable1("single")
        .width(width / 2).height(height / 4);

    plotReady2 = d3.select('.densityMarital')
        .datum(data)
        .call(densityPlotModule);

}

function plotTeen(err,data) {
    var drawDots_3 = d3.dotsDraw().target(63).race("BLACK");
    var drawDots_4 = d3.dotsDraw().target(37).race("WHITE");
    d3.select('#plot3').append('g').call(drawDots_3);
    d3.select('#plot3').append("g").call(drawDots_4);

    var densityPlotModule = d3.densityPlot()
        .variable0("not teen pregnancy")
        .variable1("teen pregnancy")
        .width(width/2).height(height/4);
    //    .value(data);

    plotReady3 = d3.select('.densityTeen')
        .datum(data)
        .call(densityPlotModule);
}

function plotEducation(err,data) {
    var drawDots_5 = d3.dotsDraw().target(59).race("BLACK");
    var drawDots_6 = d3.dotsDraw().target(41).race("WHITE");
    d3.select('#plot4').append('g').call(drawDots_5);
    d3.select('#plot4').append("g").call(drawDots_6);

    var densityPlotModule = d3.densityPlot()
        .variable0("college grad")
        .variable1("not college grad")
        .width(width/2).height(height/4);
    //    .value(data);

    plotReady4 = d3.select('.densityEducation')
        .datum(data)
        .call(densityPlotModule);
}

function plotMedicaid(err,data) {
    var drawDots_7 = d3.dotsDraw().target(65).race("BLACK");
    var drawDots_8 = d3.dotsDraw().target(35).race("WHITE");
    d3.select('#plot5').append('g').call(drawDots_7);
    d3.select('#plot5').append("g").call(drawDots_8);

    var densityPlotModule = d3.densityPlot()
        .variable0("didn't use medicaid")
        .variable1("used medicaid")
        .width(width/2).height(height/4);
    //    .value(data);

    plotReady5 = d3.select('.densityMedicaid')
        .datum(data)
        .call(densityPlotModule);
}




function plotWic(err,data) {
    var drawDots_9 = d3.dotsDraw().target(65).race("BLACK");
    var drawDots_10 = d3.dotsDraw().target(35).race("WHITE");
    d3.select('#plot6').append('g').call(drawDots_9);
    d3.select('#plot6').append("g").call(drawDots_10);

    var densityPlotModule = d3.densityPlot()
        .variable0("didn't use WIC")
        .variable1("used WIC")
        .width(width/2).height(height/4);
    //    .value(data);

    plotReady6 = d3.select('.densityWic')
        .datum(data)
        .call(densityPlotModule);
}

function plotPrecare(err,data) {
    var drawDots_11 = d3.dotsDraw().target(72).race("BLACK");
    var drawDots_12 = d3.dotsDraw().target(28).race("WHITE");
    d3.select('#plot7').append('g').call(drawDots_11);
    d3.select('#plot7').append("g").call(drawDots_12);

    var densityPlotModule = d3.densityPlot()
        .variable0("access prenatal care")
        .variable1("no access to prenatal care")
        .width(width/2).height(height/4);
    //    .value(data);

    plotReady7 = d3.select('.densityPrenatal')
        .datum(data)
        .call(densityPlotModule);
}






function parse(d) {
    estimate0 = +d.estimate0;
    estimate1 = +d.estimate1;

    return {
        x0: +d.x0,
        y0: +d.y0,
        x1: +d.x1,
        y1: +d.y1
    }
}