const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const lengthDisplay = document.getElementById("lengthDisplay");
const message = document.getElementById("message");
let drawing = false;
let lastX = 0, lastY = 0;
let totalLength = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousedown", (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawing = true;
    lastX = event.clientX;
    lastY = event.clientY;
    totalLength = 0;
    message.textContent = "";
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
});

canvas.addEventListener("mousemove", (event) => {
    if (!drawing) return;
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
    
    let dx = event.clientX - lastX;
    let dy = event.clientY - lastY;
    totalLength += Math.sqrt(dx * dx + dy * dy) / 37.795;
    lengthDisplay.textContent = totalLength.toFixed(2);
    
    lastX = event.clientX;
    lastY = event.clientY;
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    if (totalLength < 20) {
        message.textContent = "Really? This is all you can do? 🙄";
    } else if (totalLength <= 30) {
        message.textContent = "This is almost a foot long! 🫣";
    } else if (totalLength > 30 && totalLength < 99.99) { 
        message.textContent = "Draw any longer to get a 1 METRE LONG!! 😲";
    } else if (totalLength > 100 && totalLength < 500) {
        message.textContent = "CONGRAT! YOU DRAW A 1 METRE LONG LINE!! 🥳";
    } else if (totalLength >= 500 && totalLength < 2500) {
        message.textContent = "THIS IS FUN, RIGHT? 🙂‍↕️";
    } else if (totalLength >= 2500 && totalLength < 10000) {
        message.textContent = "Wait.... 😒";
    } else if (totalLength >= 10000 && totalLength < 11000) {
        message.textContent = "Are you for real? 🤨";
    } else {
        message.textContent = "I'm not gonna count it anymore 😌";
    }

});
