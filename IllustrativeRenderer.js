'use strict'
function IllustrativeRenderer(domQuery) { //for whole window call with domQuery "<body>"
    //A simple inhericance concept. We create an object of the AbstractRenderer type and then we change and extend it to our needs. At the end we return the self variable.
    var self = BasicThreeRenderer(domQuery);
   
   //novy kod
    var doSSAO;
    var renderer, scene, camera, controls, emptyScene;
    var directionalLight1;
    var depthMaterial, depthTarget, depthTargetParams, renderTarget, composer, renderTargetParams, renderTarget, fxaaPass, ssaoPass; //SSAO stuff
    //var depthPassPlugin;
    var renderingEnabled = false;
    var requestStopRendering = false;
    var canvasWidth, canvasHeight;
    
    var imgOverride = false;
    var doesWebGL = false;

function onInitRenderer(domQuery) {
    var targetElement;
    if (!domQuery)
        targetElement = document;
    else {
        var query = $(domQuery);
        if (query.length == 1) //There must be exactly one result to the query
            targetElement = query.first();
        else
            targetElement = document;        
    }

    //test if webGl present
    var doesCanvas = !!window.CanvasRenderingContext2D;
    doesWebGL = (function () { try { return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); } catch (e) { return false; } })();

    // renderer
    if (doesWebGL) {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        doSSAO = false;
    }
    else {
        if (doesCanvas)
            renderer = new THREE.CanvasRenderer();
        else
            alert('None of the Threejs renderers is supported on this machine :(');
    }

    canvasWidth = targetElement.innerWidth();
    canvasHeight = targetElement.innerHeight();
    renderer.setSize(canvasWidth, canvasHeight);
    targetElement.prepend(renderer.domElement);

    // camera
    camera = new THREE.PerspectiveCamera(50, canvasWidth / canvasHeight, 0.025, 1000);
    camera.position.y = 20;
    camera.position.z = 30;
    camera.rotation.x = 45 * (Math.PI / 180);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.noKeys = true;

    controls.addEventListener("start", EnableRendering, false);
    controls.addEventListener("end", DisableRendering, false);

    //Make the renderer adaptable to changes of the container size
    $(targetElement).addClass("canvas-resizable"); //Normally the resize event may be bound only to the Window object. But we propagate it using jquery to all elements of the "canvas-resizable" class. Therefore we set the container to be a member of that class.
    //When the container gets resized
    $(targetElement).resize(function () {
        canvasWidth = targetElement.innerWidth();
        canvasHeight = targetElement.innerHeight();
        renderer.setSize(canvasWidth, canvasHeight); //new renderer window size
        camera.aspect = canvasWidth / canvasHeight; //new aspect ratio
        camera.updateProjectionMatrix();

        if (doSSAO) {
            depthTarget = new THREE.WebGLRenderTarget(canvasWidth, canvasHeight, depthTargetParams);
            renderTarget = new THREE.WebGLRenderTarget(canvasWidth, canvasHeight, renderTargetParams);

            composer.reset(renderTarget);

            fxaaPass.uniforms['resolution'].value.set(1.0 / canvasWidth, 1.0 / canvasHeight);
            ssaoPass.uniforms['size'].value.set(canvasWidth(), canvasHeight);

            //depthPassPlugin.renderTarget = depthTarget;
            ssaoPass.uniforms['tDepth'].value = depthTarget;
        }

        renderingEnabled = true;
        imgOverride = false;
        requestStopRendering = true;
    });


    renderer.setClearColor(0xffffff);
    // scene
    scene = new THREE.Scene();
    emptyScene = new THREE.Scene();

    //var FAR = 150;
    //scene.fog = new THREE.Fog(0xffffff, 0.1, FAR);

    var ambientLight = new THREE.AmbientLight(0x555555); // soft white light
    scene.add(ambientLight);

    directionalLight1 = new THREE.DirectionalLight(0xdddddd, 0.75);
    directionalLight1.position.set(25, 70, 20);
    
    var camSize = 40;
    directionalLight1.castShadow = false;
    directionalLight1.shadowCascade = false;
    directionalLight1.shadowCascadeCount = 3;

    directionalLight1.shadowCameraNear = 1;
    directionalLight1.shadowCameraFar = 90;
    directionalLight1.shadowCameraVisible = false;
    directionalLight1.shadowBias = -0.001;
    directionalLight1.shadowDarkness = 0.2;
    directionalLight1.shadowCameraLeft = -camSize; // or whatever value works for the scale of your scene
    directionalLight1.shadowCameraRight = camSize;
    directionalLight1.shadowCameraTop = camSize;
    directionalLight1.shadowCameraBottom = -camSize;
    directionalLight1.shadowCascadeWidth = 2048;
    directionalLight1.shadowCascadeHeight = 2048;
    directionalLight1.shadowMapWidth = 2048;
    directionalLight1.shadowMapHeight = 2048;

    
    //scene.add(new THREE.DirectionalLightHelper(directionalLight, 0.2));   
    scene.add(directionalLight1);

    var directionalLight2 = new THREE.DirectionalLight(0xdddddd, 0.4);
    directionalLight2.position.set(-25, 50, -20);
    directionalLight2.castShadow = false;

    scene.add(directionalLight2);

    var directionalLight3 = new THREE.DirectionalLight(0xeeeeee, 0.5);
    directionalLight3.position.set(-10, 10, 20);
    directionalLight3.castShadow = false;
    scene.add(directionalLight3);

    renderer.shadowMapEnabled = false;
    renderer.shadowMapSoft = false;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;

    if (doSSAO) {
        renderer.autoClear = false;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        //renderer.physicallyBasedShading = true;


        // Depth
        var depthShader = THREE.ShaderLib["depthRGBA"];
        var depthUniforms = THREE.UniformsUtils.clone(depthShader.uniforms);

        depthMaterial = new THREE.ShaderMaterial({ fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms });
        depthMaterial.blending = THREE.NoBlending;

        // composer

        renderTargetParams = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
        renderTarget = new THREE.WebGLRenderTarget(canvasWidth, canvasHeight, renderTargetParams);
        composer = new THREE.EffectComposer(renderer, renderTarget);

        var renderScene = new THREE.RenderPass(scene, camera);
        //renderScene.clear = false;

        depthTargetParams = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };
        depthTarget = new THREE.WebGLRenderTarget(canvasWidth, canvasHeight, depthTargetParams);

        colorfixPass = new THREE.ShaderPass(THREE.TestShader);
        colorfixPass.uniforms['mulRGB'].value.set(1.081, 1.081, 1.081);
/*
        ssaoPass = new THREE.ShaderPass(THREE.SSAOShader);
        ssaoPass.uniforms['tDepth'].value = depthTarget;
        ssaoPass.uniforms['size'].value.set(canvasWidth, canvasHeight);
        ssaoPass.uniforms['cameraNear'].value = camera.near;
        ssaoPass.uniforms['cameraFar'].value = camera.far;
        ssaoPass.uniforms['aoClamp'].value = 0.4;
        //ssaoPass.renderToScreen = true;

        // fast aproximate anti-alising
        fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
        fxaaPass.uniforms['resolution'].value.set(1.0 / canvasWidth, 1.0 / canvasHeight);
        fxaaPass.renderToScreen = true;
*/
        composer.addPass(renderScene);
        composer.addPass(ssaoPass);
        composer.addPass(colorfixPass);
        composer.addPass(fxaaPass);
    }

    //axes
    scene.add(buildAxes(1));
    renderer.render(imgOverride ? emptyScene : scene, camera);
    animate();
}

function animate() {
    //setTimeout(function () {
        requestAnimationFrame(animate);
    //}, 1000 / 50);

    controls.update();

    if (renderingEnabled) {
        if (!doesWebGL)
            renderer.domElement.getContext("2d").clearRect(0, 0, canvasWidth - 1, canvasHeight - 1);

        if (doSSAO) {
            renderer.clear();
            scene.overrideMaterial = depthMaterial;
            renderer.render(scene, camera, depthTarget, true);
            scene.overrideMaterial = false;
            composer.render();
        }
        else {
            renderer.render(imgOverride ? emptyScene : scene, camera);
        }

        if (requestStopRendering) {
            requestStopRendering = false;
            renderingEnabled = false;
        }
    }
}


    return self;
}
