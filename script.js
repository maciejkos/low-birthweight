/**
 * Created by KiniLuo on 4/14/16.
 */
var margin = {t: 20, r: 20, b: 20, l: 50};
var w = d3.select('.right').node().clientWidth - margin.l - margin.r,
    h = d3.select('.right').node().clientHeight / 3 - margin.t - margin.b;

//set up density plot

var chart = d3.select(".left")
    .append('svg')
    .attr('class', 'chart')
    .attr('width', w + 70)
    .attr('height', h + 40);

//set up dots
var dotsBlack = d3.select(".left").append("svg")
    .attr("class", "plotBlack")
    .attr('width', w)
    .attr('height', h);

var dotsWhite = d3.select('.left').append("svg")
    .attr("class", "plotWhite")
    .attr('width', w)
    .attr('height', h);


//Opening page
var controllerIntro = new ScrollMagic.Controller();


var because = new ScrollMagic.Scene({
    //specifies options for the scene
    triggerElement: "#because",
    duration: 4300,
    triggerHook: 0,
    offset: 0
})

    .setClassToggle(".visBecause", "introactiveBecause") // add class toggle
    //.addIndicators({name:"becasue"}) // add indicators (requires plugin)
    .addTo(controllerIntro)
    .on('enter', function (e) {
        $(".plot").remove();
        d3.select(".introactiveBecause").transition().duration(500).attr("style", "opacity: 1;");
    })
    .on("leave", function (e) {
        d3.select(".visBecause").transition().duration(500).attr("style", "opacity: 0;");
    });


var physical = new ScrollMagic.Scene({
    //specifies options for the scene
    triggerElement: "#physical",
    duration: 3400,
    triggerHook: 0,
    offset: 0
})
//.setTween('#introactive1', 0.5, {opacity: 1})
    .setClassToggle(".vis1", "introactive1") // add class toggle
    //.addIndicators({name:"physical"}) // add indicators (requires plugin)
    .addTo(controllerIntro)
    .on('enter', function (e) {
        d3.select(".introactive1").transition().duration(500).attr("style", "opacity: 1;");
    })
    .on("leave", function (e) {
        d3.select(".vis1").transition().duration(500).attr("style", "opacity: 0;");
    });

var mental = new ScrollMagic.Scene({
    //specifies options for the scene
    triggerElement: "#mental",
    duration: 2500,
    triggerHook: 0,
    offset: 0
})
    .setClassToggle(".vis2", "introactive2") // add class toggle
    //.addIndicators({name:"mental"}) // add indicators (requires plugin)
    .addTo(controllerIntro)
    .on('enter', function (e) {
        d3.select(".introactive2").transition().duration(500).attr("style", "opacity: 1;");
    })
    .on("leave", function (e) {
        d3.select(".vis2").transition().duration(500).attr("style", "opacity: 0;");
    });


var education = new ScrollMagic.Scene({
    //specifies options for the scene
    triggerElement: "#education",
    duration: 1600,
    triggerHook: 0,
    offset: 0
})
    .setClassToggle(".vis3", "introactive3") // add class toggle
    //.addIndicators({name:"education"}) // add indicators (requires plugin)
    .addTo(controllerIntro)
    .on('enter', function (e) {
        d3.select(".introactive3").transition().duration(500).attr("style", "opacity: 1;");
    })
    .on("leave", function (e) {
        d3.select(".vis3").transition().duration(500).attr("style", "opacity: 0;");
    });

var social = new ScrollMagic.Scene({
    //specifies options for the scene
    triggerElement: "#social",
    duration: 700,
    triggerHook: 0,
    offset: 0
})
    .setClassToggle(".vis4", "introactive4") // add class toggle
    //.addIndicators({name:"social"}) // add indicators (requires plugin)
    .addTo(controllerIntro)
    .on('enter', function (e) {
        d3.select(".introactive4").transition().duration(500).attr("style", "opacity: 1;");
    })
    .on("leave", function (e) {
        d3.select(".vis4").transition().duration(500).attr("style", "opacity: 0;");
    });


queue()
    .defer(d3.csv, 'densityBlackMeans.csv', parse)
    .defer(d3.csv, 'densitySingle.csv', parse)
    .defer(d3.csv, 'densityNoCollege.csv', parse)
    .defer(d3.csv, 'densityTeen.csv', parse)
    .defer(d3.csv, 'densityWic.csv', parse)
    .defer(d3.csv, 'densityMedicaid.csv', parse)
    .defer(d3.csv, 'densityNoPrecare.csv', parse)
    .await(dataLoaded);


