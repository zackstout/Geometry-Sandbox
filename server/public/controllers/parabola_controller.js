

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
