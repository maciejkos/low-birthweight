/**
 * Created by Maciej on 4/12/2016.
 */

//New features:
//you can now add the following specifications to your call:
//    .domainXMax(4000)  // this changes the maximum value of X
//    .domainXMin(800)   // this changes the minimum value of X
//    .domainYMax(0.001) // this changes the maximum value of Y

d3.densityPlot = function(){

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

    var area1 = d3.svg.line()
        .x(function(d) { return scaleX(d.x1); })
        .y(function(d) { return scaleY(d.y1); });

    var area0 = d3.svg.line()
        //.x(function(d) {
        //    if (d.x0 < domainXMax && d.x0 > domainXMin) {
        //        return scaleX(d.x0); }
        //    else {
        //        return 0}
        //    })
        .x(function(d) {return scaleX(d.x0); })

        .y(function(d) { return scaleY(d.y0); });

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
        //var plotReady = d3.select(this);
        var plot_main = d3.select(this)
            .append("svg")
            .attr('width',w)
            .attr('height',h);


        var nodes1 = plot_main.data([_data]).append("path")
            .attr("class", "area1")
            .style('fill-opacity', '0.4')
            .attr("d", area1);
        
        var nodes0 = plot_main.append("path").data([_data])
            .attr("class", "area0")
            .style('fill-opacity', '0.4')
            .attr("d", area0);

        plot_main.append("line")
            .attr("class", "line0")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate0))
            .attr("x2", scaleX(estimate0));

        plot_main.append("line")
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
            .attr("class","legendRed")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", chartW/50)
            .attr("height", chartW/50)
            .attr("fill", "red");

        legend
            .append("rect")
            .attr("class","legendBlue")
            .attr("x", 0)
            .attr("y", 15)
            .attr("width", chartW/50)
            .attr("height", chartW/50)
            .attr("fill", "blue");

        legend
            .append("text")
            .attr("x", 15)
            .attr("y", 8)
            .text(variable0);

        legend
            .append("text")
            .attr("x", 15)
            .attr("y", 23)
            .text(variable1);

        //var legend_text_exit = legend.exit().remove();

        legend
            .attr("transform","translate(400,-10)");

        var axisX = d3.svg.axis()
            .orient('bottom')
            .scale(scaleX);

        var axisY = d3.svg.axis()
            .orient('right')
            .scale(scaleY);

//Draw axes
        plot_main.append('g').attr('class', 'axis axis-x')
            .attr('transform', 'translate(0,' + chartH + ')')
            .call(axisX);

        plot_main.append('g').attr('class', 'axis axis-y')
            .call(axisY);

    }

    //Getter and setter
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
    //exports.timeRange = function(_r){
    //    if(!arguments.length) return timeRange;
    //    timeRange = _r;
    //    return this;
    //}
    //exports.value = function(_v){
    //    if(!arguments.length) return layout.value();
    //    valueAccessor = _v;
    //    layout.value(_v);
    //    return this;
    //}
    //exports.maxY = function(_y){
    //    if(!arguments.length) return maxY;
    //    maxY = _y;
    //    return this;
    //}
    exports.variable0 = function(_b){
        //@param _b: d3.time.interval
        if(!arguments.length) return variable0;
        variable0 = _b;
        return this;
    };
    exports.variable1 = function(_d){
        //@param _b: d3.time.interval
        if(!arguments.length) return variable1;
        variable1 = _d;
        return this;
    };

    exports.domainXMax = function(_d){
        //@param _b: d3.time.interval
        if(!arguments.length) return domainXMax;
        domainXMax = _d;
        return this;
    };

    exports.domainXMin = function(_b){
        //@param _b: d3.time.interval
        if(!arguments.length) return domainXMin;
        domainXMin = _b;
        return this;
    };

    exports.domainYMax = function(_d){
        //@param _b: d3.time.interval
        if(!arguments.length) return domainYMax;
        domainYMax = _d;
        return this;
    };

    //exports.domainXMax = function(_d){
    //    //@param _b: d3.time.interval
    //    if(!arguments.length) return domainXMax;
    //    domainXMax = _d;
    //    return this;
    //}
    return exports;
};