window.addEventListener('load', e => {
    drawHistogram();
});

function drawHistogram() {
    let width = 500;
    let height = 500;
    let barPadding = 1;
    let padding = 30;

    let xScale = d3.scaleLinear()
                   .domain(d3.extent(regionData, d => d.medianAge))
                   .rangeRound([padding, width - padding]);
    
    let histogram = d3.histogram()
                      .domain(xScale.domain())
                      .thresholds(xScale.ticks())
                      .value(d => d.medianAge);
    
    let bins = histogram(regionData);

    let yScale = d3.scaleLinear()
                   .domain([0, d3.max(bins, d => d.length)])
                   .range([height - padding, padding]);

    d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .selectAll(".bar")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("height", d => height - padding - yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0) - barPadding)
        .attr("fill", "blue");

    d3.select("svg")
    .append("g")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(d3.axisBottom(xScale));

    d3.select("svg")
    .append("g")
    .attr("transform", "translate("+ padding + ",0)")
    .call(d3.axisLeft(yScale));
}