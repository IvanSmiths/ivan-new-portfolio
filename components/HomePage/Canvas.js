import React, { useEffect, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
const Canvas = () => {
  const position = { x: 0, y: 0, radius: 180 };
  const width = window.innerWidth;
  const height = window.innerHeight;
  const size = { width: width, height: height };
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  const ctx = useRef(null);

  let particleArray = [];
  let adjustX = 0;
  let adjustY = 0;

  const handleMove = (clix, cliy) => {
    position.x = clix;
    position.y = cliy;
  };

  const renderFrame = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#060606';
    ctx.font = ' 42px Georgia';
    ctx.fillText(`${t('home:innovation2')}`, 115, 50);

    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw();
      particleArray[i].update();
    }
    // connect();
  };

  class Particle {
    constructor(x, y) {
      this.x = x + 200;
      this.y = y;
      this.size = 2;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 80 + 24;
    }

    draw() {
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = '#D7F21D';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 8);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      let dx = position.x - this.x;
      let dy = position.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = position.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;

      if (distance < position.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 40;
        }
        if (this.y !== this.basyY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 40;
        }
      }
    }
  }

  function init() {
    particleArray = [];
    if (!canvasRef.current) {
      window.setTimeout(init, 10);
    } else {
      console.log('init ran');
      const ctx = canvasRef.current.getContext('2d');
      const textCoordinates = ctx.getImageData(0, 0, height, width);
      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          if (
            textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] >
            128
          ) {
            let positionX = x + adjustX;
            let positionY = y + adjustY;
            particleArray.push(new Particle(positionX * 3, positionY * 8));
          }
        }
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext('2d');
  }, []);

  const animate = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestIdRef.current = requestAnimationFrame(animate);
  };
  // this function is not working yet, it should connect the particles together.
  const connect = () => {
    for (let a = 0; a < particleArray.length; a++) {
      for (let b = a; b < particleArray.length; b++) {
        let dx = particleArray[a].x - particleArray[b].x;
        let dy = particleArray[a].y - particleArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particleArray[a].x, particleArray[a].y);
          ctx.lineTo(particleArray[a].x, particleArray[a].y);
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(animate);
  }, []);

  init();
  let { t } = useTranslation();
  return (
    <div className="canvas-cnt">
      <canvas
        className="canvas"
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        {...size}
        ref={canvasRef}
      />
    </div>
  );
};

export default Canvas;
