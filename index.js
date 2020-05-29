(async () => {
    const { data } = await (await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")).json();
    console.log(data)
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const chartHeight = 600;
    const chartWidth = 800;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    const innerWidth = chartWidth - margin.left - margin.right;
    const xScale = d3.scaleBand().rangeRound([0, innerWidth]).padding(0.1);
    const yScale = d3.scaleLinear().range([innerHeight, 0]);
    const getYear = date => {
        return new Date(date).getFullYear();
    };
    xScale.domain(data.map(d => getYear(d[0])));
    yScale.domain([0, d3.max(data, d => d[1])]);
    const chartContainer = d3.select('div').append('svg').attr("height", chartHeight).attr("width", chartWidth);
    const chart = chartContainer.append('g').attr("transform", `translate(${margin.left},${margin.top})`);
    const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter((d, i) => !(i % 4)))
    const yAxis = d3.axisLeft(yScale);
    chart
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d[1]))
        .attr('x', d => xScale(getYear(d[0])))
        .attr('y', d => yScale(d[1]))
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])
    chart.append('g').call(xAxis).attr("id", "x-axis").attr("transform", `translate(0,${innerHeight})`);
    chart.append('g').call(yAxis).attr("id", "y-axis").attr("transform", `translate(0,0)`);
})();