
/**
 * Super Simple Brightness Shader
 * Adjust brightness of image with an 'amount' Uniform
 * @author felixturner / http://airtight.cc/
 */

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

	"uniform sampler2D tDiffuse;",
	"uniform float amount;",
	"varying vec2 vUv;",

	"void main() {",

		"vec4 color = texture2D(tDiffuse, vUv);",
		"gl_FragColor = color*amount;",

	"}"


	].join("\n")

};

/*
 THREE.TestRedShader = {
 	
 	uniforms: {
	//	"tDiffuse": { type: "t", value: null },
	//	"amount":     { type: "f", value: 0.25 }
	},

	vertexShader: [

	"varying float intensity;",
	
	"void main()",
	"{",
		"vec3 lightDir = normalize(vec3(gl_LightSource[0].position));",
		"intensity = dot(lightDir,gl_Normal);",
	
		"gl_Position = ftransform();",
	"}"

	].join("\n"),
 	
	fragmentShader: [ 
		
	"varying float intensity;",
	
	"void main()",
	"{",
		"vec4 color;",
		"if (intensity > 0.95)",
	
			"color = vec4(1.0,0.5,0.5,1.0);",
		"else if (intensity > 0.5)",
			"color = vec4(0.6,0.3,0.3,1.0);",
		"else if (intensity > 0.25)",
			"color = vec4(0.4,0.2,0.2,1.0);",
		"else",
			"color = vec4(0.2,0.1,0.1,1.0);",
		"gl_FragColor = color;",
	
	"}"
 	
 		].join("\n")

};
*/
