const window_width = window.innerWidth
const window_height = window.innerHeight

const width = 900;
const height = 500;

const svg = d3.select("svg")
.attr("width", window_width)
.attr("height", window_height/2);

let origin = {
  cx: window_width/2,
  cy: window_height/4,
  r: 40
};

// let innerCircle = svg.append("circle")
// .attr("cy", origin.cy)
// .attr("cx", origin.cx)
// .attr("r", origin.r)
// .style("fill", "green");


// const dotOriginX = origin.cx + ((60) * Math.sin(0));
// const dotOriginY = origin.cy - ((60) * Math.cos(0));

const makeCircle = (originDist, offSet, cirRadius) => {
  let newOriginX = origin.cx + ((originDist) * Math.sin(offSet * (Math.PI/180)));
  let newOriginY = origin.cy - ((originDist) * Math.cos(offSet * (Math.PI/180)));

  for (var angle = 0; angle <= 360; angle+= 30) {
    svg.append("circle")
    .attr("cx", newOriginX)
    .attr("cy", newOriginY)
    .attr("r", cirRadius)
    .attr("transform",`rotate(${angle}, ${origin.cx}, ${origin.cy})`)
    .style("fill", "grey" );
  }
}

let cir1 = makeCircle(60, 0, 5);
let cir2 = makeCircle(90, 15, 7);
let cir3 = makeCircle(120, 0, 9);
let cir4 = makeCircle(150, 15, 11);
let cir5 = makeCircle(180, 0, 13);

cir1.select("circle").style("fill", "cyan")
