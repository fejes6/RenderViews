'use strict'
function IllustrativeRenderer(domQuery) { //for whole window call with domQuery "<body>"
    //A simple inhericance concept. We create an object of the AbstractRenderer type and then we change and extend it to our needs. At the end we return the self variable.
    var self = BasicThreeRenderer(domQuery);
   
   var composer;
   
   
   				// postprocessing

				composer = new THREE.EffectComposer( renderer );
				composer.addPass( new THREE.RenderPass( scene, camera ) );

				var effect = new THREE.ShaderPass( THREE.TestShader );
				effect.uniforms[ 'scale' ].value = 4;
				composer.addPass( effect );

				var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
				effect.uniforms[ 'amount' ].value = 0.0015;
				effect.renderToScreen = true;
				composer.addPass( effect );

				//


    return self;
}
