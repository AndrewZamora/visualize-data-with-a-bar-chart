(async () => {
    const { data } = await (await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")).json();
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const chartHeight = 600;
    const chartWidth = 800;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    const innerWidth = chartWidth - margin.left - margin.right;
    const xScale = d3.scaleTime().range([0, innerWidth]);
    const yScale = d3.scaleLinear().range([innerHeight, 0]);
    xScale.domain([new Date(d3.min(data, d => d[0])), new Date(d3.max(data, d => d[0]))]);
    yScale.domain([0, d3.max(data, d => d[1])]);
    const chartContainer = d3.select('div').append('svg').attr("height", chartHeight).attr("width", chartWidth);
    const chart = chartContainer.append('g').attr("transform", `translate(${margin.left},${margin.top})`);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);
    function addTooltip(barData) {
        const tooltip = d3.select("#title").append("div");
        tooltip
            .attr("class", "active")
            .attr("data-date", barData[0])
            .attr("id", "tooltip")
            .style("left", `${d3.mouse(this)[0] + 70}px`)
            .style("top", `${d3.mouse(this)[1]}px`)
            .append("text")
            .text(()=>barData);
    }
    chart
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr('width', innerWidth / data.length)
        .attr('height', d => innerHeight - yScale(d[1]))
        .attr('x', d => xScale(new Date(d[0])))
        .attr('y', d => yScale(d[1]))
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])
        .on("mouseover",addTooltip)
        .on("mouseout", () => {
            d3.select("#tooltip").remove();
        })

    chart.append('g').call(xAxis).attr("id", "x-axis").attr("transform", `translate(0,${innerHeight})`);
    chart.append('g').call(yAxis).attr("id", "y-axis").attr("transform", `translate(0,0)`).append('text').text("Gross Domestic Product").attr("fill", "#333").attr("transform", `translate(${margin.left},${innerHeight / 2})`);
})();