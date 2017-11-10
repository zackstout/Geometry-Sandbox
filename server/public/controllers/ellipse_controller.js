

app.controller('EllipseController', function () {
    console.log('ellipse controller created.');
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
    var vm = this;
  vm.value = 10;



    function ellipse(x, l) {
      for (var i = 0; i < x; i++) {
        ctx.moveTo(i*l, Math.pow((1000 - Math.pow(i*l/100, 2)*10000), 1/2));
        ctx.lineTo((i+1)*l, Math.pow((1000 - Math.pow((i+1)*l/100, 2)*10000), 1/2));
        ctx.stroke();
      }
    }

    function circle(a, b, x, r) {
      for (var i = 0; i < x; i++) {
        ctx.moveTo(r*a*Math.cos(i*2*Math.PI/x), r*b*Math.sin(i*2*Math.PI/x));
        ctx.lineTo(r*a*Math.cos((i+1)*2*Math.PI/x), r*b*Math.sin((i+1)*2*Math.PI/x));
        ctx.stroke();
      }
    }

ctx.translate(500, 500);
    circle(2, 1, 100, 250);
//
// ctx.strokeStyle = "blue";
//     circle(2, 2, 100, 250);
//     ctx.strokeStyle = "green";
//     circle(1, 1, 100, 250);


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
