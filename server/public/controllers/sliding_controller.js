
app.controller('SlidingController', function () {
    console.log('slider controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;
  vm.params = {};
  vm.matrix = {};
  ctx.translate(500, 0);

  vm.submit = function(params) {
    console.log(params);
    var x = vm.params.a, y = vm.params.b, z = vm.params.c;
    console.log(x, y, z);
    parabola(70, 5, x, z);
//can't do this in the same way when we account for c:
    ctx.transform(-1, 0, 0, 1, 0, 0);
    parabola(70, 5, x, z);
  };

  vm.gridThat = function(x, s) {
    //to get back from parabola-setting at the top:
    ctx.translate(-500,0);
    grid(x, s);
  };

  vm.matrixThat = function(matrix) {
    console.log(matrix);
    // ctx.translate(-500, 0);
    //this works, i guess: -- why doesn't it work when i pass in matrix's properties??
    // ctx.transform(matrix.a, matrix.c, matrix.b, matrix.d, 0, 0);
    ctx.transform(-1, 2, 1.5, -2, 0, 0);
    grid(10, 1000);
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

  function parabola(x, l, a, c) {
    for (var i = 0; i < x; i++) {
      ctx.moveTo(i*l + c*100, a*Math.pow(i*l/100, 2)*100);
      ctx.lineTo((i+1)*l + c*100, a*Math.pow((i+1)*l/100, 2)*100);
      ctx.stroke();
    }

  }
});
