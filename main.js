// variables

const width = window.innerWidth * .8;
const height = window.innerHeight * .8;

// data

d3.csv('../data/squirrelActivities.csv', d3.autoType)
    .then(data => {
        console.log("data", data)

// scales

const xScale = d3.scaleBand()
        .domain(data.map(d => d.activity)) // scope of data
        .range([0, width]) // x scale = horizontal space
        .paddingInner(.3)

const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)]) // scoope of this data
        .range([height, 0]) // 1: measure of top left corner 2: height of bottom right corner
        // y scale = vertical space

// elements -- append elements to div

const theSVG = d3.select("#container") // add # to grab id
                .append("svg") // the type of html elmement is svg
                .attr("width", width) // names width attribute, then defines
                .attr("height", height) // names height attribute, then defines

// select data join draw

theSVG.selectAll("rect")
        .data(data)
        .join("rect")
// attributes
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.count)) // the distance from the top of the screen to the top of the bar
        .attr("x", d => xScale(d.activity)) // places the bar on the x axis
        .attr("y", d => yScale(d.count)) // places the bar ont eh y axis



    })