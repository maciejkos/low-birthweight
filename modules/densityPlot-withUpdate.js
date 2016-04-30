/**
 * Created by Maciej on 4/12/2016.
 */

// new update feature
// the modules now removes vertical lines when updated

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


d3.densityPlotWithUpdate = function () {


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

    area1Update = d3.svg.line()
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

    area0UPdate = d3.svg.line()
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

    // plot a flat graph (all Ys are 0s)
    // I use it later for a nice transition
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

        chartW = w - m.l - m.r;
        chartH = h - m.t - m.b;
        //
        scaleX.range([0, chartW]).domain([domainXMin, domainXMax]);
        scaleY.range([chartH, 0]).domain([0, domainYMax]);

        _selection.each(draw);
    }

    function draw(_data) {
        data = _data;

        plot_main = d3.select(this);
        estimate0 = _data[0].estimate0;
        estimate1 = _data[0].estimate1;

        // plotting the first variable (density plot with kernel smoothing)
        nodes0 = plot_main.append("path").data([_data])
            .attr("class", "area0Update")
            .attr("fill", "lightgray")
            .style('opacity', '0.5')
            .attr("d", areaFlat)
            .transition()
            .duration(1000)
            .style('fill-opacity', '1')
            .attr("d", area0UPdate);

        // plotting the second variable (density plot with kernel smoothing)
        nodes1 = plot_main.append("path").data([_data])
            .attr("class", "area1Update")
            .attr("fill", "gray")
            .style('opacity', '0.4')
            .attr("d", areaFlat)
            .transition()
            .duration(1000)
            .style('fill-opacity', '1')
            .attr("d", area1Update);

        // adds a vertical line for estimate0 from regression
        plot_main.append("line").data([_data])
            .attr("class", "line0Update")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate0))
            .attr("x2", scaleX(estimate0));

        // adds a vertical line for estimate1 from regression
        plot_main.append("line").data([_data])
            .attr("class", "line1Update")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate1))
            .attr("x2", scaleX(estimate1));

        // preps a legend
        legend = plot_main.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(50,30)")
            .style("font-size", "12px");

        // plots a legend
        legend
            .append("rect")
            .attr("class", "legendgrey")
            .attr("x", scaleX(domainXMax*0.8))
            .attr("y", 0)
            .attr("width", chartW / 90)
            .attr("height", chartW / 90)
            .attr("fill", "green");

        legend
            .append("rect")
            .attr("class", "legendred")
            .attr("x", scaleX(domainXMax*0.8))
            .attr("y", 18)
            .attr("width", chartW / 90)
            .attr("height", chartW / 90)
            .attr("fill", "steelblue");

        legend
            .append("text")
            .attr("x", scaleX(domainXMax*0.82))
            .attr("y", 10)
            .text(variable0)
            .attr("fill", "green");

        legend
            .append("text")
            .attr("x", scaleX(domainXMax*0.82))
            .attr("y", 30)
            .text(variable1)
            .attr("fill", "steelblue");

        //legend
            //.attr("transform", "translate(550,0)");

        // description of the x scale
        // now more responsive (always plotted at the end of the axis)
        plot_main
            .append("text")
            .attr("text-anchor", "left")
            .attr("x", scaleX(5000))
            .attr("y", chartH - chartH / 20)
            .text("weight")
            .style("font-size", "7px");

        plot_main
            .append("text")
            .attr("text-anchor", "left")
            .attr("x", scaleX(5000))
            .attr("y", chartH - chartH / 40)
            .text("(Grams)")
            .style("font-size", "7px");


        axisX = d3.svg.axis()
            .orient('bottom')
            .scale(scaleX);

        axisY = d3.svg.axis()
            .orient('left')
            .scale(scaleY);

//Draw axes
        plot_main.append('g').attr('class', 'axis axis-x')
            .attr('transform', 'translate(0,' + chartH + ')')
            .call(axisX);

        plot_main.append('g').attr('class', 'axis axis-y')
            .call(axisY);


        globalDispatch.on('update', function (ext) {
            updateMe(_data);
        });
        //updateMe(_data);

        globalDispatch.on('downgrade', function (ext) {
            downgradeMe(_data);
        });

    }

    function updateMe() {
        // redraw data to new scales

        domainXMax = 2500;

        scaleX.range([0, chartW]).domain([domainXMin, domainXMax]);
        scaleY.range([chartH, 0]).domain([0, domainYMax]);

        nodes1 = d3.select(".area1Update")
            .transition()
            .duration(500)
            .style('fill-opacity', '1')
            .attr("d", area1Update);

        nodes0 = d3.select(".area0Update")
            .transition()
            .duration(500)
            .style('fill-opacity', '1')
            .attr("d", area0UPdate);

        //removes vertical lines
        removeLine0 = d3.select(".line0Update")
            .transition()
            .duration(0)
            .remove();

        removeLine1 = d3.select(".line1Update")
            .transition()
            .duration(0)
            .remove();

        // transition the axis
        setTimeout(function () {
            plot_main
                .select(".axis-x")
                .transition()
                //.delay(2000)
                .duration(1000)
                .call(axisX);
        }, 40); // some additional delay, so it look more sexy


    }

    function downgradeMe(_data) {
        // redraw data to old scales

        domainXMax = 5000;
        scaleX.range([0, chartW]).domain([domainXMin, domainXMax]);
        scaleY.range([chartH, 0]).domain([0, domainYMax]);

        nodes1 = d3.select(".area1Update")
            .transition()
            .duration(500)
            .style('fill-opacity', '1')
            .attr("d", area1Update);

        nodes0 = d3.select(".area0Update")
            .transition()
            .duration(500)
            .style('fill-opacity', '1')
            .attr("d", area0UPdate);

        // re-add vertical lines
        plot_main.append("line").data([_data])
            .attr("class", "line0Update")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate0))
            .attr("x2", scaleX(estimate0));

        plot_main.append("line").data([_data])
            .attr("class", "line1Update")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate1))
            .attr("x2", scaleX(estimate1));


        // transition the axis
        setTimeout(function () {
            plot_main
                .select(".axis-x")
                .transition()
                .duration(1000)
                .call(axisX);
        }, 40);

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