function dataLoaded(err, densityBlack, densitySingle, densityEducation, densityTeen, densityWic, densityMed, densityPre) {

    //draw transition
    var controllerTrans = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });
    var slides = document.querySelectorAll("section.transition");
    for (var i = 0; i < slides.length; i++) {
        new ScrollMagic.Scene({
            triggerElement: slides[i]
        })
            .setPin(slides[i])
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controllerTrans);
    }


    var controller = new ScrollMagic.Controller({
        //addIndicators: true
    });

    sceneVisited = 0;
    globalDispatch = d3.dispatch('update', "downgrade");
    var updateOne = new ScrollMagic.Scene({
        triggerElement: "#one",
        duration: 700,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".updateplot", "activeupdate1") // add class toggle
        //.addIndicators({name: "updateOne"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            $(".plot").remove();
            var densityPlotModule = d3.densityPlotWithUpdate()
                .variable0("Children of black mothers")
                .variable1("Children of white mothers")
                .width(w * 3 / 2).height(h * 3 / 2);


            var bigPlot = d3.select(".updateplot")
                .append('svg')
                .attr('class', 'plot')
                .attr('width', w * 2)
                .attr('height', h * 2)
                .attr('transform', 'translate(' + 55 + ',' + 100 + ')')
                .append('g')
                .attr('class', 'densityBlack')
                .attr('width', w)
                .attr('height', h * 3 / 2)
                .attr('transform', 'translate(' + 55 + ',' + 50 + ')');

            bigPlot
                .datum(densityBlack)
                .call(densityPlotModule);

            if (sceneVisited == 1) {
                globalDispatch.update();
            }

        })
        .on("leave", function (e) {
            $(".plot").remove();
            sceneVisited = 0;
        });


    var updatText1 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#one",
        duration: 700,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".updatetext1", "activeupdatetext1") // add class toggle
        //.addIndicators({name: "updatetext1"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {

            d3.select(".activeupdatetext1").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".updatetext1").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var updatText2 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#one",
        duration: 400,
        triggerHook: 0,
        offset: 300
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".updatetext2", "activeupdatetext2") // add class toggle
        //.addIndicators({name: "updatetext2"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".activeupdatetext2").transition().duration(1000).attr("style", "opacity: 1;");
            globalDispatch.update();
        })
        .on("leave", function (e) {
            d3.select(".updatetext2").transition().duration(1000).attr("style", "opacity: 0;");
            direction = controller.info("scrollDirection");
            if (direction == "REVERSE") {
                //console.log("Downgrade? Well that's easy!");
                globalDispatch.downgrade();
            }
        });

    var updatText3 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#two",
        duration: 700,
        triggerHook: 0,
        offset: 0
    })

        .setClassToggle(".updatetext3", "activeupdatetext3") // add class toggle
        //.addIndicators({name: "updatetext3"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            sceneVisited = 1;

            d3.select(".activeupdatetext3").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
        });


