
/**
 * Super Simple Brightness Shader
 * Adjust brightness of image with an 'amount' Uniform
 * @author felixturner / http://airtight.cc/
 */
/*
 THREE.TestRedShader = {

    uniforms: {
        "tDiffuse": { type: "t", value: null },
        "amount":     { type: "f", value: 0.25 }
    },

    vertexShader: [

    "varying vec2 vUv;",
    "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

    ].join("\n"),

    fragmentShader: [
    //"#extension GL_OES_standard_derivatives : enable",

    "uniform sampler2D tDiffuse;",
    "uniform float amount;",
    "varying vec2 vUv;",

    "void main() {",

        "vec4 color = texture2D(tDiffuse, vUv);",
        "gl_FragColor = color*amount;",

    "}"


    ].join("\n")

};
*/


/*
THREE.SepiaShader = {

    uniforms: {

        "tDiffuse": { type: "t", value: null },
        "amount":   { type: "f", value: 1.0 }

    },

    vertexShader: [

        "varying vec2 vUv;",

        "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"

    ].join("\n"),

    fragmentShader: [

        "uniform float amount;",

        "uniform sampler2D tDiffuse;",

        "varying vec2 vUv;",

        "void main() {",

            "vec4 color = texture2D( tDiffuse, vUv );",
            "vec3 c = color.rgb;",

            "color.r = dot( c, vec3( 1.0 - 0.607 * amount, 0.769 * amount, 0.189 * amount ) );",
            "color.g = dot( c, vec3( 0.349 * amount, 1.0 - 0.314 * amount, 0.168 * amount ) );",
            "color.b = dot( c, vec3( 0.272 * amount, 0.534 * amount, 1.0 - 0.869 * amount ) );",

            "gl_FragColor = vec4( min( vec3( 1.0 ), color.rgb ), color.a );",

        "}"

    ].join("\n")

};
*/
/*
// normalize by malo ist
// toon shader bez erroru ale iba cierna obrazovka
THREE.TestRedShader = {
    
        
                uniforms: {

                    "tDiffuse": { type: "t", value: null },
                    "uDirLightPos":    { type: "v3", value: new THREE.Vector3() },
                    //"uDirLightColor": { type: "c", value: new THREE.Color( 0xff1fff ) },

                    "uMaterialColor":  { type: "c", value: new THREE.Color( 0xffffff ) },

                    uKd: {
                        type: "f",
                        value: 0.7
                    },
                    uBorder: {
                        type: "f",
                        value: 0.4
                    }
                },

                vertexShader: [

                    "varying vec3 vNormal;",
                    "varying vec3 vViewPosition;",
                    "varying vec2 vUv;",

                    "void main() {",
    
                        "vUv = uv;",
                        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
                        "vNormal = normalize( normalMatrix * normal );",
                        "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
                        "vViewPosition = -mvPosition.xyz;",

                    "}"

                ].join("\n"),

                fragmentShader: [

                    "uniform sampler2D tDiffuse;",
                    
                    "uniform vec3 uMaterialColor;",

                    "uniform vec3 uDirLightPos;",
                    "uniform vec3 uDirLightColor;",

                    "uniform float uKd;",
                    "uniform float uBorder;",

                    "varying vec3 vNormal;",
                    "varying vec3 vViewPosition;",
                    "varying vec2 vUv;",

                    "void main() {",

                        // compute direction to light
                        "vec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );",
                        "vec3 lVector = normalize( lDirection.xyz );",

                        // diffuse: N * L. Normal must be normalized, since it's interpolated.
                        "vec3 normal = normalize( vNormal );",
                        // Student: test diffuse vs. uBorder and adjust accordingly
                        "float diffuse = max( dot( normal, lVector ), 0.0);",
                        "vec4 uMaterialColor = texture2D(tDiffuse, vUv);",

                        "gl_FragColor = vec4( uKd * uMaterialColor.rgb * uDirLightColor * diffuse, 1.0 );",

                    "}"

                ].join("\n")

            

            };
*/
/*
//bez erroru ale cele sede
THREE.TestRedShader = {
    
        
                uniforms: {

                      "tDiffuse": { type: "t", value: null },
                      "lightpos": {type: "v3", value: new THREE.Vector3(0,30,20) },
                },

                vertexShader: [


              		"varying vec2 vUv;",
              

              
                  "varying vec3 lightdir;",
                  "varying vec3 eyenorm;",
                  "uniform vec3 lightpos;",
                  "void main() {",
                  "vUv = uv;",
                  "gl_Position = projectionMatrix* modelViewMatrix * vec4( position, 1.0);",
                  
                  "vec4 tmp = modelViewMatrix * vec4 (lightpos, 1.0);",
                  "lightdir = tmp.xyz;",
                  
                  "eyenorm = normalMatrix * normal;",
                  "}"

                ].join("\n"),

                fragmentShader: [
                 
                 "uniform sampler2D tDiffuse;",

                 "varying vec2 vUv;",
                 
                 			
                 
                    "varying vec3 lightdir;",
                    "varying vec3 eyenorm;",
                    
                    "void main() {",
                    "vec4 color = texture2D(tDiffuse, vUv);",
                           //vec3 lightdir = vec3 (1,1,2);
                    "float ndotl = dot (normalize (eyenorm), normalize (lightdir));",
                    "if (ndotl > 0.8) {",
                    "ndotl = 1.0;",
                    "} else if (ndotl > 0.6) {",
                    "ndotl = 0.6;",
                    "} else {",
                    "ndotl = 0.2;",
                    "}",
                    "gl_FragColor = vec4 (ndotl*color.r, ndotl*color.g, ndotl*color.b, 1.0*color.a);",
                    //"gl_FragColor = vec4 (ndotl, ndotl, ndotl, 1.0) * color;",
                    //"gl_FragColor = vec4 (ndotl, ndotl, ndotl, 1.0);",
                    "}"

                ].join("\n")

            

            };
*/
THREE.TestRedShader = {
   uniforms: {

        "tDiffuse": {type: "t", value: null},
        "rPower": {type: "f", value: 0.2126},
        "gPower": {type: "f", value: 0.7152},
        "bPower": {type: "f", value: 0.0722}

    },

    // 0.2126 R + 0.7152 G + 0.0722 B
    // vertexshader is always the same for postprocessing steps
    vertexShader: [

        "varying vec2 vUv;",

        "void main() {",

        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"

    ].join("\n"),

    fragmentShader: [

        // pass in our custom uniforms
        "uniform float rPower;",
        "uniform float gPower;",
        "uniform float bPower;",

        // pass in the image/texture we'll be modifying
        "uniform sampler2D tDiffuse;",

        // used to determine the correct texel we're working on
        "varying vec2 vUv;",

        // executed, in parallel, for each pixel
        "void main() {",

        // get the pixel from the texture we're working with (called a texel)
        "vec4 texel = texture2D( tDiffuse, vUv );",

        // calculate the new color
        "float gray = texel.r*rPower + texel.g*gPower + texel.b*bPower;",

        // return this new color
        "gl_FragColor = vec4( vec3(gray), texel.w );",

        "}"

    ].join("\n")

};
