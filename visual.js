d3.json("uk.json", function(error, uk) {
    if (error) return console.error(error);
    console.log(uk);
  });

    var width = 960,
    height = 1160;
    var quantize = d3.scale.quantize()
    .domain([1, 11])
    .range(d3.range(11).map(function(i) {
      return "f" + i;
    }));

     var projection = d3.geo.albers()
     .center([1.5, 55.2])
    .rotate([4.4, 0])
    .parallels([50, 50])
    .scale(3300)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);
    

    var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

    function zoomed() {
      var t = d3.event.translate,
        s = d3.event.scale;
      t[0] = Math.min(width / 2 * (s - 1), Math.max(width / 2 * (1 - s) - 150 * s, t[0]));
      t[1] = Math.min(height / 2 * (s - 1) + 230 * s, Math.max(height / 2 * (1 - s) - 230 * s, t[1]));
      zoom.translate(t);
      mapContainer.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");
    }

    var svg = d3.select('#ukMap')
    .append('svg:svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('perserveAspectRatio', 'xMinYMid')
    .attr('id', "sizer-map")
    .attr('class', "sizer")
    .call(zoom);
  var main = svg.append("g")
    .attr('transform', 'translate(0,0)')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main');
  var rect = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "overlay")
    .style("fill", "none")
    .style("pointer-events", "all");
  var mapContainer = svg.append("g");
  var tooltip = d3.select("#tooltipContainer")
    .append("div")
    .attr("class", "tooltip");
  tooltip.html(" ");



  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("uk.json", function(error, uk) {
svg.selectAll(".subunit")
    .data(topojson.feature(uk, uk.objects.subunits).features)
  .enter().append("path")
    .attr("class", function(d) { return "subunit " + d.id; })
    .attr("d", path);

svg.append("path")
    .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
    .attr("d", path)
    .attr("class", "subunit-boundary");

svg.append("path")
    .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
    .attr("d", path)
    .attr("class", "subunit-boundary IRL");

svg.append("path")
    .datum(topojson.feature(uk, uk.objects.places))
    .attr("d", path)
    .attr("class", "place");

    svg.selectAll(".place-label")
    .data(topojson.feature(uk, uk.objects.places).features)
    .enter().append("text")
    .attr("class", "place-label")
    .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.properties.name; })

    svg.selectAll(".place-label")
    .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
    .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });


d3.queue()
  .defer(d3.json, "uk.json")
  .defer(d3.csv, "ukdata", function(d) { data.set(d.code, +d.pop); })
  .await(ready);

  animateMap();

function ready(error, topo) {

  let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }

  function animateMap() {

    var timer;  
    d3.select('#play')    
      .on('click', function() {  
         if(playing == false) { 
          timer = setInterval(function(){   
            if(currentAttribute < attributeArray.length-1) {  
                currentAttribute +=1;
             } else {
                currentAttribute = 0; 
            }
            sequenceMap(); 
            d3.select('#clock').html(attributeArray[currentAttribute]);  
          }, 2000);
        
          d3.select(this).html('stop'); 
          playing = true;  
        } else {   
          clearInterval(timer);   
          d3.select(this).html('play');   
     playing = false; 
        }
    });
  }
  





}})
