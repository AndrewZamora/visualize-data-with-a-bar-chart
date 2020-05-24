(async () => {
    const { data } = await (await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")).json();
    console.log(data)
    const height = 1000;
    const width = 1000;
    const svg = d3.select('div').append('svg').attr("height", height).attr("width", width);
    const padding = 100;
    const xScale = d3.scaleBand().domain(data.map(d => {
        const date = new Date(d[0]);
        return date.getFullYear();
    })).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d[1])]).range([0, height]);
    // const xAxis = d3.axisBottom(xScale);
    // const yAxis = d3.axisLeft(yScale);
    // svg.append("g").attr("transform", "translate(0," + (height) + ")").attr("id", "x-axis").call(xAxis);
    // svg.append("g").attr("transform", "translate(" + (0) + ",0)").attr("id", "y-axis").call(yAxis);
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr('x', d => xScale((new Date(d[0]).getFullYear())))
        .attr('y', d => height - yScale(d[1]))
        .attr("height", d => yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("class", "bar")
})();