
THREE.TestDotShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },

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

		"void main() {",
			"gl_FragColor = texture2D( tSource, vUv );",
		"}"
	].join( "\n" )
};
