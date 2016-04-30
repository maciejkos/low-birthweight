/**
 * Modularized by KiniLuo on 4/10/16 based on my dotsplot.
 */


d3.dotsDraw = function ()
{
//this is a wrapper function
    //default internal virables
    var w=400,
        h=300,
        target=40,
        race,
        r= 4,
        describe="";

    //this is the function that later get returned
    //started to draw a chart
    function exports(_selection)
    {
        //w=500,
        //h=350;
        _selection.each(draw);
    }


    //draw function
    function draw(d)
    {
        //create newArray for data
        var newArray=[];
        for (var i=0;i<100;i++)
        {
            if(i<target){newArray.push({number: i, visibility:1})}
            else{newArray.push({number: i, visibility:0})}
        }
        //console.log("newArray",newArray);
        var data=newArray;



    //Let's draw the dots
        //1.append svg
        var svg = d3.select(this);

        //2.data join
        var nodes=svg.append('svg')
            .attr("class","dots").attr("x",150).attr("y",-80)
            .selectAll('.circle')
            .data(data);

        //3.create initial circle object enter
        nodes
            .enter()
            .append('circle')
            .attr('class', 'circles-data-point')
            .style('fill-opacity', '0.5')
            //.attr('cx', function (d) {return  20+Math.random() * 20})
            .attr('cy', 0)
            .attr("r",r);

        //4.transit
        nodes
            .attr('fill', "white")
            .attr('cx', function (d) {return 5+(d.number % 10) * 10})
            .transition()
            .delay(function (d) {return d.number * 10})
            .duration(function (d) {return (800 - d.number * 0.5)})
            .attr('cy', function (d) {return 200 - 10 * Math.floor(d.number / 10)})
            .style('fill', function (d) {
                if (d.visibility == 1) {fill="red"}
                else {fill="grey"}
                return fill;
            });


    //let's draw the percentage
        //2.data join
        var percentage=svg.append('g')
            .attr("class","text")
            .selectAll('.percentage').data(data);
        //var percentage=svg1.selectAll('.percentage').data(data);

        //3.enter percentage
        percentage
            .enter()
            .append("text")
            .attr("class","number")
            .attr("x", 150)
            .attr("y", 150)
            //.attr("font-family", "Arial")
            .attr("font-size", "9px")
            .attr("fill", "black")
            .style('fill-opacity', '0')
            .html(function (d) {return d.number +"%"+" "+race });


        //4.percentage transition
        percentage
            .transition()
            .duration(0.5)
            .delay(function (d, i) {
                return i / 100 * 2025;
            })
            .style('fill-opacity', function (d, i) {if (i <= target) {return 1;} else {return 0;}});

        percentage
            .transition()
            .duration(0.2)
            .delay(function (d, i) {return i / 100 * 2125;})
            .style('fill-opacity', function (d, i) {if (i == target) {return 1;} else {return 0;}});

        svg
            .append("g")
            .attr("class", "describe")
            .append("text")
            .text(describe)
            .attr("x", 150)
            .attr("y", 170)
            .attr("font-size", "9px");

    }

    //export
    exports.width = function(_v){
        if(!arguments.length) return w;
        w = _v;
        return this;
    };
    exports.height = function(_z){
        if(!arguments.length) return h;
        h = _z;
        return this;
    };
    exports.target = function(_t)
    {
        if(!arguments.length) return target;
        target = _t;
        return this;
    };
    exports.race = function(_r)
    {
        if(!arguments.length) return race;
        race = _r;
        return this;
    };
    exports.describe = function(_c){
        if(!arguments.length) return describe;
        describe = _c;
        return this;
    };

    return exports;
};