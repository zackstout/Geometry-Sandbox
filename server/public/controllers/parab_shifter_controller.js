
app.controller('ParabShifterController', function () {
  console.log('shifter controller created.');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  var vm = this;
  vm.params = {p: 0.25};

  parabola(100, 4, 1/(vm.params.p*4), 0, 2.5, 1);
  ctx.transform(-1, 0, 0, 1, 0, 0);
  parabola(100, 4, 1/(vm.params.p*4), 0, 2.5, -1);
  ctx.transform(-1, 0, 0, 1, 0, 0);
  //grid:
  ctx.moveTo(500, 0);
  ctx.lineTo(500, 1000);
  ctx.stroke();
  ctx.moveTo(0, 250);
  ctx.lineTo(1000, 250);
  ctx.stroke();

  //draw in focus:
  ctx.beginPath();
  ctx.arc(500, 250+vm.params.p*100, 5, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fillStyle = 'blue';
  ctx.fill();
  //draw in directrix (dotted line):
  for (var i=0; i<50; i++) {
    ctx.moveTo(i*20, 250-vm.params.p*100);
    ctx.lineTo(i*20+10, 250-vm.params.p*100);
    ctx.stroke();
  }


  vm.submit = function(p) {
    ctx.clearRect(0,0,1000,1000);
    //this is the crucial line that makes clearRect work:
    ctx.beginPath();
    //re-draw grid:
    ctx.moveTo(500, 0);
    ctx.lineTo(500, 1000);
    ctx.stroke();
    ctx.moveTo(0, 250);
    ctx.lineTo(1000, 250);
    ctx.stroke();
    //redraw in focus:
    ctx.beginPath();
    ctx.arc(500, 250+p*100, 5, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'blue';
    ctx.fill();
    //redraw in directrix:
    for (var i=0; i<50; i++) {
      ctx.moveTo(i*20, 250-vm.params.p*100);
      ctx.lineTo(i*20+10, 250-vm.params.p*100);
      ctx.stroke();
    }
    //re-draw parabola:
    console.log(p, vm.params.x);
    parabola(150, 4, 1/(4*p), 0, 2.5, 1);
    ctx.transform(-1, 0, 0, 1, 0, 0);
    parabola(150, 4, 1/(4*p), 0, 2.5, -1);
    ctx.transform(-1, 0, 0, 1, 0, 0);

    //draw circle around point with x-coordinate of entered value to demonstrate equidistance:
    var x = 500 + 100*vm.params.x;
    var y = 250 + (vm.params.x*vm.params.x)*100/(4*p);
    console.log(x, y);
    ctx.beginPath();
    ctx.arc(x, y, y-250+p*100, 0, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'green';
    ctx.fill();

  }; //end of submit function


var iteration = 0;
  function ball() {

    ctx.beginPath();

    var x = 250 + iteration*2;
    var xNow = (x-500)/100;
    ctx.arc(250 + iteration*2, 250 + xNow*xNow*100, 10, 0, 2*Math.PI);
    ctx.stroke();
    //
    // ctx.beginPath();
    // ctx.arc(x, y, 6, 0, 2*Math.PI);
    // ctx.stroke();
    // ctx.fillStyle = 'green';
    // ctx.fill();
    // ctx.stroke();
    ctx.fillStyle = 'yellow';
    ctx.fill();
    iteration++;

  } //end of ball

  vm.throw = function() {
    console.log('thx for throwin', vm.params);
    iteration = 0;
    setInterval(ball, 50);

  };

  function parabola(x, l, a, b, c, dir) {
    for (var i = 0; i < x; i++) {
      ctx.moveTo(i*l + dir*500, a*Math.pow(i*l/100, 2)*100 + b*i*l + c*100);
      ctx.lineTo((i+1)*l + dir*500, a*Math.pow((i+1)*l/100, 2)*100 + b*(i+1)*l +c*100);
      ctx.stroke();
    }

  }
});
