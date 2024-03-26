const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Cloud {
    constructor(x, y, color, width, height, velocity) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "#000"; // Black text color
        ctx.font = "16px Arial"; // Font size and style
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("SULEIMAN JIBRIL", this.x, this.y); // Text content and position
        ctx.restore();
    }

    update() {
        if (this.x + this.width >= canvas.width || this.x - this.width <= 0) {
            this.velocity.x = -this.velocity.x;
        }
        this.x += this.velocity.x;
        this.draw();
    }
}

let clouds = [];

function init() {
    clouds = [];
    for (let i = 0; i < 3; i++) {
        clouds.push(
            new Cloud(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.4,
                "rgba(255, 255, 255, 0.8)",
                Math.random() * 50 + 100, // Varying cloud size
                Math.random() * 20 + 10,
                { x: Math.random() * 2 + 1, y: 0 }
            )
        );
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "#87CEEB"; // Light blue background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    clouds.forEach((cloud) => {
        cloud.update();
    });
}

init();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
