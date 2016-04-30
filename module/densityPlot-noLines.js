/**
 * Created by Maciej on 4/12/2016.
 */

// for better comments see other density plots

//New features:
//you can now add the following specifications to your call:
//    .domainXMax(4000)  // this changes the maximum value of X
//    .domainXMin(800)   // this changes the minimum value of X
//    .domainYMax(0.001) // this changes the maximum value of Y


d3.densityPlotNoLines = function () {

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
    var Title = "";

    var scaleX = d3.scale.linear()
        .domain([domainXMin, domainXMax])
        .range([0, chartW]);

    var scaleY = d3.scale.linear()
        .domain([0, domainYMax])
        .range([chartH, 0]);

    area1 = d3.svg.line()
        .x(function (d) {
            if (scaleX(d.x1) > scaleX(domainXMax)) {
                return scaleX(domainXMax);
            }
            else if (scaleX(d.x1) < scaleX(domainXMin)) {
                return scaleX(domainXMin);
            }
            else {
                return scaleX(d.x1);
            }
        })
        .y(function (d) {
            if (scaleX(d.x1) > scaleX(domainXMax) || scaleX(d.x1) < scaleX(domainXMin)) {
                return scaleY(0);
            }
            else {
                return scaleY(d.y1);
            }
        });

    area0 = d3.svg.line()
        .x(function (d) {
            if (scaleX(d.x0) > scaleX(domainXMax)) {
                return scaleX(domainXMax);
            }
            else if (d.x0 < scaleX(domainXMin)) {
                return scaleX(domainXMin);
            }
            else {
                return scaleX(d.x0);
            }
        })
        .y(function (d) {
            if (d.x0 > domainXMax || d.x0 < domainXMin) {
                return scaleY(0);
            }
            else {
                return scaleY(d.y0);
            }
        });

    var areaFlat = d3.svg.line()
        .x(function (d) {
            return scaleX(d.x0);
        })
        .y(function (d) {
            return scaleY(0);
        });

    valueAccessor = function (d) {
        return d;
    };

    function exports(_selection) {
        //recompute internal variables if updated

        chartW = w - m.l - m.r,
            chartH = h - m.t - m.b;
        //
        scaleX.range([0, chartW]).domain([domainXMin, domainXMax]);
        scaleY.range([chartH, 0]).domain([0, domainYMax]);

        _selection.each(draw);
    }

    function draw(_data) {
        var plot_main = d3.select(this);
        var estimate0 = _data[0].estimate0;
        var estimate1 = _data[0].estimate1;


        var nodes0 = plot_main.append("path").data([_data])
            .attr("class", "area0")
            .style('fill-opacity', '0.1')
            .attr("d", areaFlat)
            .transition()
            .duration(1000)
            .style('fill-opacity', '1')
            .attr("d", area0);

        var nodes1 = plot_main.append("path").data([_data])
            .attr("class", "area1")
            .style('fill-opacity', '0.1')
            .attr("d", areaFlat)
            .transition()
            .duration(1000)
            .style('fill-opacity', '1')
            .attr("d", area1);

        legend = plot_main.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(50,30)")
            .style("font-size", "9px");

        legend
            .append("rect")
            .attr("class", "legendgrey")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", chartW / 70)
            .attr("height", chartW / 70)
            .attr("fill", "grey");

        legend
            .append("rect")
            .attr("class", "legendred")
            .attr("x", 0)
            .attr("y", 15)
            .attr("width", chartW / 70)
            .attr("height", chartW / 70)
            .attr("fill", "red");

        legend
            .append("text")
            .attr("x", 15)
            .attr("y", 8)
            .attr("fill", "gray")
            .text(variable0);

        legend
            .append("text")
            .attr("x", 15)
            .attr("y", 23)
            .attr("fill", "red")
            .attr("opacity", 0.7)
            .text(variable1);

        legend
            .attr("transform", "translate(" + chartW / 1.15 + "," + chartH / 25 + ")");

        // description of the x axis
        plot_main
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", scaleX(5000))
            .attr("y", chartH * 1.7)
            .text("weight in grams")
            .style("font-size", "6px");

        var title = plot_main.append("g")
            .attr("class", "title")
            .attr("transform", "translate(37,0)")
            .style("font-size", "9px");


        title
            .append("text")
            .attr("x", 15)
            .attr("y", 0)
            .attr("fill", "black")
            .attr("opacity", 1)
            .attr("text-anchor", "left")
            .text(Title);

        axisX = d3.svg.axis()
            .orient('bottom')
            .scale(scaleX);

        plot_main.append('g').attr('class', 'axis axis-x')
            .attr('transform', 'translate(0,' + chartH + ')')
            .call(axisX);

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

    exports.Title = function (_b) {
        if (!arguments.length) return Title; // Jini added this so we can specify titles, todo - test it.
        Title = _b;
        return this;
    };

    exports.variable0 = function (_b) {
        if (!arguments.length) return variable0;
        variable0 = _b;
        return this;
    };
    exports.variable1 = function (_d) {
        if (!arguments.length) return variable1;
        variable1 = _d;
        return this;
    };

    exports.domainXMax = function (_d) {
        if (!arguments.length) return domainXMax;
        domainXMax = _d;
        return this;
    };

    exports.domainXMin = function (_b) {
        if (!arguments.length) return domainXMin;
        domainXMin = _b;
        return this;
    };

    exports.domainYMax = function (_d) {
        if (!arguments.length) return domainYMax;
        domainYMax = _d;
        return this;
    };

    return exports;
};