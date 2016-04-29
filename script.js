///*Start by setting up the canvas */
//var margin = {t:20,r:20,b:20,l:20};
//var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
//    height = document.getElementById('plot').clientHeight-margin.t-margin.b;
//
//var plot = d3.selectAll('.plot')
//    .append('svg')
//    .attr('width',width+margin.l+margin.r)
//    .attr('height',height+margin.t+margin.b)
//    .append('g')
//    .attr('class','plot')
//    .attr('transform','translate('+margin.l+','+margin.t+')');
//
//
//
//var dots = plot;


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

    console.log("data",data);
    draw(data);
}
//
function draw(_data) {

    //data join
    var nodes = dots.selectAll('circles').data(_data);

    //enter
    nodes
        .enter()
        .append('circle')
        .attr('class', 'circles-data-point')
        .style('fill-opacity', '0.5')
        .attr('cx', function (d) {
            return  Math.random() * 20
        })
        .attr('cy', 50)
        .attr("r",5);

    // transitions
    nodes
        .attr('fill', "black")
        .attr('cx', function (d) {
            return (d.number % 10) * 20
        })
        .transition()
        .delay(function (d) {
            return d.number * 10
        })
        .duration(function (d) {
            return (800 - d.number * 0.5)
        })
        .attr('cy', function (d) {
            return 200 - 20 * Math.floor(d.number / 10)
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
    ////exit
    var node_exit = nodes.exit().remove();
}
