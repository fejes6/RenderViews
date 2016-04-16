
/**
 * Super Simple Brightness Shader
 * Adjust brightness of image with an 'amount' Uniform
 * @author felixturner / http://airtight.cc/
 

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
*/

 THREE.TestRedShader = {
 	
 uniforms: {

		"tDiffuse": { type: "t", value: null },
		"LightPosition": { type: "v3", value: new THREE.Vector3(0, 500, 0) },
		"SurfaceColor": { type: "v3", value: new THREE.Vector3(0, 1, 1) },
		"WarmColor": { type: "v3", value: new THREE.Vector3(1, 0, 1) },
		"CoolColor": { type: "v3", value: new THREE.Vector3(1, 1, 0) },
		"DiffuseWarm": { type: "f", value: 0.45},
		"DiffuseCool": { type: "f", value: 0.45}
	},

	vertexShader: [

		"uniform vec3 LightPosition;",
		
		"varying float NdotL;",
		"varying vec3 ReflectVec;",
		"varying vec3 ViewVec;",
		"varying vec2 vUv;",
		
		"void main() {",

			"vec3 EyePos = (modelViewMatrix * vec4(position, 1.0)).xyz;",
			"vec3 trans_norm = normalize(normalMatrix * normal);",
			"vec3 lightVec 	= normalize(LightPosition - EyePos);",
			"ReflectVec    	= normalize(reflect(-lightVec, trans_norm));",
			"ViewVec       	= normalize(-EyePos);",
			"NdotL         	= (dot (lightVec, trans_norm) + 1.0) * 0.5;",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform vec3  SurfaceColor;",
		"uniform vec3  WarmColor;",
		"uniform vec3  CoolColor;",
		"uniform float DiffuseWarm;",
		"uniform float DiffuseCool;",
		"uniform sampler2D tDiffuse;",

		"varying float NdotL;",
		"varying vec3  ReflectVec;",
		"varying vec3  ViewVec;",
		"varying vec2 vUv;",

		"void main(void) {",
		
		"vec4 color = texture2D(tDiffuse, vUv);",
		  "vec3 kcool    = min (CoolColor + DiffuseCool * SurfaceColor, 1.0);",
		  "vec3 kwarm    = min (WarmColor + DiffuseWarm * SurfaceColor, 1.0);",
		  "vec3 kfinal   = mix (kcool, kwarm, NdotL);",

		  "vec3 nreflect = normalize (ReflectVec);",
		  "vec3 nview    = normalize (ViewVec);",

		  "float spec    = max (dot (nreflect, nview), 0.0);",
		  "spec          = pow (spec, 32.0);",

		  "gl_FragColor  = vec4 (min (kfinal + spec, 1.0), color.a);",
		"}"

	].join("\n")

};

