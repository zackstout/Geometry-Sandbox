
app.controller('ParabShooterController', function () {
  console.log('parab shooter controller created.');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  var vm = this;
  vm.params = {};
  var iteration = 0, iteration2 = 0, gotOne = false;

  parabola(70, 5, 1, 0, 1, 1);
  ctx.transform(-1, 0, 0, 1, 0, 0);
  parabola(70, 5, 1, 0, 1, -1);
  ctx.transform(-1, 0, 0, 1, 0, 0);
  ctx.beginPath();
  ctx.arc(500, 125, 10, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fillStyle = 'blue';
  ctx.fill();

  vm.shootBall = function(a, b) {
    console.log(a, b, vm.params.a, vm.params.b);
    setInterval(ball, 50);
    setInterval(whereAreWe, 5);
  };

  vm.reset = function() {
    iteration = 0;
    gotOne = false;
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
    setInterval(whereAreWe, 2);
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
    //draw the tangent:
    ctx.moveTo(vm.params.x1, vm.params.y1);
    ctx.lineTo(vm.params.x2, vm.params.y2);
    ctx.stroke();

    var v = vm.params.b;
    var theta = vm.params.a*Math.PI/180;

    ctx.beginPath();
    ctx.arc(500 + v*iteration*Math.cos(theta), 125 + v*iteration*Math.sin(theta), 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'yellow';
    ctx.fill();
    iteration++;
  } //end BALL

  function ball2() {
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
    //draw the tangent:
    ctx.moveTo(vm.params.x1, vm.params.y1);
    ctx.lineTo(vm.params.x2, vm.params.y2);
    ctx.stroke();

    var v = vm.params.b;
    // var theta = vm.params.a*Math.PI/180;

    ctx.beginPath();
    ctx.arc(vm.params.x, vm.params.y + v*iteration2, 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'green';
    ctx.fill();
    iteration2++;
  } //end BALL

  function whereAreWe() {
    if (!gotOne) {
      var x = 500+vm.params.b*(iteration)*Math.cos(vm.params.a*Math.PI/180);
      var y = 125+vm.params.b*(iteration)*Math.sin(vm.params.a*Math.PI/180);
      // console.log('x: ', x, ',  y: ', y);

      var xNow = (x-500)/100;
      var yNow = (y-100)/100;
      // console.log(xNow, yNow);

      if (xNow*xNow < yNow+0.02 && xNow*xNow > yNow-0.02) {
        // if (xNow*xNow === yNow) {
        console.log('meow!!!', xNow, yNow, x, y);
        gotOne = true;
        ctx.moveTo(x - 100, y - 2*xNow*100);
        ctx.lineTo(x + 100, y + 2*xNow*100);
        ctx.stroke();

        vm.params.x1 = x-100;
        vm.params.x2 = x+100;
        vm.params.y1 = y - 2*xNow*100;
        vm.params.y2 = y + 2*xNow*100;
        vm.params.x = x;
        vm.params.y = y;

        //so yeah this is the line to comment out if we want to avoid that shimmering thing: 
        // setInterval(ball2, 50);

        // return;
      }
    }
  }

  function parabola(x, l, a, b, c, dir) {
    for (var i = 0; i < x; i++) {
      ctx.moveTo(i*l + dir*500, a*Math.pow(i*l/100, 2)*100 + b*i*l + c*100);
      ctx.lineTo((i+1)*l + dir*500, a*Math.pow((i+1)*l/100, 2)*100 + b*(i+1)*l +c*100);
      ctx.stroke();
    }
  }

});
