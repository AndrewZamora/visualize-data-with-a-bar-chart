(async () => {
    const getData = async () => {
        const response = await (await fetch("http://hotline.whalemuseum.org/api.json")).json();
        return response
    }
    const data = await getData();
    console.log(data)
    const height = 1000;
    const width = 1000;
    const svg = d3.select('div').append('svg').attr("height", height).attr("width", width);
    const dataSet = [1, 2, 3, 4, 7, 8];
    const padding = 100;
    const xScale = d3.scaleLinear().domain([0, d3.max(dataSet, (d) => d)]).range([padding, width - padding]);
    const yScale = d3.scaleLinear().domain([0, d3.max(dataSet, (d) => d)]).range([height - padding, padding]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", "translate(0," + (height - padding) + ")").attr("id", "x-axis").call(xAxis);
    svg.append("g").attr("transform", "translate(" + (padding) + ",0)").attr("id", "y-axis").call(yAxis);
    svg.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("x", (d, i) => ((i * 60) + padding))
        .attr("y", d => (height - d * 3) - padding)
        .attr("width", 60)
        .attr("height", (d) => (d * 3))
        .attr("class", "bar")
})();