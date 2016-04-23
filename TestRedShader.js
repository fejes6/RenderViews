THREE.TestRedShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"delta": {type: "v2", value: new THREE.Vector2(1.0 / window.innerWidth, 1.0 / window.innerHeight)},
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

		//yeah, could have done it seperated...
		"void main() {
			"gl_FragColor =	texture2D( tDiffuse, vUv);",
			"gl_FragColor.rgb = gl_FragColor.rgb * 0.25 +",
				"texture2D( tDiffuse, vUv  + delta).rgb * 0.0625 +",
				"texture2D( tDiffuse, vUv  - delta).rgb * 0.0625 +",
				"texture2D( tDiffuse, vUv  + delta * vec2(1, -1)).rgb * 0.0625 +",
				"texture2D( tDiffuse, vUv  + delta * vec2(- 1,1)).rgb * 0.0625 +",

				"texture2D( tDiffuse, vUv  + delta * vec2(1, 0)).rgb * 0.125 +",
				"texture2D( tDiffuse, vUv  - delta * vec2(0, 1)).rgb * 0.125 +",
				"texture2D( tDiffuse, vUv  + delta * vec2(-1,0)).rgb * 0.125 +",
				"texture2D( tDiffuse, vUv  + delta * vec2(0,-1)).rgb * 0.125;",
		"}"
	].join( "\n" )
};
