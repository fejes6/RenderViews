'use strict'
function IllustrativeRenderer(domQuery) { //for whole window call with domQuery "<body>"
    //A simple inhericance concept. We create an object of the AbstractRenderer type and then we change and extend it to our needs. At the end we return the self variable.
    var self = BasicThreeRenderer(domQuery);
   
   var composer, renderer, scene, camera;
   
   
   				// postprocessing

				composer = new THREE.EffectComposer( renderer );
				composer.addPass( new THREE.RenderPass( scene, camera ) );

				var effect = new THREE.ShaderPass( THREE.TestShader );
				effect.uniforms[ 'opacity' ].value = 0.5;
				composer.addPass( effect );

				var effect = new THREE.ShaderPass( THREE.TestRedShader );
				effect.uniforms[ 'opacity' ].value = 0.7;
				effect.renderToScreen = true;
				composer.addPass( effect );

				//


    return self;
}
