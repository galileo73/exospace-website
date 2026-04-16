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

type Route = {
  p0: { x: number; y: number };
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  color: string;
  width: number;
};

type SpaceBackdropProps = {
  density?: number;
  className?: string;
};

function quadraticPoint(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
) {
  const oneMinusT = 1 - t;
  const x =
    oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x;
  const y =
    oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y;

  return { x, y };
}

function quadraticTangent(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
) {
  const x = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
  const y = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);

  return { x, y };
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

    let activeRouteIndex = 0;
    let routeProgress = 0.14;
    let direction = 1;

    let satelliteVisible = true;
    let hiddenUntil = 0;
    let lastSwitchTime = 0;

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

    function getRoutes(): Route[] {
      return [
        {
          p0: { x: width * 0.48, y: height * 0.62 },
          p1: { x: width * 0.72, y: height * 0.28 },
          p2: { x: width * 0.96, y: height * 0.12 },
          color: "rgba(105, 169, 221, 0.14)",
          width: 1.0,
        },
        {
          p0: { x: width * 0.54, y: height * 0.7 },
          p1: { x: width * 0.78, y: height * 0.5 },
          p2: { x: width * 1.02, y: height * 0.4 },
          color: "rgba(57, 216, 208, 0.16)",
          width: 1.15,
        },
        {
          p0: { x: width * 0.6, y: height * 0.8 },
          p1: { x: width * 0.84, y: height * 0.68 },
          p2: { x: width * 1.02, y: height * 0.6 },
          color: "rgba(105, 169, 221, 0.12)",
          width: 1.0,
        },
        {
          p0: { x: width * 0.66, y: height * 0.94 },
          p1: { x: width * 0.88, y: height * 0.84 },
          p2: { x: width * 1.02, y: height * 0.76 },
          color: "rgba(57, 216, 208, 0.10)",
          width: 0.95,
        },
        {
          p0: { x: width * 0.74, y: height * 1.04 },
          p1: { x: width * 0.92, y: height * 0.96 },
          p2: { x: width * 1.03, y: height * 0.9 },
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

    function drawRoutes(routes: Route[]) {
      routes.forEach((route) => {
        drawingContext.save();
        drawingContext.strokeStyle = route.color;
        drawingContext.lineWidth = route.width;
        drawingContext.beginPath();
        drawingContext.moveTo(route.p0.x, route.p0.y);
        drawingContext.quadraticCurveTo(
          route.p1.x,
          route.p1.y,
          route.p2.x,
          route.p2.y,
        );
        drawingContext.stroke();
        drawingContext.restore();
      });
    }

    function drawSatellite(route: Route, t: number) {
      const point = quadraticPoint(t, route.p0, route.p1, route.p2);
      const tangent = quadraticTangent(t, route.p0, route.p1, route.p2);
      const angle = Math.atan2(tangent.y, tangent.x);

      drawingContext.save();
      drawingContext.translate(point.x, point.y);
      drawingContext.rotate(angle);

      const trail = drawingContext.createLinearGradient(-30, 0, 0, 0);
      trail.addColorStop(0, "rgba(244,247,251,0)");
      trail.addColorStop(1, "rgba(244,247,251,0.18)");
      drawingContext.strokeStyle = trail;
      drawingContext.lineWidth = 0.95;
      drawingContext.beginPath();
      drawingContext.moveTo(-24, 0);
      drawingContext.lineTo(-5, 0);
      drawingContext.stroke();

      drawingContext.fillStyle = "rgba(57,216,208,0.88)";
      drawingContext.shadowColor = "rgba(57,216,208,0.36)";
      drawingContext.shadowBlur = 8;
      drawingContext.fillRect(-3.3, -2.3, 6.6, 4.6);

      drawingContext.shadowBlur = 0;
      drawingContext.fillStyle = "rgba(105,169,221,0.72)";
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

    function switchRoute(time: number, routes: Route[]) {
      if (time - lastSwitchTime < 6000) {
        return;
      }

      lastSwitchTime = time;

      let nextIndex = activeRouteIndex;
      while (nextIndex === activeRouteIndex && routes.length > 1) {
        nextIndex = Math.floor(Math.random() * routes.length);
      }

      activeRouteIndex = nextIndex;
      direction = Math.random() > 0.5 ? 1 : -1;
      routeProgress = direction === 1 ? 0.1 : 0.9;
      satelliteVisible = false;
      hiddenUntil = time + 1200;
    }

    function draw(time = 0) {
      drawingContext.clearRect(0, 0, width, height);

      drawBackground();
      drawStars(time);

      const routes = getRoutes();
      drawRoutes(routes);

      if (reducedMotion) {
        drawSatellite(routes[1], 0.34);
      } else {
        if (satelliteVisible) {
          routeProgress += 0.00035 * direction;

          if (routeProgress >= 0.9 || routeProgress <= 0.1) {
            satelliteVisible = false;
            hiddenUntil = time + 1000;
          }
        } else if (time >= hiddenUntil) {
          switchRoute(time, routes);
          satelliteVisible = true;
        }

        if (satelliteVisible) {
          drawSatellite(routes[activeRouteIndex], routeProgress);
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
