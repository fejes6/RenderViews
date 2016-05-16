'use strict'
var fsqVertex = 
'varying vec2 vUv;\
\
void main() {\
    vUv = uv;\
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\
}';

var fsqFragment = 
'varying vec2 vUv;\
uniform sampler2D tDiffuse;\
\
void main() {\
\
    gl_FragColor = texture2D( tDiffuse, vUv );\
}';

function IllustrativeRenderer(domQuery) { //for a whole window call with domQuery "<body>"
    //inherit the base class
    var self = new BasicThreeRenderer(domQuery, true);


    self.composer = null;
    self.interactiveScene = null;
    self.rayScene = null;
    self.composer2 = null;
    self.composer3 = null;
    self.composer4 = null;
    self.composer5 = null;

    self.IMeshes = {};

    self.resolveNode = function(mesh)
    {
        var shapeID = mesh.mName;
        var seedID = self.Seeds[shapeID];
        var _seed = SeedWidgets.GetById(seedID);
        return {shape: _seed.GetShape(shapeID), seed: _seed};
    }

    //This renderer adds a very basic picking of shapes
    //It sends the results to the shape, which notifies all its subscribers that something has changed.
    //The picking code is based on the following example
    //http://stemkoski.github.io/Three.js/Mouse-Tooltip.html

    //First we need to add a new initialization call wich will be executed after the one of BasicThreeRenderer
    self.initCalls.push(function () { //push the init function to the list of initCalls


        this.interactiveScene = new THREE.Scene();
        this.rayScene = new THREE.Scene();
        this.initLights(this.interactiveScene);

        //Full Screen Quad
        this.fsqScene = new THREE.Scene();
        
        this.fullScreenQuadMaterial = new THREE.ShaderMaterial({
            uniforms: { tDiffuse: { type: "t", value: this.basicRTT } },
            vertexShader: fsqVertex,
            fragmentShader: fsqFragment,
            depthTest: false,
            depthWrite: false
        });

        var quad = new THREE.Mesh(this.RTTPlane, this.fullScreenQuadMaterial);
        quad.dynamic = true;
        quad.position.z = -1;
        this.fsqScene.add(quad);
        
        //POSTPROCESING
        			this.composer = new THREE.EffectComposer( this.renderer );
        			var renderPass = new THREE.RenderPass( this.scene, this.camera ); 
        			this.composer.addPass( renderPass );
        			var effect = new THREE.ShaderPass( THREE.EdgeSobelShader );
        			effect.renderToScreen = true;
        			this.composer.addPass( effect );
        			//------------------------
				this.composer2 = new THREE.EffectComposer( this.renderer );
        			var renderPass2 = new THREE.RenderPass( this.scene, this.camera ); 
        			this.composer2.addPass( renderPass2 );
        			var effect2 = new THREE.ShaderPass( THREE.EdgeFreiChenShader );
        			effect2.renderToScreen = true;
        			this.composer2.addPass( effect2 );
        			//------------------------
        			this.composer3 = new THREE.EffectComposer( this.renderer );
        			var renderPass3 = new THREE.RenderPass( this.scene, this.camera ); 
        			this.composer3.addPass( renderPass3 );
        			var effect3 = new THREE.ShaderPass( THREE.EdgeEmphasizingShader  );
        			effect3.renderToScreen = true;
        			this.composer3.addPass( effect3 );
        			//------------------------
        			this.composer4 = new THREE.EffectComposer( this.renderer );
        			var renderPass4 = new THREE.RenderPass( this.scene, this.camera ); 
        			this.composer4.addPass( renderPass4 );
        			var effect4 = new THREE.ShaderPass( THREE.TestHatchShader );
        			effect4.renderToScreen = true;
        			this.composer4.addPass( effect4 );
        			//------------------------
        			this.composer5 = new THREE.EffectComposer( this.renderer );
        			var renderPass5 = new THREE.RenderPass( this.scene, this.camera ); 
        			this.composer5.addPass( renderPass5 );
        			var effect5 = new THREE.ShaderPass( THREE.TestRedShader );
        			effect5.renderToScreen = true;
        			this.composer5.addPass( effect5 );
    });

    self.IllustrativeRenderer = function () {
        if (!this.imgOverride) {
            this.renderer.clear(true, false, false);
            this.renderer.render(this.fsqScene, this.RTTCamera);
            this.renderer.render(self.debugRays ? this.rayScene : this.interactiveScene, this.camera);
            if ($("#effect").is(':checked')) {
                this.composer.render();
            }
            if ($("#effect2").is(':checked')) {
                this.composer2.render();
            }
            if ($("#effect3").is(':checked')) {
                this.composer3.render();
            }
            if ($("#effect4").is(':checked')) {
                this.composer4.render();
            }
            if ($("#effect5").is(':checked')) {
                this.composer5.render();
            }
        }
    }

    self.renderCalls.push(function () {
        self.IllustrativeRenderer();
    });

    self.resizeCalls.push(function () {
        this.fullScreenQuadMaterial.uniforms.tDiffuse.value = this.basicRTT;
        this.fullScreenQuadMaterial.uniforms.tDiffuse.needsUpdate = true;
    });

    self.mouse = { x: 0, y: 0 }; //here we store the last mouse position. The mouse position is stored only when the mouse moves, but the scene is mostly updated with a much higher frequence

    return self;
}
