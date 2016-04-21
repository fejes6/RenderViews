
/**
 * Super Simple Brightness Shader
 * Adjust brightness of image with an 'amount' Uniform
 * @author felixturner / http://airtight.cc/
 */
/*
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
	//"#extension GL_OES_standard_derivatives : enable",

	"uniform sampler2D tDiffuse;",
	"uniform float amount;",
	"varying vec2 vUv;",

	"void main() {",

		"vec4 color = texture2D(tDiffuse, vUv);",
		"gl_FragColor = color*amount;",

	"}"


	].join("\n")

};
*/


/*
THREE.SepiaShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"amount":   { type: "f", value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float amount;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",

			"vec4 color = texture2D( tDiffuse, vUv );",
			"vec3 c = color.rgb;",

			"color.r = dot( c, vec3( 1.0 - 0.607 * amount, 0.769 * amount, 0.189 * amount ) );",
			"color.g = dot( c, vec3( 0.349 * amount, 1.0 - 0.314 * amount, 0.168 * amount ) );",
			"color.b = dot( c, vec3( 0.272 * amount, 0.534 * amount, 1.0 - 0.869 * amount ) );",

			"gl_FragColor = vec4( min( vec3( 1.0 ), color.rgb ), color.a );",

		"}"

	].join("\n")

};
*/

 THREE.TestRedShader = {
 	
 	uniforms: {
 		"tDiffuse": { type: "t", value: null },
 		"lightDir":	{ type: "v3", value: new THREE.Vector3() }
 	
 	},

	vertexShader: [
	"varying vec2 vUv;",
	"varying vec3 normal;",
	"void main() {",
		"vUv = uv;",
		"normal = gl_Normal;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	"}"
	].join("\n"),

	fragmentShader: [
		"uniform vec3 lightDir;",
		"uniform sampler2D tDiffuse;",
		"varying vec3 normal;",
		
		"void main()",
		"{",
			"float intensity;",
			"vec4 color= texture2D( tDiffuse, vUv );",
			"intensity = dot(lightDir,normal);",
		
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
