/**
 * Created by Maciej on 4/12/2016.
 */

// new update feature
// the module now removes vertical lines when updated

//// new update function
// put this on top of your on('enter...) function
// globalDispatch = d3.dispatch('update');
// use this to update/zoom the chart
// globalDispatch.update();



////New features:
//you can now add the following specifications to your call:
//    .domainXMax(4000)  // this changes the maximum value of X
//    .domainXMin(800)   // this changes the minimum value of X
//    .domainYMax(0.001) // this changes the maximum value of Y



d3.densityPlotWithUpdate = function(){


    var w = 800,
        h = 600,
        m = {t:15,r:20,b:25,l:20},
        chartW = w - m.l - m.r,
        chartH = h - m.t - m.b,
        domainXMax = 5000,
        domainXMin = 700,
        domainYMax = 0.001;
    var variable0 = "";
    var variable1 = "";

    var scaleX = d3.scale.linear()
        .domain([domainXMin, domainXMax])
        .range([0, chartW]);

    var scaleY = d3.scale.linear()
        .domain([0, domainYMax])
        .range([chartH, 0]);

    area1 = d3.svg.line()
        .x(function(d) {
            if (d.x1 > domainXMax){return scaleX(domainXMax);}
            else if(d.x1 < domainXMin){return scaleX(domainXMin);}
            else { return scaleX(d.x1); }})
        .y(function(d) {
            if (d.x1 > domainXMax || d.x1 < domainXMin){
                return scaleY(0);}
            else { return scaleY(d.y1); }});

    area0 = d3.svg.line()
        .x(function(d) {
            if (d.x0 > domainXMax){return scaleX(domainXMax);}
            else if(d.x0 < domainXMin){return scaleX(domainXMin);}
            else { return scaleX(d.x0); }})
        .y(function(d) {
            if (d.x0 > domainXMax || d.x0 < domainXMin){return scaleY(0);}
            else { return scaleY(d.y0); }});

    var areaFlat = d3.svg.line()
        .x(function(d) {return scaleX(d.x0); })
        .y(function(d) { return scaleY(0); });

    valueAccessor = function(d){ return d;};

    function exports(_selection){
        //recompute internal variables if updated

        chartW = w - m.l - m.r,
            chartH = h - m.t - m.b;
        //
        scaleX.range([0,chartW]).domain([domainXMin, domainXMax]);
        scaleY.range([chartH,0]).domain([0,domainYMax]);

        _selection.each(draw);
    }

    function draw(_data){
        data = _data;
        //var plotReady = d3.select(this);
        plot_main = d3.select(this);
        estimate0 =_data[0].estimate0;
        estimate1 =_data[0].estimate1;

        nodes1 = plot_main.append("path").data([_data])
            .attr("class", "area1")
            .style('fill-opacity', '0.1')
            .attr("d", areaFlat)
            .transition()
            .duration(1000)
            .style('fill-opacity', '1')
            .attr("d", area1);


        nodes0 = plot_main.append("path").data([_data])
            .attr("class", "area0")
            .style('fill-opacity', '0.1')
            .attr("d", areaFlat)
            .transition()
            .duration(1000)
            .style('fill-opacity', '1')
            .attr("d", area0);


        plot_main.append("line").data([_data])
            .attr("class", "line0")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate0))
            .attr("x2", scaleX(estimate0));

        plot_main.append("line").data([_data])
            .attr("class", "line1")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate1))
            .attr("x2", scaleX(estimate1));

        legend = plot_main.append("g")
            .attr("class","legend")
            .attr("transform","translate(50,30)")
            .style("font-size","12px");

        legend
            .append("rect")
            .attr("class","legendgrey")
            .attr("x", 60)
            .attr("y", 0)
            .attr("width", chartW/50)
            .attr("height", chartW/50)
            .attr("fill", "grey");

        legend
            .append("rect")
            .attr("class","legendred")
            .attr("x", 60)
            .attr("y", 15)
            .attr("width", chartW/50)
            .attr("height", chartW/50)
            .attr("fill", "red");

        legend
            .append("text")
            .attr("x", 75)
            .attr("y", 9)
            .text(variable0);

        legend
            .append("text")
            .attr("x", 75)
            .attr("y", 24)
            .text(variable1);

        legend
            .attr("transform","translate(400,-10)");

        axisX = d3.svg.axis()
            .orient('bottom')
            .scale(scaleX);

        axisY = d3.svg.axis()
            .orient('right')
            .scale(scaleY);

