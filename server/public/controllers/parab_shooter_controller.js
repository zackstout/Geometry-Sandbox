
app.controller('ParabShooterController', function () {
    console.log('parab shooter controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;
  vm.params = {};

  parabola(70, 5, 1, 0, 1, 1);
  ctx.transform(-1, 0, 0, 1, 0, 0);
  parabola(70, 5, 1, 0, 1, -1);
  ctx.transform(-1, 0, 0, 1, 0, 0);
  ctx.beginPath();
  ctx.arc(500, 150, 10, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fillStyle = 'blue';
  ctx.fill();

  vm.shootBall = function(a, b) {
    console.log(a, b, vm.params.a, vm.params.b);
    setInterval(ball, 50);
  };

  vm.reset = function() {
    iteration = 0;
    ctx.clearRect(0,0,1000,1000);
    parabola(70, 5, 1, 0, 1, 1);
    ctx.transform(-1, 0, 0, 1, 0, 0);
    parabola(70, 5, 1, 0, 1, -1);
    ctx.transform(-1, 0, 0, 1, 0, 0);
    ctx.beginPath();
    ctx.arc(500, 150, 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'blue';
    ctx.fill();
  };

  var iteration = 0;

    function ball() {

      ctx.clearRect(0,0,1000,1000);
      parabola(70, 5, 1, 0, 1, 1);
      ctx.transform(-1, 0, 0, 1, 0, 0);
      parabola(70, 5, 1, 0, 1, -1);
      ctx.transform(-1, 0, 0, 1, 0, 0);
      ctx.beginPath();
      ctx.arc(500, 150, 10, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'blue';
      ctx.fill();

      var v = vm.params.b;
      var theta = vm.params.a*Math.PI/180;

        ctx.beginPath();
        ctx.arc(500 + v*iteration*Math.cos(theta), 150 + v*iteration*Math.sin(theta), 10, 0, 2*Math.PI);
        // ok good, as anticipated,this is a (slow) linear speed:
        // ctx.arc(500, iteration*2, 10, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'yellow';
        ctx.fill();
        iteration++;

    }

  function parabola(x, l, a, b, c, dir) {
    for (var i = 0; i < x; i++) {
      ctx.moveTo(i*l + dir*500, a*Math.pow(i*l/100, 2)*100 + b*i*l + c*100);
      ctx.lineTo((i+1)*l + dir*500, a*Math.pow((i+1)*l/100, 2)*100 + b*(i+1)*l +c*100);
      ctx.stroke();
    }
  }

});
