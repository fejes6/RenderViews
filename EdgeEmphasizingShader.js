THREE.EdgeEmphasizingShader = {
    uniforms: {
        "tDiffuse": { type: "t", value: null },
        "intensity": {  type: "f", value: 1.0 },
        "imageWidthFactor": {  type: "f", value: 512.0 },
        "imageHeightFactor": {  type: "f", value: 512.0 },
        //"amount":     { type: "f", value: 0.25 }
    },
    vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
    ].join("\n"),
    
    fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "varying vec2 vUv;",
//varying highp vec2 textureCoordinate;
// uniform sampler2D inputImageTexture;
 "uniform float intensity;",
 "uniform float imageWidthFactor;",
 "uniform float imageHeightFactor;",
 "const  vec3 W = vec3(0.2125, 0.7154, 0.0721);",
 "void main()",
 "{",
     "vec3 textureColor = texture2D(tDiffuse, vUv).rgb;",
     "vec2 stp0 = vec2(1.0 / imageWidthFactor, 0.0);",
     "vec2 st0p = vec2(0.0, 1.0 / imageHeightFactor);",
     "vec2 stpp = vec2(1.0 / imageWidthFactor, 1.0 / imageHeightFactor);",
     "vec2 stpm = vec2(1.0 / imageWidthFactor, -1.0 / imageHeightFactor);",
     "float i00   = dot( textureColor, W);",
     "float im1m1 = dot( texture2D(tDiffuse, vUv - stpp).rgb, W);",
     "float ip1p1 = dot( texture2D(tDiffuse, vUv + stpp).rgb, W);",
     "float im1p1 = dot( texture2D(tDiffuse, vUv - stpm).rgb, W);",
     "float ip1m1 = dot( texture2D(tDiffuse, vUv + stpm).rgb, W);",
     "float im10 = dot( texture2D(tDiffuse, vUv - stp0).rgb, W);",
     "float ip10 = dot( texture2D(tDiffuse, vUv + stp0).rgb, W);",
     "float i0m1 = dot( texture2D(tDiffuse, vUv - st0p).rgb, W);",
     "float i0p1 = dot( texture2D(tDiffuse, vUv + st0p).rgb, W);",
     "float h = -im1p1 - 2.0 * i0p1 - ip1p1 + im1m1 + 2.0 * i0m1 + ip1m1;",
     "float v = -im1m1 - 2.0 * im10 - im1p1 + ip1m1 + 2.0 * ip10 + ip1p1;",
     "float mag = 1.0 - length(vec2(h, v));",
     "vec3 target = vec3(mag);",
    "gl_FragColor = vec4(mix(textureColor, target, intensity), 1.0);",
 
    "}"
    ].join("\n")
};
