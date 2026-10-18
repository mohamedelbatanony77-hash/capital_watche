/* 06-hero3d - Hero: the 3D watch (Three.js), exploded view and customizer hooks */

let intro = () => {
};
(function() {
  const c = $("#gl");
  let R;
  try {
    if (typeof THREE == "undefined") throw 0;
    R = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true });
  } catch (e) {
    document.body.classList.add("nogl");
    return;
  }
  R.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  R.outputEncoding = THREE.sRGBEncoding;
  R.toneMapping = THREE.ACESFilmicToneMapping;
  R.toneMappingExposure = 1.2;
  const S = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  cam.position.set(0, 0, 10.5);
  const E = new THREE.Scene();
  E.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: 1380876, side: THREE.BackSide })));
  [[0, 8, 4, 12, 3, 16773590, 3.2], [-9, 1, 3, 3, 9, 16767392, 2.6], [9, -1, 2, 3, 8, 16777215, 1.8], [0, -8, 5, 12, 2, 13214812, 1.4]].forEach(([x, y, z, w, h, col, k2]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(k2), side: THREE.DoubleSide }));
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    E.add(m);
  });
  S.environment = new THREE.PMREMGenerator(R).fromScene(E, 0.03).texture;
  const gold = new THREE.MeshStandardMaterial({ color: 14201702, metalness: 1, roughness: 0.2 }), lea = new THREE.MeshStandardMaterial({ color: 1381394, roughness: 0.55, metalness: 0 });
  const tex = new THREE.TextureLoader().load("assets/dial.jpg");
  tex.encoding = THREE.sRGBEncoding;
  tex.anisotropy = 8;
  const O = new THREE.Group(), W = new THREE.Group();
  S.add(O);
  O.add(W);
  const add = (g, m, p = [0, 0, 0], r = [0, 0, 0], par = W) => {
    const o = new THREE.Mesh(g, m);
    o.position.set(...p);
    o.rotation.set(...r);
    par.add(o);
    return o;
  }, X = Math.PI / 2;
  add(new THREE.CylinderGeometry(1.04, 1.04, 0.32, 96), gold, [0, 0, 0], [X, 0, 0]);
  add(new THREE.TorusGeometry(0.99, 0.075, 24, 128), gold, [0, 0, 0.16]);
  add(new THREE.CircleGeometry(0.93, 96), new THREE.MeshStandardMaterial({ map: tex, metalness: 0.35, roughness: 0.5 }), [0, 0, 0.172]);
  add(new THREE.CircleGeometry(0.93, 96), new THREE.MeshStandardMaterial({ color: 16777215, transparent: true, opacity: 0.1, roughness: 0, metalness: 0 }), [0, 0, 0.215]);
  add(new THREE.CylinderGeometry(0.1, 0.1, 0.22, 32), gold, [1.1, 0, 0], [0, 0, X]);
  [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([sx, sy]) => add(new THREE.BoxGeometry(0.2, 0.55, 0.3), gold, [sx * 0.6, sy * 1, -0.01]));
  // Curved leather strap with stitched edges, buckle holes and a gold buckle.
  // sign: +1 = top strap (buckle side), -1 = bottom strap (hole side); reach: arc length in radians.
  const buildStrap = (sign, reach) => {
    const group = new THREE.Group();
    const HALF_W = 0.5, HALF_T = 0.055, RADIUS = 1.9, SEG = 28;
    lea.side = THREE.DoubleSide;

    // Centre line, tangents and outward normals along the strap
    const pts = [];
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * reach;
      pts.push(new THREE.Vector3(0, sign * (1.05 + RADIUS * Math.sin(a)), -0.02 - RADIUS * (1 - Math.cos(a)) * 0.55));
    }
    const tan = pts.map((_, i) => pts[Math.min(i + 1, SEG)].clone().sub(pts[Math.max(i - 1, 0)]).normalize());
    const nrm = tan.map((v) => new THREE.Vector3(0, -v.z, v.y).multiplyScalar(sign));

    // The band: four vertices per ring (outer left, outer right, inner right, inner left)
    const pos = [], idx = [];
    pts.forEach((c, i) => {
      [[-HALF_W, 1], [HALF_W, 1], [HALF_W, -1], [-HALF_W, -1]].forEach(([x, s]) => {
        pos.push(x, c.y + nrm[i].y * HALF_T * s, c.z + nrm[i].z * HALF_T * s);
      });
    });
    for (let i = 0; i < SEG; i++) {
      const a = i * 4, b = a + 4;
      for (let k = 0; k < 4; k++) {
        const k2 = (k + 1) % 4;
        if (sign > 0) idx.push(a + k, a + k2, b + k, a + k2, b + k2, b + k);
        else idx.push(a + k, b + k, a + k2, a + k2, b + k, b + k2);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    group.add(new THREE.Mesh(geo, lea));

    // Stitching: a dashed line near each edge
    [-1, 1].forEach((sx) => {
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts.map((c, i) => new THREE.Vector3(sx * (HALF_W - 0.07), c.y + nrm[i].y * (HALF_T + 0.004), c.z + nrm[i].z * (HALF_T + 0.004)))),
        new THREE.LineDashedMaterial({ color: 0xcdbf9c, dashSize: 0.05, gapSize: 0.035 })
      );
      line.computeLineDistances();
      group.add(line);
    });

    if (sign < 0) {
      // Buckle holes on the long strap
      [0.45, 0.6, 0.75].forEach((f) => {
        const i = Math.round(f * SEG);
        const hole = new THREE.Mesh(new THREE.CircleGeometry(0.035, 16), new THREE.MeshBasicMaterial({ color: 0x050505 }));
        hole.position.copy(pts[i]).addScaledVector(nrm[i], HALF_T + 0.003);
        hole.lookAt(hole.position.clone().add(nrm[i]));
        group.add(hole);
      });
    } else {
      // Gold buckle frame at the end of the short strap
      const shape = new THREE.Shape();
      shape.moveTo(-0.58, -0.18); shape.lineTo(0.58, -0.18); shape.lineTo(0.58, 0.18); shape.lineTo(-0.58, 0.18); shape.lineTo(-0.58, -0.18);
      const opening = new THREE.Path();
      opening.moveTo(-0.46, -0.1); opening.lineTo(-0.46, 0.1); opening.lineTo(0.46, 0.1); opening.lineTo(0.46, -0.1); opening.lineTo(-0.46, -0.1);
      shape.holes.push(opening);
      const buckle = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false }), gold);
      buckle.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(1, 0, 0), tan[SEG], nrm[SEG]));
      buckle.position.copy(pts[SEG]).addScaledVector(nrm[SEG], HALF_T - 0.01);
      group.add(buckle);
    }
    return group;
  };
  [1, -1].forEach((s) => W.add(buildStrap(s, s > 0 ? 0.85 : 1.1)));
  const hand = (w, l, tail, k2) => {
    const g = new THREE.Group(), b = new THREE.BoxGeometry(w, l + tail, 0.018);
    b.translate(0, (l - tail) / 2, 0);
    const m = new THREE.Mesh(b, k2 || gold);
    g.add(m);
    g.position.z = 0.235;
    W.add(g);
    return g;
  };
  const hh = hand(0.075, 0.5, 0.08), mh = hand(0.055, 0.78, 0.1), sh = hand(0.016, 0.86, 0.2);
  add(new THREE.CylinderGeometry(0.06, 0.06, 0.06, 24), gold, [0, 0, 0.26], [X, 0, 0]);
  const N = 150, pa = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i++) pa[i] = (Math.random() - 0.5) * (i % 3 == 2 ? 6 : 12);
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pa, 3));
  const dust = new THREE.Points(pg, new THREE.PointsMaterial({ color: 15124871, size: 0.035, transparent: true, opacity: 0.65, depthWrite: false }));
  S.add(dust);
  const k = new THREE.DirectionalLight(16769712, 1.6);
  k.position.set(4, 5, 7);
  S.add(k);
  const rim = new THREE.DirectionalLight(13214812, 1.4);
  rim.position.set(-6, 2, -4);
  S.add(rim);
  S.add(new THREE.AmbientLight(16777215, 0.15));
  const sz = () => {
    const w = c.clientWidth, h = c.clientHeight;
    R.setSize(w, h, false);
    cam.aspect = w / h;
    cam.position.z = w / h < 0.8 ? 14 : 10.5;
    cam.updateProjectionMatrix();
  };
  sz();
  addEventListener("resize", sz);
  let tx = 0, ty = 0, on = true;
  addEventListener("pointermove", (e) => {
    tx = (e.clientX / innerWidth - 0.5) * 2;
    ty = (e.clientY / innerHeight - 0.5) * 2;
  });
  new IntersectionObserver(([e]) => on = e.isIntersecting).observe($(".hero"));
  W.rotation.y = RM ? 0 : Math.PI * 2.5;
  W.scale.setScalar(RM ? 1 : 0.4);
  W.visible = true;
  intro = () => {
    if (RM) return;
    gsap.to(W.rotation, { y: 0, duration: 2.6, ease: "power4.out" });
    gsap.to(W.scale, { x: 1, y: 1, z: 1, duration: 2.2, ease: "power3.out" });
  };
  O.position.x = 0.2;
  const TAU = Math.PI * 2;
  const base = W.children.map((o) => o.position.clone()), EX = [[0, 0, -0.2], [0, 0, 0.3], [0, 0, 0.08], [0, 0, 0.8], [0.5, 0, 0], [-0.2, 0.3, 0], [0.2, 0.3, 0], [-0.2, -0.3, 0], [0.2, -0.3, 0], [0, 0.55, -0.1], [0, -0.55, -0.1], [0, 0, 0.5], [0, 0, 0.6], [0, 0, 0.7], [0, 0, 0.55]];
  let ex = 0, exs = 0;
  window.wtc = { ex: (v) => ex = v };
  let pr = 0, fr = 0, ft = 0, lt = 0;
  (function loop(t) {
    requestAnimationFrame(loop);
    if (!on || document.hidden) {
      pr = 0;
      return;
    }
    const dr = pr ? t - pr : 0;
    pr = t;
    if (fr < 90) {
      if (dr) {
        ft += dr;
        if (++fr == 90 && ft / 90 > 26) {
          document.body.classList.add("lite");
          R.setPixelRatio(1);
          sz();
        }
      }
    } else if (t - lt < 32) return;
    lt = t;
    t *= 1e-3;
    O.rotation.y += ((RM ? 0 : tx * 0.6) - 0.25 + Math.min(scrollY, innerHeight) * 25e-4 - O.rotation.y) * 0.06;
    O.rotation.x += ((RM ? 0 : ty * 0.35) + 0.12 - O.rotation.x) * 0.06;
    O.position.y = RM ? 0 : Math.sin(t * 0.9) * 0.09;
    dust.rotation.y = t * 0.03;
    dust.position.y = Math.sin(t * 0.4) * 0.2;
    const d = /* @__PURE__ */ new Date(), s = d.getSeconds() + d.getMilliseconds() / 1e3, m = d.getMinutes() + s / 60, h = d.getHours() % 12 + m / 60;
    sh.rotation.z = -s / 60 * TAU;
    mh.rotation.z = -m / 60 * TAU;
    hh.rotation.z = -h / 12 * TAU;
    exs += (ex - exs) * 0.1;
    W.children.forEach((o, i) => {
      const e = EX[i];
      if (e) o.position.set(base[i].x + e[0] * exs * 2.2, base[i].y + e[1] * exs * 2.2, base[i].z + e[2] * exs * 2.2);
    });
    R.render(S, cam);
  })(0);
})();