//small multiples
    var scene7 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active13") // add class toggle
        //.addIndicators({name:"multiples"}) // add indicators (requires plugin)
        .on('enter', function (e) {

            $(".cycle").remove();
            $(".chart").remove();
            $(".plotBlack").remove();
            $(".plotWhite").remove();


            var multiples = d3.select(".left")
                .append('svg')
                .attr('class', 'multiples')
                .attr('width', w)
                .attr('height', h * 4);

//marital
            var densityPlotModule1 = d3.densityPlotNoLines()
                .variable0("Married")
                .variable1("Single")
                .Title("Marital status")
                .width(w).height(h / 4);

            //draw density plot
            var marital = multiples
                .append('g')
                .attr('class', 'multipleMarried')
                .attr('width', w)
                .attr('height', h / 4)
                .attr('transform', 'translate(' + -50 + ',' + 150 + ')');


            marital
                .datum(densitySingle)
                .call(densityPlotModule1);


//education
            var densityPlotModule2 = d3.densityPlotNoLines()
                .variable0("College degree")
                .variable1("No college degree")
                .Title("College education")
                .width(w).height(h / 4);

            var education = multiples
                .append('g')
                .attr('class', 'multipleEducation')
                .attr('width', w)
                .attr('height', h / 4)
                .attr('transform', 'translate(' + -50 + ',' + 240 + ')');
            education
                .datum(densityEducation)
                .call(densityPlotModule2);

//teen
            var densityPlotModule3 = d3.densityPlotNoLines()
                .variable0("Adult")
                .variable1("Teen")
                .Title("Teen pregnancy")
                .width(w).height(h / 4);

            var Teen = multiples
                .append('g')
                .attr('class', 'multipleTeen')
                .attr('width', w)
                .attr('height', h / 4)
                .attr('transform', 'translate(' + -50 + ',' + 330 + ')');
            Teen
                .datum(densityTeen)
                .call(densityPlotModule3);

////wic
//            var densityPlotModule4 = d3.densityPlotNoLines()
//                .variable0("Receive WIC")
//                .variable1("Did not Receive WIC")
//                .Title("Participation in WIC")
//                .width(w ).height(h/4 );
//
//            var Wic=multiples
//                .append('g')
//                .attr('class', 'multipleWic')
//                .attr('width', w)
//                .attr('height', h/4)
//                .attr('transform', 'translate(' + -50+ ',' + 330 + ')');
//
//            Wic
//                .datum(densityWic)
//                .call(densityPlotModule4);

//medicaid
            var densityPlotModule5 = d3.densityPlotNoLines()
                .variable0("Medicaid used")
                .variable1("Medicaid not used")
                .Title("Medicaid usage")
                .width(w).height(h / 4);

            var Med = multiples
                .append('g')
                .attr('class', 'multipleMed')
                .attr('width', w)
                .attr('height', h / 4)
                .attr('transform', 'translate(' + -50 + ',' + 420 + ')');

            Med
                .datum(densityMed)
                .call(densityPlotModule5);


//prenatal
            var densityPlotModule6 = d3.densityPlotNoLines()
                .variable0("Prenatal Care")
                .variable1("No prenatal care")
                .Title("Prenatal Care usage")
                .width(w).height(h / 4);

            var pre = multiples
                .append('g')
                .attr('class', 'multiplePre')
                .attr('width', w)
                .attr('height', h / 4)
                .attr('transform', 'translate(' + -50 + ',' + 510 + ')');

            pre
                .datum(densityPre)
                .call(densityPlotModule6);


//draw multiple bars
            var multiplesTwo = d3.select(".left")
                .append('svg')
                .attr('class', 'multiplesTwo')
                .attr('width', w)
                .attr('height', h * 4);
//bar marital
            var maritalBars = d3.multiples()
                .aHigh(77)
                .bHigh(35)
                .leftLabel("Single")
                .rightLabel("Married")
                .separator("|")
                .width(w).height(h);

            var maritalBarsPlot = d3.select(".multiplesTwo")// this is in HTML
                .append("g")
                .attr('class', 'barMarital')
                .attr('transform', 'translate(' + 0 + ',' + 110 + ')');

            maritalBarsPlot
                .call(maritalBars);

//bar education
            var educationBars = d3.multiples()
                .aHigh(81)
                .bHigh(57)
                .leftLabel("College degree")
                .rightLabel("No college degree")
                .separator("|")
                .width(w).height(h);

            var educationbarPlot = d3.select(".multiplesTwo") // this is in HTML
                .append("g")
                .attr('class', 'barEducation')
                .attr('transform', 'translate(' + 0 + ',' + 200 + ')');

            educationbarPlot
                .call(educationBars);

//bar single
            var teenBars = d3.multiples()
                .aHigh(11)
                .bHigh(6)
                .leftLabel("Teen")
                .rightLabel("Adult")
                .separator("|")
                .width(w).height(h);

            var teenBarsPlot = d3.select(".multiplesTwo") // this is in HTML
                .append("g")
                .attr('class', 'barTeen')
                .attr('transform', 'translate(' + 0 + ',' + 290 + ')');

            teenBarsPlot
                .call(teenBars);

//
////bar wic
//            var wicBars = d3.multiples()
//                .aHigh(66)
//                .bHigh(36)
//                .leftLabel("Receive WIC")
//                .rightLabel("Did not Receive WIC")
//                .separator("|")
//                .width(w).height(h);
//
//            var wicBarsPlot = d3.select(".multiplesTwo") // this is in HTML
//                .append("g")
//                .attr('class', 'barWic')
//                .attr('transform', 'translate(' + 0 + ',' +290 + ')');
//
//            wicBarsPlot
//                .call(wicBars);


//bar medicaid
            var medBars = d3.multiples()
                .aHigh(79)
                .bHigh(37)
                .leftLabel("Medicaid used")
                .rightLabel("Medicaid not used")
                .separator("|")
                .width(w).height(h);

            var medBarsPlot = d3.select(".multiplesTwo") // this is in HTML
                .append("g")
                .attr('class', 'barMed')
                .attr('transform', 'translate(' + 0 + ',' + 380 + ')');

            medBarsPlot
                .call(medBars);

//bar prenatal care

            var preBars = d3.multiples()
                .aHigh(3)
                .bHigh(1)
                .leftLabel("Prenatal care")
                .rightLabel("No prenatal care")
                .separator("|")
                .width(w).height(h);

            var preBarsPlot = d3.select(".multiplesTwo") // this is in HTML
                .append("g")
                .attr('class', 'barPre')
                .attr('transform', 'translate(' + 0 + ',' + 470 + ')');

            preBarsPlot
                .call(preBars);


        })
        .addTo(controller)
        .on("leave", function (e) {
            $(".multiples").remove();
            $(".multiplesTwo").remove();

        });

    var multipleTitleText = new ScrollMagic.Scene({
        triggerElement: "#scene",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".smallMultipleText", "activeMultiple") // add class toggle
        //.addIndicators({name:"text1"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".activeMultiple").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".smallMultipleText").transition().duration(1000).attr("style", "opacity: 0;");
        });


