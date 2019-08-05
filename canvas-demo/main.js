var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var lineWidth = 1;

autoSetCanvasSize(canvas);
listenTouser(canvas);

// click function
black.onclick = function () {
    context.fillStyle = "black";
    context.strokeStyle = "black";
    black.classList.add("active");
    red.classList.remove("active");
    yellow.classList.remove("active");
    blue.classList.remove("active");
};

red.onclick = function () {
    context.fillStyle = "red";
    context.strokeStyle = "red";
    black.classList.remove("active");
    red.classList.add("active");
    yellow.classList.remove("active");
    blue.classList.remove("active");
};

yellow.onclick = function () {
    context.fillStyle = "yellow";
    context.strokeStyle = "yellow";
    black.classList.remove("active");
    red.classList.remove("active");
    yellow.classList.add("active");
    blue.classList.remove("active");
};

blue.onclick = function () {
    context.fillStyle = "blue";
    context.strokeStyle = "blue";
    black.classList.remove("active");
    red.classList.remove("active");
    yellow.classList.remove("active");
    blue.classList.add("active");
};

low.onclick = function () {
    lineWidth = 1;
    low.classList.add("active");
    medium.classList.remove("active");
    high.classList.remove("active");
};

medium.onclick = function () {
    lineWidth = 3;
    low.classList.remove("active");
    medium.classList.add("active");
    high.classList.remove("active");
};

high.onclick = function () {
    lineWidth = 5;
    low.classList.remove("active");
    medium.classList.remove("active");
    high.classList.add("active");
};

var eraserEnable = false;
pen.onclick = function () {
    eraserEnable = false;
    pen.classList.add("active");
    eraser.classList.remove("active");
};

eraser.onclick = function () {
    eraserEnable = true;
    pen.classList.remove("active");
    eraser.classList.add("active");
};

clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

download.onclick = function () {
    var url = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    var timeStamp = Date.parse(new Date());
    a.download = timeStamp.toString();
    a.target = "_blank";
    a.click();
};

function drawCanvasBackground() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// 重置canvas大小
function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function () {
        setCanvasSize();
    };

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
        drawCanvasBackground();
    }
}

function listenTouser(canvas) {
    var isUsing = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    };
    if (document.body.ontouchstart !== undefined) {
        //    触屏
        canvas.ontouchstart = function (click) {
            var clickX = click.touches[0].clientX;
            var clickY = click.touches[0].clientY;
            isUsing = true;

            if (eraserEnable) {
                context.clearRect(clickX - 5, clickY - 5, 10, 10);
            } else {
                lastPoint = {
                    x: clickX,
                    y: clickY
                };
            }
        };
        canvas.ontouchmove = function (click) {
            var clickX = click.touches[0].clientX;
            var clickY = click.touches[0].clientY;
            if (!isUsing) return;
            if (eraserEnable) {
                context.clearRect(clickX - 5, clickY - 5, 10, 10);
            } else {
                drawLine(lastPoint.x, lastPoint.y, clickX, clickY);
                lastPoint = {
                    x: clickX,
                    y: clickY
                };
            }

        };
        canvas.ontouchend = function () {
            isUsing = false;
        };
    } else {
        canvas.onmousedown = function (click) {
            var clickX = click.clientX;
            var clickY = click.clientY;
            isUsing = true;

            if (eraserEnable) {
                context.clearRect(clickX - 5, clickY - 5, 10, 10);
            } else {
                lastPoint = {
                    x: clickX,
                    y: clickY
                };
            }
        };

        canvas.onmousemove = function (click) {
            var clickX = click.clientX;
            var clickY = click.clientY;
            if (!isUsing) return;
            if (eraserEnable) {
                context.clearRect(clickX - 5, clickY - 5, 10, 10);
            } else {
                drawLine(lastPoint.x, lastPoint.y, clickX, clickY);
                lastPoint = {
                    x: clickX,
                    y: clickY
                };
            }
        };

        canvas.onmouseup = function () {
            isUsing = false;
        };
    }
}

// draw
function drawLine(oldX, oldY, newX, newY) {
    context.beginPath();
    context.lineWidth = lineWidth;
    context.moveTo(oldX, oldY);
    context.lineTo(newX, newY);
    context.stroke();
    context.closePath();
}
