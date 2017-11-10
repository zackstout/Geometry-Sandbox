
var app = angular.module('app', ['ngRoute']);


app.controller('ParabolaController', function () {
    console.log('parab controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;
    ctx.translate(500, 10);
    //plugging in x=5, l=50 should return the same as above, 5 lines at intervals of length 50:
    function parabola(x, l) {
      for (var i = 0; i < x; i++) {
        ctx.moveTo(i*l, Math.pow(i*l/100, 2)*100);
        // ctx.lineTo((i+1)*l, i*l + Math.pow(i*l/100, 2)*100);

        //holy shit this is it, i did it:
        ctx.lineTo((i+1)*l, Math.pow((i+1)*l/100, 2)*100);
        ctx.stroke();
      }

    }
    parabola(70, 5);
    //jesus christ i nailed this on the first try:
    ctx.transform(-1, 0, 0, 1, 0, 0);
    parabola(70, 5);


    var iteration = 0;


    function ball() {
      //putting this at top makes it stay yellow:
      ctx.clearRect(-10,-10,1000,1000);

        ctx.beginPath();
        ctx.arc(iteration*5, Math.pow(iteration*5/100, 2)*100, 10, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'yellow';
        ctx.fill();
        iteration++;
        //this is real close:
        //whoa super weird if you put this up after clear, it shows 2 balls
        parabola(70, 5);
      // requestAnimationFrame(ball);
    }

    //good: it draws all the balls! we just need to animate now:
    ball();


    //YASSSS, now just need to erase previous balls:
    setInterval(ball, 50);

});

app.controller('SlidingController', function () {
    console.log('slider controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;
  vm.params = {};
  vm.matrix = {};

  vm.submit = function(params) {
    console.log(params);
    var x = vm.params.a, y = vm.params.b, z = vm.params.c;
    console.log(x, y, z);

    parabola(70, 5, x, z);

//can't do this in the same way when we account for c:
    ctx.transform(-1, 0, 0, 1, 0, 0);
    parabola(70, 5, x, z);


  };

  vm.matrixThat = function(matrix) {
    console.log(matrix);
    //this works, i guess:
    ctx.transform(2,0,2,1,0,0);
    grid(10);

  };

  function grid(x) {
    for (var i = 0; i <= x; i++) {
      ctx.moveTo(i*500/x, 0);
      ctx.lineTo(i*500/x, 500);
      ctx.stroke();
    }
    for (var j = 0; j <=x; j++) {
      ctx.moveTo(0, j*500/x);
      ctx.lineTo(500, j*500/x);
      ctx.stroke();
    }
  }


  // ctx.translate(500, 10);

  function parabola(x, l, a, c) {
    for (var i = 0; i < x; i++) {
      ctx.moveTo(i*l + c*100, a*Math.pow(i*l/100, 2)*100);
      ctx.lineTo((i+1)*l + c*100, a*Math.pow((i+1)*l/100, 2)*100);
      ctx.stroke();
    }

  }
});

app.controller('EllipseController', function () {
    console.log('ellipse controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;

    function ellipse(x, l) {
      for (var i = 0; i < x; i++) {
        ctx.moveTo(i*l, Math.pow((1000 - Math.pow(i*l/100, 2)*10000), 1/2));
        // ctx.lineTo((i+1)*l, i*l + Math.pow(i*l/100, 2)*100);

        //holy shit this is it, i did it:
        ctx.lineTo((i+1)*l, Math.pow((1000 - Math.pow((i+1)*l/100, 2)*10000), 1/2));
        ctx.stroke();
      }

    }

//success, for x=6....Ok now for any x!!!!!
//and now it works for ellipses, this is the shit:
    function circle(a, b, x, r) {
      for (var i = 0; i < x; i++) {
        ctx.moveTo(r*a*Math.cos(i*2*Math.PI/x), r*b*Math.sin(i*2*Math.PI/x));
        ctx.lineTo(r*a*Math.cos((i+1)*2*Math.PI/x), r*b*Math.sin((i+1)*2*Math.PI/x));
        ctx.stroke();
      }
    }

ctx.translate(500, 500);
    circle(2, 1, 100, 250);

ctx.strokeStyle = "blue";
    circle(2, 2, 100, 250);
    ctx.strokeStyle = "green";
    circle(1, 1, 100, 250);


var iteration = 0;

    function ball() {
  //putting this at top makes it stay yellow:
  // ctx.clearRect(-10,-10,1000,1000);

    ctx.beginPath();
    ctx.arc(500*Math.cos(iteration*2*Math.PI/100), 250*Math.sin(iteration*2*Math.PI/100), 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'yellow';
    ctx.fill();
    iteration++;
    //this is real close:
    //whoa super weird if you put this up after clear, it shows 2 balls
ctx.strokeStyle = "black";
    circle(2, 1, 100, 250);
  // requestAnimationFrame(ball);
}

//good: it draws all the balls! we just need to animate now:
ball();


//YASSSS, now just need to erase previous balls:
setInterval(ball, 50);
});




app.config(function($routeProvider) {
  $routeProvider.when('/parabola', {
    templateUrl: 'parabola.html',
    controller: 'ParabolaController as pc'
  }).when('/ellipse', {
    templateUrl: 'ellipse.html',
    controller: 'EllipseController as ec'
  }).when('/sliding', {
    templateUrl: 'sliding.html',
    controller: 'SlidingController as sc'
  });
});
