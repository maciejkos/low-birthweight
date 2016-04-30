/**
 * Created by Maciej on 4/21/2016.
 */

// JINNI - this is an example of what you could paste in your scroll

//.on('enter', function (e) {
//
//    globalDispatch = d3.dispatch('update','showOne', 'showTwo', 'showThree', 'showFour', 'showFive',
//        'showSix','showSeven', 'showEight');
//
//    var densityPlotModule = d3.cycleModuleSuper()
//        .width(w*1.7 ).height(h*1.5 );
//
//    var bigPlot = d3.select(".transition.two")
//        .attr('class', 'plot')
//        .attr('width', w*3)
//        .attr('height', h*2)
//        .attr('transform', 'translate(' +50+ ',' +50 + ')');
//
//    var Black=bigPlot
//        .append('g')
//        .attr('class', 'densityBlack')
//        .attr('width', w*3)
//        .attr('height', h*2)
//        .attr('transform', 'translate(' +50+ ',' +50 + ')');
//
//    Black
//        .call(densityPlotModule);
//
//    globalDispatch.showOne();  // this draws individual parts of the chart - here part 1
//    globalDispatch.showTwo();  // this draws individual parts of the chart - here part 2
//    globalDispatch.showThree();
//    globalDispatch.showFour();
//    globalDispatch.showFive();
//    globalDispatch.showSix();
//    globalDispatch.showSeven();
//    globalDispatch.showEight();
//})
//    .on("leave",function(e){
//        console.log("leave");
//        //$(".plot").remove();
//    });

