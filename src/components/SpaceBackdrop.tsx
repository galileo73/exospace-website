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
    let routeProgress = 0.16;
    let direction = 1;
    let lastRouteSwitch = 0;

    function createStars() {
      const count = Math.round(
        Math.min(Math.max(width * height * 0.00015, 110), density),
      );

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.7 + 0.35,
        speed: Math.random() * 0.28 + 0.08,
        alpha: Math.random() * 0.55 + 0.22,
        phase: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.88,
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
          p0: { x: width * 0.24, y: height * 0.92 },
          p1: { x: width * 0.46, y: height * 0.58 },
          p2: { x: width * 0.98, y: height * 0.56 },
          color: "rgba(57, 216, 208, 0.24)",
          width: 1.5,
        },
        {
          p0: { x: width * 0.4, y: height * 0.96 },
          p1: { x: width * 0.66, y: height * 0.98 },
          p2: { x: width * 1.02, y: height * 0.74 },
          color: "rgba(105, 169, 221, 0.14)",
          width: 1.15,
        },
        {
          p0: { x: width * 0.52, y: height * 0.54 },
          p1: { x: width * 0.78, y: height * 0.18 },
          p2: { x: width * 0.96, y: height * 0.12 },
          color: "rgba(105, 169, 221, 0.16)",
          width: 1.05,
        },
      ];
    }

    function drawBackground() {
      const baseGradient = drawingContext.createLinearGradient(0, 0, width, 0);
      baseGradient.addColorStop(0, "rgba(3, 9, 16, 1)");
      baseGradient.addColorStop(0.4, "rgba(4, 10, 18, 0.985)");
      baseGradient.addColorStop(0.72, "rgba(3, 14, 24, 1)");
      baseGradient.addColorStop(1, "rgba(2, 7, 12, 1)");
      drawingContext.fillStyle = baseGradient;
      drawingContext.fillRect(0, 0, width, height);

      const rightGlow = drawingContext.createRadialGradient(
        width * 0.82,
        height * 0.52,
        0,
        width * 0.82,
        height * 0.52,
        width * 0.28,
      );
      rightGlow.addColorStop(0, "rgba(57, 216, 208, 0.15)");
      rightGlow.addColorStop(0.42, "rgba(105, 169, 221, 0.08)");
      rightGlow.addColorStop(1, "rgba(57, 216, 208, 0)");
      drawingContext.fillStyle = rightGlow;
      drawingContext.fillRect(0, 0, width, height);

      const leftBloom = drawingContext.createRadialGradient(
        width * 0.2,
        height * 0.2,
        0,
        width * 0.2,
        height * 0.2,
        width * 0.16,
      );
      leftBloom.addColorStop(0, "rgba(243, 199, 117, 0.1)");
      leftBloom.addColorStop(0.48, "rgba(243, 199, 117, 0.03)");
      leftBloom.addColorStop(1, "rgba(243, 199, 117, 0)");
      drawingContext.fillStyle = leftBloom;
      drawingContext.fillRect(0, 0, width, height);

      drawingContext.save();
      drawingContext.strokeStyle = "rgba(255,255,255,0.028)";
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
          star.y += star.speed * 0.06;

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
          : 0.75 + Math.sin(time * 0.001 + star.phase) * 0.22;

        drawingContext.beginPath();
        drawingContext.fillStyle = star.warm
          ? `rgba(243, 199, 117, ${star.alpha * 0.52 * shimmer})`
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

    function drawNodes() {
      const nodes = [
        { x: width * 0.62, y: height * 0.56, r: 3.2 },
        { x: width * 0.78, y: height * 0.44, r: 3.6 },
        { x: width * 0.88, y: height * 0.3, r: 3.0 },
      ];

      nodes.forEach((node, index) => {
        drawingContext.save();
        drawingContext.beginPath();
        drawingContext.fillStyle =
          index === 1 ? "rgba(57,216,208,0.88)" : "rgba(105,169,221,0.72)";
        drawingContext.shadowColor =
          index === 1 ? "rgba(57,216,208,0.38)" : "rgba(105,169,221,0.28)";
        drawingContext.shadowBlur = 10;
        drawingContext.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        drawingContext.fill();
        drawingContext.restore();
      });

      drawingContext.save();
      drawingContext.strokeStyle = "rgba(105,169,221,0.10)";
      drawingContext.lineWidth = 1;
      drawingContext.beginPath();
      drawingContext.moveTo(width * 0.62, height * 0.56);
      drawingContext.lineTo(width * 0.78, height * 0.44);
      drawingContext.lineTo(width * 0.88, height * 0.3);
      drawingContext.stroke();
      drawingContext.restore();
    }

    function drawSatellite(route: Route, t: number) {
      const point = quadraticPoint(t, route.p0, route.p1, route.p2);
      const tangent = quadraticTangent(t, route.p0, route.p1, route.p2);
      const angle = Math.atan2(tangent.y, tangent.x);

      drawingContext.save();
      drawingContext.translate(point.x, point.y);
      drawingContext.rotate(angle);

      const trail = drawingContext.createLinearGradient(-28, 0, 0, 0);
      trail.addColorStop(0, "rgba(244,247,251,0)");
      trail.addColorStop(1, "rgba(244,247,251,0.22)");
      drawingContext.strokeStyle = trail;
      drawingContext.lineWidth = 1;
      drawingContext.beginPath();
      drawingContext.moveTo(-24, 0);
      drawingContext.lineTo(-5, 0);
      drawingContext.stroke();

      drawingContext.fillStyle = "rgba(57,216,208,0.92)";
      drawingContext.shadowColor = "rgba(57,216,208,0.42)";
      drawingContext.shadowBlur = 10;
      drawingContext.fillRect(-3.5, -2.5, 7, 5);

      drawingContext.shadowBlur = 0;
      drawingContext.fillStyle = "rgba(105,169,221,0.78)";
      drawingContext.fillRect(-12, -1.8, 7, 3.6);
      drawingContext.fillRect(5, -1.8, 7, 3.6);

      drawingContext.strokeStyle = "rgba(244,247,251,0.34)";
      drawingContext.lineWidth = 0.8;
      drawingContext.beginPath();
      drawingContext.moveTo(-5, 0);
      drawingContext.lineTo(-12, 0);
      drawingContext.moveTo(5, 0);
      drawingContext.lineTo(12, 0);
      drawingContext.stroke();

      drawingContext.restore();
    }

    function maybeSwitchRoute(time: number, routes: Route[]) {
      if (time - lastRouteSwitch < 3200) {
        return;
      }

      lastRouteSwitch = time;

      let nextIndex = activeRouteIndex;
      while (nextIndex === activeRouteIndex && routes.length > 1) {
        nextIndex = Math.floor(Math.random() * routes.length);
      }

      activeRouteIndex = nextIndex;
      direction = Math.random() > 0.5 ? 1 : -1;
      routeProgress = direction === 1 ? 0.08 : 0.92;
    }

    function draw(time = 0) {
      drawingContext.clearRect(0, 0, width, height);

      drawBackground();
      drawStars(time);

      const routes = getRoutes();
      drawRoutes(routes);
      drawNodes();

      if (reducedMotion) {
        drawSatellite(routes[1], 0.34);
      } else {
        maybeSwitchRoute(time, routes);
        routeProgress += 0.00135 * direction;

        if (routeProgress >= 0.94) {
          routeProgress = 0.94;
          direction = -1;
        }

        if (routeProgress <= 0.06) {
          routeProgress = 0.06;
          direction = 1;
        }

        drawSatellite(routes[activeRouteIndex], routeProgress);
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
