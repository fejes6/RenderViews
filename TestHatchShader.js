THREE.TestHatchShader = {
    uniforms: {
        "tDiffuse": { type: "t", value: null }
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
    "void main()",
    "{",
        "float lum = length(texture2D(tDiffuse, vUv).rgb);",
         
    
        "gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);",
         
        "if (lum < 1.60) {",
            "if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {",
                "gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
            "}",
        "}",
         
        "if (lum < 1.10) {",
            "if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {",
                "gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
            "}",
        "}",
         
        "if (lum < 0.85) {",
            "if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {",
                "gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
            "}",
        "}",
         
        "if (lum < 0.65) {",
            "if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {",
                "gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
            "}",
    "}",
"}"
    ].join("\n")
};
