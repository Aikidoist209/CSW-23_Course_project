const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particlesArray = [];

class Particle {
        constructor (x, y) {
            this.x = x;
            this.y = y;
            this.size = 10;
            this.weight = 6;
            this.directionX = 1;
        }
    
        update() {
            this.y += this.weight;
            this.x += this.directionX;
            // Bounce off walls
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height - this.size || this.y < this.size) {
                this.weight = -this.weight;
            }
        }

        draw() {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
        
    const particle1 = new Particle(100, 100);

    function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    particle1.update();
    particle1.draw();
    requestAnimationFrame(animate);
    }

    animate();

    