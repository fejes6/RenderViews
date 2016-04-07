'use strict'
function IllustrativeRenderer(domQuery) { //for whole window call with domQuery "<body>"
    //A simple inhericance concept. We create an object of the AbstractRenderer type and then we change and extend it to our needs. At the end we return the self variable.
    var self = BasicThreeRenderer(domQuery);
   
    self.composer = null;
   
   
   				// postprocessing
    self.initCalls.push(function () {
				this.composer = new THREE.EffectComposer( this.renderer );
				this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );

				var effect = new THREE.ShaderPass( THREE.TestRedShader );
				effect.uniforms[ 'opacity' ].value = 0.7;
				effect.renderToScreen = true;
				this.composer.addPass( effect );
   });
				//
				
   self.renderCalls.push(function () {
	this.composer.render();
   });

    return self;
}
