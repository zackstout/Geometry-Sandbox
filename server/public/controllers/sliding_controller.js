
app.controller('MatrixController', function () {
    console.log('slider controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;
  vm.params = {};
  vm.matrix = {};
  // ctx.translate(500, 0);
  // ctx.transform(-1, 0, 0, 1, 0, 0);

  vm.submit = function(params) {
//why is this impotent? not so impotent now....weird
    // ctx.clearRect(0,0,1000,1000);

    console.log(params);
    var x = vm.params.a, y = vm.params.b, z = vm.params.c;
    console.log(x, y, z);
    parabola(70, 5, x, 0, z, 1);
//can't do this in the same way when we account for c:
    ctx.transform(-1, 0, 0, 1, 0, 0);
    parabola(70, 5, x, 0, z, -1);
    ctx.transform(-1, 0, 0, 1, 0, 0);

  };

  vm.gridThat = function(x, s) {
    //to get back from parabola-setting at the top:
    // ctx.translate(-500,0);
    grid(x, s);
    console.log(vm.params);
  };

  vm.matrixThat = function(matrix) {
    console.log(matrix);
    ctx.translate(-500, 0);
    //this works, i guess: -- why doesn't it work when i pass in matrix's properties??
    // ctx.transform(matrix.a, matrix.c, matrix.b, matrix.d, 0, 0);
    ctx.transform(-1, 2, 1.5, -2, 0, 0);
    grid(10, 1000);
  };

//ok this is good to know, if we start the iteration high and count down toward 0, it will run in the opposite direction:
var iteration = 100;

  function ball() {
    //putting this at top makes it stay yellow:
    //and yet also makes it impossible to see parabolas:
    ctx.clearRect(-500,-10,1000,1000);

      ctx.beginPath();
      //oh duh this controls the path of the ball:
      ctx.arc(iteration*5, vm.params.a*Math.pow(iteration*5/100, 2)*100, 10, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'yellow';
      ctx.fill();
      iteration--;
      //this is real close:
      //whoa super weird if you put this up after clear, it shows 2 balls

      //ok this is not actually controlling the path:
      // parabola(70, 5, vm.params.a, 0, vm.params.b, 1);
  }

  function ballNeg() {

      ctx.beginPath();
      //oh duh this controls the path of the ball:
      ctx.arc((-1)*iteration*5, vm.params.a*Math.pow(iteration*5/100, 2)*100, 10, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'yellow';
      ctx.fill();
      iteration--;

  }

  //good: it draws all the balls! we just need to animate now:
  // ball();

vm.throwBall = function(c) {
  //but this is gonna mess up the other origins, e.g. the grid's:
  ctx.translate(500, c*100);
  console.log('throwin ball');

  //yesssss if you don't call ballNeg, ball will work all the way through because of negatively counting!!!
  setInterval(ball, 50);
  // setInterval(ballNeg, 50);

};
// vm.throwBallNeg = function(c) {
//   //but this is gonna mess up the other origins, e.g. the grid's:
//   ctx.translate(500, c*100);
//   console.log('throwin ball');
//   // ball();
//   setInterval(ballNeg, 50);
// };

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
