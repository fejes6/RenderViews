/*
THREE.TestHatchShader = {
    uniforms: {
        "tDiffuse": { type: "t", value: null },
        "hatch0": { type: "t", value: THREE.ImageUtils.loadTexture( "https://rawgit.com/fejes6/RenderViews/master/hatch_0.jpg" ) },
        "hatch1": { type: "t", value: THREE.ImageUtils.loadTexture( "https://rawgit.com/fejes6/RenderViews/master/hatch_1.jpg" ) },
        "hatch2": { type: "t", value: THREE.ImageUtils.loadTexture( "https://rawgit.com/fejes6/RenderViews/master/hatch_2.jpg" ) },
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
    
    
    //uniform sampler2D bakedshadow;
    "uniform sampler2D hatch0;",
    "uniform sampler2D hatch1;",
    "uniform sampler2D hatch2;",
    
    "float shade(const in float shading, const in vec2 uv) {",
      "float shadingFactor;",
      "float stepSize = 1.0 / 3.0;",
      "float alpha = 0.0;",
      "float scaleWhite = 0.0;",
      "float scaleHatch0 = 0.0;",
      "float scaleHatch1 = 0.0;",
      "float scaleHatch2 = 0.0;",
      "if (shading <= stepSize) {",
        "alpha = 3.0 * shading;",
        "scaleHatch1 = alpha;",
        "scaleHatch2 = 1.0 - alpha;",
      "}",
      "else if (shading > stepSize && shading <= 2.0 * stepSize) {",
        "alpha = 3.0 * (shading - stepSize);",
        "scaleHatch0 = alpha;",
        "scaleHatch1 = 1.0 - alpha;",
      "}",
      "else if (shading > 2.0 * stepSize) {",
        "alpha = 3.0 * (shading - stepSize * 2.0);",
        "scaleWhite = alpha;",
        "scaleHatch0 = 1.0 - alpha;",
      "}",
      "shadingFactor = scaleWhite + ",
        "scaleHatch0 * texture2D(hatch0, uv).r +",
        "scaleHatch1 * texture2D(hatch1, uv).r +",
        "scaleHatch2 * texture2D(hatch2, uv).r;",
      "return shadingFactor;",
  "}",
  
  "void main() {",
    "vec2 uv = vUv * 15.0;",
    "vec2 uv2 = vUv.yx * 10.0;",
    "float shading = texture2D(tDiffuse, vUv).r + 0.1;",
    "float crossedShading = shade(shading, uv) * shade(shading, uv2) * 0.6 + 0.4;",
    "gl_FragColor = vec4(vec3(crossedShading), 1.0);",
    "}"
    ].join("\n")
};
*/
/*
// sketch filter s pouzitim sobelovho operatora -- ok
THREE.TestHatchShader = {
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
*/
THREE.TestHatchShader = {
    uniforms: {
        "tDiffuse": { type: "t", value: null },
        //"amount":     { type: "f", value: 0.25 }
        "vx_offset":     { type: "f", value: 0.25 }, //nastav
        "rt_w":     { type: "f", value: 512 },
        "rt_h":     { type: "f", value: 512 },
        "hatch_y_offset":     { type: "f", value: 5.0 },
        "lum_threshold_1":     { type: "f", value: 1.0 },
        "lum_threshold_2":     { type: "f", value: 0.7 },
        "lum_threshold_3":     { type: "f", value: 0.5 },
        "lum_threshold_4":     { type: "f", value: 0.3 }
    },
    vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
    ].join("\n"),
    fragmentShader: [
"uniform sampler2D tDiffuse;", // 0
"varying vec2 vUv;",
"void main()",
"{",
    "float lum = length(texture2D(tDiffuse, vUv).rgb);",
     
    "gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);",
     
    "if (lum < 0.95) {",
        "if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {",
            "gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
        "}",
    "}",
     
    "if (lum < 0.85) {",
        "if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {",
            "gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
        "}",
    "}",
     
    "if (lum < 0.60) {",
        "if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {",
            "gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
        "}",
    "}",
     
    "if (lum < 0.45) {",
        "if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {",
            "gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
        "}",
    "}",
"}"
    ].join("\n")
};
