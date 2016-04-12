
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */
/**
THREE.TestRedShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"opacity":  { type: "f", value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float opacity;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",
/**
*                       "vec4 texel = texture2D( tDiffuse, vUv );",
*			"gl_FragColor = opacity * texel;",
*
  ********************************************************************
  
  "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
  
		"}"

	].join("\n")

};
*/
/****************************************************************************************************************************/
/**
 * @author alteredq / http://alteredqualia.com/
 * @author davidedc / http://www.sketchpatch.net/
 *
 * NVIDIA FXAA by Timothy Lottes
 * http://timothylottes.blogspot.com/2011/06/fxaa3-source-released.html
 * - WebGL port by @supereggbert
 * http://www.glge.org/demos/fxaa/
 */

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

/**
THREE.TestRedShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"tSize":    { type: "v2", value: new THREE.Vector2( 256, 256 ) },
		"center":   { type: "v2", value: new THREE.Vector2( 0.5, 0.5 ) },
		"angle":    { type: "f", value: 1.57 },
		"scale":    { type: "f", value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform vec2 center;",
		"uniform float angle;",
		"uniform float scale;",
		"uniform vec2 tSize;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"float pattern() {",

			"float s = sin( angle ), c = cos( angle );",

			"vec2 tex = vUv * tSize - center;",
			"vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;",

			"return ( sin( point.x ) * sin( point.y ) ) * 4.0;",

		"}",

		"void main() {",

			"vec4 color = texture2D( tDiffuse, vUv );",

			"float average = ( color.r + color.g + color.b ) / 3.0;",

			"gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );",

		"}"

	].join( "\n" )

};

*/

THREE.TestRedShader = {

	uniforms: {

		"sceneTex": { type: "t", value: null },
		"vx_offset":    { type: "f" },
		"rt_w":   { type: "f" },
		"rt_h":    { type: "f" },
		"hatch_y_offset":    { type: "f", value: 5.0 },
		"lum_threshold_1":    { type: "f", value: 1.0 },
		"lum_threshold_2":    { type: "f", value: 0.7 },
		"lum_threshold_3":    { type: "f", value: 0.5 },
		"lum_threshold_4":    { type: "f", value: 0.3 }

	},

	vertexShader: [
		

		"void main() {",

			"gl_Position = ftransform();",
			"gl_TexCoord[0] = gl_MultiTexCoord0;",
			
		"}"

	].join( "\n" ),

	fragmentShader: [

		
		"uniform sampler2D sceneTex;", // 0
"uniform float vx_offset;",
"uniform float rt_w;", // GeeXLab built-in
"uniform float rt_h;", // GeeXLab built-in
"uniform float hatch_y_offset;", // 5.0
"uniform float lum_threshold_1;", // 1.0
"uniform float lum_threshold_2;", // 0.7
"uniform float lum_threshold_3;", // 0.5
"uniform float lum_threshold_4;", // 0.3
"void main(){", 
  "vec2 uv = gl_TexCoord[0].xy;",
  
  "vec3 tc = vec3(1.0, 0.0, 0.0);",
  "if (uv.x &lt; (vx_offset-0.005)){",
    "float lum = length(texture2D(sceneTex, uv).rgb);",
    "tc = vec3(1.0, 1.0, 1.0);",
  
    "if (lum &lt; lum_threshold_1){",
      "if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)", 
        "tc = vec3(0.0, 0.0, 0.0);",
    "}",  
  
    "if (lum &lt; lum_threshold_2){",
      "if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)", 
        "tc = vec3(0.0, 0.0, 0.0);",
    "}",  
  
    "if (lum &lt; lum_threshold_3){",
      "if (mod(gl_FragCoord.x + gl_FragCoord.y - hatch_y_offset, 10.0) == 0.0)", 
        "tc = vec3(0.0, 0.0, 0.0);",
    "}",  
  
    "if (lum &lt; lum_threshold_4){",
      "if (mod(gl_FragCoord.x - gl_FragCoord.y - hatch_y_offset, 10.0) == 0.0)", 
        "tc = vec3(0.0, 0.0, 0.0);",
    "}",
  "}",
  "else if (uv.x&gt;=(vx_offset+0.005)){",
    "tc = texture2D(sceneTex, uv).rgb;",
  "}",
  
  "gl_FragColor = vec4(tc, 1.0);",
"}"


		

	].join( "\n" )

};
