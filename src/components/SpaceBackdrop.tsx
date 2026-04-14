import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
  phase: number;
  layer: number;
};

type SpaceBackdropProps = {
  density?: number;
  className?: string;
};

export function SpaceBackdrop({
  density = 150,
  className = "",
}: SpaceBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const canvasElement = canvas;
    const drawingContext = context;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let stars: Star[] = [];

    function createStars() {
      const count = Math.round(
        Math.min(Math.max(width * height * 0.00018, 140), density),
      );
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.45,
        speed: Math.random() * 0.42 + 0.12,
        alpha: Math.random() * 0.7 + 0.35,
        phase: Math.random() * Math.PI * 2,
        layer: Math.random() > 0.72 ? 2 : 1,
      }));
    }

    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvasElement.offsetWidth;
      height = canvasElement.offsetHeight;
      canvasElement.width = Math.floor(width * pixelRatio);
      canvasElement.height = Math.floor(height * pixelRatio);
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createStars();
    }

    function draw(time = 0) {
      drawingContext.clearRect(0, 0, width, height);

      const gradient = drawingContext.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(6, 18, 31, 1)");
      gradient.addColorStop(0.42, "rgba(4, 10, 18, 0.98)");
      gradient.addColorStop(1, "rgba(2, 5, 10, 1)");
      drawingContext.fillStyle = gradient;
      drawingContext.fillRect(0, 0, width, height);

      const nebula = drawingContext.createRadialGradient(
        width * 0.78,
        height * 0.58,
        20,
        width * 0.78,
        height * 0.58,
        width * 0.52,
      );
      nebula.addColorStop(0, "rgba(57, 216, 208, 0.18)");
      nebula.addColorStop(0.35, "rgba(105, 169, 221, 0.12)");
      nebula.addColorStop(1, "rgba(43, 214, 208, 0)");
      drawingContext.fillStyle = nebula;
      drawingContext.fillRect(0, 0, width, height);

      const solarBloom = drawingContext.createRadialGradient(
        width * 0.22,
        height * 0.14,
        0,
        width * 0.22,
        height * 0.14,
        width * 0.18,
      );
      solarBloom.addColorStop(0, "rgba(243, 199, 117, 0.14)");
      solarBloom.addColorStop(0.45, "rgba(243, 199, 117, 0.04)");
      solarBloom.addColorStop(1, "rgba(243, 199, 117, 0)");
      drawingContext.fillStyle = solarBloom;
      drawingContext.fillRect(0, 0, width, height);

      drawingContext.save();
      const drift = reducedMotion ? 0 : Math.sin(time * 0.00035) * 42;
      drawingContext.strokeStyle = "rgba(57, 216, 208, 0.24)";
      drawingContext.lineWidth = 1.2;
      drawingContext.beginPath();
      drawingContext.ellipse(
        width * 0.7 + drift,
        height * 0.46,
        width * 0.5,
        height * 0.13,
        -0.22,
        0,
        Math.PI * 2,
      );
      drawingContext.stroke();
      drawingContext.strokeStyle = "rgba(105, 169, 221, 0.12)";
      drawingContext.beginPath();
      drawingContext.ellipse(
        width * 0.67 + drift * 0.6,
        height * 0.57,
        width * 0.62,
        height * 0.16,
        -0.24,
        0,
        Math.PI * 2,
      );
      drawingContext.stroke();
      drawingContext.restore();

      stars.forEach((star) => {
        if (!reducedMotion) {
          const parallax = star.layer === 2 ? 1.8 : 1;
          star.x -= star.speed * parallax;
          star.y += star.speed * 0.12;

          if (star.x < -2) {
            star.x = width + 2;
            star.y = Math.random() * height;
          }

          if (star.y > height + 2) {
            star.y = -2;
            star.x = Math.random() * width;
          }
        }

        const shimmer = reducedMotion
          ? 1
          : 0.75 + Math.sin(time * 0.001 + star.phase) * 0.25;
        drawingContext.beginPath();
        const color =
          star.layer === 2
            ? `rgba(243, 199, 117, ${star.alpha * 0.55 * shimmer})`
            : `rgba(244, 247, 251, ${star.alpha * shimmer})`;
        drawingContext.fillStyle = color;
        drawingContext.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        drawingContext.fill();
      });

      drawingContext.save();
      const sweep = reducedMotion ? 0 : (time * 0.018) % (width + 260);
      drawingContext.strokeStyle = "rgba(244, 247, 251, 0.48)";
      drawingContext.lineWidth = 1.4;
      drawingContext.beginPath();
      drawingContext.moveTo(sweep - 260, height * 0.26);
      drawingContext.lineTo(sweep, height * 0.18);
      drawingContext.stroke();
      drawingContext.strokeStyle = "rgba(57, 216, 208, 0.38)";
      drawingContext.lineWidth = 2;
      drawingContext.beginPath();
      drawingContext.arc(
        width * 0.84,
        height * 1.16,
        width * 0.42,
        Math.PI * 1.08,
        Math.PI * 1.9,
      );
      drawingContext.stroke();
      drawingContext.restore();

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
