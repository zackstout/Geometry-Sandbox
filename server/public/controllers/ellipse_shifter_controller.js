

app.controller('EllipseShifterController', function () {
    console.log('ellipse shifter controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;

var iteration = 0;

  vm.params = {};

  vm.drawEllipse = function(a, b) {
    //location of foci:
    var c = Math.sqrt(Math.abs(Math.pow(a, 2) - Math.pow(b, 2)));
    var e = c/a;
    console.log(a, b, c, e);
    ctx.clearRect(-500,-500,1000,1000);
    console.log('drawin');
    circle(a, b, 100, 250);

    //store location globally...but eh we just recalc later:
    vm.params.c = c;
    vm.params.e = e;

//draw foci:
    ctx.fillStyle = 'green';

    ctx.beginPath();
    if (a > b) {
      ctx.arc(c*250, 0, 7, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-c*250, 0, 7, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();

    } else if (b > a) {
      ctx.arc(0, c*250, 7, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -c*250, 7, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();
    }

    console.log(vm.params);
  };

    function circle(a, b, x, r) {
      ctx.beginPath();
      for (var i = 0; i < x; i++) {
        ctx.moveTo(r*a*Math.cos(i*2*Math.PI/x), r*b*Math.sin(i*2*Math.PI/x));
        ctx.lineTo(r*a*Math.cos((i+1)*2*Math.PI/x), r*b*Math.sin((i+1)*2*Math.PI/x));
        ctx.stroke();
      }
    }

//the perfect pentagon, lol looks weird if you misalign a and b:
//ahhh the pesky translate:
ctx.translate(500, 500);
    circle(1, 1, 5, 250);

    function ball() {
  ctx.clearRect(-500,-500,1000,1000);
  var a = vm.params.a;
  var b = vm.params.b;
  var c = Math.sqrt(Math.abs(Math.pow(a, 2) - Math.pow(b, 2)));


//re-draw path:
  circle(a, b, 100, 250);

//re-draw foci:
ctx.beginPath();
var e = c/a;
vm.params.e = e;

  ctx.fillStyle = 'green';
  if (a > b) {
    ctx.arc(c*250, 0, 7, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(-c*250, 0, 7, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();

  } else if (b > a) {
    ctx.arc(0, c*250, 7, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, -c*250, 7, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
  }
//ball's path:
    ctx.beginPath();
    var x = 250*vm.params.a*Math.cos(iteration*2*Math.PI/100);
    var y = 250*vm.params.b*Math.sin(iteration*2*Math.PI/100);
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'yellow';
    ctx.fill();

    //tracing out lines to foci:
    ctx.beginPath();
    if (a > b) {
      ctx.moveTo(c*250, 0);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-c*250, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (b > a) {
      ctx.moveTo(0, c*250);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -c*250);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    iteration++;

}// at last, end the ball function

vm.throw = function() {
  console.log('throwin');
  setInterval(ball, 50);
};
});
