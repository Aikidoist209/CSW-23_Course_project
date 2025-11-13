const canvas = document.getElementById("phase2Canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

(function () {
    const sample = 'UTF-8 check: ✓ — save this file as UTF-8';
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        console.log('Running in browser. document.charset =', document.characterSet || document.charset);
        console.log(sample);
    } else {
        console.log('Running in Node.js');
        console.log(sample);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    
    function updateDateTime() {
        const now = new Date();
        
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const formattedDateTime = `${dateString}<br>${timeString}`;
        
        const dateTimeBox = document.getElementById('date-time-box');
        
        if (dateTimeBox) {
            dateTimeBox.innerHTML = `<strong>Current Date & Time:</strong><br>${formattedDateTime}`;
            console.log('Time updated successfully:', timeString);
        } else {
            console.log('Date-time box not found!');
        }
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Canvas already defined at top of file
    // const canvas = document.getElementById('phase2Canvas');
    // const ctx = canvas.getContext('2d');
    
    let animationId;
    const dots = [];
    const numDots = 50; // Number of dots in the swarm
    const maxSpeed = 3;
    const minSpeed = 1;
    
    // Initialize the swarm of dots
    function initializeSwarm() {
        for (let i = 0; i < numDots; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() < 0.5 ? -1 : 1),
                dy: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() < 0.5 ? -1 : 1),
                radius: Math.random() * 3 + 2, // Random size between 2-5
                color: {
                    r: Math.floor(Math.random() * 100) + 155, // Light colors (155-255)
                    g: Math.floor(Math.random() * 100) + 155,
                    b: Math.floor(Math.random() * 100) + 155
                }
            });
        }
    }
    
    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let dot of dots) {
            // Update position
            dot.x += dot.dx;
            dot.y += dot.dy;
            
            // Bounce off edges
            if (dot.x + dot.radius > canvas.width || dot.x - dot.radius < 0) {
                dot.dx = -dot.dx;
                // Keep dot within bounds
                dot.x = Math.max(dot.radius, Math.min(canvas.width - dot.radius, dot.x));
            }
            
            if (dot.y + dot.radius > canvas.height || dot.y - dot.radius < 0) {
                dot.dy = -dot.dy;
                // Keep dot within bounds
                dot.y = Math.max(dot.radius, Math.min(canvas.height - dot.radius, dot.y));
            }
            
            // Draw the dot
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${dot.color.r}, ${dot.color.g}, ${dot.color.b})`;
            ctx.fill();
            
            // Add a subtle glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgb(${dot.color.r}, ${dot.color.g}, ${dot.color.b})`;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow
        }
        
        animationId = requestAnimationFrame(animateCanvas);
    }
    
    // Initialize and start the swarm animation
    initializeSwarm();
    animateCanvas();
});