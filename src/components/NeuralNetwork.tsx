import React, { useRef, useEffect, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NeuralNetworkProps {
  isDark: boolean;
}

interface Node {
  x: number;
  y: number;
  baseRadius: number;
  activation: number;
  pulsePhase: number;
  layer: number;
  index: number;
}

interface Connection {
  from: Node;
  to: Node;
}

interface Signal {
  from: Node;
  to: Node;
  progress: number;   // 0 → 1 along the connection
  startTime: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LAYER_SIZES = [4, 6, 6, 3];
const ACTIVATION_RADIUS = 80;       // px – mouse proximity activation zone
const ACTIVATION_DECAY = 0.985;     // per-frame multiplicative decay
const SIGNAL_SPEED = 0.025;         // progress per frame
const SIGNAL_LAYER_DELAY = 220;     // ms delay between layer propagation
const PULSE_SPEED = 0.025;          // radians per frame for idle pulse
const PULSE_AMPLITUDE = 1;          // ±px on radius

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mutable state kept in refs to avoid re-renders
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef<{ x: number; y: number; inside: boolean }>({
    x: -9999,
    y: -9999,
    inside: false,
  });
  const signalsRef = useRef<Signal[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const isDarkRef = useRef(isDark);

  // Keep isDarkRef in sync without re-running the main effect
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  // -------------------------------------------------------------------
  // Build the node & connection graph based on current canvas dimensions
  // -------------------------------------------------------------------
  const initGraph = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    const connections: Connection[] = [];

    const paddingX = width * 0.15;
    const paddingY = height * 0.1;
    const usableW = width - paddingX * 2;
    const usableH = height - paddingY * 2;
    const layerCount = LAYER_SIZES.length;

    // Build nodes – layers are arranged TOP to BOTTOM
    LAYER_SIZES.forEach((size, layerIdx) => {
      const y = paddingY + (layerIdx / (layerCount - 1)) * usableH;
      for (let i = 0; i < size; i++) {
        const x = paddingX + ((i + 0.5) / size) * usableW;
        nodes.push({
          x,
          y,
          baseRadius: 3 + Math.random() * 2,   // 3-5px
          activation: 0,
          pulsePhase: Math.random() * Math.PI * 2,
          layer: layerIdx,
          index: i,
        });
      }
    });

    // Build connections between adjacent layers
    for (let l = 0; l < layerCount - 1; l++) {
      const fromNodes = nodes.filter((n) => n.layer === l);
      const toNodes = nodes.filter((n) => n.layer === l + 1);
      fromNodes.forEach((from) => {
        toNodes.forEach((to) => {
          connections.push({ from, to });
        });
      });
    }

    nodesRef.current = nodes;
    connectionsRef.current = connections;
    signalsRef.current = [];
  }, []);

  // -------------------------------------------------------------------
  // Signal propagation: activate node, then cascade through layers
  // -------------------------------------------------------------------
  const propagateSignal = useCallback((startNode: Node) => {
    startNode.activation = 1;

    // For each subsequent layer, schedule signals after an increasing delay
    const layersToTraverse = LAYER_SIZES.length - 1 - startNode.layer;
    for (let offset = 0; offset < layersToTraverse; offset++) {
      const sourceLayer = startNode.layer + offset;
      const delay = offset * SIGNAL_LAYER_DELAY;

      setTimeout(() => {
        const sources =
          offset === 0
            ? [startNode]
            : nodesRef.current.filter(
                (n) => n.layer === sourceLayer && n.activation > 0.2
              );

        const targets = nodesRef.current.filter(
          (n) => n.layer === sourceLayer + 1
        );

        sources.forEach((src) => {
          targets.forEach((tgt) => {
            signalsRef.current.push({
              from: src,
              to: tgt,
              progress: 0,
              startTime: performance.now(),
            });
          });
        });
      }, delay);
    }
  }, []);

  // -------------------------------------------------------------------
  // Main effect — canvas setup, event listeners, animation loop
  // -------------------------------------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // ---- Resize handler ------------------------------------------------
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { w, h };
      initGraph(w, h);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    handleResize(); // initial sizing

    // ---- Mouse events --------------------------------------------------
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        inside: true,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current.inside = false;
    };
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Find nearest node
      let nearest: Node | null = null;
      let bestDist = Infinity;
      nodesRef.current.forEach((n) => {
        const d = Math.hypot(n.x - mx, n.y - my);
        if (d < bestDist) {
          bestDist = d;
          nearest = n;
        }
      });

      if (nearest && bestDist < 120) {
        propagateSignal(nearest);
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);

    // ---- Drawing helpers -----------------------------------------------
    const drawConnection = (
      conn: Connection,
      dark: boolean,
      maxActivation: number
    ) => {
      const baseAlpha = dark ? 0.06 : 0.06;
      const activeAlpha = dark ? 0.4 : 0.3;
      const alpha = baseAlpha + maxActivation * (activeAlpha - baseAlpha);

      if (dark) {
        ctx.strokeStyle = `rgba(129,140,248,${alpha})`;
      } else {
        ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
      }
      ctx.lineWidth = 0.8 + maxActivation * 0.6;
      ctx.beginPath();
      ctx.moveTo(conn.from.x, conn.from.y);
      ctx.lineTo(conn.to.x, conn.to.y);
      ctx.stroke();
    };

    const drawNode = (node: Node, dark: boolean) => {
      const pulse =
        Math.sin(node.pulsePhase) * PULSE_AMPLITUDE;
      const radius = node.baseRadius + pulse;
      const act = node.activation;

      // Glow effect for active nodes
      if (act > 0.05) {
        const glowRadius = radius * (1 + act * 2.5);
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          radius * 0.5,
          node.x,
          node.y,
          glowRadius
        );
        if (dark) {
          gradient.addColorStop(0, `rgba(129,140,248,${0.35 * act})`);
          gradient.addColorStop(1, 'rgba(129,140,248,0)');
        } else {
          gradient.addColorStop(0, `rgba(99,102,241,${0.3 * act})`);
          gradient.addColorStop(1, 'rgba(99,102,241,0)');
        }
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Core circle
      const coreAlpha = 0.5 + act * 0.5;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = dark
        ? `rgba(129,140,248,${coreAlpha})`
        : `rgba(99,102,241,${coreAlpha})`;
      ctx.fill();
    };

    const drawSignalDot = (sig: Signal, dark: boolean) => {
      const x = sig.from.x + (sig.to.x - sig.from.x) * sig.progress;
      const y = sig.from.y + (sig.to.y - sig.from.y) * sig.progress;
      const alpha = 1 - sig.progress; // fade as it travels

      // Outer glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
      if (dark) {
        gradient.addColorStop(0, `rgba(165,180,252,${0.8 * alpha})`);
        gradient.addColorStop(1, 'rgba(165,180,252,0)');
      } else {
        gradient.addColorStop(0, `rgba(99,102,241,${0.7 * alpha})`);
        gradient.addColorStop(1, 'rgba(99,102,241,0)');
      }
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Bright core dot
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = dark
        ? `rgba(224,231,255,${alpha})`
        : `rgba(67,56,202,${alpha})`;
      ctx.fill();
    };

    // ---- Animation loop ------------------------------------------------
    const animate = () => {
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const dark = isDarkRef.current;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const connections = connectionsRef.current;
      const signals = signalsRef.current;
      const mouse = mouseRef.current;

      // --- Update node activations --------------------------------------
      nodes.forEach((node) => {
        // Idle pulse
        node.pulsePhase += PULSE_SPEED;

        // Mouse proximity activation
        if (mouse.inside) {
          const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
          if (dist < ACTIVATION_RADIUS) {
            const proxAct = 1 - dist / ACTIVATION_RADIUS;
            node.activation = Math.max(node.activation, proxAct);
          }
        }

        // Decay activation
        node.activation *= ACTIVATION_DECAY;
        if (node.activation < 0.01) node.activation = 0;
      });

      // --- Update signals -----------------------------------------------
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        sig.progress += SIGNAL_SPEED;

        // When signal reaches target, activate the target node
        if (sig.progress >= 1) {
          sig.to.activation = Math.max(sig.to.activation, 0.9);
          signals.splice(i, 1);
        }
      }

      // --- Draw connections (behind everything) -------------------------
      connections.forEach((conn) => {
        const maxAct = Math.max(conn.from.activation, conn.to.activation);
        drawConnection(conn, dark, maxAct);
      });

      // --- Draw signal dots on connections ------------------------------
      signals.forEach((sig) => {
        drawSignalDot(sig, dark);
      });

      // --- Draw nodes (on top) ------------------------------------------
      nodes.forEach((node) => {
        drawNode(node, dark);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // ---- Cleanup -------------------------------------------------------
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, [initGraph, propagateSignal]);

  // -------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
};

export default NeuralNetwork;
