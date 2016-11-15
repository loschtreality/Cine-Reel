// const window_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
// const window_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

const width = 900;
const height = 500;

const svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
.style("background-color", "black");


let cirs_one = [
  {"r": 10, "cx": 30, "cy": 30},
  {"r": 10, "cx": 60, "cy": 30},
  {"r": 10, "cx": 90, "cy": 30},
  {"r": 10, "cx": 120, "cy": 30},
  {"r": 10, "cx": 150, "cy": 30},
  {"r": 10, "cx": 180, "cy": 30},
  {"r": 10, "cx": 210, "cy": 30},
  {"r": 10, "cx": 240, "cy": 30},
  {"r": 10, "cx": 270, "cy": 30},
  {"r": 10, "cx": 300, "cy": 30},
  {"r": 10, "cx": 330, "cy": 30},
  {"r": 10, "cx": 360, "cy": 30}
];

svg.selectAll("circle").data(cirs_one)
.enter().append("circle")
.attr("cy", (d,i) => d.cy)
.attr("cx", (d,i) => d.cx)
.attr("r", (d,i) => d.r);
