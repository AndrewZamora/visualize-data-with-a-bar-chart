(async () => {
    const { data } = await (await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")).json();
    console.log(data)
    const height = 1000;
    const width = 1000;
    const margin = {top: 40, right: 40, bottom: 80, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const svg = d3.select('div').append('svg').attr("height", height).attr("width", width);
    const padding = 100;
    const xScale = d3.scaleBand().domain(data.map(d => {
        const date = new Date(d[0]);
        return date.getFullYear();
    })).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0,d3.max(data, (d) => d[1])]).range([0,innerHeight]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    const g = svg.append('g').attr("transform", `translate(${margin.left},${margin.top})`);
    g.append('g').call(yAxis).attr("id", "y-axis").attr("transform", `translate(0,0)`);
    g.append('g').call(xAxis).attr("id", "x-axis").attr("transform", `translate(0,${innerHeight})`);

    g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr('x', d => xScale((new Date(d[0]).getFullYear())))
        .attr('y', d => innerHeight - yScale(d[1]))
        .attr("height", d => yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("class", "bar")
})();