d3.cycleModuleSuper = function () {


    var w = 800,
        h = 600,
        m = {t: 15, r: 20, b: 25, l: 20},
        chartW = w - m.l - m.r,
        chartH = h - m.t - m.b,
        domainXMax = 5000,
        domainXMin = 700,
        domainYMax = 0.001;
    var variable0 = "";
    var variable1 = "";

    function exports(_selection) {
        //recompute internal variables if updated

        chartW = w - m.l - m.r,
            chartH = h - m.t - m.b;
        //
        divWidth = chartW/1.5;

        _selection.each(draw);
    }

    function draw() {

        var canvas1 = d3.select(this)
            .append('canvas')
            .attr('width',chartW)
            .attr('height',chartH)
            .node();

        ctx = canvas1.getContext('2d');

        ctx.strokeStyle = "black";
        ctx.font = divWidth / 50 + "px serif";

        xMoveUp = divWidth / 52;
        yMoveUp = divWidth / 13;

        function one() {
            ctx.fillText("LOW", divWidth / 2, divWidth / 3.3 - yMoveUp);
            ctx.fillText("INCOME", divWidth / 2 - divWidth / 80, divWidth / 3.1 - yMoveUp);
        }

        function two() {
            // draw arch
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(x = divWidth / 2 + divWidth * 0.1 + xMoveUp, y = divWidth / 2 - yMoveUp, radius = divWidth / 5, startAngle = 1.5 * Math.PI, endAngle = 0 * Math.PI); // 1
            ctx.stroke();
            ctx.closePath();

            // draw arrow
            ctx.beginPath();
            archEndX = divWidth / 2 + divWidth * 0.1 + divWidth / 5 + xMoveUp;
            archEndY = divWidth / 2 - yMoveUp;

            ctx.moveTo(archEndX - divWidth / 100, archEndY);
            ctx.lineTo(archEndX + divWidth / 100, archEndY);
            ctx.lineTo(archEndX, archEndY + divWidth / 50);
            ctx.fill();
        }

        function three() {
            ctx.fillText("LOW", divWidth / 2 + divWidth / 3.6 + xMoveUp, divWidth / 2 + divWidth * 0.05 - yMoveUp / 2);
            ctx.fillText("BIRTH WEIGHT", divWidth / 2 + divWidth / 4.3 + xMoveUp, divWidth / 2 + divWidth * 0.07 - yMoveUp / 2);
            textBottom = divWidth / 2 + divWidth * 0.07;
        }

        function four() {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(x = divWidth / 2 + divWidth * 0.1 + xMoveUp, y = divWidth / 2 + divWidth / 2 * 0.17, radius = divWidth / 5, startAngle = 2 * Math.PI, endAngle = 1 / 2 * Math.PI); // 2
            ctx.stroke();
            ctx.closePath();

            // draw arrow
            ctx.beginPath();
            archEndX = divWidth / 2 + divWidth * 0.1 + xMoveUp;
            archEndY = divWidth / 2 + divWidth / 5 + divWidth / 2 * 0.17;

            ctx.moveTo(archEndX, archEndY - divWidth / 100);
            ctx.lineTo(archEndX, archEndY + divWidth / 100);
            ctx.lineTo(archEndX - divWidth / 50, archEndY);
            ctx.fill();
        }

        function five() {
            ctx.fillText("POOR", divWidth / 2, divWidth / 5 + divWidth / 5 + divWidth / 3.3 + divWidth * 0.08);
            ctx.fillText("HEALTH", divWidth / 2 - divWidth / 100, divWidth / 5 + divWidth / 5 + divWidth / 3.1 + divWidth * 0.08);
        }

        function six() {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(x = divWidth / 2 - divWidth * 0.05 - xMoveUp, y = divWidth / 2 + divWidth / 2 * 0.17, radius = divWidth / 5, startAngle = 2.5 * Math.PI, endAngle = 1 * Math.PI); // 3
            ctx.stroke();
            ctx.closePath();

            // draw arrow
            ctx.beginPath();
            archEndX = divWidth / 2 - divWidth * 0.05 - divWidth / 5 - xMoveUp;
            archEndY = divWidth / 2 + divWidth * 0.1;

            ctx.moveTo(archEndX - divWidth / 100, archEndY);
            ctx.lineTo(archEndX + divWidth / 100, archEndY);
            ctx.lineTo(archEndX, archEndY - divWidth / 50);
            ctx.fill();
        }

        function seven() {
            ctx.fillText("LOW", divWidth / 2 - divWidth / 5 - divWidth / 14 - xMoveUp, divWidth / 2 + divWidth * 0.05 - yMoveUp / 2);
            ctx.fillText("EDUCATION", divWidth / 2 - divWidth / 5 - divWidth / 10 - xMoveUp, divWidth / 2 + divWidth * 0.07 - yMoveUp / 2);
        }

        function eight() {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(x = divWidth / 2 - divWidth * 0.05 - xMoveUp, y = divWidth / 2 - yMoveUp, radius = divWidth / 5, startAngle = 3 * Math.PI, endAngle = 1.5 * Math.PI); // 4
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            archEndX = divWidth / 2 - divWidth * 0.05 - xMoveUp;
            archEndY = divWidth / 2 - divWidth / 5 + divWidth / 2 * 0.002 - yMoveUp;
            //archEndY = divWidth/2 - divWidth/5 + divWidth/2*0.01;

            ctx.moveTo(archEndX, archEndY + divWidth / 100);
            ctx.lineTo(archEndX, archEndY - divWidth / 100);
            ctx.lineTo(archEndX + divWidth / 50, archEndY);
            ctx.fill();
        }
        globalDispatch.on('showOne',function(ext){
            one();
        });

        globalDispatch.on('showTwo',function(ext){
            two();
        });

        globalDispatch.on('showThree',function(ext){
            three();
        });

        globalDispatch.on('showFour',function(ext){
            four();
        });

        globalDispatch.on('showFive',function(ext){
            five();
        });

        globalDispatch.on('showSix',function(ext){
            six();
        });

        globalDispatch.on('showSeven',function(ext){
            seven();
        });

        globalDispatch.on('showEight',function(ext){
            eight();
        });

        //one();
        //two();
        //three();
        //four();
        //five();
        //six();
        //seven();
        //eight();

    }

    //Getter and setter
    exports.width = function (_v) {
        if (!arguments.length) return w;
        w = _v;
        return this;
    };
    exports.height = function (_z) {
        if (!arguments.length) return h;
        h = _z;
        return this;
    };

    return exports
};
