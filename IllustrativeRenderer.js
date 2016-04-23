'use strict'
function IllustrativeRenderer(domQuery) { //for whole window call with domQuery "<body>"
    //A simple inhericance concept. We create an object of the AbstractRenderer type and then we change and extend it to our needs. At the end we return the self variable.
    var self = BasicThreeRenderer(domQuery);
   
    self.composer = null;
    
   
   
   				// postprocessing
    self.initCalls.push(function () {
				this.composer = new THREE.EffectComposer( this.renderer );
				this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );

//				var effect = new THREE.ShaderPass( THREE.TestRedShader );
            			//effect.uniforms[ 'amount' ].value = 0.75;
//test 2 ok				effect.uniforms[ 'scale' ].value = 4;
//test 1 ok				effect.uniforms[ 'opacity' ].value = 0.2;
//				effect.renderToScreen = true;
//				this.composer.addPass( effect );
				
				var effect = new THREE.ShaderPass( THREE.TestRedShader );
				effect.renderToScreen = true;
				this.composer.addPass( effect );
				
				
				
   });
				//
				

   
   self.renderCalls = []; //tym zrusis vykreslovanie BasicThreeRenderera
   self.renderCalls.push(function () {
    //okopirovane z BasicThreeRenderera, vycisti viewport
        if (!this.doesWebGL)
            this.renderer.domElement.getContext("2d").clearRect(0, 0,self.container.innerWidth() - 1, self.container.innerHeight() - 1);
        this.renderer.alpha = true;
        else
            //this.renderer.alpha = true;
            this.renderer.clear();
	   
   //este bude fajn sem neskor dorobit offscreen rrender, aby fungoval picking
   //ale zatial staci takto
   
  
   //this.renderer.context.getExtension('OES_standard_derivatives');
   this.composer.render();
   });
	
	

    return self;
}
