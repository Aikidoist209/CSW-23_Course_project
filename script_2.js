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
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  
  let lastDotTime = 0;
  const dotInterval = 100; 
  const dotsPerCircle = 12; // Number of dots in each circle
  
  function createDot() {
    // Create multiple dots in a circle pattern
    for (let i = 0; i < dotsPerCircle; i++) {
      const angle = (Math.PI * 2 / dotsPerCircle) * i;
      const speed = 2;
      
      dots.push({
        x: centerX,
        y: centerY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        radius: 3,
        opacity: 1
      });
    }
  }
  
  function animateCanvas(currentTime) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    if (currentTime - lastDotTime > dotInterval) {
      createDot();
      lastDotTime = currentTime;
    }
    
    
    for (let i = dots.length - 1; i >= 0; i--) {
      const dot = dots[i];
      
      
      dot.x += dot.dx;
      dot.y += dot.dy;
      
      
      const distanceFromCenter = Math.sqrt(
        Math.pow(dot.x - centerX, 2) + Math.pow(dot.y - centerY, 2)
      );
      const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
      dot.opacity = 1 - (distanceFromCenter / maxDistance);
      
      
      if (dot.x < 0 || dot.x > canvas.width || 
          dot.y < 0 || dot.y > canvas.height || 
          dot.opacity <= 0) {
        dots.splice(i, 1);
        continue;
      }
      
      
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
      ctx.fill();
    }
    
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    
    
    animationId = requestAnimationFrame(animateCanvas);
  }
  
 
  animateCanvas();

});