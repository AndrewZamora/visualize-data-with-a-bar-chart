const div = d3.select('div');
div.append('svg')
const dataSet = ['x-axis', 'y-axis'];
const svg = d3.select('svg');
svg.selectAll('g').data(dataSet).enter().append('g').attr("id", d => d);