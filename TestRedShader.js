
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

THREE.TestRedShader = {
    
        
                uniforms: {

                    "tDiffuse": { type: "t", value: null },
                    		"uDirLightPos":	{ type: "v3", value: new THREE.Vector3() },
                    		"uDirLightColor": { type: "c", value: new THREE.Color( 0xeeeeee ) },
                    
                    		"uAmbientLightColor": { type: "c", value: new THREE.Color( 0x050505 ) },
                    
                    		//"uBaseColor":  { type: "c", value: new THREE.Color( 0xeeeeee ) },
                    		"uLineColor1": { type: "c", value: new THREE.Color( 0x808080 ) },
                    		"uLineColor2": { type: "c", value: new THREE.Color( 0x000000 ) },
                    		"uLineColor3": { type: "c", value: new THREE.Color( 0x000000 ) },
                    		"uLineColor4": { type: "c", value: new THREE.Color( 0x000000 ) }
                },

                vertexShader: [

              		"varying vec3 vNormal;",
              		"varying vec2 vUv;",
              
              		"void main() {",
              "vUv = uv;",
              			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
              			"vNormal = normalize( normalMatrix * normal );",
              
              		"}"

                ].join("\n"),

                fragmentShader: [
                 
                 "uniform sampler2D tDiffuse;",

                 		//"uniform vec3 uBaseColor;",
                 		"uniform vec3 uLineColor1;",
                 		"uniform vec3 uLineColor2;",
                 		"uniform vec3 uLineColor3;",
                 		"uniform vec3 uLineColor4;",
                 
                 		"uniform vec3 uDirLightPos;",
                 		"uniform vec3 uDirLightColor;",
                 
                 		"uniform vec3 uAmbientLightColor;",
                 
                 		"varying vec3 vNormal;",
                 		"varying vec2 vUv;",
                 
                 		"void main() {",
                 
                 			"float camera = max( dot( normalize( vNormal ), vec3( 0.0, 0.0, 1.0 ) ), 0.4);",
                 			"float light = max( dot( normalize( vNormal ), uDirLightPos ), 0.0);",
                 			
                 			"vec4 uBaseColor = texture2D(tDiffuse, vUv);",
                 
                 			"gl_FragColor = vec4( uBaseColor.rgb, 1.0 );",
                 
                 			"if ( length(uAmbientLightColor + uDirLightColor * light) < 1.00 ) {",
                 
                 				"gl_FragColor *= vec4( uLineColor1, 1.0 );",
                 
                 			"}",
                 
                 			"if ( length(uAmbientLightColor + uDirLightColor * camera) < 0.50 ) {",
                 
                 				"gl_FragColor *= vec4( uLineColor2, 1.0 );",
                 
                 			"}",
                 
                 		"}"

                ].join("\n")

            

            };

