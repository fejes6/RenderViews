
/**
 * Super Simple Brightness Shader
 * Adjust brightness of image with an 'amount' Uniform
 * @author felixturner / http://airtight.cc/
 */
/*
 THREE.TestRedShader = {

    uniforms: {
        "tDiffuse": { type: "t", value: null },
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
    //"#extension GL_OES_standard_derivatives : enable",

    "uniform sampler2D tDiffuse;",
    //"uniform float amount;",
    "varying vec2 vUv;",

    "void main() {",

        "vec4 color = texture2D(tDiffuse, vUv);",
        "gl_FragColor = vec4(0.0, color.g, 0.0, 0.3);",
        //"gl_FragColor = vec4(color.r*amount, color.g*amount, color.b*amount, 1.0);",

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

//x ray shader - nefunkcny, vsetko je modre
THREE.TestRedShader = {

uniforms: {

		"tDiffuse": { type: "t", value: null },
		//"glowColor": { type: "c", value: new THREE.Color(0x84ccff) },
		//"p": { type: "f", value: 2 },
		"c": { type: "f", value: 1.0 },
	"p": { type: "f", value: 3 },
	"glowColor": { type: "c", value: new THREE.Color(0x84ccff) },
	"viewVector": { type: "v3", value: new THREE.Vector3(20,30,0.76) }
	},

	vertexShader: [
		"uniform vec3 viewVector;",
		"uniform float c;",

		

	

		"varying vec2 vUv;",
	        "uniform float p;",
	        "varying float intensity;",
	        "void main(){",
	            "vUv = uv;",
"vec3 vNormal = normalize( normalMatrix * normal );",
"vec3 vNormel = normalize( normalMatrix * viewVector );",
"intensity = pow( abs(c - dot(vNormal, vNormel)), p );",
	            //"vec3 vNormal = normalize( normalMatrix * normal );",
	            //"intensity = pow(abs(1.0 - abs(dot(vNormal, vec3(0, 0, 1)))), p);",
	            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	        "}"
	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"varying vec2 vUv;",



	        "uniform vec3 glowColor;",
	        "varying float intensity;",
	        "void main() {",
	            "vec3 glow = glowColor * intensity;",
	            "vec4 color = texture2D(tDiffuse, vUv);",
	            "gl_FragColor = vec4( glow.x, glow.y, glow.z, 0.5 );",
	        "}"
	].join("\n")
};


/* posledny toon shader -  intenzita stale nula
 THREE.TestRedShader = {

    uniforms: {
        "tDiffuse": { type: "t", value: null },
        //"amount":     { type: "f", value: 0.25 }
    },

    vertexShader: [

        "varying vec2 vUv;",
	"uniform vec3 ec_light_dir;",
	"uniform mat3 normal_matrix;",                    ///
	"varying float intensity;",
	"attribute vec3 a_normal;",
	"void main() {",
	        "vec3 ec_normal = normalize(normal_matrix * a_normal);",           ///
		"intensity = dot(ec_light_dir,ec_normal);",
	"vUv = uv;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

    ].join("\n"),

    fragmentShader: [

    "uniform sampler2D tDiffuse;",
    "varying vec2 vUv;",

	"varying float intensity;",

	"void main() {",
		"vec4 color = texture2D(tDiffuse, vUv);",
		"if (intensity > 0.95)",
	
//			"color = vec4(color.r*1.0,color.g*0.5,color.b*0.5,1.0);",
			"color = vec4(1.0,1.0,0.5,0.5);",
		"else if (intensity > 0.5)",
//			"color = vec4(color.r*0.6,color.g*0.3,color.b*0.3,1.0);
			"color = vec4(0.6,0.3,0.3,1.0);",
		"else if (intensity > 0.25)",
//			"color = vec4(color.r*0.4,color.g*0.2,color.b*0.2,1.0);",
			"color = vec4(0.4,0.2,0.2,1.0);",
		"else",
//			"color = vec4(color.r*0.2,color.g*0.1,color.b*0.1,1.0);",
			"color = vec4(0.2,0.1,0.1,1.0);",
		"gl_FragColor = color;",


    "}"

    ].join("\n")

};
*/
