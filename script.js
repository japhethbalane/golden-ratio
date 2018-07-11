var canvas = document.getElementById('golden');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var points = [];
var mult = 0;

function Point(angle, i) {
    this.i = i * 2;
    this.a = angle % 360;
    this.x = (canvas.width / 2) + (Math.cos(this.a * (180 / Math.PI)) * this.i);
    this.y = (canvas.height / 2) + (Math.sin(this.a * (180 / Math.PI)) * this.i);
    this.r = 2 + this.i / 100;
    this.draw = function() {
        context.fillStyle = 'white';
        context.shadowBlur = 16;
        context.shadowColor = 'white';
        context.beginPath();
        context.arc(this.x, this.y, this.r, Math.PI*2, false);
        context.fill();
        context.shadowBlur = 0;
    }
}

function initializePoints(count, mult) {
    var a = 0;
    for (var i = 0; i < count; i++) {
        points.push(new Point(a + (360 * mult), i));
        a += (360 * mult);
    }
};

context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);
function clearCanvas() {
    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function getHypothenuse(x1, y1, x2, y2) {
    var x = Math.abs(x1 - x2);
    var y = Math.abs(y1 - y2);
    return Math.sqrt((x * x) + (y * y));
}

function drawPoints() {
    for (var p of points) {
        p.draw();
    }
};

function world() {
    clearCanvas();
    initializePoints(100, mult);
    drawPoints();
    mult += 0.00000001;
    mult = mult >= 1 ? mult % 1: mult;
    points = [];
}

setInterval(world, 1);