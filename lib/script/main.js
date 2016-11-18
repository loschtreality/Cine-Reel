let height;
let width;
let cir1, cir2, cir3, cir4, cir5;

let roteDeg = -25, frequency = 9;

let svg;

const rainbowColors = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Indigo",
  "Violet"
];

let origin = {
  cx: 250,
  cy: 450,
  r: 40
};

const makeCircle = (originDist, offSet, cirRadius) => {
  let newOriginX = origin.cx + ((originDist) * Math.sin(offSet * (Math.PI/180)));
  let newOriginY = origin.cy - ((originDist) * Math.cos(offSet * (Math.PI/180)));

  let cir_group = svg.select("g").append("g").classed("cir-group",true);


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

  svg.selectAll("g").remove();
  svg.append("g");

  width = document.getElementById("reel-svg").width.baseVal.value;
  height = document.getElementById("reel-svg").height.baseVal.value;

  origin.cx = width/3;
  origin.cy = height/2;

  cir1 = makeCircle(90, 0, 5);
  cir2 = makeCircle(120, 15, 7);
  cir3 = makeCircle(150, 30, 9);
  cir4 = makeCircle(180, 45, 11);
  cir5 = makeCircle(210, 60, 13);

}

window.addEventListener('DOMContentLoaded', () => {
  svg = d3.select("svg")
  .attr("width", 900)
  .attr("height", 500);

  redraw();

  let degControl = document.getElementById('deg-control');
  let freqControl = document.getElementById('freq-control');

  document.getElementById('deg-disp').innerHTML = degControl.value;
  document.getElementById('freq-disp').innerHTML = `${freqControl.value} hz`;

});

window.addEventListener('resize', ev => {
  redraw();
});

d3.interval((elapsed) => {
  let roteVal = (roteDeg * Math.floor(elapsed/(1000/frequency))) % 360;
  svg.select("g").attr("transform", `rotate(${roteVal}, ${origin.cx}, ${origin.cy})`);
})


const changeRoteDeg = (val) => {
  roteDeg = -1 * val;
  document.getElementById('deg-disp').innerHTML = val;
}

const changeFrequency = (val) => {
  frequency = val;
  document.getElementById('freq-disp').innerHTML = `${val} hz`;
}

const resetValues = () => {
  roteDeg = -25;
  frequency = 9;
  document.getElementById('deg-control').value = 25;
  document.getElementById('freq-control').value = 9;

  document.getElementById('deg-disp').innerHTML = 25;
  document.getElementById('freq-disp').innerHTML = `${9} hz`;

}




const applyTheme = (circlePrimary, circleSecondary, rainbow) => {
  let cir_group = Array.from(document.getElementsByClassName('cir-group'))

  if (rainbow) {
    cir_group.forEach((group) => {
      Array.from(group.childNodes).forEach((cir, idx) => {
        let random = Math.floor(Math.random() * (7 - 1) + 1);
        cir.style.fill = rainbowColors[random];
      })
    })
  } else {
    cir_group.forEach((group) => {
      Array.from(group.childNodes).forEach((cir, idx) => {
        if (idx === 0) {
          cir.style.fill = circlePrimary;
        } else {
          cir.style.fill = circleSecondary;
        }
      })
    })
  }

}


window.addEventListener('load', () => {
      let lightButton = document.getElementById('light-button')
      let standardButton = document.getElementById('standard-button')
      let neonButton = document.getElementById('neon-button')
      let rainbowButton = document.getElementById('rainbow-button')

      lightButton.addEventListener('click', ev => {
        ev.preventDefault()
        applyTheme("#3c6e71","#fff",false)
      });

      standardButton.addEventListener('click', ev => {
        ev.preventDefault()
        applyTheme("#eca72c","grey",false)
      });

      neonButton.addEventListener('click', ev => {
        ev.preventDefault()
        applyTheme("#3D77FE","#00FF00",false)
      });

      rainbowButton.addEventListener('click', ev => {
        ev.preventDefault()
        applyTheme("","",true)
      });
});
