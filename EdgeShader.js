/**
 * @author zz85 / https://github.com/zz85 | https://www.lab4games.net/zz85/blog
 *
 * Edge Detection Shader using Sobel filter
 * Based on http://rastergrid.com/blog/2011/01/frei-chen-edge-detector
 *
 * aspect: vec2 of (1/width, 1/height)
 */

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
