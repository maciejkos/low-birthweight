
/**
 * Created by Maciej on 4/26/2016.
 */
d3.multiples = function(){
    var w = 350,
        h = 100,
        m = {t:50,r:20,b:25,l:20},
        chartW = w - m.l - m.r,
        chartH = h - m.t - m.b;

    var aHigh = 60;
    var aLow = 100-aHigh;
    var bHigh = 30;
    var bLow = 100-bHigh;

    x = d3.scale.linear()
        .range([0, chartW]);

    y = d3.scale.ordinal()
        .rangeRoundBands([0, chartH], .3);

    var formatPercent = d3.format("%");
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top")
        .tickFormat(function(d) { return formatPercent(Math.abs(d/100)); });

    var leftLabel ="";
    var rightLabel ="";
    var separator ="";


    var data = [{
        name: "A",
        value: aHigh,
        value2: aLow
    }, {
        name: "B",
        value: bHigh,
        value2: bLow
    }];

    x.domain([-100,100]);
    y.domain(data.map(function (d) {
        return d.name;
    }));

    function exports(_selection){

        var aLow = 100-aHigh;
        var bLow = 100-bHigh;

        data = [{
            name: "A",
            value: aHigh,
            value2: aLow
        }, {
            name: "B",
            value: bHigh,
            value2: bLow
        }];
        _selection.each(draw);
    }

    function draw(){
        console.log("draw");
        forTopLabel = d3.select(this);
        svg = d3.select(this).append("svg")
            .attr("width", chartW)
            .attr("height", chartH)
            .attr("width", chartW + m.l + m.r)
            .attr("height", chartH + m.t + m.b)
            .append("g")
            .attr("transform", "translate(" + m.l + "," + m.t + ")");

        forTopLabel = svg; // I will use it later

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .style("opacity", 0)
            .attr("x", function (d) {
                return x(Math.min(0, -0));
            })
            .attr("width", function (d) {
                return Math.abs(x(0) - x(0));
            })
            .transition()
            .duration(1000)
            .style("opacity", 0.5)
            .attr("x", function (d) {
                return x(Math.min(0, d.value));
            })
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("width", function (d) {
                return Math.abs(x(d.value) - x(0));
            })
            .attr("height", y.rangeBand());

        svg.selectAll(".bar2")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar2")
            .style("opacity", 0)
            .attr("x", function (d) {
                return x(Math.min(0, -0));
            })
            .attr("width", function (d) {
                return Math.abs(x(0) - x(0));
            })
            .transition()
            .duration(1000)
            .style("opacity", 0.5)
            .attr("x", function (d) {
                return x(Math.min(0, -d.value2));
            })
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("width", function (d) {
                return Math.abs(x(-d.value2) - x(0));
            })
            .attr("height", y.rangeBand());

        //forTopLabel
        svg
            .append("g")
            .attr("class", "axis-label-left")
            .append("text")
            .text(leftLabel)
            //.attr("transform", "translate(" + chartW/2 + ",0)")
            //.text("no college degree | college degree")
            .attr("x", chartW/2 - chartW/100)
            .attr("y", -chartH)
            .attr("text-anchor", "end")
            //.attr("text-align", "left")
            .attr("font-family", "Montserrat")
            .attr("font-size", "9px")
            .attr("fill","red")
            .attr("opacity",0.9)
            .attr("y2", chartH);

        svg
            .append("g")
            .attr("class", "axis-label-right")
            .append("text")
            .text(rightLabel)
            //.attr("transform", "translate(" + chartW/2 + ",0)")
            //.text("no college degree | college degree")
            .attr("x", chartW/2 + chartW/100)
            .attr("y", -chartH)
            //.attr("text-anchor", "end")
            .attr("font-family", "Montserrat")
            .attr("font-size", "9px")
            .attr("fill","gray")
            .attr("y2", chartH);

        svg
            .append("g")
            .attr("class", "axis-label-separator")
            .append("text")
            .text(separator)
            //.attr("transform", "translate(" + chartW/2 + ",0)")
            //.text("no college degree | college degree")
            .attr("x", chartW/2)
            .attr("y", -chartH)
            .attr("text-anchor", "middle")
            .attr("font-family", "Montserrat")
            .attr("font-size", "9px")
            .attr("fill","black")
            .attr("y2", chartH);

        //right label
        svg
            .append("g")
            .attr("class","right-label-Black")
            .append("text")
            .text("Black mothers")
            .attr("x", chartW/1.01)
            .attr("y", -chartH/2+22)
            .attr("text-anchor", "middle")
            .attr("font-family", "Montserrat")
            .attr("font-size", "6px")
            //.attr("fill","steelblue")
            .attr("y2", chartH);
        svg
            .append("g")
            .attr("class","right-label-White")
            .append("text")
            .text("White mothers")
            .attr("x", chartW/1.01)
            .attr("y", -chartH/2+33)
            .attr("text-anchor", "middle")
            .attr("font-family", "Montserrat")
            .attr("font-size", "6px")
            //.attr("fill","#318041")
            .attr("y2", chartH);




        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .append("line")
            .attr("x1", x(0))
            .attr("x2", x(0))
            .attr("y2", chartH);


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

    exports.aHigh = function(_b){
        if(!arguments.length) return aHigh;
        aHigh = _b;
        return this;
    };
    exports.bHigh = function(_d){
        if(!arguments.length) return bHigh;
        bHigh = _d;
        return this;
    };

    exports.leftLabel = function(_d){
        if(!arguments.length) return leftLabel;
        leftLabel = _d;
        return this;
    };

    exports.rightLabel = function(_d){
        if(!arguments.length) return rightLabel;
        rightLabel = _d;
        return this;
    };
    exports.separator = function(_d){
        if(!arguments.length) return separator;
        separator = _d;
        return this;
    };

    return exports;
};