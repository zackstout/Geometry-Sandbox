
app.controller('ParabShooterController', function () {
    console.log('parab shooter controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;
  vm.params = {};
  var iteration = 0;


  parabola(70, 5, 1, 0, 1, 1);
  ctx.transform(-1, 0, 0, 1, 0, 0);
  parabola(70, 5, 1, 0, 1, -1);
  ctx.transform(-1, 0, 0, 1, 0, 0);
  ctx.beginPath();
  ctx.arc(500, 125, 10, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fillStyle = 'blue';
  ctx.fill();
//
// vm.params.xNow = 500+vm.params.b*iteration*Math.cos(vm.params.a*Math.PI/180);
// vm.params.yNow = 150+vm.params.b*iteration*Math.sin(vm.params.a*Math.PI/180);

  vm.shootBall = function(a, b) {
    console.log(a, b, vm.params.a, vm.params.b);
    setInterval(ball, 50);
    setInterval(whereAreWe, 5);
    //
    // var xNow = (vm.params.xNow-500)/100;
    // var yNow = (vm.params.yNow-100)/100;
    //
    // if ((Math.pow(xNow), 2) > yNow-10 && (Math.pow(xNow), 2) < yNow+10) {
    //   console.log('meow!!!');
    // }

  };

  vm.reset = function() {
    iteration = 0;
    count = 0;
    ctx.clearRect(0,0,1000,1000);
    parabola(70, 5, 1, 0, 1, 1);
    ctx.transform(-1, 0, 0, 1, 0, 0);
    parabola(70, 5, 1, 0, 1, -1);
    ctx.transform(-1, 0, 0, 1, 0, 0);
    ctx.beginPath();
    ctx.arc(500, 125, 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'blue';
    ctx.fill();
    setInterval(whereAreWe, 20);

  };


    function ball() {

      ctx.clearRect(0,0,1000,1000);
      parabola(70, 5, 1, 0, 1, 1);
      ctx.transform(-1, 0, 0, 1, 0, 0);
      parabola(70, 5, 1, 0, 1, -1);
      ctx.transform(-1, 0, 0, 1, 0, 0);
      ctx.beginPath();
      ctx.arc(500, 125, 10, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'blue';
      ctx.fill();

      var v = vm.params.b;
      var theta = vm.params.a*Math.PI/180;

        ctx.beginPath();
        ctx.arc(500 + v*iteration*Math.cos(theta), 125 + v*iteration*Math.sin(theta), 10, 0, 2*Math.PI);
        // ok good, as anticipated,this is a (slow) linear speed:
        // ctx.arc(500, iteration*2, 10, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'yellow';
        ctx.fill();
        iteration++;


    } //end BALL

var count = 0;
    function whereAreWe() {
      // if (count<50) {
        var x = 500+vm.params.b*iteration*Math.cos(vm.params.a*Math.PI/180);
        var y = 125+vm.params.b*iteration*Math.sin(vm.params.a*Math.PI/180);
        // console.log('x: ', x, ',  y: ', y);

            var xNow = (x-500)/100;
            var yNow = (y-100)/100;
            // console.log(xNow, yNow);

            if (xNow*xNow < yNow+0.05 && xNow*xNow > yNow-0.05) {
              console.log('meow!!!');
            }
      // }
      count++;
    }

  function parabola(x, l, a, b, c, dir) {
    for (var i = 0; i < x; i++) {
      ctx.moveTo(i*l + dir*500, a*Math.pow(i*l/100, 2)*100 + b*i*l + c*100);
      ctx.lineTo((i+1)*l + dir*500, a*Math.pow((i+1)*l/100, 2)*100 + b*(i+1)*l +c*100);
      ctx.stroke();
    }
  }

});
