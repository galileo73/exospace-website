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

  const x = cx + rx * cosA * cosR - ry * sinA * sinR;
  const y = cy + rx * cosA * sinR + ry * sinA * cosR;

  return { x, y };
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

  const tx = dx * cosR - dy * sinR;
  const ty = dx * sinR + dy * cosR;

  return { x: tx, y: ty };
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
    let orbitAngle = 3.9;
    let orbitSpeed = 0.0012;
    let orbitDirection = 1;

    let satelliteAlpha = 1;
    let phase: "visible" | "fadingOut" | "hidden" | "fadingIn" = "visible";
    let hiddenUntil = 0;

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
      const rotation = -0.22;

      return [
        {
          cx: width * 0.88,
          cy: height * 1.18,
          rx: width * 0.88,
          ry: height * 0.34,
          rotation,
          color: "rgba(105, 169, 221, 0.13)",
          width: 1,
        },
        {
          cx: width * 0.92,
          cy: height * 1.1,
          rx: width * 0.98,
          ry: height * 0.4,
          rotation,
          color: "rgba(57, 216, 208, 0.17)",
          width: 1.15,
        },
        {
          cx: width * 0.98,
          cy: height * 1.04,
          rx: width * 1.08,
          ry: height * 0.46,
          rotation,
          color: "rgba(105, 169, 221, 0.11)",
          width: 1,
        },
        {
          cx: width * 1.02,
          cy: height * 1.0,
          rx: width * 1.18,
          ry: height * 0.53,
          rotation,
          color: "rgba(57, 216, 208, 0.09)",
          width: 0.95,
        },
        {
          cx: width * 1.08,
          cy: height * 0.96,
          rx: width * 1.28,
          ry: height * 0.6,
          rotation,
          color: "rgba(105, 169, 221, 0.08)",
          width: 0.9,
        },
      ];
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

      const trail = drawingContext.createLinearGradient(-28, 0, 0, 0);
      trail.addColorStop(0, "rgba(244,247,251,0)");
      trail.addColorStop(1, "rgba(244,247,251,0.18)");
      drawingContext.strokeStyle = trail;
      drawingContext.lineWidth = 0.95;
      drawingContext.beginPath();
      drawingContext.moveTo(-24, 0);
      drawingContext.lineTo(-5, 0);
      drawingContext.stroke();

      drawingContext.fillStyle = "rgba(57,216,208,0.9)";
      drawingContext.shadowColor = "rgba(57,216,208,0.35)";
      drawingContext.shadowBlur = 8;
      drawingContext.fillRect(-3.3, -2.3, 6.6, 4.6);

      drawingContext.shadowBlur = 0;
      drawingContext.fillStyle = "rgba(105,169,221,0.74)";
      drawingContext.fillRect(-11.5, -1.6, 6.4, 3.2);
      drawingContext.fillRect(5.1, -1.6, 6.4, 3.2);

      drawingContext.strokeStyle = "rgba(244,247,251,0.28)";
      drawingContext.lineWidth = 0.75;
      drawingContext.beginPath();
      drawingContext.moveTo(-5.1, 0);
      drawingContext.lineTo(-11.5, 0);
      drawingContext.moveTo(5.1, 0);
      drawingContext.lineTo(11.5, 0);
      drawingContext.stroke();

      drawingContext.restore();
    }

    function chooseNextOrbit(orbits: Orbit[]) {
      let nextIndex = activeOrbitIndex;

      while (nextIndex === activeOrbitIndex && orbits.length > 1) {
        nextIndex = Math.floor(Math.random() * orbits.length);
      }

      activeOrbitIndex = nextIndex;
      orbitDirection = Math.random() > 0.5 ? 1 : -1;
      orbitSpeed = 0.001 + Math.random() * 0.00035;

      if (orbitDirection === 1) {
        orbitAngle = 3.85 + Math.random() * 0.15;
      } else {
        orbitAngle = 5.35 + Math.random() * 0.15;
      }
    }

    function draw(time = 0) {
      drawingContext.clearRect(0, 0, width, height);

      drawBackground();
      drawStars(time);

      const orbits = getOrbits();
      drawOrbits(orbits);

      if (reducedMotion) {
        drawSatellite(orbits[1], 4.45, 1);
      } else {
        if (phase === "visible") {
          orbitAngle += orbitSpeed * orbitDirection;

          if (
            (orbitDirection === 1 && orbitAngle >= 5.38) ||
            (orbitDirection === -1 && orbitAngle <= 3.88)
          ) {
            phase = "fadingOut";
          }
        } else if (phase === "fadingOut") {
          satelliteAlpha -= 0.02;

          if (satelliteAlpha <= 0) {
            satelliteAlpha = 0;
            phase = "hidden";
            hiddenUntil = time + 900;
          }
        } else if (phase === "hidden") {
          if (time >= hiddenUntil) {
            chooseNextOrbit(orbits);
            phase = "fadingIn";
          }
        } else if (phase === "fadingIn") {
          satelliteAlpha += 0.02;

          if (satelliteAlpha >= 1) {
            satelliteAlpha = 1;
            phase = "visible";
          }

          orbitAngle += orbitSpeed * orbitDirection;
        }

        if (phase !== "hidden") {
          drawSatellite(orbits[activeOrbitIndex], orbitAngle, satelliteAlpha);
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
