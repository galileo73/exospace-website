import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
  phase: number;
  warm: boolean;
};

type Orbit = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotation: number;
  color: string;
  width: number;
  startAngle: number;
  endAngle: number;
  speed: number; // radians per second
};

type SpaceBackdropProps = {
  density?: number;
  className?: string;
};

function ellipsePoint(
  angle: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotation: number,
) {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const cosR = Math.cos(rotation);
  const sinR = Math.sin(rotation);

  return {
    x: cx + rx * cosA * cosR - ry * sinA * sinR,
    y: cy + rx * cosA * sinR + ry * sinA * cosR,
  };
}

function ellipseTangent(
  angle: number,
  rx: number,
  ry: number,
  rotation: number,
) {
  const dx = -rx * Math.sin(angle);
  const dy = ry * Math.cos(angle);
  const cosR = Math.cos(rotation);
  const sinR = Math.sin(rotation);

  return {
    x: dx * cosR - dy * sinR,
    y: dx * sinR + dy * cosR,
  };
}

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

    let activeOrbitIndex = 1;
    let currentAngle = 0;
    let currentSpeed = 0;
    let satelliteAlpha = 1;

    let phase: "visible" | "fadingOut" | "hidden" | "fadingIn" = "visible";
    let hiddenUntil = 0;
    let lastTime = 0;

    function createStars() {
      const count = Math.round(
        Math.min(Math.max(width * height * 0.00016, 120), density),
      );

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.7 + 0.3,
        speed: Math.random() * 0.24 + 0.06,
        alpha: Math.random() * 0.55 + 0.2,
        phase: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.9,
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
          cx: width * 0.86,
          cy: height * 1.26,
          rx: width * 0.78,
          ry: height * 0.16,
          rotation: -0.26,
          color: "rgba(105, 169, 221, 0.08)",
          width: 0.9,
          startAngle: 4.02,
          endAngle: 5.36,
          speed: 0.018,
        },
        {
          cx: width * 0.94,
          cy: height * 1.16,
          rx: width * 0.92,
          ry: height * 0.24,
          rotation: -0.22,
          color: "rgba(105, 169, 221, 0.11)",
          width: 1.0,
          startAngle: 3.94,
          endAngle: 5.3,
          speed: 0.02,
        },
        {
          cx: width * 1.0,
          cy: height * 1.08,
          rx: width * 1.02,
          ry: height * 0.34,
          rotation: -0.2,
          color: "rgba(57, 216, 208, 0.16)",
          width: 1.15,
          startAngle: 3.88,
          endAngle: 5.22,
          speed: 0.021,
        },
        {
          cx: width * 1.08,
          cy: height * 0.98,
          rx: width * 1.16,
          ry: height * 0.48,
          rotation: -0.14,
          color: "rgba(105, 169, 221, 0.10)",
          width: 1.0,
          startAngle: 3.82,
          endAngle: 5.12,
          speed: 0.017,
        },
        {
          cx: width * 1.18,
          cy: height * 0.9,
          rx: width * 1.3,
          ry: height * 0.62,
          rotation: -0.1,
          color: "rgba(57, 216, 208, 0.08)",
          width: 0.95,
          startAngle: 3.78,
          endAngle: 5.04,
          speed: 0.015,
        },
      ];
    }

    function chooseNextOrbit(orbits: Orbit[]) {
      let nextIndex = activeOrbitIndex;

      while (nextIndex === activeOrbitIndex && orbits.length > 1) {
        nextIndex = Math.floor(Math.random() * orbits.length);
      }

      activeOrbitIndex = nextIndex;
      currentAngle = orbits[nextIndex].startAngle;
      currentSpeed = orbits[nextIndex].speed;
    }

    function initializeOrbit(orbits: Orbit[]) {
      activeOrbitIndex = 2;
      currentAngle = orbits[activeOrbitIndex].startAngle;
      currentSpeed = orbits[activeOrbitIndex].speed;
    }

    function drawBackground() {
      const baseGradient = drawingContext.createLinearGradient(0, 0, width, 0);
      baseGradient.addColorStop(0, "rgba(3, 9, 16, 1)");
      baseGradient.addColorStop(0.42, "rgba(4, 10, 18, 0.985)");
      baseGradient.addColorStop(0.74, "rgba(3, 14, 24, 1)");
      baseGradient.addColorStop(1, "rgba(2, 7, 12, 1)");
      drawingContext.fillStyle = baseGradient;
      drawingContext.fillRect(0, 0, width, height);

      const rightGlow = drawingContext.createRadialGradient(
        width * 0.82,
        height * 0.48,
        0,
        width * 0.82,
        height * 0.48,
        width * 0.28,
      );
      rightGlow.addColorStop(0, "rgba(57, 216, 208, 0.14)");
      rightGlow.addColorStop(0.4, "rgba(105, 169, 221, 0.08)");
      rightGlow.addColorStop(1, "rgba(57, 216, 208, 0)");
      drawingContext.fillStyle = rightGlow;
      drawingContext.fillRect(0, 0, width, height);

      const leftBloom = drawingContext.createRadialGradient(
        width * 0.2,
        height * 0.18,
        0,
        width * 0.2,
        height * 0.18,
        width * 0.16,
      );
      leftBloom.addColorStop(0, "rgba(243, 199, 117, 0.09)");
      leftBloom.addColorStop(0.5, "rgba(243, 199, 117, 0.03)");
      leftBloom.addColorStop(1, "rgba(243, 199, 117, 0)");
      drawingContext.fillStyle = leftBloom;
      drawingContext.fillRect(0, 0, width, height);

      drawingContext.save();
      drawingContext.strokeStyle = "rgba(255, 255, 255, 0.028)";
      drawingContext.lineWidth = 1;

      for (let x = 0; x < width; x += 44) {
        drawingContext.beginPath();
        drawingContext.moveTo(x, 0);
        drawingContext.lineTo(x, height);
        drawingContext.stroke();
      }

      drawingContext.restore();
    }

    function drawStars(time: number) {
      stars.forEach((star) => {
        if (!reducedMotion) {
          star.x -= star.speed;
          star.y += star.speed * 0.045;

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
          : 0.78 + Math.sin(time * 0.001 + star.phase) * 0.22;

        drawingContext.beginPath();
        drawingContext.fillStyle = star.warm
          ? `rgba(243, 199, 117, ${star.alpha * 0.5 * shimmer})`
          : `rgba(244, 247, 251, ${star.alpha * shimmer})`;
        drawingContext.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        drawingContext.fill();
      });
    }

    function drawOrbits(orbits: Orbit[]) {
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
    }

    function drawSatellite(orbit: Orbit, angle: number, alpha: number) {
      const point = ellipsePoint(
        angle,
        orbit.cx,
        orbit.cy,
        orbit.rx,
        orbit.ry,
        orbit.rotation,
      );
      const tangent = ellipseTangent(angle, orbit.rx, orbit.ry, orbit.rotation);
      const rotation = Math.atan2(tangent.y, tangent.x);

      drawingContext.save();
      drawingContext.globalAlpha = alpha;
      drawingContext.translate(point.x, point.y);
      drawingContext.rotate(rotation);

      const trail = drawingContext.createLinearGradient(-18, 0, 0, 0);
      trail.addColorStop(0, "rgba(244,247,251,0)");
      trail.addColorStop(1, "rgba(244,247,251,0.12)");
      drawingContext.strokeStyle = trail;
      drawingContext.lineWidth = 0.8;
      drawingContext.beginPath();
      drawingContext.moveTo(-15, 0);
      drawingContext.lineTo(-4, 0);
      drawingContext.stroke();

      drawingContext.fillStyle = "rgba(57,216,208,0.84)";
      drawingContext.shadowColor = "rgba(57,216,208,0.28)";
      drawingContext.shadowBlur = 7;
      drawingContext.fillRect(-2.4, -1.7, 4.8, 3.4);

      drawingContext.shadowBlur = 0;
      drawingContext.fillStyle = "rgba(105,169,221,0.68)";
      drawingContext.fillRect(-7.8, -1.1, 4.2, 2.2);
      drawingContext.fillRect(3.6, -1.1, 4.2, 2.2);

      drawingContext.strokeStyle = "rgba(244,247,251,0.22)";
      drawingContext.lineWidth = 0.65;
      drawingContext.beginPath();
      drawingContext.moveTo(-3.5, 0);
      drawingContext.lineTo(-7.8, 0);
      drawingContext.moveTo(3.5, 0);
      drawingContext.lineTo(7.8, 0);
      drawingContext.stroke();

      drawingContext.restore();
    }

    function draw(time = 0) {
      drawingContext.clearRect(0, 0, width, height);

      drawBackground();
      drawStars(time);

      const orbits = getOrbits();
      drawOrbits(orbits);

      if (orbits.length > 0 && currentSpeed === 0) {
        initializeOrbit(orbits);
      }

      if (reducedMotion) {
        drawSatellite(orbits[2] ?? orbits[0], 4.35, 1);
      } else {
        const delta = lastTime ? (time - lastTime) / 1000 : 0.016;
        lastTime = time;

        const activeOrbit = orbits[activeOrbitIndex];

        if (phase === "visible") {
          currentAngle += currentSpeed * delta;

          if (currentAngle >= activeOrbit.endAngle - 0.08) {
            phase = "fadingOut";
          }
        } else if (phase === "fadingOut") {
          satelliteAlpha -= 1.15 * delta;

          if (satelliteAlpha <= 0) {
            satelliteAlpha = 0;
            phase = "hidden";
            hiddenUntil = time + 1600;
          }
        } else if (phase === "hidden") {
          if (time >= hiddenUntil) {
            chooseNextOrbit(orbits);
            phase = "fadingIn";
          }
        } else if (phase === "fadingIn") {
          satelliteAlpha += 0.9 * delta;

          if (satelliteAlpha >= 1) {
            satelliteAlpha = 1;
            phase = "visible";
          }
        }

        if (phase !== "hidden") {
          drawSatellite(orbits[activeOrbitIndex], currentAngle, satelliteAlpha);
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
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
