

app.controller('EllipseController', function () {
    console.log('ellipse controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;
  vm.value = 10;

  vm.params = {};

//wow you have to make a and b reallllllly close to get focus close to center, i.e. to get eccentricity close to 0 (max ecc for a planet is .22, which is about a 2:1.95 ratio for a:b):
  vm.drawEllipse = function(a, b) {
    var c = Math.sqrt(Math.abs(Math.pow(a, 2) - Math.pow(b, 2)));
    var e = c/a;
    console.log(a, b, c, e);
    // why not working?:
    ctx.clearRect(0,0,1000,1000);
    console.log('drawin');
    circle(a, b, 100, 250);


    ctx.beginPath();
    if (a > b) {
      ctx.arc(c*250, 0, 20, 0, 2*Math.PI);
      ctx.stroke();
    } else if (b > a) {
      ctx.arc(0, c*250, 20, 0, 2*Math.PI);
      ctx.stroke();
    }

    ctx.fillStyle = 'green';
    ctx.fill();

    console.log(vm.params);
  };


//wait what the fuck is up with 10000 and 1000? i guess that's why we're using circle lol:
    function ellipse(x, l) {
      for (var i = 0; i < x; i++) {
        ctx.moveTo(i*l, Math.pow((1000 - Math.pow(i*l/100, 2)*10000), 1/2));
        ctx.lineTo((i+1)*l, Math.pow((1000 - Math.pow((i+1)*l/100, 2)*10000), 1/2));
        ctx.stroke();
      }
    }

//now encompasses ellipse functionality:
    function circle(a, b, x, r) {
      for (var i = 0; i < x; i++) {
        ctx.moveTo(r*a*Math.cos(i*2*Math.PI/x), r*b*Math.sin(i*2*Math.PI/x));
        ctx.lineTo(r*a*Math.cos((i+1)*2*Math.PI/x), r*b*Math.sin((i+1)*2*Math.PI/x));
        ctx.stroke();
      }
    }

ctx.translate(500, 500);
    circle(1, 1, 12, 250);
//
// ctx.strokeStyle = "blue";
//     circle(2, 2, 100, 250);
//     ctx.strokeStyle = "green";
//     circle(1, 1, 100, 250);


var iteration = 0;

    function ball() {
  //yep, this is how you make something stay visible even when you keep re-calling the function every 1/20 of a second:
  ctx.clearRect(-500,-500,1000,1000);
  var a = vm.params.a;
  var b = vm.params.b;
  var c = Math.sqrt(Math.abs(Math.pow(a, 2) - Math.pow(b, 2)));

  ctx.beginPath();
  if (a > b) {
    ctx.arc(c*250, 0, 20, 0, 2*Math.PI);
    ctx.stroke();
  } else if (b > a) {
    ctx.arc(0, c*250, 20, 0, 2*Math.PI);
    ctx.stroke();
  }

  ctx.fillStyle = 'green';
  ctx.fill();

    ctx.beginPath();
    ctx.arc(250*vm.params.a*Math.cos(iteration*2*Math.PI/100), 250*vm.params.b*Math.sin(iteration*2*Math.PI/100), 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'yellow';
    ctx.fill();
    iteration++;
    //this is real close:
    //whoa super weird if you put this up after clear, it shows 2 balls
ctx.strokeStyle = "black";
    // circle(2, 1, 100, 250);
  // requestAnimationFrame(ball);
}

vm.throw = function() {
  console.log('throwin');
  //making this number higher does make it go slower, but at much lower res:
  setInterval(ball, 50);

};
//YASSSS, now just need to erase previous balls:
});
