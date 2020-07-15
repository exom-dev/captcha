module.exports = () => {};

/*
captcha
.revoke('id')
.regenerate(id)
.generate({
  expire: 1000 * 60 * 3,
  id: '',
  type: 'text',
})
.verify({
  answer: 'exm-captcha-answer',
  id: 'exm-captcha-id',
})

*/

const { Canvas } = require('canvas');
const app = require('express')();

app.get('/', (req, res) => {
  const canvas = new Canvas(330, 120);
  const context = canvas.getContext('2d');

  context.antialias = 'gray';

  var grd = context.createRadialGradient(75, 50, 5, 90, 60, 100);
  grd.addColorStop(0, "red");
  grd.addColorStop(1, "white");

  context.fillStyle = grd;

  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = "900 80px monospace";
  context.fillStyle = "red";
  context.textAlign = "center";
  context.fillText("AbC4de", canvas.width / 2, canvas.height - 25);

  canvas.filter = "blur(20px)";


  for(var i=0; i < 10; i+=1) {
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = "red";
    context.moveTo(0, Math.random() * canvas.height)
    context.bezierCurveTo(Math.floor(0.32 * canvas.width), Math.random() * canvas.height, Math.floor(1.07 * canvas.height), Math.random() * canvas.height, canvas.width, Math.random() * canvas.height);
    context.stroke();
  }

  canvas.createJPEGStream().pipe(res);
});

app.listen(80);
