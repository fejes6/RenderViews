//druhy
//http://pixelshaders.com
//THREE.TestColorShader = {
THREE.TestRedShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		//"position":    { type: "v2", value: new THREE.Vector2( 512, 512 ) },
	},

	vertexShader: [
		
		

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"precision mediump float;",
		
		"varying vec2 vUv;",
		"uniform sampler2D tDiffuse;",
		
		"float wave(float x, float amount) {",
		  "return (sin(x * amount) + 1.) * .5;",
		"}",
		
		"void main() {",
		  "vec4 color = texture2D(tDiffuse, vUv);",
		  "gl_FragColor.r = wave(color.r, 10.);",
		  "gl_FragColor.g = wave(color.g, 20.);",
		  "gl_FragColor.b = wave(color.b, 40.);",
		  "gl_FragColor.a = 1.;",
		"}"

	].join( "\n" )
};
