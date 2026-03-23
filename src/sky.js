import * as THREE from 'three'

export function initSky() {
  const canvas = document.getElementById('sky-canvas')
  if (!canvas) return

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const material = new THREE.ShaderMaterial({
    uniforms: {
      u_time:       { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_colorTop:   { value: new THREE.Color('#6da6d6') },
      u_colorBottom:{ value: new THREE.Color('#f4f6f8') },
    },
    vertexShader: `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_colorTop;
      uniform vec3 u_colorBottom;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(in vec2 st) {
        float value = 0.0;
        float amplitude = .5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(st);
          st *= 2.;
          amplitude *= .5;
        }
        return value;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        vec3 color = mix(u_colorBottom, u_colorTop, st.y);

        vec2 q = vec2(0.);
        q.x = fbm(st + 0.00 * u_time);
        q.y = fbm(st + vec2(1.0));
        vec2 r = vec2(0.);
        r.x = fbm(st + 1.0*q + vec2(1.7,9.2) + 0.05*u_time);
        r.y = fbm(st + 1.0*q + vec2(8.3,2.8) + 0.02*u_time);
        float f = fbm(st + r);

        color = mix(color, vec3(1.0), f * 0.3 * st.y);

        float grain = random(st * (u_time * 0.001 + 1.0));
        grain = (grain - 0.5) * 0.15;
        color += grain;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  })

  const geometry = new THREE.PlaneGeometry(2, 2)
  scene.add(new THREE.Mesh(geometry, material))

  function animate(time) {
    material.uniforms.u_time.value = time * 0.001
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
  })
}
