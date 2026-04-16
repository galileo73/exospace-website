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

type Orbit = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotation: number;
  color: string;
  width: number;
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

    let activeOrbitIndex = 0;
    let orbitAngle = Math.PI * 0.15;
    let targetAngle = orbitAngle;
    let lastOrbitSwitch = 0;

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

    function getOrbits(): Orbit[] {
      return [
        {
          cx: width * 0.58,
          cy: height * 0.34,
          rx: width * 0.38,
          ry: height * 0.11,
          rotation: -0.26,
          color: "rgba(105, 169, 221, 0.16)",
          width: 1.1,
        },
        {
          cx: width * 0.74,
          cy: height * 0.66,
          rx: width * 0.5,
          ry: height * 0.13,
          rotation: -0.18,
          color: "rgba(57, 216, 208, 0.22)",
          width: 1.6,
        },
        {
          cx: width * 0.8,
          cy: height * 0.82,
          rx: width * 0.56,
          ry: height * 0.15,
          rotation: -0.2,
          color: "rgba(105, 169, 221, 0.12)",
          width: 1.2,
        },
      ];
    }

    function drawSatelliteOnOrbit(
      orbit: Orbit,
      angle: number,
      trailOpacity = 0.32,
    ) {
      const cosRotation = Math.cos(orbit.rotation);
      const sinRotation = Math.sin(orbit.rotation);

      const localX = Math.cos(angle) * orbit.rx;
      const localY = Math.sin(angle) * orbit.ry;

      const satX = orbit.cx + localX * cosRotation - localY * sinRotation;
      const satY = orbit.cy + localX * sinRotation + localY * cosRotation;

      const tangentAngle =
        Math.atan2(orbit.ry * Math.cos(angle), -orbit.rx * Math.sin(angle)) +
        orbit.rotation;

      drawingContext.save();
      drawingContext.translate(satX, satY);
      drawingContext.rotate(tangentAngle);

      const trail = drawingContext.createLinearGradient(-32, 0, 0, 0);
      trail.addColorStop(0, `rgba(244, 247, 251, 0)`);
      trail.addColorStop(1, `rgba(244, 247, 251, ${trailOpacity})`);
      drawingContext.strokeStyle = trail;
      drawingContext.lineWidth = 1.2;
      drawingContext.beginPath();
      drawingContext.moveTo(-28, 0);
      drawingContext.lineTo(-5, 0);
      drawingContext.stroke();

      drawingContext.fillStyle = "rgba(57, 216, 208, 0.92)";
      drawingContext.shadowColor = "rgba(57, 216, 208, 0.5)";
      drawingContext.shadowBlur = 12;
      drawingContext.fillRect(-4, -3, 8, 6);

      drawingContext.shadowBlur = 0;
      drawingContext.fillStyle = "rgba(105, 169, 221, 0.76)";
      drawingContext.fillRect(-15, -2, 8, 4);
      drawingContext.fillRect(7, -2, 8, 4);

      drawingContext.strokeStyle = "rgba(244, 247, 251, 0.4)";
      drawingContext.lineWidth = 0.9;
      drawingContext.beginPath();
      drawingContext.moveTo(-7, 0);
      drawingContext.lineTo(-15, 0);
      drawingContext.moveTo(7, 0);
      drawingContext.lineTo(15, 0);
      drawingContext.stroke();

      drawingContext.restore();
    }

    function chooseNextOrbit(orbits: Orbit[]) {
      let nextIndex = activeOrbitIndex;

      while (nextIndex === activeOrbitIndex && orbits.length > 1) {
        nextIndex = Math.floor(Math.random() * orbits.length);
      }

      activeOrbitIndex = nextIndex;
      targetAngle = Math.random() * Math.PI * 2;
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

      const orbits = getOrbits();

      orbits.forEach((orbit) => {
        drawingContext.save();
        drawingContext.strokeStyle = orbit.color;
        drawingContext.lineWidth = orbit.width;
        drawingContext.beginPath();
        drawingContext.ellipse(
          orbit.cx,
          orbit.cy,
          orbit.rx,
          orbit.ry,
          orbit.rotation,
          0,
          Math.PI * 2,
        );
        drawingContext.stroke();
        drawingContext.restore();
      });

      if (reducedMotion) {
        drawSatelliteOnOrbit(orbits[1], Math.PI * 0.18, 0.3);
      } else {
        if (time - lastOrbitSwitch > 3800) {
          chooseNextOrbit(orbits);
          lastOrbitSwitch = time;
        }

        orbitAngle += (targetAngle - orbitAngle) * 0.016;

        const activeOrbit = orbits[activeOrbitIndex];
        drawSatelliteOnOrbit(activeOrbit, orbitAngle, 0.36);
      }

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
