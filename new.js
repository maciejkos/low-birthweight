/**
 * Created by KiniLuo on 4/15/16.
 */

var margin = {t: 20, r: 20, b: 20, l: 20};
var w = d3.select('.right').node().clientWidth - margin.l - margin.r,
    h = d3.select('.right').node().clientHeight/2 - margin.t - margin.b;

//set up density plot
var chart = d3.select(".left")
    .append('svg')
    .attr('class', 'chart')
    .attr('width', w)
    .attr('height', h);
    //.attr('class', 'densityMarried')
    //.attr('width', w+ margin.l + margin.r)
    //.attr('height', h+ margin.t + margin.b)
    //.attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');
//set up dots
var  dotsBlack=d3.select(".left").append("svg")
    .attr("class","plotBlack")
    .attr('width', w/2)
    .attr('height', h);
var dotsWhite=d3.select('.left').append("svg")
    .attr("class","plotWhite")
    .attr('width', w/2)
    .attr('height', h);


//var education=d3.select(".left")
//    .append('svg')
//    .attr('class', 'chart')
//    .attr('width', w)
//    .attr('height', h)
//    .append('g')
//    .attr('class', 'densityEducation')
//    .attr('width', w+ margin.l + margin.r)
//    .attr('height', h+ margin.t + margin.b)
//    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');
//var education_dots1=d3.select(".left").append("svg")
//    .attr("class","plotBlack")
//    .attr('width', w)
//    .attr('height', h);
//var education_dots2=d3.select('.left').append("svg")
//    .attr("class","plotWhite")
//    .attr('width', w)
//    .attr('height', h);

queue()
    .defer(d3.csv, 'densitySingle.csv', parse)
    .defer(d3.csv, 'densityNoCollege.csv', parse)
    .defer(d3.csv, 'densityTeen.csv', parse)
    .defer(d3.csv, 'densityWic.csv', parse)
    .defer(d3.csv, 'densityMedicaid.csv', parse)
    .defer(d3.csv, 'densityNoPrecare.csv', parse)
    .await(dataLoaded);



