/*
THREE.EdgeShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"aspect":    { type: "v2", value: new THREE.Vector2( 512, 512 ) },
		"radius":    { type: "f", value: 1.0 },
		"renderwidth":    { type: "f", value: 512.0 },
	},

	vertexShader: [
                 "attribute vec2 a_texcoord;",
		"varying vec2 vUv;",
		"varying vec2 v_texcoord;",

		"void main() {",
			//gl_TexCoord[0] = gl_MultiTexCoord0;
			"v_texcoord = a_texcoord;",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"varying vec2 vUv;",
		"varying vec2 v_texcoord;",
		"uniform vec2 aspect;",


// texture
//uniform sampler2D tDiffuse;
// radius for valley detection
"uniform int radius;",
// rendered image width
"uniform int renderwidth;",

"float intensity(in vec4 tDiffuse)",
"{",
	"return sqrt((tDiffuse.x*tDiffuse.x)+(tDiffuse.y*tDiffuse.y)+(tDiffuse.z*tDiffuse.z));",
"}",

"vec3 simple_edge_detection(in float step, in vec2 center)",
"{",
	// let's learn more about our center pixel
	"float center_intensity = intensity(texture2D(tDiffuse, center));",
	// counters we need
	"int darker_count = 0;",
	"float max_intensity = center_intensity;",
	// let's look at our neighbouring points
	"for(int i = -radius; i <= radius; i++)",
	"{",
		"for(int j = -radius; j<= radius; j++)",
		"{",
			"vec2 current_location = center + vec2(i*step, j*step);",
			"float current_intensity = intensity(texture2D(tDiffuse,current_location));",
			"if(current_intensity < center_intensity)",
			"{", 				
				"darker_count++;", 
	
			"}",	
			"if(current_intensity > max_intensity)",
			"{",
				"max_intensity = current_intensity;",
			"}",
		"}",
	"}",
	// do we have a valley pixel?
	"if((max_intensity - center_intensity) > 0.01*radius)",
	"{",
		"if(darker_count/(radius*radius) < (1-(1/radius)))",
		"{",
			"return vec3(0.0,0.0,0.0);", // yep, it's a valley pixel.
		"}",
	"}",
	"return vec3(1.0,1.0,1.0);", // no, it's not.

"}",

"void main(void)",
"{",
	"float step = 1.0/renderwidth;",
	//vec2 center_color = gl_TexCoord[0].st;
	"vec2 center_color = v_texcoord;",
	"gl_FragColor.xyz = simple_edge_detection(step,center_color);",
    "gl_FragColor.a = 0.0;",
"}"

	].join("\n")

};
*/
/* 
THREE.EdgeShader = {

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

			// calculate the convolution values for all the masks 
			"for (int i=0; i<2; i++) {",
				"float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);",
				"cnv[i] = dp3 * dp3; ",
			"}",

			"gl_FragColor = vec4(0.5 * sqrt(cnv[0]*cnv[0]+cnv[1]*cnv[1]));",
		"} ",

	].join("\n")

};
*/

 THREE.EdgeFreiChenShader = { 
 
 
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
 
 
 
 
 		"mat3 G[9];", 
 
 
 		// hard coded matrix values!!!! as suggested in https://github.com/neilmendoza/ofxPostProcessing/blob/master/src/EdgePass.cpp#L45 
 
 
 		"const mat3 g0 = mat3( 0.3535533845424652, 0, -0.3535533845424652, 0.5, 0, -0.5, 0.3535533845424652, 0, -0.3535533845424652 );", 
 		"const mat3 g1 = mat3( 0.3535533845424652, 0.5, 0.3535533845424652, 0, 0, 0, -0.3535533845424652, -0.5, -0.3535533845424652 );", 
 		"const mat3 g2 = mat3( 0, 0.3535533845424652, -0.5, -0.3535533845424652, 0, 0.3535533845424652, 0.5, -0.3535533845424652, 0 );", 
 		"const mat3 g3 = mat3( 0.5, -0.3535533845424652, 0, -0.3535533845424652, 0, 0.3535533845424652, 0, 0.3535533845424652, -0.5 );", 
 		"const mat3 g4 = mat3( 0, -0.5, 0, 0.5, 0, 0.5, 0, -0.5, 0 );", 
 		"const mat3 g5 = mat3( -0.5, 0, 0.5, 0, 0, 0, 0.5, 0, -0.5 );", 
 		"const mat3 g6 = mat3( 0.1666666716337204, -0.3333333432674408, 0.1666666716337204, -0.3333333432674408, 0.6666666865348816, -0.3333333432674408, 0.1666666716337204, -0.3333333432674408, 0.1666666716337204 );", 
 		"const mat3 g7 = mat3( -0.3333333432674408, 0.1666666716337204, -0.3333333432674408, 0.1666666716337204, 0.6666666865348816, 0.1666666716337204, -0.3333333432674408, 0.1666666716337204, -0.3333333432674408 );", 
 		"const mat3 g8 = mat3( 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408 );", 
 
 
 		"void main(void)", 
 		"{", 
 
 
 			"G[0] = g0,", 
 			"G[1] = g1,", 
 			"G[2] = g2,", 
 			"G[3] = g3,", 
 			"G[4] = g4,", 
 			"G[5] = g5,", 
 			"G[6] = g6,", 
 			"G[7] = g7,", 
 			"G[8] = g8;", 
 
 
 			"mat3 I;", 
 			"float cnv[9];", 
 			"vec3 sample;", 

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
 
 
 
 
 
 			/* calculate the convolution values for all the masks */ 
 			"for (int i=0; i<9; i++) {", 
 				"float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);", 
 				"cnv[i] = dp3 * dp3;", 
 			"}", 
 
 
 			"float M = (cnv[0] + cnv[1]) + (cnv[2] + cnv[3]);", 
 			"float S = (cnv[4] + cnv[5]) + (cnv[6] + cnv[7]) + (cnv[8] + M);", 
 
 
 			"gl_FragColor = vec4(vec3(sqrt(M/S)), 1.0);", 
 		"}", 
 
 
 	].join("\n") 
 }; 

