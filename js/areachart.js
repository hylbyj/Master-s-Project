function InitChart() {
var data = [{
    "sale": "10415.55694",
    "year": "2002"
}, {
    "sale": "11187.65094",
    "year": "2003"
}, {
    "sale": "10762.50985",
    "year": "2004"
}, {
    "sale": "11291.86538",
    "year": "2005"
}, {
    "sale": "11547.15194",
    "year": "2006"
}, {
    "sale": "12513.13175",
    "year": "2007"
},{
    "sale": "13109.88844",
    "year": "2008"
},{
    "sale": "15133.59405",
    "year": "2009"
},{
    "sale": "15741.11664",
    "year": "2010"
},{
    "sale": "16368.85181",
    "year": "2011"
}];

var data2 = [{
    "sale": "6036.488264",
    "year": "2002"
}, {
    "sale": "6422.904137",
    "year": "2003"
}, {
    "sale": "6233.232649",
    "year": "2004"
}, {
    "sale": "9106.874374",
    "year": "2005"
}, {
    "sale": "9331.12981",
    "year": "2006"
}, {
    "sale": "10292.81564",
    "year": "2007"
},{
    "sale": "10225.69366",
    "year": "2008"
},{
    "sale": "9959.143269",
    "year": "2009"
},{
    "sale": "11172.00463",
    "year": "2010"
},{
    "sale": "12335.43696",
    "year": "2011"
}];

var vis = d3.select("#visualisation"),
    WIDTH = 800,
    HEIGHT = 400,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    },
    xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2002, 2011]),
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([5000, 18000]),
    xAxis = d3.svg.axis()
    .scale(xScale),
    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);
vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);
var lineGen = d3.svg.line()
    .x(function(d) {
        return xScale(d.year);
    })
    .y(function(d) {
        return yScale(d.sale);
    })
    .interpolate("basis");
vis.append('svg:path')
    .attr('d', lineGen(data))
    .attr('stroke', '#a6dba0')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
vis.append('svg:path')
    .attr('d', lineGen(data2))
    .attr('stroke', '#a6dba0')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}
InitChart();