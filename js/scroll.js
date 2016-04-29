/**
 * Created by KiniLuo on 4/7/16.
 */

var margin = {t:-50,r:20,b:20,l:220};
var width = document.getElementById('one').clientWidth-margin.l-margin.r,
    height = document.getElementById('one').clientHeight-margin.t-margin.b;

var plot = d3.selectAll('.plot')
    .append('svg')
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b)
    .append('g')
    .attr('class','plot')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//var circle = plot.append("circle")
//    .attr("cx", 30)
//    .attr("cy", 30)
//    .attr("r", 20);

var plot_main = plot;
//var plot_main = plot.append('g');

queue()
    .defer(d3.csv,'data.csv',parse)
    .await(dataLoaded);

function parse(d) {

    return {

        number: d.number-1,
        visible: +d.visible
    }
}




function dataLoaded(error, data) {

    console.log(data);
    var controller = new ScrollMagic.Controller();
    var scene2 = new ScrollMagic
        .Scene({
            //specifies option
            triggerElement: "#scene-2",//what is triggered by
            duration: 1800,
            triggerHook: 0,
            offset: 0
        })
        .setClassToggle("#vis1", "active1") // add class toggle
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            console.log(e.progress);
            //function draw(_data) {


            var nodes = plot_main.selectAll('.circles-data-point').data(data);

            //enter
            var node_enter = nodes.enter().append('circle').attr('class', 'circles-data-point')
                .style('fill-opacity', '0.5')
                .attr('cx', function (d) {
                    return 25 + Math.random() * 50
                })
                .attr('cy', -50);
            // transitions
            nodes
                .attr('fill', "black")
                .attr('cx', function (d) {
                    return (d.number % 10) * 10
                })
                .transition()
                .delay(function (d) {
                    return d.number * 5
                })
                .duration(function (d) {
                    return (800 - d.number * 0.5)
                })
                .attr('cy', function (d) {
                    return 200 - 10 * Math.floor(d.number / 10)
                })

                .attr('r', 5)
                .style('fill-opacity', function (d) {
                    if (d.visible == 1) {
                        customOpacity = 1
                    } else {
                        customOpacity = 0.5
                    }
                    return customOpacity
                });
            //exit
            var node_exit = nodes.exit().remove();

            //percentage
            var percentage = plot_main.selectAll('.percentage').data(data);
            //enter text
            var percentage_enter = percentage.enter().append('text').attr('class', 'text')
                .attr("x", 0)
                .attr("y", 250)
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("fill", "black")
                .style('fill-opacity', '0')
                .html(function (d) {
                    //console.log(d);
                    return d.number + " WHITE";
                });

            // transitions
            percentage
                .transition()
                .duration(0.5)
                .delay(function (d, i) {
                    return i / 100 * 2025;
                })
                .style('fill-opacity', function (d, i) {
                    if (i <= 64) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

            percentage
                .transition()
                .duration(0.2)
                .delay(function (d, i) {
                    return i / 100 * 2125;
                })
                .style('fill-opacity', function (d, i) {
                    if (i == 64) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            //}
        })
        .addTo(controller);

    var scene3 = new ScrollMagic
        .Scene({
            //specifies option
            triggerElement: "#scene-3",//what is triggered by
            duration: 1200,
            triggerHook:0,
            offset:0
        })
        .setClassToggle("#vis2", "active2") // add class toggle
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
        .on('enter', function (e) {
            console.log("scene 3");

            //function draw(_data) {


            var nodes = plot_main.selectAll('.circles-data-point').data(data);

            //enter
            var node_enter = nodes.enter().append('circle').attr('class', 'circles-data-point')
                .style('fill-opacity', '0.5')
                .attr('cx', function (d) {
                    return 25 + Math.random() * 50
                })
                .attr('cy', -50);
            // transitions
            nodes
                .attr('fill', "black")
                .attr('cx', function (d) {
                    return (d.number % 10) * 10
                })
                .transition()
                .delay(function (d) {
                    return d.number * 5
                })
                .duration(function (d) {
                    return (800 - d.number * 0.5)
                })
                .attr('cy', function (d) {
                    return 200 - 10 * Math.floor(d.number / 10)
                })

                .attr('r', 5)
                .style('fill-opacity', function (d) {
                    if (d.visible == 1) {
                        customOpacity = 1
                    } else {
                        customOpacity = 0.5
                    }
                    return customOpacity
                });
            //exit
            var node_exit = nodes.exit().remove();

            //percentage
            var percentage = plot_main.selectAll('.percentage').data(data);
            //enter text
            var percentage_enter = percentage.enter().append('text').attr('class', 'text')
                .attr("x", 0)
                .attr("y", 250)
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("fill", "black")
                .style('fill-opacity', '0')
                .html( function (d) {
                    //console.log(d);
                    return d.number +" WHITE";
                });

            // transitions
            percentage
                .transition()
                .duration(0.5)
                .delay(function(d, i) { return i / 100 * 2025; })
                .style('fill-opacity', function(d,i) {
                    if (i <= 64) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

            percentage
                .transition()
                .duration(0.2)
                .delay(function(d, i) { return i / 100 * 2125; })
                .style('fill-opacity', function(d,i){
                    if (i == 64) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            //}
        })
        .addTo(controller);

}

