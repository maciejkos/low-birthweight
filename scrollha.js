
var margin = {t: 20, r: 20, b: 20, l: 20};
var w = d3.select('.right').node().clientWidth - margin.l - margin.r,
    h = d3.select('.right').node().clientHeight/2 - margin.t - margin.b;

//set up density plot
var married = d3.select("#left")
    .append('svg')
    .attr('class', 'chart')
    .attr('width', w)
    .attr('height', h)
    .append('g')
    .attr('class', 'densityMarried')
    .attr('width', w+ margin.l + margin.r)
    .attr('height', h+ margin.t + margin.b)
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');
//set up dots
var married_dots1=d3.select("#left").append("svg")
    .attr("class","plotBlack")
    .attr('width', w/2)
    .attr('height', h);
var married_dots2=d3.select('#left').append("svg")
    .attr("class","plotWhite")
    .attr('width', w/2)
    .attr('height', h);


//var svg=d3.select(".left");
//svg.selectAll('*').remove();

//
//var education=d3.select("#left")
//    .append('svg')
//    .attr('class', 'chart')
//    .attr('width', w)
//    .attr('height', h)
//    .append('g')
//    .attr('class', 'densityEducation')
//    .attr('width', w+ margin.l + margin.r)
//    .attr('height', h+ margin.t + margin.b)
//    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');
//var education_dots1=d3.select("#left").append("svg")
//    .attr("class","plotBlack")
//    .attr('width', w)
//    .attr('height', h);
//var education_dots2=d3.select('#left').append("svg")
//    .attr("class","plotWhite")
//    .attr('width', w)
//    .attr('height', h);

queue()
    //.defer(d3.csv, 'densityBlack.csv', parse, plotBlack)
    .defer(d3.csv, 'densitySingle.csv', parse)
    .defer(d3.csv, 'densityNoCollege.csv', parse)
    .await(dataLoaded);



function dataLoaded(err,densitySingle,densityEducation)
{
    var controller = new ScrollMagic.Controller({
        addIndicators: true
    });

    //Then you create a scene
    //Then you register the scene with the controller
    var intro = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: ".intro",
        duration: 400,
        triggerHook: 0,
        offset: 0
    })
        .on('enter', function (e) {
        })
        .addTo(controller);

    //
    var scene1 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-1",
        duration: 300,
        triggerHook: 0,
        offset: 0})
        .setClassToggle("#left", "active1") // add class toggle
        .addIndicators() // add indicators (requires plugin)
        .on('enter', function (e)
        {

            var drawDots_1 = d3.dotsDraw().target(69).race("BLACK");
            var drawDots_2 = d3.dotsDraw().target(31).race("WHITE");
            var densityPlotModule = d3.densityPlot()
                .variable0("married")
                .variable1("single")
                .width(w ).height(h/3*2 );

            married_dots1.call(drawDots_1);
            married_dots2.call(drawDots_2);
            married
                .datum(densitySingle)
                .call(densityPlotModule);

            console.log("scene 1");
        })
        .addTo(controller);

    //
    //scene1.removeClassToggle(true);

    //scene1.removeScene();

    var scene2 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-2",
        duration: 1400,
        triggerHook: 0,
        offset: 0})
        .setClassToggle("#left", "active2") // add class toggle
        .addIndicators() // add indicators (requires plugin)
        .on('enter', function (e)
        {

            var drawDots_3 = d3.dotsDraw().target(30).race("BLACK");
            var drawDots_4 = d3.dotsDraw().target(30).race("WHITE");

            education_dots1.call(drawDots_3);
            education_dots2.call(drawDots_4);

            var densityPlotModule = d3.densityPlot()
                .variable0("education")
                .variable1("no education")
                .width(w ).height(h/3*2 );
            education
                .datum(densityEducation)
                .call(densityPlotModule);

            console.log("scene 2");
        })
        .addTo(controller);

    var scene3 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-3",
        duration: 700,
        triggerHook: 0,
        offset: 0})
        .setClassToggle(".left", "active3") // add class toggle
        .addIndicators() // add indicators (requires plugin)
        .on('enter', function (e)
        {

        })
        .addTo(controller);


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