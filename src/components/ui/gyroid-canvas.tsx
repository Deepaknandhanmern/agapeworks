"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Raymarched gyroid, drawn with raw WebGL - no three.js, no r3f, no new
 * dependencies. The whole object is a signed-distance field evaluated in the
 * fragment shader, so there's no mesh to download either: the entire "3D
 * model" is the ~40 lines of GLSL below.
 *
 * The lighting constants here were tuned by porting the same maths to a
 * Python/numpy renderer and looking at still frames, rather than guessed.
 */

// Raymarching cost is per-pixel and linear in step count, so phones get a
// shorter march. MAX_STEPS has to be a compile-time constant in GLSL ES 1.0
// (loop bounds can't be uniforms), hence templating it into the source.
const makeFrag = (maxSteps: number) => `
precision highp float;
#define MAX_STEPS ${maxSteps}

uniform vec2  uRes;
uniform float uTime;

const float SCALE = 3.1;
const float THICK = 0.34;
const vec3  ORANGE = vec3(0.976, 0.451, 0.086);
const vec3  PURPLE = vec3(0.576, 0.200, 0.918);
const vec3  DEEP   = vec3(0.130, 0.040, 0.260);

vec3 rotY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }
vec3 rotX(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }

// Gyroid lattice, clipped to a sphere. abs() on the gyroid turns the
// surface into a shell of THICK thickness; dividing by SCALE keeps it a
// usable distance bound rather than a wildly overestimated one.
float map(vec3 p){
  vec3 q = rotX(rotY(p, uTime * 0.45), 0.62);
  vec3 g = q * SCALE;
  float gy = cos(g.x)*sin(g.y) + cos(g.y)*sin(g.z) + cos(g.z)*sin(g.x);
  float lattice = (abs(gy) - THICK) / SCALE;
  float sphere  = length(q) - 1.25;
  return max(lattice, sphere);
}

vec3 calcNormal(vec3 p){
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    map(p+e.xyy) - map(p-e.xyy),
    map(p+e.yxy) - map(p-e.yxy),
    map(p+e.yyx) - map(p-e.yyx)));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * uRes.y);

  vec3 ro = vec3(0.0, 0.0, 3.6);
  vec3 rd = normalize(vec3(uv, -1.9));

  float t = 0.0;
  bool hit = false;
  for (int i = 0; i < MAX_STEPS; i++){
    vec3 p = ro + rd * t;
    float d = map(p);
    if (d < 0.0012){ hit = true; break; }
    if (t > 8.0) break;
    // Distance bound, not a true field - step conservatively or the
    // march punches straight through the thin lattice walls.
    t += max(d, 0.0) * 0.55;
  }

  if (!hit){ gl_FragColor = vec4(0.0); return; }

  vec3 p = ro + rd * t;
  vec3 n = calcNormal(p);

  vec3 KEY  = normalize(vec3( 0.70,  0.70, 0.40));
  vec3 FILL = normalize(vec3(-0.75, -0.25, 0.40));

  float key  = clamp(dot(n, KEY), 0.0, 1.0);
  float fill = clamp(dot(n, FILL), 0.0, 1.0);
  float fres = pow(clamp(1.0 - abs(dot(n, -rd)), 0.0, 1.0), 2.4);

  float occ = 0.0, sca = 1.0;
  for (int i = 0; i < 5; i++){
    float h = 0.015 + 0.055 * float(i);
    occ += (h - map(p + n * h)) * sca;
    sca *= 0.7;
  }
  float ao = 0.18 + 0.82 * clamp(1.0 - 3.0 * occ, 0.0, 1.0);

  float depth = clamp((t - 2.2) / 2.4, 0.0, 1.0);

  vec3 col = DEEP * (0.35 + 0.9 * fill);
  col += PURPLE * pow(fill, 1.8) * 0.65;
  col += ORANGE * pow(key,  2.2) * 1.45;
  col *= ao;
  col += fres * vec3(0.75, 0.28, 1.0) * 0.8;
  col += pow(key, 55.0) * vec3(1.0, 0.9, 0.78) * 0.65;
  col *= (1.0 - 0.82 * depth);

  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function GyroidCanvas({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    const isSmall = window.matchMedia("(max-width: 768px)").matches;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, makeFrag(isSmall ? 56 : 96));
    const prog = vs && fs ? gl.createProgram() : null;
    if (!vs || !fs || !prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      // Capped DPR - this is a per-pixel raymarch, so 3x on a phone is a
      // straight 9x cost for no visible gain.
      const dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.25 : 2);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    let raf = 0;
    let visible = true;
    const start = performance.now();

    const draw = (now: number) => {
      resize();
      gl.uniform1f(uTime, reduceMotion ? 1.0 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduceMotion && visible) raf = requestAnimationFrame(draw);
    };

    // Don't burn GPU on an object that's scrolled off screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion && !raf) raf = requestAnimationFrame(draw);
      if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas);

    const onResize = () => {
      if (reduceMotion || !visible) draw(performance.now());
    };
    window.addEventListener("resize", onResize);

    raf = requestAnimationFrame(draw);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  if (failed) {
    // WebGL unavailable (old device, blocked context) - a soft brand-gradient
    // orb is a better answer than an empty hole in the layout.
    return (
      <div
        aria-hidden="true"
        className={cn(
          "rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(249,115,22,0.55),rgba(147,51,234,0.45)_45%,transparent_72%)] blur-[2px]",
          className,
        )}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
    />
  );
}
