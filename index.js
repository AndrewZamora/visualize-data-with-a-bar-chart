(async () => {
    const { data } = await (await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")).json();
    console.log(data)
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const chartHeight = 600;
    const chartWidth = 800;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    const innerWidth = chartWidth - margin.left - margin.right;
    const xScale = d3.scaleTime().range([0,innerWidth]);
    const yScale = d3.scaleLinear().range([innerHeight, 0]);
    xScale.domain([new Date(d3.min(data, d => d[0])),new Date(d3.max(data, d => d[0]))]);
    yScale.domain([0, d3.max(data, d => d[1])]);
    const chartContainer = d3.select('div').append('svg').attr("height", chartHeight).attr("width", chartWidth);
    const chart = chartContainer.append('g').attr("transform", `translate(${margin.left},${margin.top})`);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    chart
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr('width', 2)  
        .attr('height', d => innerHeight - yScale(d[1]))
        .attr('x', d => xScale(new Date(d[0])))
        .attr('y', d => yScale(d[1]))
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])
    chart.append('g').call(xAxis).attr("id", "x-axis").attr("transform", `translate(0,${innerHeight})`);
    chart.append('g').call(yAxis).attr("id", "y-axis").attr("transform", `translate(0,0)`);
})();