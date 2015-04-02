var margin = {top: 1, right: 1, bottom: 6, left: 1},
    width = 920 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatNumber = d3.format("$,.1f"), // one decimal place
    format = function(d) { return formatNumber(d) + " million"; },
    color = d3.scale.category20(); //color scheme: https://github.com/mbostock/d3/wiki/Ordinal-Scales#category10

function addSankey(overlapSources,overlapTargets,parent) {
var svg = d3.select("#"+parent).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var sankey = d3.sankey()
    .nodeWidth(25)
    .nodePadding(10) //padding between nodes
    .size([width, height])
    .overlapLinksAtSources(overlapSources)
    .overlapLinksAtTargets(overlapTargets);

var path = sankey.link();

d3.json("json/budget.json", function(money) {

  sankey
      .nodes(money.nodes)
      .links(money.links)
      .layout(32);

  var link = svg.append("g").selectAll(".link")
      .data(money.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

  link.append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + ":\n" + format(d.value) + "\n" + d.target.des; });

  var node = svg.append("g").selectAll(".node")
      .data(money.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { this.parentNode.appendChild(this); })
      .on("drag", dragmove));

  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) {return d.color;})
      //.style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
      //.style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
      .style("stroke", function(d) { return d.color;})
    .append("title")
      .text(function(d) { return d.name + "\n" + format(d.value); });

  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name + ": " + formatNumber(d.value); })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

  function dragmove(d) {
    d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
});
}

addSankey(false,false,"chart1");