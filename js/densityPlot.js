/**
 * Created by Maciej on 4/12/2016.
 */


//New features:
//you can now add the following specifications to your call:
//    .domainXMax(4000)  // this changes the maximum value of X
//    .domainXMin(800)   // this changes the minimum value of X
//    .domainYMax(0.001) // this changes the maximum value of Y


d3.densityPlot = function () {

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

    var scaleX = d3.scale.linear()
        .domain([domainXMin, domainXMax])
        .range([0, chartW]);

    var scaleY = d3.scale.linear()
        .domain([0, domainYMax])
        .range([chartH, 0]);

    var area1 = d3.svg.line()
        .x(function (d) {
            if (d.x1 > domainXMax) { // ensures Xs larger than XMax are not plotted to the right of the axis
                return scaleX(domainXMax);
            }
            else if (d.x1 < domainXMin) { // ensures Xs smaller than XMin are not plotted to the left of the axis
                return scaleX(domainXMin);
            }
            else {
                return scaleX(d.x1);
            }
        })
        .y(function (d) {
            if (d.x1 > domainXMax || d.x1 < domainXMin) { // ensures Xs outside of the range are not plotted
                return scaleY(0);
            }
            else {
                return scaleY(d.y1);
            }
        });

    var area0 = d3.svg.line()
        .x(function (d) {
            if (d.x0 > domainXMax) { // ensures Xs larger than XMax are not plotted to the right of the axis
                return scaleX(domainXMax);
            }
            else if (d.x0 < domainXMin) { // ensures Xs smaller than XMin are not plotted to the left of the axis
                return scaleX(domainXMin);
            }
            else {
                return scaleX(d.x0);
            }
        })
        .y(function (d) {
            if (d.x0 > domainXMax || d.x0 < domainXMin) { // ensures Xs outside of the range are not plotted
                return scaleY(0);
            }
            else {
                return scaleY(d.y0);
            }
        });

    var areaFlat = d3.svg.line()
        // plot a flat graph (all Ys are 0s)
        // I use it later for a nice transition
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

        chartW = w - m.l - m.r;
        chartH = h - m.t - m.b;

        scaleX.range([0, chartW]).domain([domainXMin, domainXMax]);
        scaleY.range([chartH, 0]).domain([0, domainYMax]);

        _selection.each(draw);
    }

    function draw(_data) {
        var plot_main = d3.select(this);
        var estimate0 = _data[0].estimate0;
        var estimate1 = _data[0].estimate1;


        // plotting the first variable (density plot with kernel smoothing)
        var nodes1 = plot_main.append("path").data([_data])
            .attr("class", "area1")
            .style('fill-opacity', '0.1')
            .attr("d", areaFlat)
            .transition()
            .duration(1000)
            .style('fill-opacity', '1')
            .attr("d", area1);

        // plotting the second variable (density plot with kernel smoothing)
        var nodes0 = plot_main.append("path").data([_data])
            .attr("class", "area0")
            .style('fill-opacity', '0.1')
            .attr("d", areaFlat)
            .transition()
            .duration(1000)
            .style('fill-opacity', '1')
            .attr("d", area0);

        // adds a vertical line for estimate0 from regression
        plot_main.append("line").data([_data])
            .attr("class", "line0")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate0))
            .attr("x2", scaleX(estimate0));

        // adds a vertical line for estimate1 from regression
        plot_main.append("line").data([_data])
            .attr("class", "line1")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate1))
            .attr("x2", scaleX(estimate1));

        // preps a legend
        legend = plot_main.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(50,30)")
            .style("font-size", "9px");
        // todo
        // make the below "x" a function of chartW
        // once Jinni makes the scroll responsive

        // plots a legend
        legend
            .append("rect")
            .attr("class", "legendgrey")
            //.attr("x", -50)
            .attr("x", scaleX(domainXMax*0.8))
            .attr("y", 0)
            .attr("width", chartW / 70)
            .attr("height", chartW / 70)
            .attr("fill", "grey");

        legend
            .append("rect")
            .attr("class", "legendred")
            //.attr("x", -50)
            .attr("x", scaleX(domainXMax*0.8))
            .attr("y", 15)
            .attr("width", chartW / 70)
            .attr("height", chartW / 70)
            .attr("fill", "red");

        legend
            .append("text")
            //.attr("x", -35)
            .attr("x", scaleX(domainXMax*0.82))
            .attr("y", 8)
            .text(variable0)
            .attr("fill", "grey")
            .attr("opacity", 0.9);

        legend
            .append("text")
            //.attr("x", -35)
            .attr("x", scaleX(domainXMax*0.82))
            .attr("y", 23)
            .text(variable1)
            .attr("fill", "red")
            .attr("opacity", 0.9);

        //legend
        //    .attr("transform", "translate(400,-10)");

        // description of the x scale
        // now more responsive (always plotted at the end of the axis)
        plot_main
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", scaleX(5000))
            .attr("y", chartH - chartH / 15)
            .text("weight")
            .style("font-size", "6px");

        plot_main
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", scaleX(5000))
            .attr("y", chartH - chartH / 40)
            .text("(grams)")
            .style("font-size", "6px");

        var axisX = d3.svg.axis()
            .orient('bottom')
            .scale(scaleX);

        var axisY = d3.svg.axis()
            .orient('left')
            .scale(scaleY);

        //Draw axes
        plot_main.append('g').attr('class', 'axis axis-x')
            .attr('transform', 'translate(0,' + chartH + ')')
            .call(axisX);

        plot_main.append('g').attr('class', 'axis axis-y')
            .call(axisY);

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