function dataLoaded(err,densitySingle,densityEducation,densityTeen,densityWic,densityMed,densityPre)
    {
        var controller = new ScrollMagic.Controller({
            addIndicators: true
        });

    //Then you create a scene
    //Then you register the scene with the controller
    //    var intro = new ScrollMagic.Scene({
    //        //specifies options for the scene
    //        triggerElement: ".intro",
    //        duration: 400,
    //        triggerHook: 0,
    //        offset: 0
    //    })
    //        .on('enter', function (e) {})
    //        .addTo(controller);

    //draw the marital status
        var scene1 = new ScrollMagic.Scene({
            //specifies options for the scene
            triggerElement: "#scene-1",
            duration: 700,
            triggerHook: 0,
            offset: 0})
            .setClassToggle(".left", "active1") // add class toggle
            .addIndicators() // add indicators (requires plugin)
            .on('enter', function (e)
            {
                $(".densityEducation").remove();
                //$(".dotsBlack").remove();
                //$(".dotsWhite").remove();
                //console.log("jinni")

                var drawDots_1 = d3.dotsDraw().target(77).race("BLACK");
                var drawDots_2 = d3.dotsDraw().target(35).race("WHITE");

                var densityPlotModule1 = d3.densityPlot()
                    .variable0("married")
                    .variable1("single")
                    .width(w ).height(h/3*2 );

                dotsBlack.append('g').attr('class', 'densityMarried').call(drawDots_1);
                dotsWhite.append('g').attr('class', 'densityMarried').call(drawDots_2);

                //draw density plot
                var marital=chart
                    .append('g')
                    .attr('class', 'densityMarried')
                    .attr('width', w+ margin.l + margin.r)
                    .attr('height', h+ margin.t + margin.b)
                    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

                marital
                    .datum(densitySingle)
                    .call(densityPlotModule1);

                console.log("scene 1");
            })
            .on("leave",function(e){
                $(".densityMarried").remove();
                console.log("jinni")
            })
            .addTo(controller);


    //draw eduction
        var scene2 = new ScrollMagic.Scene({
            //specifies options for the scene
            triggerElement: "#scene-2",
            duration: 700,
            triggerHook: 0,
            offset: 0})
            .setClassToggle(".left", "active2") // add class toggle
            .addIndicators() // add indicators (requires plugin)
            .on('enter', function (e)
            {
                $(".densityTeen").remove();
                var drawDots_3 = d3.dotsDraw().target(81).race("BLACK");
                var drawDots_4 = d3.dotsDraw().target(57).race("WHITE");

                dotsBlack.append('g').attr('class', 'densityEducation').call(drawDots_3);
                dotsWhite.append('g').attr('class', 'densityEducation').call(drawDots_4);

                var densityPlotModule2 = d3.densityPlot()
                    .variable0("education")
                    .variable1("no education")
                    .width(w ).height(h/3*2 );

                var education=chart
                    .append('g')
                    .attr('class', 'densityEducation')
                    .attr('width', w+ margin.l + margin.r)
                    .attr('height', h+ margin.t + margin.b)
                    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');
                education
                    .datum(densityEducation)
                    .call(densityPlotModule2);

                console.log("scene 2");
            })
            .on("leave",function(e){
                $(".densityEducation").remove();
            })
            .addTo(controller);


    //draw Teen pregnancy
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
                $(".densityWic").remove();
                var drawDots_5 = d3.dotsDraw().target(11).race("BLACK");
                var drawDots_6 = d3.dotsDraw().target(6).race("WHITE");

                dotsBlack.append('g').attr('class', 'densityTeen').call(drawDots_5);
                dotsWhite.append('g').attr('class', 'densityTeen').call(drawDots_6);

                var densityPlotModule3 = d3.densityPlot()
                    .variable0("None Teen")
                    .variable1("Teen")
                    .width(w ).height(h/3*2 );

                var Teen=chart
                    .append('g')
                    .attr('class', 'densityTeen')
                    .attr('width', w+ margin.l + margin.r)
                    .attr('height', h+ margin.t + margin.b)
                    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');
                Teen
                    .datum(densityTeen)
                    .call(densityPlotModule3);
            })
            .on("leave",function(e){
                $(".densityTeen").remove();
            })
            .addTo(controller);

        //draw WIC
        var scene4 = new ScrollMagic.Scene({
            //specifies options for the scene
            triggerElement: "#scene-4",
            duration: 700,
            triggerHook: 0,
            offset: 0})
            .setClassToggle(".left", "active4") // add class toggle
            .addIndicators() // add indicators (requires plugin)
            .on('enter', function (e)
            {
                $(".densityMedicaid").remove();
                var drawDots_7 = d3.dotsDraw().target(66).race("BLACK");
                var drawDots_8 = d3.dotsDraw().target(36).race("WHITE");

                dotsBlack.append('g').attr('class', 'densityWic').call(drawDots_7);
                dotsWhite.append('g').attr('class', 'densityWic').call(drawDots_8);

                var densityPlotModule4 = d3.densityPlot()
                    .variable0("No Wic")
                    .variable1("Wic")
                    .width(w ).height(h/3*2 );

                var Wic=chart
                    .append('g')
                    .attr('class', 'densityWic')
                    .attr('width', w+ margin.l + margin.r)
                    .attr('height', h+ margin.t + margin.b)
                    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

                Wic
                    .datum(densityWic)
                    .call(densityPlotModule4);
            })
            .on("leave",function(e){
                $(".densityWic").remove();
            })
            .addTo(controller);


        //draw Medicaid
        var scene5 = new ScrollMagic.Scene({
            //specifies options for the scene
            triggerElement: "#scene-5",
            duration: 700,
            triggerHook: 0,
            offset: 0})
            .setClassToggle(".left", "active5") // add class toggle
            .addIndicators() // add indicators (requires plugin)
            .on('enter', function (e)
            {
                $(".densityPrecare").remove();
                var drawDots_9 = d3.dotsDraw().target(79).race("BLACK");
                var drawDots_10 = d3.dotsDraw().target(37).race("WHITE");

                dotsBlack.append('g').attr('class', 'densityMed').call(drawDots_9);
                dotsWhite.append('g').attr('class', 'densityMed').call(drawDots_10);

                var densityPlotModule5 = d3.densityPlot()
                    .variable0("No Medicaid")
                    .variable1("Medicaid")
                    .width(w ).height(h/3*2 );

                var Med=chart
                    .append('g')
                    .attr('class', 'densityMed')
                    .attr('width', w+ margin.l + margin.r)
                    .attr('height', h+ margin.t + margin.b)
                    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

                Med
                    .datum(densityMed)
                    .call(densityPlotModule5);
            })
            .on("leave",function(e){
                $(".densityMed").remove();
            })
            .addTo(controller);


        //prenatal care
        var scene6 = new ScrollMagic.Scene({
            //specifies options for the scene
            triggerElement: "#scene-6",
            duration: 700,
            triggerHook: 0,
            offset: 0})
            .setClassToggle(".left", "active6") // add class toggle
            .addIndicators() // add indicators (requires plugin)
            .on('enter', function (e)
            {

                $(".densityMed").remove();
                var drawDots_11 = d3.dotsDraw().target(3).race("BLACK");
                var drawDots_12 = d3.dotsDraw().target(1).race("WHITE");

                dotsBlack.append('g').attr('class', 'densityPre').call(drawDots_11);
                dotsWhite.append('g').attr('class', 'densityPre').call(drawDots_12);

                var densityPlotModule6 = d3.densityPlot()
                    .variable0("prenatal care")
                    .variable1("no prenatal care")
                    .width(w ).height(h/3*2 );

                var pre=chart
                    .append('g')
                    .attr('class', 'densityPre')
                    .attr('width', w+ margin.l + margin.r)
                    .attr('height', h+ margin.t + margin.b)
                    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

                pre
                    .datum(densityPre)
                    .call(densityPlotModule6);
            })
            .on("leave",function(e){
                $(".densityPre").remove();

            })
            .addTo(controller);

    }













function parse(d) {
    //estimate0 = +d.estimate0;
    //estimate1 = +d.estimate1;

    return {
        estimate0: +d.estimate0,
        estimate1: +d.estimate1,
        x0: +d.x0,
        y0: +d.y0,
        x1: +d.x1,
        y1: +d.y1
    }
}