//Draw axes
        plot_main.append('g').attr('class', 'axis axis-x')
            .attr('transform', 'translate(0,' + chartH + ')')
            .call(axisX);

        plot_main.append('g').attr('class', 'axis axis-y')
            .call(axisY);


        globalDispatch.on('update',function(ext){
            updateMe(_data);
        });

        globalDispatch.on('downgrade',function(ext){
            downgradeMe(_data);
        });
        //updateMe(_data);

    }

    function updateMe() {
        // redraw data to new scales

        domainXMax = 2500;

        scaleX.range([0,chartW]).domain([domainXMin, domainXMax]);
        scaleY.range([chartH,0]).domain([0,domainYMax]);

        console.log(nodes1);
        nodes1 = d3.select(".area1")
        //nodes1
            .transition()
            //.delay(4000)
            .duration(500)
            .style('fill-opacity', '1')
            .attr("d", area1);
            //.attr("d", area1(data));

        nodes0 = d3.select(".area0")
        //nodes0
            .transition()
            //.delay(4000)
            .duration(500)
            .style('fill-opacity', '1')
            .attr("d", area0);

        // remove vertical lines
        removeLine0 = d3.select(".line0")
            .transition()
            //.delay(4000)
            .duration(0)
            .remove();

        removeLine1 = d3.select(".line1")
            .transition()
            //.delay(4000)
            .duration(0)
            .remove();

        // transition the axis
        setTimeout(function() { plot_main
            .select(".axis-x")
            .transition()
            //.delay(2000)
            .duration(1000)
            .call(axisX); }, 40);
            //.call(axisX); }, 4000);

    }

function downgradeMe(_data) {
        // redraw data to new scales

        domainXMax = 5000;
        //domainXMin = 0;
        scaleX.range([0,chartW]).domain([domainXMin, domainXMax]);
        scaleY.range([chartH,0]).domain([0,domainYMax]);

        console.log(nodes1);
        nodes1 = d3.select(".area1")
        //nodes1
            .transition()
            //.delay(4000)
            .duration(500)
            .style('fill-opacity', '1')
            .attr("d", area1);
            //.attr("d", area1(data));

        nodes0 = d3.select(".area0")
        //nodes0
            .transition()
            //.delay(4000)
            .duration(500)
            .style('fill-opacity', '1')
            .attr("d", area0);

        // re-add vertical lines
        plot_main.append("line").data([_data])
        .attr("class", "line0")
        .attr("y1", scaleY(0))
        .attr("y2", scaleY(h))
        .attr("x1", scaleX(estimate0))
        .attr("x2", scaleX(estimate0));

        plot_main.append("line").data([_data])
        .attr("class", "line1")
        .attr("y1", scaleY(0))
        .attr("y2", scaleY(h))
        .attr("x1", scaleX(estimate1))
        .attr("x2", scaleX(estimate1));


        // transition the axis
        setTimeout(function() { plot_main
            .select(".axis-x")
            .transition()
            //.delay(2000)
            .duration(1000)
            .call(axisX); }, 40);
            //.call(axisX); }, 4000);

    }


    //Getter and setter
    exports.width = function(_v){
        if(!arguments.length) return w;
        w = _v;
        return this;
    }
    exports.height = function(_z){
        if(!arguments.length) return h;
        h = _z;
        return this;
    }

    exports.variable0 = function(_b){
        if(!arguments.length) return variable0;
        variable0 = _b;
        return this;
    }
    exports.variable1 = function(_d){
        if(!arguments.length) return variable1;
        variable1 = _d;
        return this;
    }

    exports.domainXMax = function(_d){
        if(!arguments.length) return domainXMax;
        domainXMax = _d;
        return this;
    }

    exports.domainXMin = function(_b){
        if(!arguments.length) return domainXMin;
        domainXMin = _b;
        return this;
    }

    exports.domainYMax = function(_d){
        if(!arguments.length) return domainYMax;
        domainYMax = _d;
        return this;
    }
    return exports;
};