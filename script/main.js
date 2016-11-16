let height;
let width;
let cir1, cir2, cir3, cir4, cir5;

const start = Date.now()


const svg = d3.select("svg")

let origin = {
  cx: 250,
  r: 40
};

const makeCircle = (originDist, offSet, cirRadius) => {
  let newOriginX = origin.cx + ((originDist) * Math.sin(offSet * (Math.PI/180)));
  let newOriginY = origin.cy - ((originDist) * Math.cos(offSet * (Math.PI/180)));

  let cir_group = svg.selectAll("g")

  for (var angle = 0; angle < 360; angle += 30) {
    cir_group.append("circle")
    .attr("cx", newOriginX)
    .attr("cy", newOriginY)
    .attr("r", cirRadius)
    .attr("transform",`rotate(${angle}, ${origin.cx}, ${origin.cy})`)
    .style("fill", (angle === 0 ? "red" : "grey") );
  }
}


const redraw = () => {

  svg.selectAll("g").remove()
  svg.append("g")
  width = document.getElementById("wheel-svg").width.baseVal.value;
  height = document.getElementById("wheel-svg").height.baseVal.value;

  origin.cx = width/2
  origin.cy = height/2


  cir1 = makeCircle(60, 0, 5);
  cir2 = makeCircle(90, 15, 7);
  cir3 = makeCircle(120, 30, 9);
  cir4 = makeCircle(150, 45, 11);
  cir5 = makeCircle(180, 60, 13);

  d3.interval(function(elapsed) {
    svg.selectAll("g").attr("transform", `rotate(${.01 * elapsed}, ${origin.cx}, ${origin.cy})`);
  });
}



redraw()

window.addEventListener('resize', ev => {
    redraw()
  });