//draw each variable
//draw the marital status
    var scene1 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-1",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active1") // add class toggle
        //.addIndicators({name:"left1"}) // add indicators (requires plugin)
        .on('enter', function (e) {

            $(".desityBlack").remove();
            $(".densityEducation").remove();
            $(".chart").remove();
            $(".plotBlack").remove();
            $(".plotWhite").remove();
            var chart = d3.select(".left")
                .append('svg')
                .attr('class', 'chart')
                .attr('width', w + 70)
                .attr('height', h + 40);

            var dotsBlack = d3.select(".left").append("svg")
                .attr("class", "plotBlack")
                .attr('width', w)
                .attr('height', h);

            var dotsWhite = d3.select('.left').append("svg")
                .attr("class", "plotWhite")
                .attr('width', w)
                .attr('height', h);

            var drawDots_1 = d3.dotsDraw().target(77).race("of black mothers").describe(" are single");
            var drawDots_2 = d3.dotsDraw().target(35).race("of white mothers").describe(" are single");

            var densityPlotModule1 = d3.densityPlot()
                .variable0("Married")
                .variable1("Single")
                .width(w).height(h * 2 / 3);

            dotsBlack.append('g').attr('class', 'densityMarried').call(drawDots_1);
            dotsWhite.append('g').attr('class', 'densityMarried').call(drawDots_2);

            //draw density plot
            var marital = chart
                .append('g')
                .attr('class', 'densityMarried')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

            marital
                .datum(densitySingle)
                .call(densityPlotModule1);

        })
        .on("leave", function (e) {
            $(".densityMarried").remove();
        })
        .addTo(controller);


    //draw the first text
    var MaritalText1 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-1",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text1", "textactive1") // add class toggle
        //.addIndicators({name:"text1"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive1").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text1").transition().duration(1000).attr("style", "opacity: 0;");
        });

    var MaritalText2 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-1",
        duration: 700,
        triggerHook: 0,
        offset: 300
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text2", "textactive2") // add class toggle
        //.addIndicators({name:"text2"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive2").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text2").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var MaritalText3 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-1",
        duration: 500,
        triggerHook: 0,
        offset: 500
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text3", "textactive3") // add class toggle
        //.addIndicators({name:"text3"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive3").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text3").transition().duration(1000).attr("style", "opacity: 0;");
        });


    //draw eduction
    var scene2 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-2",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active2") // add class toggle
        //.addIndicators({name:"education"}) // add indicators (requires plugin)
        .on('enter', function (e) {
            //
            $(".chart").remove();
            $(".plotBlack").remove();
            $(".plotWhite").remove();
            var chart = d3.select(".left")
                .append('svg')
                .attr('class', 'chart')
                .attr('width', w + 70)
                .attr('height', h + 40);

            var dotsBlack = d3.select(".left").append("svg")
                .attr("class", "plotBlack")
                .attr('width', w)
                .attr('height', h);

            var dotsWhite = d3.select('.left').append("svg")
                .attr("class", "plotWhite")
                .attr('width', w)
                .attr('height', h);

            var drawDots_3 = d3.dotsDraw().target(81).race("of black mothers").describe(" do not have a college degree");
            var drawDots_4 = d3.dotsDraw().target(57).race("of white mothers").describe(" do not have a college degree");

            dotsBlack.append('g').attr('class', 'densityEducation').call(drawDots_3);
            dotsWhite.append('g').attr('class', 'densityEducation').call(drawDots_4);

            var densityPlotModule2 = d3.densityPlot()
                .variable0("College degree")
                .variable1("No college degree")
                .width(w).height(h * 2 / 3);

            var education = chart
                .append('g')
                .attr('class', 'densityEducation')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');
            education
                .datum(densityEducation)
                .call(densityPlotModule2);

        })
        .on("leave", function (e) {
            $(".densityEducation").remove();
        })
        .addTo(controller);

    var educationText1 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-2",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text4", "textactive4") // add class toggle
        //.addIndicators({name:"text4"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive4").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text4").transition().duration(1000).attr("style", "opacity: 0;");
        });

    var educationText2 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-2",
        duration: 700,
        triggerHook: 0,
        offset: 300
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text5", "textactive5") // add class toggle
        //.addIndicators({name:"text5"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive5").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text5").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var eductionlText3 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-2",
        duration: 500,
        triggerHook: 0,
        offset: 500
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text6", "textactive6") // add class toggle
        //.addIndicators({name:"text6"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive6").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text6").transition().duration(1000).attr("style", "opacity: 0;");
        });


    //draw Teen pregnancy
    var scene3 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-3",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active3") // add class toggle
        //.addIndicators() // add indicators (requires plugin)
        .on('enter', function (e) {
            //$(".densityWic").remove();
            $(".chart").remove();
            $(".plotBlack").remove();
            $(".plotWhite").remove();
            var chart = d3.select(".left")
                .append('svg')
                .attr('class', 'chart')
                .attr('width', w + 70)
                .attr('height', h + 40);

            var dotsBlack = d3.select(".left").append("svg")
                .attr("class", "plotBlack")
                .attr('width', w)
                .attr('height', h);

            var dotsWhite = d3.select('.left').append("svg")
                .attr("class", "plotWhite")
                .attr('width', w)
                .attr('height', h);

            var drawDots_5 = d3.dotsDraw().target(11).race("of black mothers").describe(" are in their teens");
            var drawDots_6 = d3.dotsDraw().target(6).race("of white mothers").describe(" are in their teens");

            dotsBlack.append('g').attr('class', 'densityTeen').call(drawDots_5);
            dotsWhite.append('g').attr('class', 'densityTeen').call(drawDots_6);

            var densityPlotModule3 = d3.densityPlot()
                .variable0("Adult")
                .variable1("Teen")
                .width(w).height(h / 3 * 2);

            var Teen = chart
                .append('g')
                .attr('class', 'densityTeen')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');
            Teen
                .datum(densityTeen)
                .call(densityPlotModule3);
        })
        .on("leave", function (e) {
            $(".densityTeen").remove();
        })
        .addTo(controller);


    var TeenText1 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-3",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text7", "textactive7") // add class toggle
        //.addIndicators({name:"text7"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive7").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text7").transition().duration(1000).attr("style", "opacity: 0;");
        });

    var teenText2 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-3",
        duration: 700,
        triggerHook: 0,
        offset: 300
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text8", "textactive8") // add class toggle
        //.addIndicators({name:"text8"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive8").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text8").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var teenText3 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-3",
        duration: 500,
        triggerHook: 0,
        offset: 500
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text9", "textactive9") // add class toggle
        //.addIndicators({name:"text9"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive9").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text9").transition().duration(1000).attr("style", "opacity: 0;");
        });


    //draw Medicaid
    var scene5 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-5",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active5") // add class toggle
        //.addIndicators() // add indicators (requires plugin)
        .on('enter', function (e) {
            //$(".densityPrecare").remove();
            $(".chart").remove();
            $(".plotBlack").remove();
            $(".plotWhite").remove();
            var chart = d3.select(".left")
                .append('svg')
                .attr('class', 'chart')
                .attr('width', w + 70)
                .attr('height', h + 40);

            var dotsBlack = d3.select(".left").append("svg")
                .attr("class", "plotBlack")
                .attr('width', w)
                .attr('height', h);

            var dotsWhite = d3.select('.left').append("svg")
                .attr("class", "plotWhite")
                .attr('width', w)
                .attr('height', h);

            var drawDots_9 = d3.dotsDraw().target(79).race(" of black mothers").describe(" use Medicaid");
            var drawDots_10 = d3.dotsDraw().target(37).race("of white mothers").describe(" use Medicaid");

            dotsBlack.append('g').attr('class', 'densityMed').call(drawDots_9);
            dotsWhite.append('g').attr('class', 'densityMed').call(drawDots_10);

            var densityPlotModule5 = d3.densityPlot()
                .variable0("Medicaid used")
                .variable1("Medicaid not used")
                .width(w).height(h / 3 * 2);

            var Med = chart
                .append('g')
                .attr('class', 'densityMed')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

            Med
                .datum(densityMed)
                .call(densityPlotModule5);
        })
        .on("leave", function (e) {
            $(".densityMed").remove();
        })
        .addTo(controller);


    var medText1 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-5",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text13", "textactive13") // add class toggle
        //.addIndicators({name:"text13"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive13").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text13").transition().duration(1000).attr("style", "opacity: 0;");
        });

    var medText2 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-5",
        duration: 700,
        triggerHook: 0,
        offset: 300
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text14", "textactive14") // add class toggle
        //.addIndicators({name:"text14"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive14").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text14").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var medText3 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-5",
        duration: 500,
        triggerHook: 0,
        offset: 500
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text15", "textactive15") // add class toggle
        //.addIndicators({name:"text15"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive15").transition().duration(1000).attr("style", "opacity: 1;");

        })
        .on("leave", function (e) {
            d3.select(".text15").transition().duration(1000).attr("style", "opacity: 0;");

        });


    //prenatal care
    var scene6 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-6",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active6") // add class toggle
        //.addIndicators() // add indicators (requires plugin)
        .on('enter', function (e) {

            $(".chart").remove();
            $(".plotBlack").remove();
            $(".plotWhite").remove();
            var chart = d3.select(".left")
                .append('svg')
                .attr('class', 'chart')
                .attr('width', w + 70)
                .attr('height', h + 40);

            var dotsBlack = d3.select(".left").append("svg")
                .attr("class", "plotBlack")
                .attr('width', w)
                .attr('height', h);

            var dotsWhite = d3.select('.left').append("svg")
                .attr("class", "plotWhite")
                .attr('width', w)
                .attr('height', h);

            var drawDots_11 = d3.dotsDraw().target(3).race("of black mothers").describe(" don't have access to prenatal care");
            var drawDots_12 = d3.dotsDraw().target(1).race("of white mothers").describe(" don't have access to prenatal care");

            dotsBlack.append('g').attr('class', 'densityPre').call(drawDots_11);
            dotsWhite.append('g').attr('class', 'densityPre').call(drawDots_12);

            var densityPlotModule6 = d3.densityPlot()
                .variable0("Prenatal care")
                .variable1("No prenatal care")
                .width(w).height(h / 3 * 2);

            var pre = chart
                .append('g')
                .attr('class', 'densityPre')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

            pre
                .datum(densityPre)
                .call(densityPlotModule6);
        })
        .on("leave", function (e) {
            $(".densityPre").remove();

        })
        .addTo(controller);

    var preText1 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-6",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text16", "textactive16") // add class toggle
        //.addIndicators({name:"text16"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive16").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text16").transition().duration(1000).attr("style", "opacity: 0;");
        });

    var preText2 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-6",
        duration: 700,
        triggerHook: 0,
        offset: 300
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text17", "textactive17") // add class toggle
        //.addIndicators({name:"text17"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive17").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text17").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var preText3 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-6",
        duration: 500,
        triggerHook: 0,
        offset: 500
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text18", "textactive18") // add class toggle
        //.addIndicators({name:"text18"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {

            $(".cycle").remove();
            var chart = d3.select(".left")
                .append('svg')
                .attr('class', 'chart')
                .attr('width', w + 70)
                .attr('height', h + 40);

            var dotsBlack = d3.select(".left").append("svg")
                .attr("class", "plotBlack")
                .attr('width', w)
                .attr('height', h);

            var dotsWhite = d3.select('.left').append("svg")
                .attr("class", "plotWhite")
                .attr('width', w)
                .attr('height', h);

            var drawDots_11 = d3.dotsDraw().target(3).race("BLACK");
            var drawDots_12 = d3.dotsDraw().target(1).race("WHITE");

            dotsBlack.append('g').attr('class', 'densityPre').call(drawDots_11);
            dotsWhite.append('g').attr('class', 'densityPre').call(drawDots_12);

            var densityPlotModule6 = d3.densityPlot()
                .variable0("prenatal care")
                .variable1("no prenatal care")
                .width(w).height(h / 3 * 2);

            var pre = chart
                .append('g')
                .attr('class', 'densityPre')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

            pre
                .datum(densityPre)
                .call(densityPlotModule6);


            d3.select(".textactive18").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text18").transition().duration(1000).attr("style", "opacity: 0;");


        });


