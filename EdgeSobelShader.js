THREE.EdgeSobelShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"aspect":    { type: "v2", value: new THREE.Vector2( 512, 512 ) },
	},
	vertexShader: [
		"varying vec2 vUv;",
		"void main() {",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"
	].join("\n"),
	fragmentShader: [
		"uniform sampler2D tDiffuse;",
		"varying vec2 vUv;",
		"uniform vec2 aspect;",
		"vec2 texel = vec2(1.0 / 512.0, 1.0 / 512.0);",
		"mat3 G[2];",
		"const mat3 g0 = mat3( 1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0 );",
		"const mat3 g1 = mat3( 1.0, 0.0, -1.0, 2.0, 0.0, -2.0, 1.0, 0.0, -1.0 );",
		"void main(void)",
		"{",
			"mat3 I;",
			"float cnv[2];",
			"vec3 sample;",
			"G[0] = g0;",
			"G[1] = g1;",

			//////////////////////////////////////////////////////////////////
			//0 0
			"sample = texture2D( tDiffuse, vUv + texel * vec2(0.0-1.0,0.0-1.0) ).rgb;",
			"I[int(0.0)][int(0.0)] = length(sample);",
			//0 1
			"sample = texture2D( tDiffuse, vUv + texel * vec2(0.0-1.0,1.0-1.0) ).rgb;",
			"I[int(0.0)][int(1.0)] = length(sample);",
			//0 2
			"sample = texture2D( tDiffuse, vUv + texel * vec2(0.0-1.0,2.0-1.0) ).rgb;",
			"I[int(0.0)][int(2.0)] = length(sample);",
			//1 0
			"sample = texture2D( tDiffuse, vUv + texel * vec2(1.0-1.0,0.0-1.0) ).rgb;",
			"I[int(1.0)][int(0.0)] = length(sample);",
			//1 1
			"sample = texture2D( tDiffuse, vUv + texel * vec2(1.0-1.0,1.0-1.0) ).rgb;",
			"I[int(1.0)][int(1.0)] = length(sample);",
			//1 2
			"sample = texture2D( tDiffuse, vUv + texel * vec2(1.0-1.0,2.0-1.0) ).rgb;",
			"I[int(1.0)][int(2.0)] = length(sample);",
			//2 0
			"sample = texture2D( tDiffuse, vUv + texel * vec2(2.0-1.0,0.0-1.0) ).rgb;",
			"I[int(2.0)][int(0.0)] = length(sample);",
			//2 1
			"sample = texture2D( tDiffuse, vUv + texel * vec2(2.0-1.0,1.0-1.0) ).rgb;",
			"I[int(2.0)][int(1.0)] = length(sample);",
			//2 2
			"sample = texture2D( tDiffuse, vUv + texel * vec2(2.0-1.0,2.0-1.0) ).rgb;",
			"I[int(2.0)][int(2.0)] = length(sample);",
			////////////////////////////////////////////////////////////////
			"for (int i=0; i<2; i++) {",
				"float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);",
				"cnv[i] = dp3 * dp3; ",
			"}",
			"gl_FragColor = vec4(0.5 * sqrt(cnv[0]*cnv[0]+cnv[1]*cnv[1]));",
		"} ",
	].join("\n")
};
