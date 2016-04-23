THREE.TestRedShader = {
 	uniforms: {
 		"tDiffuse": { type: "t", value: null },
 		"delta": {type: "v2", value: new THREE.Vector2(1.0 / window.innerWidth, 1.0 / window.innerHeight)},
 		"colorLo": {type: "v3", value: new THREE.Vector3( 0.329,0.152,0.376 )},
 		"colorHi": {type: "v3", value: new THREE.Vector3( 0.96, 0.68, 0.28 )},
 		"steps": { type: "f", value: 0.0},
 	},
 	vertexShader: [
 		"varying vec2 vUv;",
 		"void main() {",
 			"vUv = uv;",
 			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
 		"}"
 	].join( "\n" ),
 	fragmentShader: [

		"varying vec2 vUv;",
 		"uniform sampler2D tDiffuse;",
 		"uniform vec2 delta;",
 
 		"uniform vec3 colorLo;",
 		"uniform vec3 colorHi;",
 
 		"uniform float steps;",
 
 		"void main() {",
 			"vec4 source = texture2D( tDiffuse, vUv);",
 			"float illu = source.r;",
 			"if (steps == 1.0)",
 				"illu = 0.5;",
 			"else",
 				"if (steps > 1.0)",
 					"illu = floor(clamp(illu * steps, 0.0, steps - 1.0))/(steps - 1.0);",
 			"gl_FragColor = vec4(mix(colorLo, colorHi, illu), source.a);",
 		"}"
 	].join( "\n" )
 };
