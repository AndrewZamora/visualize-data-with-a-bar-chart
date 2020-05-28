(async () => {
    const { data } = await (await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")).json();
    console.log(data)
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const chartHeight = 400;
    const chartWidth = 600;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    const xScale = d3.scaleBand().rangeRound([0, chartWidth]).padding(0.1);
    const yScale = d3.scaleLinear().range([chartHeight, 0]);
    xScale.domain(data.map(d => {
        const date = new Date(d[0]);
        return date.getFullYear();
    }));
    yScale.domain([0, d3.max(data, (d) => d[1])]);
    const chartContainer = d3.select('div').append('svg').attr("height", chartHeight).attr("width", chartWidth);
    const chart = chartContainer.append('g');
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    chart
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr('width', xScale.bandwidth())
        .attr('height', d => chartHeight - yScale(d[1]))
        .attr('x', d => {
            const date = new Date(d[0]);
            return xScale(date.getFullYear());
        })
        .attr('y', d => yScale(d[1]))
    chart.append('g').call(xAxis).attr("id", "x-axis").attr("transform", `translate(0,${chartHeight})`);
    chart.append('g').call(yAxis).attr("id", "y-axis").attr("transform", `translate(0,0)`);
    // const margin = {top: 40, right: 40, bottom: 80, left: 40};
    // const innerWidth = width - margin.left - margin.right;
    // const innerHeight = height - margin.top - margin.bottom;
    // const svg = d3.select('div').append('svg').attr("height", height).attr("width", width);
    // const padding = 100;
    // const xScale = d3.scaleBand().domain(data.map(d => {
    //     const date = new Date(d[0]);
    //     return date.getFullYear();
    // })).range([0, innerWidth]);
    // const yScale = d3.scaleLinear().domain([0,d3.max(data, (d) => d[1])]).range([0,innerHeight]);
    // const xAxis = d3.axisBottom(xScale);
    // const yAxis = d3.axisLeft(yScale);
    // const g = svg.append('g').attr("transform", `translate(${margin.left},${margin.top})`);
    // g.append('g').call(yAxis).attr("id", "y-axis").attr("transform", `translate(0,0)`);
    // g.append('g').call(xAxis).attr("id", "x-axis").attr("transform", `translate(0,${innerHeight})`);

    // g.selectAll("rect")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr('x', d => xScale((new Date(d[0]).getFullYear())))
    //     .attr('y', d => innerHeight - yScale(d[1]))
    //     .attr("height", d => yScale(d[1]))
    //     .attr("width", xScale.bandwidth())
    //     .attr("class", "bar")
})();