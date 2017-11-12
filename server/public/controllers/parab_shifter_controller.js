
app.controller('ParabShifterController', function () {
    console.log('shifter controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;
  vm.params = {p: 0.25};

  parabola(100, 4, 1/(vm.params.p*4), 0, 2.5, 1);
//can't do this in the same way when we account for c:
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

  //
  //
  // for (var i=0; i<50; i++) {
  //   ctx.moveTo(i*20, 250);
  //   ctx.lineTo(i*20+10, 250);
  //   ctx.stroke();
  // }

  //draw in focus:
      ctx.beginPath();
      ctx.arc(500, 250+vm.params.p*100, 5, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'blue';
      ctx.fill();
  //draw in directrix:

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
//draw in focus:
    ctx.beginPath();
    ctx.arc(500, 250+p*100, 5, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'blue';
    ctx.fill();
//draw in directrix:
for (var i=0; i<50; i++) {
  ctx.moveTo(i*20, 250-vm.params.p*100);
  ctx.lineTo(i*20+10, 250-vm.params.p*100);
  ctx.stroke();
}

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


  };



  function grid(x, s) {
    for (var i = 0; i <= x; i++) {
      ctx.moveTo(i*s/x, 0);
      ctx.lineTo(i*s/x, s);
      ctx.stroke();
    }
    for (var j = 0; j <=x; j++) {
      ctx.moveTo(0, j*s/x);
      ctx.lineTo(s, j*s/x);
      ctx.stroke();
    }
  }

  function parabola(x, l, a, b, c, dir) {
    for (var i = 0; i < x; i++) {
      //i mean it looks cool if you add the +c*100 to the y-values....but not what's intended...
      //or if you add one and leave the other???
      ctx.moveTo(i*l + dir*500, a*Math.pow(i*l/100, 2)*100 + b*i*l + c*100);
      ctx.lineTo((i+1)*l + dir*500, a*Math.pow((i+1)*l/100, 2)*100 + b*(i+1)*l +c*100);
      ctx.stroke();
    }

  }
});
