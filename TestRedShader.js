
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
// nepozna gl_premenne neviem preco
 THREE.TestRedShader = {
 	
 	uniforms: {
 		"texture": { type: "t", value: null },
 		//"lightDir":	{ type: "v3", value: new THREE.Vector3() }
 	
 	},

	vertexShader: [
		"varying vec3 normal, lightDir;",
		"varying vec2 texCoord;",
		
		"void main(){",
			"vec4 ecPos;",
			"ecPos = vec4(gl_ModelViewMatrix * gl_Vertex);",
			"lightDir = normalize(vec3(gl_LightSource[0].position) - ecPos.xyz);",
			"normal = normalize(gl_NormalMatrix * gl_Normal);",
			
			"texCoord = vec2(gl_MultiTexCoord0);",
			"gl_Position = ftransform();",
		"}"
	].join("\n"),

	fragmentShader: [
		"varying vec3 normal, lightDir;",
		"varying vec2 texCoord;",
		"uniform sampler2D texture;",
		
		"void main(){",
			"float intensity;",
			"vec3 n;",
			"vec4 _color;",
			
			"n = normalize(normal);",
			"intensity = dot(lightDir, n);",
			
			"if (intensity > 0.98)",
			"_color = vec4(1.0,1.0,1.0,1.0);",
			"else if (intensity > 0.5)",
			"_color = vec4(0.8,0.8,0.8,1.0);",
			"else if (intensity > 0.35)",
			"_color = vec4(0.4,0.4,0.4,1.0);",
			"else",
			"_color = vec4(0.0,0.0,0.0,1.0);",
			"gl_FragColor = _color * texture2D(texture, texCoord);",
		"}"
		
		
		
	].join("\n")

};
*/
/* toon shader bez erroru ale iba cierna obrazovka
THREE.TestRedShader = {
	
		
				uniforms: {

					"tDiffuse": { type: "t", value: null },
					"uDirLightPos":	{ type: "v3", value: new THREE.Vector3() },
					"uDirLightColor": { type: "c", value: new THREE.Color( 0xff1fff ) },

					//"uMaterialColor":  { type: "c", value: new THREE.Color( 0xffffff ) },

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
//upraveny kod zo stranky - - nepozna premenne
THREE.TestRedShader = {
	
				uniforms: {
					"tDiffuse": { type: "t", value: null },
					"lightDir":	{ type: "v3", value: new THREE.Vector3() },
				},

				vertexShader: [
					
					"varying vec3 normal;",
					"varying vec2 vUv;",
					
					"void main()",
					"{",
						"normal = gl_Normal;",
						"vUv = uv;",
						"gl_Position = ftransform();",
					
					"}"
			].join("\n"),

				fragmentShader: [
					"uniform sampler2D tDiffuse;",
					"uniform vec3 lightDir;",
					"varying vec3 normal;",
					"varying vec2 vUv;",
					
					"void main()",
					"{",
						"float intensity;",
						"vec4 color;",
						"intensity = dot(lightDir,normal);",
					
						"if (intensity > 0.95)",
							"color = vec4(1.0,0.5,0.5,1.0);",
						"else if (intensity > 0.5)",
							"color = vec4(0.6,0.3,0.3,1.0);",
						"else if (intensity > 0.25)",
							"color = vec4(0.4,0.2,0.2,1.0);",
						"else",
							"color = vec4(0.2,0.1,0.1,1.0);",
						"gl_FragColor = color * texture2D( tDiffuse, vUv );",
					
					"}"
			
			
			].join("\n")

};
*/

THREE.TestRedShader = {
    uniforms: {

      "uDirLightPos":   { type: "v3", value: new THREE.Vector3() },
      "uDirLightColor": { type: "c", value: new THREE.Color( 0xeeeeee ) },

      "uAmbientLightColor": { type: "c", value: new THREE.Color( 0x050505 ) },

      "uBaseColor":  { type: "c", value: new THREE.Color( 0xff0000 ) },

    },

    vertexShader: [

      "varying vec3 vNormal;",
      "varying vec3 vRefract;",

      "void main() {",

        "vec4 mPosition = objectMatrix * vec4( position, 1.0 );",
        "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        "vec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );",

        "vNormal = normalize( normalMatrix * normal );",

        "vec3 I = mPosition.xyz - cameraPosition;",
        "vRefract = refract( normalize( I ), nWorld, 1.02 );",

        "gl_Position = projectionMatrix * mvPosition;",

      "}"

    ].join("\n"),

    fragmentShader: [

      "uniform vec3 uBaseColor;",

      "uniform vec3 uDirLightPos;",
      "uniform vec3 uDirLightColor;",

      "uniform vec3 uAmbientLightColor;",

      "varying vec3 vNormal;",

      "varying vec3 vRefract;",

      "void main() {",

        "float directionalLightWeighting = max( dot( normalize( vNormal ), uDirLightPos ), 0.0);",
        "vec3 lightWeighting = uAmbientLightColor + uDirLightColor * directionalLightWeighting;",

        "float intensity = smoothstep( - 0.5, 1.0, pow( length(lightWeighting), 20.0 ) );",
        "intensity += length(lightWeighting) * 0.2;",

        "float cameraWeighting = dot( normalize( vNormal ), vRefract );",
        "intensity += pow( 1.0 - length( cameraWeighting ), 6.0 );",
        "intensity = intensity * 0.2 + 0.3;",

        "if ( intensity < 0.50 ) {",

          "gl_FragColor = vec4( 2.0 * intensity * uBaseColor, 1.0 );",

        "} else {",

          "gl_FragColor = vec4( 1.0 - 2.0 * ( 1.0 - intensity ) * ( 1.0 - uBaseColor ), 1.0 );",

        "}",

      "}"

    ].join("\n")
   }; 
