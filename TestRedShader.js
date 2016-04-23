THREE.TestRedShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"tDepth": { type: "t", value: rtScene },
		"tBlurDepth": { type: "t", value: rtDepth },
		"delta": {type: "v2", value: new THREE.Vector2(1.0 / window.innerWidth, 1.0 / window.innerHeight)},
		"intensity": {type: "f", value:0.7},
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
		"uniform sampler2D tDepth;",
		"uniform sampler2D tBlurDepth;",
		"uniform float intensity;",

		"uniform vec2 delta;",

		"void main() {",
			"float depthOrig = texture2D( tDepth, vUv ).b;",
			"float depthBlur = texture2D( tBlurDepth, vUv ).b;",
			"float diff = (-depthOrig + depthBlur) * intensity;",
			"gl_FragColor = texture2D( tDiffuse, vUv );",
			"gl_FragColor.rgb -= vec3(abs(diff));",
		"}"
	].join( "\n" )
};
