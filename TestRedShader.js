
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
	"#extension GL_OES_standard_derivatives : enable",

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

		"Projection": { type: "m4", value: new THREE.Matrix4() },
		"Modelview": { type: "m4", value: new THREE.Matrix4() },
		"NormalMatrix": { type: "m4", value: new THREE.Matrix4() },
		"DiffuseMaterial": { type: "v3", value: new THREE.Vector3(1, 0, 1) },
		"LightPosition": { type: "v3", value: new THREE.Vector3(0, 0, 1) },
		"AmbientMaterial": {  type: "v3", value: new THREE.Vector3(0, 1, 0) },
		"SpecularMaterial": { type: "v3", value: new THREE.Vector3(1, 0, 0) },
		"Shininess": { type: "f", value: 0.45}
	},

	vertexShader: [

	"attribute vec4 Position;",
	"attribute vec3 Normal;",
	
	"uniform mat4 Projection;",
	"uniform mat4 Modelview;",
	"uniform mat3 NormalMatrix;",
	"uniform vec3 DiffuseMaterial;",
	
	"varying vec3 EyespaceNormal;",
	"varying vec3 Diffuse;",
	
	"void main()",
	"{",
	    "EyespaceNormal = NormalMatrix * Normal;",
	    "gl_Position = Projection * Modelview * Position;",
	    "Diffuse = DiffuseMaterial;",
	"}"

	].join("\n"),

	fragmentShader: [
	"#extension GL_OES_standard_derivatives : enable",

	"varying vec3 EyespaceNormal;",
	"varying vec3 Diffuse;",
	
	"uniform vec3 LightPosition;",
	"uniform vec3 AmbientMaterial;",
	"uniform vec3 SpecularMaterial;",
	"uniform float Shininess;",
	
	"float stepmix(float edge0, float edge1, float E, float x)",
	"{",
	    "float T = clamp(0.5 * (x - edge0) / E, 0.0, 1.0);",
	    "return mix(edge0, edge1, T);",
	"}",
	
	"void main()",
	"{",
	    "vec3 N = normalize(EyespaceNormal);",
	    "vec3 L = normalize(LightPosition);",
	    "vec3 Eye = vec3(0, 0, 1);",
	    "vec3 H = normalize(L + Eye);",
	    
	    "float df = max(0.0, dot(N, L));",
	    "float sf = max(0.0, dot(N, H));",
	    "sf = pow(sf, Shininess);",
	
	    "const float A = 0.1;",
	    "const float B = 0.3;",
	    "const float C = 0.6;",
	    "const float D = 1.0;",
	    "float E = fwidth(df);",
	
	    "if      (df > A - E && df < A + E) df = stepmix(A, B, E, df);",
	    "else if (df > B - E && df < B + E) df = stepmix(B, C, E, df);",
	    "else if (df > C - E && df < C + E) df = stepmix(C, D, E, df);",
	    "else if (df < A) df = 0.0;",
	    "else if (df < B) df = B;",
	    "else if (df < C) df = C;",
	    "else df = D;",
	
	    "E = fwidth(sf);",
	    "if (sf > 0.5 - E && sf < 0.5 + E)",
	    "{",
	        "sf = clamp(0.5 * (sf - 0.5 + E) / E, 0.0, 1.0);",
	    "}",
	    "else",
	   "{",
	        "sf = step(0.5, sf);",
	    "}",
	
	    "vec3 color = AmbientMaterial + df * Diffuse + sf * SpecularMaterial;",
	    "gl_FragColor = vec4(color, 1.0);",
	"}"

	].join("\n")

};
*/
