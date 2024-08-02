//On Ice


export const vertexShader = `
  varying vec2 vUv;
  varying float vAffine;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = length(mvPosition);
    float affine = dist + (mvPosition.w * 8.0) / dist * 0.5;
    vUv = uv * affine;
    vAffine = affine;

    vec2 resolution = vec2(320.0, 240.0);
    vec4 pos = projectionMatrix * mvPosition;
    pos.xyz /= pos.w;
    pos.xy = floor(resolution * pos.xy) / resolution;
    pos.xyz *= pos.w;

    gl_Position = pos;
  }
`;

export const fragmentShader = `
  uniform sampler2D map;
  varying vec2 vUv;
  varying float vAffine;

  void main() {
    vec2 uv = vUv / vAffine;
    vec4 color = texture2D(map, uv);
    gl_FragColor = color;
  }
`;
