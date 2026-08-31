/* =====================================================================
 * bg.js —— 氛围层：Three.js 粒子场 + 3D Orb
 *
 * 定位：只做「空间感」，不做主角。
 *   · 极低对比度，任何时刻都不干扰正文阅读
 *   · 视口外 / 标签页隐藏时暂停渲染，不空耗 GPU
 *   · prefers-reduced-motion 下完全不启动
 *   · 指针视差幅度极小（< 1.2°），保持克制
 * ===================================================================== */
import * as THREE from '../vendor/three.module.min.js';

const canvas = document.getElementById('bg-canvas');
const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!canvas || reduced) {
  if (canvas) canvas.style.display = 'none';
} else {
  boot();
}

function boot() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
  } catch (err) {
    canvas.style.display = 'none';
    return;
  }

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(DPR);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  /* ---------------- 粒子场 ---------------- */

  const sprite = makeSprite();

  /**
   * 一团粒子云。分成「底色云」与「强调云」两层：
   * PointsMaterial 不支持逐点尺寸（需自定义 shader），
   * 因此用两层不同 size 的 Points 来获得尺寸层次。
   */
  function makeCloud(count, opts) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const drift = new Float32Array(count * 3);
    const c = new THREE.Color(opts.color);

    for (let i = 0; i < count; i++) {
      // 扁平球壳分布，纵深更自然
      const r = 6 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.7 - 8;

      const k = opts.min + Math.random() * (opts.max - opts.min);
      colors[i * 3] = c.r * k;
      colors[i * 3 + 1] = c.g * k;
      colors[i * 3 + 2] = c.b * k;

      drift[i * 3] = (Math.random() - 0.5) * 0.0022;
      drift[i * 3 + 1] = (Math.random() - 0.5) * 0.0016;
      drift[i * 3 + 2] = (Math.random() - 0.5) * 0.0012;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: opts.size,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: opts.opacity,
      depthWrite: false,
      // 浅色背景必须用正常混合：加色混合只会把粒子"加白"，在浅底上会直接消失
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
    });

    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    return { points: pts, geo: geo, drift: drift, count: count };
  }

  // 浅色模式：用偏深的颜色 + 低不透明度，读作"柔和尘粒"而不是发光点
  const baseCloud = makeCloud(900, {
    color: '#64748b', size: 0.055, opacity: 0.5, min: 0.3, max: 0.62,
  });
  const accentCloud = makeCloud(150, {
    color: '#0b6fe8', size: 0.08, opacity: 0.55, min: 0.5, max: 0.85,
  });

  const clouds = [baseCloud, accentCloud];

  /* ---------------- Orb（线框二十面体） ---------------- */

  const orbGeo = new THREE.IcosahedronGeometry(2.6, 1);
  const orbMat = new THREE.LineBasicMaterial({
    color: 0x0b6fe8,
    transparent: true,
    opacity: 0.14,
  });
  const orb = new THREE.LineSegments(new THREE.WireframeGeometry(orbGeo), orbMat);
  orb.position.set(4.6, 0.8, -6);
  scene.add(orb);

  const orbInner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.15, 0),
    new THREE.MeshBasicMaterial({ color: 0x0b6fe8, transparent: true, opacity: 0.05 })
  );
  orbInner.position.copy(orb.position);
  scene.add(orbInner);

  function makeSprite() {
    const s = 64;
    const c = document.createElement('canvas');
    c.width = s;
    c.height = s;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  /* ---------------- 尺寸 / 视差 ---------------- */

  let w = 0;
  let h = 0;
  function resize() {
    const nw = window.innerWidth;
    const nh = window.innerHeight;
    if (nw === w && nh === h) return;
    w = nw;
    h = nh;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    // 窄屏时把 orb 移开，避免压在正文上
    const narrow = w < 900;
    orb.position.x = narrow ? 0 : 4.6;
    orb.position.y = narrow ? 3.4 : 0.8;
    orbInner.position.copy(orb.position);
    orb.visible = !narrow;
    orbInner.visible = !narrow;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  /* ---------------- 渲染循环（可暂停） ---------------- */

  let visible = true;
  let running = true;
  let rafId = 0;

  try {
    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true;
    }, { threshold: 0 });
    io.observe(canvas);
  } catch (e) {
    visible = true;
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (visible) start();
  });

  const clock = new THREE.Clock();

  function frame() {
    rafId = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();

    // 指针视差：极小幅度，仅提供空间感
    pointer.x += (target.x - pointer.x) * 0.035;
    pointer.y += (target.y - pointer.y) * 0.035;
    camera.position.x = pointer.x * 0.42;
    camera.position.y = -pointer.y * 0.28;
    camera.lookAt(0, 0, 0);

    // 粒子缓慢漂移 + 整体自转
    for (let c = 0; c < clouds.length; c++) {
      const cloud = clouds[c];
      const pos = cloud.geo.attributes.position.array;
      const drift = cloud.drift;
      for (let i = 0; i < cloud.count; i++) {
        pos[i * 3] += drift[i * 3];
        pos[i * 3 + 1] += drift[i * 3 + 1];
        pos[i * 3 + 2] += drift[i * 3 + 2];
        // 越界回收
        if (pos[i * 3] > 20) pos[i * 3] = -20;
        else if (pos[i * 3] < -20) pos[i * 3] = 20;
        if (pos[i * 3 + 1] > 11) pos[i * 3 + 1] = -11;
        else if (pos[i * 3 + 1] < -11) pos[i * 3 + 1] = 11;
      }
      cloud.geo.attributes.position.needsUpdate = true;
      cloud.points.rotation.y = t * (c === 0 ? 0.012 : 0.016);
      cloud.points.rotation.x = Math.sin(t * 0.06) * 0.02;
    }

    orb.rotation.y = t * 0.055;
    orb.rotation.x = Math.sin(t * 0.14) * 0.13;
    orbInner.rotation.y = -t * 0.04;
    orbInner.rotation.z = t * 0.02;

    // 呼吸：透明度极缓慢起伏，给静态页面一点"活气"
    orbMat.opacity = 0.115 + Math.sin(t * 0.35) * 0.045;

    renderer.render(scene, camera);
  }

  function start() {
    if (running) return;
    running = true;
    clock.start();
    frame();
  }
  function stop() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(rafId);
  }

  frame();

  // 上下文丢失保护
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    stop();
  });
  canvas.addEventListener('webglcontextrestored', () => {
    start();
  });
}
