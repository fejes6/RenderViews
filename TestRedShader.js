THREE.TestRedShader = {
	uniforms: {
		"tSource": { type: "t", value: null },
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
		"uniform sampler2D tSource;",
		"uniform vec2 delta;",


		"void main() {",
			"gl_FragColor = vec4(texture2D( tSource, vUv ).r, 1.0);",
		"}"
	].join( "\n" )
};
