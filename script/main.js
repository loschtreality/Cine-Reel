let height;
let width;
let cir1, cir2, cir3, cir4, cir5;

let roteDeg = -25, frequency = 120;

let svg;


let origin = {
  cx: 250,
  cy: 450,
  r: 40
};

const makeCircle = (originDist, offSet, cirRadius) => {
  let newOriginX = origin.cx + ((originDist) * Math.sin(offSet * (Math.PI/180)));
  let newOriginY = origin.cy - ((originDist) * Math.cos(offSet * (Math.PI/180)));

  let cir_group = svg.select("g")


  for (var angle = 0; angle < 360; angle += 30) {
    cir_group.append("circle")
    .attr("cx", newOriginX)
    .attr("cy", newOriginY)
    .attr("r", cirRadius)
    .attr("transform",`rotate(${angle}, ${origin.cx}, ${origin.cy})`)
    .classed((angle === 0 ? "tail" : "normal"), true);
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
}

window.addEventListener('DOMContentLoaded', () => {
  svg = d3.select("svg")
  .attr("width", 900)
  .attr("height", 500);

  redraw()

  let degControl = document.getElementById('deg-control')
  let freqControl = document.getElementById('freq-control')

  document.getElementById('deg-disp').innerHTML = degControl.value
  document.getElementById('freq-disp').innerHTML = freqControl.value
});

window.addEventListener('resize', ev => {
  redraw()
});

d3.interval((elapsed) => {
  let roteVal = (roteDeg * Math.floor(elapsed/frequency)) % 360
  svg.select("g").attr("transform", `rotate(${roteVal}, ${origin.cx}, ${origin.cy})`);
})


const changeRoteDeg = (val) => {
  roteDeg = -1 * val
  document.getElementById('deg-disp').innerHTML = val
}

const changeFrequency = (val) => {
  frequency = 3600 / val
  document.getElementById('freq-disp').innerHTML = val
}

const resetValues = () => {
  roteDeg = -25
  frequency = 120
  document.getElementById('deg-control').value = 25
  document.getElementById('freq-control').value = 30

  document.getElementById('deg-disp').innerHTML = 25
  document.getElementById('freq-disp').innerHTML = 30

}