//conclusion

    var scene8 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-8",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active7") // add class toggle
        //.addIndicators({name:"arrow"}) // add indicators (requires plugin)
        .on('enter', function (e) {

            $(".cycle").remove();
            $(".chart").remove();
            $(".plotBlack").remove();
            $(".plotWhite").remove();

            globalDispatch = d3.dispatch('update', 'showOne', 'showTwo', 'showThree', 'showFour', 'showFive',
                'showSix', 'showSeven', 'showEight');

            var densityPlotModule = d3.cycleModuleSuper()
                .width(w * 1.4).height(h * 3);


            var bigPlot = d3.select(".left")
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')')
                .append('g')
                .attr('class', 'cycle')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')');

            bigPlot
                .call(densityPlotModule);

            globalDispatch.showOne();  // this draws individual parts of the chart - here part 1

        })
        .addTo(controller);


    var scene8text = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-8",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text20", "textactive20") // add class toggle
        //.addIndicators({name:"text17"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive20").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text20").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var scene9 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-9",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active8") // add class toggle
        //.addIndicators({name:"arrow"}) // add indicators (requires plugin)
        .on('enter', function (e) {

            $(".cycle").remove();
            //$(".plotBlack").remove();
            //$(".plotWhite").remove();

            globalDispatch = d3.dispatch('update', 'showOne', 'showTwo', 'showThree', 'showFour', 'showFive',
                'showSix', 'showSeven', 'showEight');

            var densityPlotModule = d3.cycleModuleSuper()
                .width(w * 1.4).height(h * 3);


            var bigPlot = d3.select(".left")
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')')
                .append('g')
                .attr('class', 'cycle')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')');

            bigPlot
                .call(densityPlotModule);

            globalDispatch.showOne();  // this draws individual parts of the chart - here part 1
            globalDispatch.showTwo();  // this draws individual parts of the chart - here part 2
            globalDispatch.showThree();
            //globalDispatch.showFour();
            //globalDispatch.showFive();
            //globalDispatch.showSix();
            //globalDispatch.showSeven();
            //globalDispatch.showEight();
        })
        .addTo(controller);


    var scene9text = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-9",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text21", "textactive21") // add class toggle
        //.addIndicators({name:"text21"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive21").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text21").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var scene10 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-10",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active9") // add class toggle
        //.addIndicators({name:"arrow"}) // add indicators (requires plugin)
        .on('enter', function (e) {

            $(".cycle").remove();
            //$(".plotBlack").remove();
            //$(".plotWhite").remove();

            globalDispatch = d3.dispatch('update', 'showOne', 'showTwo', 'showThree', 'showFour', 'showFive',
                'showSix', 'showSeven', 'showEight');

            var densityPlotModule = d3.cycleModuleSuper()
                .width(w * 1.4).height(h * 3);


            var bigPlot = d3.select(".left")
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')')
                .append('g')
                .attr('class', 'cycle')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')');

            bigPlot
                .call(densityPlotModule);

            globalDispatch.showOne();  // this draws individual parts of the chart - here part 1
            globalDispatch.showTwo();  // this draws individual parts of the chart - here part 2
            globalDispatch.showThree();
            globalDispatch.showFour();
            globalDispatch.showFive();
            //globalDispatch.showSix();
            //globalDispatch.showSeven();
            //globalDispatch.showEight();
        })
        .addTo(controller);

    var scene10text = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-10",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text22", "textactive22") // add class toggle
        //.addIndicators({name:"text22"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive22").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text22").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var scene11 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-11",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active10") // add class toggle
        //.addIndicators({name:"arrow"}) // add indicators (requires plugin)
        .on('enter', function (e) {

            $(".cycle").remove();
            //$(".plotBlack").remove();
            //$(".plotWhite").remove();

            globalDispatch = d3.dispatch('update', 'showOne', 'showTwo', 'showThree', 'showFour', 'showFive',
                'showSix', 'showSeven', 'showEight');

            var densityPlotModule = d3.cycleModuleSuper()
                .width(w * 1.4).height(h * 3);


            var bigPlot = d3.select(".left")
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')')
                .append('g')
                .attr('class', 'cycle')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')');

            bigPlot
                .call(densityPlotModule);

            globalDispatch.showOne();  // this draws individual parts of the chart - here part 1
            globalDispatch.showTwo();  // this draws individual parts of the chart - here part 2
            globalDispatch.showThree();
            globalDispatch.showFour();
            globalDispatch.showFive();
            globalDispatch.showSix();
            globalDispatch.showSeven();
            //globalDispatch.showEight();
        })
        .addTo(controller);

    var scene11text = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-11",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text23", "textactive23") // add class toggle
        //.addIndicators({name:"text23"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive23").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text23").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var scene12 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-12",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active12") // add class toggle
        //.addIndicators({name:"arrow"}) // add indicators (requires plugin)
        .on('enter', function (e) {

            $(".cycle").remove();
            //$(".plotBlack").remove();
            //$(".plotWhite").remove();

            globalDispatch = d3.dispatch('update', 'showOne', 'showTwo', 'showThree', 'showFour', 'showFive',
                'showSix', 'showSeven', 'showEight');

            var densityPlotModule = d3.cycleModuleSuper()
                .width(w * 1.4).height(h * 3);


            var bigPlot = d3.select(".left")
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')')
                .append('g')
                .attr('class', 'cycle')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')');

            bigPlot
                .call(densityPlotModule);

            globalDispatch.showOne();  // this draws individual parts of the chart - here part 1
            globalDispatch.showTwo();  // this draws individual parts of the chart - here part 2
            globalDispatch.showThree();
            globalDispatch.showFour();
            globalDispatch.showFive();
            globalDispatch.showSix();
            globalDispatch.showSeven();
            globalDispatch.showEight();
        })
        .addTo(controller);

    var scene12text = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-12",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text24", "textactive24") // add class toggle
        //.addIndicators({name:"text24"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive24").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text24").transition().duration(1000).attr("style", "opacity: 0;");
        });


    var scene13 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-13",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
        .setClassToggle(".left", "active13") // add class toggle
        //.addIndicators({name:"arrow"}) // add indicators (requires plugin)
        .on('enter', function (e) {

            $(".cycle").remove();
            //$(".plotBlack").remove();
            //$(".plotWhite").remove();

            globalDispatch = d3.dispatch('update', 'showOne', 'showTwo', 'showThree', 'showFour', 'showFive',
                'showSix', 'showSeven', 'showEight');

            var densityPlotModule = d3.cycleModuleSuper()
                .width(w * 1.4).height(h * 3);


            var bigPlot = d3.select(".left")
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')')
                .append('g')
                .attr('class', 'cycle')
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(' + 50 + ',' + 80 + ')');

            bigPlot
                .call(densityPlotModule);

            globalDispatch.showOne();  // this draws individual parts of the chart - here part 1
            globalDispatch.showTwo();  // this draws individual parts of the chart - here part 2
            globalDispatch.showThree();
            globalDispatch.showFour();
            globalDispatch.showFive();
            globalDispatch.showSix();
            globalDispatch.showSeven();
            globalDispatch.showEight();
        })
        .addTo(controller);

    var scene13text1 = new ScrollMagic.Scene({
        //specifies options for the scene
        triggerElement: "#scene-13",
        duration: 1000,
        triggerHook: 0,
        offset: 0
    })
    //.setTween('#introactive1', 0.5, {opacity: 1})
        .setClassToggle(".text25", "textactive25") // add class toggle
        //.addIndicators({name:"text25"}) // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            d3.select(".textactive25").transition().duration(1000).attr("style", "opacity: 1;");
        })
        .on("leave", function (e) {
            d3.select(".text25").transition().duration(1000).attr("style", "opacity: 0;");
        });


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