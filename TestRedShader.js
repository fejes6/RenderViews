THREE.TestRedShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"colorMult": {type: "v4", value: new THREE.Vector4( 0, 0, 0, 1 )},
		//"delta": {type: "v2", value: new THREE.Vector2(1.0 / window.innerWidth, 1.0 / window.innerHeight)},
		//"colorLo": {type: 'v3', value: new THREE.Vector3( 0.329,0.152,0.376 )},
		//"colorHi": {type: 'v3', value: new THREE.Vector3( 0.96, 0.68, 0.28 )},
		//"steps": { type: 'f', value: 0.0},
	},
	vertexShader: [
		/*
		uniform mat4 worldViewProjection;
uniform vec3 lightWorldPos;
uniform mat4 world;
uniform mat4 viewInverse;
uniform mat4 worldInverseTranspose;
*/
"attribute vec4 position;",
"attribute vec3 normal;",
"attribute vec2 texCoord;",
"varying vec4 v_position;",
"varying vec2 v_texCoord;",
"varying vec3 v_normal;",
"varying vec3 v_surfaceToLight;",
"varying vec3 v_surfaceToView;",
		"varying vec2 vUv;",
		"void main() {",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"
	].join( "\n" ),
	fragment_shader: [
	
		"uniform vec4 colorMult;",
		"varying vec4 v_position;",
		"varying vec2 v_texCoord;",
		"varying vec3 v_normal;",
		"varying vec3 v_surfaceToLight;",
		"varying vec3 v_surfaceToView;",
		
		"varying vec2 vUv;",
		
		"uniform sampler2D tDiffuse;",
		
		"vec4 lit(float l ,float h, float m) {",
		  "return vec4(1.0,max(l, 0.0),(l > 0.0) ? pow(max(0.0, h), m) : 0.0,1.0);",
		"}",
		"void main() {",
		  "vec3 normal = normalize(v_normal);",
		  "vec3 surfaceToLight = normalize(v_surfaceToLight);",
		  "vec3 surfaceToView = normalize(v_surfaceToView);",
		  "vec3 halfVector = normalize(surfaceToLight + surfaceToView);",
		  "vec4 litR = lit(dot(normal, surfaceToLight) dot(normal, halfVector), 1.0);",
		  "gl_FragColor = vec4((colorMult * texture2D(tDiffuse, vec2(litR.y, 0.5))).rgb, 1);",

	
			"}"
	].join( "\n" ),
};
